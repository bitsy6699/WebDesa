import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { API_VERSION, RATE_LIMIT_API, RATE_LIMIT_LOGIN } from './config/constants.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: RATE_LIMIT_API,
  message: { success: false, error: { code: 'RATE_LIMITED', message: 'Terlalu banyak request, coba lagi nanti.' } },
  standardHeaders: true,
  legacyHeaders: false,
});

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: RATE_LIMIT_LOGIN,
  message: { success: false, error: { code: 'RATE_LIMITED', message: 'Terlalu banyak percobaan login, coba lagi nanti.' } },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
app.use(`/api/${API_VERSION}`, apiLimiter);
app.use(`/api/${API_VERSION}/auth/login`, loginLimiter);

app.get(`/api/${API_VERSION}/health`, (req, res) => {
  res.json({
    success: true,
    data: { status: 'ok', version: API_VERSION, timestamp: new Date().toISOString() },
  });
});

app.use(`/api/${API_VERSION}`, routes);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/${API_VERSION}`);
});

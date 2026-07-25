import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import app from '../backend/src/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const staticDir = join(__dirname, '..', 'frontend', 'dist');

const server = express();

server.use(express.static(staticDir));

server.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    req.url = req.originalUrl;
    return app(req, res);
  }
  next();
});

server.use((req, res) => {
  res.sendFile(join(staticDir, 'index.html'), err => {
    if (err) res.status(404).send('Not found');
  });
});

export default server;

import app from './app.js';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/v1`);
});

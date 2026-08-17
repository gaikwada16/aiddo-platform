import express from 'express';

const app = express();
const port = Number(process.env.API_PORT ?? 3000);

app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'aiddo-api',
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (_req, res) => {
  res.status(200).json({
    name: 'AIDDO Platform API',
    version: '0.1.0',
    message: 'API server is running.',
  });
});

app.listen(port, () => {
  console.log(`AIDDO API listening on http://localhost:${port}`);
});

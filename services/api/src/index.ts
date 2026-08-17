import express from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import { env } from './config/env.js';

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);

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

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(env.port, () => {
  console.log(`AIDDO API listening on http://localhost:${env.port}`);
});

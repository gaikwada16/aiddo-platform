import { config } from 'dotenv';

config();

export const env = {
  port: Number(process.env.API_PORT ?? 3000),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  jwtSecret: process.env.JWT_SECRET ?? 'dev-secret-change-me',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET ?? 'dev-refresh-secret-change-me',
  databaseUrl: process.env.DATABASE_URL ?? 'postgresql://aiddo_user:aiddo_password@localhost:5432/aiddo_db',
};

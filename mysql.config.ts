import { registerAs } from '@nestjs/config';

export const mysqlConfig = registerAs('database', () => ({
  dbCredentials: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'nestjs_app',
    ssl: process.env.DB_SSL === 'true',
  },
  verbose: true,
  strict: true,
}));

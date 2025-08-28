import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: 3000,
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  ASSETS_FULL_DIR: 'assets/full',
  ASSETS_THUMB_DIR: 'assets/thumb',
} as const;

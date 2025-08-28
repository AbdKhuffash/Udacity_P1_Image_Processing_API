import fs from 'fs';
import path from 'path';

export const ensureDir = (dir: string): void => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export const pathJoin = (...parts: string[]): string => path.join(...parts);

export const fileExists = (filepath: string): boolean => fs.existsSync(filepath);

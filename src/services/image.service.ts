import path from 'path';
import sharp from 'sharp';
import { ENV } from '../config/env';
import { fileExists, ensureDir, pathJoin } from '../utils/file';

interface HttpError extends Error {
  statusCode?: number;
}

export async function resizeJpg(
  filename: string,
  width: number,
  height: number,
  outputPath: string
): Promise<string> {
  const lower = filename.toLowerCase();
  if (!lower.endsWith('.jpg') && !lower.endsWith('.jpeg')) {
    const e: HttpError = new Error('Only JPG/JPEG files are supported.');
    e.statusCode = 400;
    throw e;
  }

  const inputPath = pathJoin(ENV.ASSETS_FULL_DIR, filename);
  if (!fileExists(inputPath)) {
    const e: HttpError = new Error('Source image not found.');
    e.statusCode = 404;
    throw e;
  }

  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    const e: HttpError = new Error('Width and height must be positive numbers.');
    e.statusCode = 400;
    throw e;
  }

  ensureDir(path.dirname(outputPath));

  await sharp(inputPath).resize(width, height).jpeg({ quality: 85 }).toFile(outputPath);

  return outputPath;
}

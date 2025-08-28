import path from 'path';
import sharp from 'sharp';
import { ENV } from '../config/env';
import { fileExists, ensureDir, pathJoin } from '../utils/file';

export async function resizeJpg(
  filename: string,
  width: number,
  height: number,
  outputPath: string
): Promise<string> {
  if (!filename.toLowerCase().endsWith('.jpg') && !filename.toLowerCase().endsWith('.jpeg')) {
    const e = new Error('Only JPG/JPEG files are supported.');
    (e as any).statusCode = 400;
    throw e;
  }

  const inputPath = pathJoin(ENV.ASSETS_FULL_DIR, filename);
  if (!fileExists(inputPath)) {
    const e = new Error('Source image not found.');
    (e as any).statusCode = 404;
    throw e;
  }

  if (width <= 0 || height <= 0) {
    const e = new Error('Width and height must be positive numbers.');
    (e as any).statusCode = 400;
    throw e;
  }

  ensureDir(path.dirname(outputPath));

  await sharp(inputPath).resize(width, height).jpeg({ quality: 85 }).toFile(outputPath);

  return outputPath;
}

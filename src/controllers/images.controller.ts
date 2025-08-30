import path from 'path';
import type { Request, Response, NextFunction } from 'express';
import { resizeJpg } from '../services/image.service';

interface ImageQuery {
  filename?: string;
  width?: string;
  height?: string;
}

interface CachedRequest extends Request {
  cachedName?: string;
  cachedPath?: string;
}

interface HttpError extends Error {
  statusCode?: number;
}

export async function getResizedImage(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { filename, width, height } = req.query as ImageQuery;

    const w = Number(width);
    const h = Number(height);

    if (!filename) {
      const err: HttpError = new Error('Filename query parameter is required.');
      err.statusCode = 400;
      throw err;
    }

    if (!Number.isFinite(w) || !Number.isFinite(h)) {
      const err: HttpError = new Error('Width and height must be valid numbers.');
      err.statusCode = 400;
      throw err;
    }

    const outPath = (req as CachedRequest).cachedPath ?? path.resolve('thumb', `${Date.now()}.jpg`);

    const resultPath = await resizeJpg(filename, w, h, outPath);
    res.sendFile(path.resolve(resultPath));
  } catch (err) {
    next(err);
  }
}
// (No CommonJS exports)

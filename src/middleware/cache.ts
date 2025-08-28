import path from 'path';
import { ENV } from '../config/env';
import { fileExists, pathJoin } from '../utils/file';
import type { Request, Response, NextFunction } from 'express';

export function cacheMiddleware(req: Request, res: Response, next: NextFunction): void {
  const { filename, width, height } = req.query as Record<string, string>;
  const safeFilename = filename ?? '';
  const cachedName = `${path.parse(safeFilename).name}_${width}x${height}.jpg`;
  const cachedPath = pathJoin(ENV.ASSETS_THUMB_DIR, cachedName);

  if (fileExists(cachedPath)) {
    res.sendFile(path.resolve(cachedPath));
    return;
  }
  (req as any).cachedName = cachedName;
  (req as any).cachedPath = cachedPath;
  next();
}

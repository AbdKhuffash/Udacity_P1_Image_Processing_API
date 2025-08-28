import type { Request, Response, NextFunction } from 'express';
const path = require('path');
const { resizeJpg } = require('../services/image.service');

export async function getResizedImage(req: Request, res: Response, next: NextFunction) {
  try {
    const { filename, width, height } = req.query as Record<string, string>;
    const outPath = (req as any).cachedPath as string;
    const w = Number(width);
    const h = Number(height);

    if (!filename) {
      const err = new Error('Filename query parameter is required.');
      (err as any).statusCode = 400;
      throw err;
    }

    const resultPath = await resizeJpg(filename, w, h, outPath);
    res.sendFile(path.resolve(resultPath));
  } catch (err) {
    next(err);
  }
}

module.exports = { getResizedImage };

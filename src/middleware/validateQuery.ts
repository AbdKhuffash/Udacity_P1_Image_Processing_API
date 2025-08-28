import type { Request, Response, NextFunction } from 'express';

export function validateImageQuery(req: Request, res: Response, next: NextFunction): void {
  const { filename, width, height } = req.query;

  if (!filename || typeof filename !== 'string') {
    res.status(400).json({ error: 'Missing or invalid "filename" query parameter.' });
    return;
  }

  const w = Number(width);
  const h = Number(height);

  if (!width || Number.isNaN(w) || w <= 0) {
    res.status(400).json({ error: 'Missing or invalid "width" query parameter (must be > 0).' });
    return;
  }
  if (!height || Number.isNaN(h) || h <= 0) {
    res.status(400).json({ error: 'Missing or invalid "height" query parameter (must be > 0).' });
    return;
  }

  next();
}

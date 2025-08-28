import type { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const msg = err instanceof Error ? err.message : 'Unknown error';
  const status = (err as any)?.statusCode ?? 500;
  res.status(status).json({ error: msg });
}

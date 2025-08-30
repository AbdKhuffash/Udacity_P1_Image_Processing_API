import type { Request, Response, NextFunction } from 'express';

interface HttpErrorLike {
  statusCode?: number;
  message?: string;
}

function getStatusCode(err: unknown): number {
  if (typeof err === 'object' && err !== null && 'statusCode' in err) {
    const sc = (err as HttpErrorLike).statusCode;
    if (typeof sc === 'number') return sc;
  }
  return 500;
}

function getMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === 'object' && err !== null && 'message' in err) {
    const msg = (err as HttpErrorLike).message;
    if (typeof msg === 'string') return msg;
  }
  return 'Unknown error';
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const status = getStatusCode(err);
  const msg = getMessage(err);
  res.status(status).json({ error: msg });
}

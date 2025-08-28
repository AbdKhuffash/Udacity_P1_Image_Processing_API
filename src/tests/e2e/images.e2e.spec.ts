import request from 'supertest';
import fs from 'fs';
import path from 'path';
import app from '../../app';

import { ENV } from '../../config/env';
import { ensureDir } from '../../utils/file';

describe('GET /api/images', () => {
  const sample = 'fjord.jpg';

  beforeAll(() => {
    ensureDir(ENV.ASSETS_FULL_DIR);
    ensureDir(ENV.ASSETS_THUMB_DIR);
  });

  afterAll(() => {
    const cached = path.join(ENV.ASSETS_THUMB_DIR, 'fjord_200x200.jpg');
    if (fs.existsSync(cached)) fs.unlinkSync(cached);
  });

  it('returns 400 when missing params', async () => {
    const res = await request(app).get('/api/images');
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('filename');
  });

  it('returns 404 when image is missing', async () => {
    const res = await request(app)
      .get('/api/images')
      .query({ filename: 'does-not-exist.jpg', width: 100, height: 100 });
    expect(res.status).toBe(404);
  });

  it('resizes and returns an image (first call generates cache)', async () => {
    const res = await request(app)
      .get('/api/images')
      .query({ filename: sample, width: 200, height: 200 });
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/image\/jpeg/);
  });

  it('serves from cache on subsequent call (fast)', async () => {
    const res = await request(app)
      .get('/api/images')
      .query({ filename: sample, width: 200, height: 200 });
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/image\/jpeg/);
  });

  it('returns 400 for invalid width/height', async () => {
    const res = await request(app)
      .get('/api/images')
      .query({ filename: sample, width: -1, height: 100 });
    expect(res.status).toBe(400);
  });
});

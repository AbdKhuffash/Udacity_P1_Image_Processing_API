import fs from 'fs';
import path from 'path';
import { resizeJpg } from '../../services/image.service';
import { ENV } from '../../config/env';
import { ensureDir } from '../../utils/file';

describe('resizeJpg()', () => {
  const input = 'fjord.jpg'; // ensure assets/full/fjord.jpg exists
  const outPath = path.join(ENV.ASSETS_THUMB_DIR, 'fjord_123x77.jpg');

  beforeAll(() => {
    ensureDir(ENV.ASSETS_FULL_DIR);
    ensureDir(ENV.ASSETS_THUMB_DIR);
    if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
  });

  afterAll(() => {
    if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
  });

  it('creates a resized image for valid input', async () => {
    const result = await resizeJpg(input, 123, 77, outPath);
    expect(result).toBe(outPath);
    expect(fs.existsSync(outPath)).toBeTrue();
  });

  it('throws on non-positive dimensions', async () => {
    await expectAsync(resizeJpg(input, 0, 100, outPath)).toBeRejected();
  });

  it('throws on unsupported extension', async () => {
    await expectAsync(resizeJpg('notjpg.png', 100, 100, outPath)).toBeRejected();
  });

  it('throws on missing source image', async () => {
    await expectAsync(resizeJpg('missing.jpg', 100, 100, outPath)).toBeRejected();
  });
});

import app from './app';
import { ENV } from './config/env';
import { ensureDir } from './utils/file';

ensureDir(ENV.ASSETS_FULL_DIR);
ensureDir(ENV.ASSETS_THUMB_DIR);

app.listen(ENV.PORT, () => {
  console.log(`Server running on http://localhost:${ENV.PORT}`);
});

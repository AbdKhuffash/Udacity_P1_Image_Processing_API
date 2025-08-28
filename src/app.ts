import express from 'express';
import morgan from 'morgan';
import path from 'path';
import routes from './routes';
import { errorHandler } from './middleware/errorHanlder';
import { ENV } from './config/env';

const app = express();

// middleware
app.use(morgan('dev'));
app.use(express.json());

// serve cached images statically too (optional)
app.use('/thumb', express.static(path.resolve(ENV.ASSETS_THUMB_DIR)));

// api routes
app.use('/api', routes);

// error handler
app.use(errorHandler);

export default app;

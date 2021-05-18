import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import compression from 'compression';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import routes from './routes';
import handleError from './middlewares/errorHandling';

const app = express();

app.use(cors());

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(routes);

if (process.env.NODE_ENV !== 'test') {
  const swaggerDocument = require('./swagger.json');
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.get('/', (_, res) => {
  return res.json({ message: 'Dock Test API' });
});

app.use(handleError);

export default app;

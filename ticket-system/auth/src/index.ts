require('express-async-errors');
import express from 'express';
import { routes } from './routes/routes';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/ not-found-error';

const app = express();
app.use(express.json());

app.use('/api', routes);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Listening on port 3000!!!');
});

import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const usersRouter = express.Router();

usersRouter.get('/', async (request: Request, response: Response) => {
  response.send('ok');
});

usersRouter.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be more than 4 and less than 20 characters'),
  ],
  async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const validationErrors = validationResult(request);

    const hasErrors = !validationErrors.isEmpty();

    if (hasErrors) {
      throw new RequestValidationError(validationErrors.array(), 400);
    }

    throw new DatabaseConnectionError();
  },
);

usersRouter.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be more than 4 and less than 20 characters'),
  ],
  async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const validationErrors = validationResult(request);

    const hasErrors = !validationErrors.isEmpty();

    if (hasErrors) {
      throw new RequestValidationError(validationErrors.array());
    }

    throw new DatabaseConnectionError();
  },
);

usersRouter.post('/signout', async (request: Request, response: Response) => {});

export { usersRouter };

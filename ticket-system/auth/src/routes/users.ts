import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { User } from '../database/models/user';
import { BadRequestError } from '../errors/bad-request-error';
const usersRouter = express.Router();

usersRouter.get('/', async (request: Request, response: Response) => {
  const users = await User.find({});

  return response.send(users);
});

usersRouter.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be more than 4 and less than 20 characters'),
  ],
  async (request: Request, response: Response): Promise<Response> => {
    const { email, password } = request.body;

    const validationErrors = validationResult(request);

    const hasErrors = !validationErrors.isEmpty();

    if (hasErrors) {
      throw new RequestValidationError(validationErrors.array(), 400);
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('User already exists!');
    }

    const user = new User({
      email,
      password,
    });

    await user.save();

    return response.status(201).end();
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

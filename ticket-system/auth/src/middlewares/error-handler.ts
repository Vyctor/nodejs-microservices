import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof CustomError) {
    return response.status(error.statusCode).send({
      errors: error.serialize(),
    });
  }

  return response.status(500).send({ errors: [{ message: `Unhandled Error: ${error.message}` }] });
};

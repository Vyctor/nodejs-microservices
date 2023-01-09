import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export interface RequestValidationErrorProps {
  message: string;
  errors: ValidationError[];
  statusCode: number;
}

class RequestValidationError extends CustomError {
  private _errors: ValidationError[];
  private _statusCode: number;

  constructor(errors?: ValidationError[], statusCode?: number) {
    super('Invalid request parameters');
    this._errors = errors;
    this._statusCode = statusCode || 400;
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  get errors() {
    return this._errors;
  }

  set reasons(reasons: ValidationError[]) {
    this._errors = reasons;
  }

  get statusCode() {
    return this._statusCode;
  }

  public serialize() {
    return this._errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}

export { RequestValidationError };

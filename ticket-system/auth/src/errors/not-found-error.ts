import { CustomError } from './custom-error';

class NotFoundError extends CustomError {
  private _statusCode = 404;

  constructor() {
    super('Route not found');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serialize(): { message: string; field?: string }[] {
    return [{ message: 'Not Found' }];
  }

  get statusCode() {
    return this._statusCode;
  }
}

export { NotFoundError };

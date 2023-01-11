import { CustomError } from './custom-error';

class BadRequestError extends CustomError {
  private _statusCode: number;
  private _message: string = 'Bad Request Error';

  constructor(message?: string, statusCode?: number) {
    super(message || 'Bad Request Error');
    this._message = message || 'Bad Request Error';
    this._statusCode = statusCode || 400;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  get statusCode() {
    return this._statusCode;
  }

  override get message() {
    return this._message;
  }

  public serialize() {
    return [{ message: this.message }];
  }
}

export { BadRequestError };

import { CustomError } from './custom-error';

class DatabaseConnectionError extends CustomError {
  private _reason = 'Error connecting to database';
  private _statusCode: number;

  constructor(statusCode?: number) {
    super('Error connecting to database');
    this._statusCode = statusCode || 500;
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  get reason() {
    return this._reason;
  }

  get statusCode() {
    return this._statusCode;
  }

  public serialize() {
    return [{ message: this.reason }];
  }
}

export { DatabaseConnectionError };

import mongoose from 'mongoose';
import { DatabaseConnectionError } from '../errors/database-connection-error';

class MongooseSingletonConnection {
  private _instance: Promise<typeof mongoose>;

  constructor() {
    mongoose.set('strictQuery', false);
    mongoose.set;
  }

  private async connect(): Promise<typeof mongoose> {
    return await mongoose.connect('mongodb://auth-mongo-service:27017/auth');
  }

  public async getInstance(): Promise<typeof mongoose> {
    try {
      if (!this._instance) {
        await this.connect();
      }
      return this._instance;
    } catch (error) {
      console.log('error: ', error);
      throw new DatabaseConnectionError();
    }
  }
}

export { MongooseSingletonConnection };

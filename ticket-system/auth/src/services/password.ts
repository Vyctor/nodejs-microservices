import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

class Password {
  static async toHash(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const buf: Buffer = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(hashedPassword: string, plainPassword: string): Promise<boolean> {
    const [hashedPasswordBuf, salt] = hashedPassword.split('.');
    const buf: Buffer = (await scryptAsync(plainPassword, salt, 64)) as Buffer;

    return buf.toString('hex') === hashedPasswordBuf;
  }
}

export { Password };

import mongoose, { Document, Model } from 'mongoose';
import { Password } from '../../services/password';

interface UserModelProps {
  email: string;
  password: string;
}

interface UserModel extends Model<UserDocument> {
  build(attributes: UserModelProps): UserDocument;
}

interface UserDocument extends Document {
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

UserSchema.statics.build = (attributes: UserModelProps) => {
  return new User(attributes);
};

const User = mongoose.model<UserDocument, UserModel>('User', UserSchema);

export { User };

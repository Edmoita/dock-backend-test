import { Document } from 'mongoose';

interface IUser extends Document {
  _id: number;
  name: string;
  cpf: string;
  date_of_birth: Date;
}

export default IUser;

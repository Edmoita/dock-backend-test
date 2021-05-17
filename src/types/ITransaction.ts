import { Document } from 'mongoose';

interface ITransaction extends Document {
  _id: number;
  account_id: number;
  value: number;
  date: Date;
}

export default ITransaction;

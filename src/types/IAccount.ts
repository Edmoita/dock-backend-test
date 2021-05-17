import { Document } from 'mongoose';

interface IAccount extends Document {
  _id: number;
  user_id: number;
  balance: number;
  daily_withdrawal_limit: number;
  is_active: boolean;
  type: number;
  createdAt: Date;
}

export default IAccount;

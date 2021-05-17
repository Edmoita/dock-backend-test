import mongoose, { Schema, Model, model } from 'mongoose';

import IAccount from '../types/IAccount';

const AutoIncrement = require('mongoose-sequence')(mongoose);

const AccountSchema: Schema = new Schema({
  _id: Number,
  user_id: Number,
  balance: {
    type: Number,
    default: 0,
  },
  daily_withdrawal_limit: Number,
  is_active: {
    type: Boolean,
    default: false,
  },
  type: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

AccountSchema.plugin(AutoIncrement, { id: 'account_seq' });

const Account: Model<IAccount> = model('Account', AccountSchema);

export default Account;

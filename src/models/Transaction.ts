import mongoose, { Schema, Model, model } from 'mongoose';

import ITransaction from '../types/ITransaction';

const AutoIncrement = require('mongoose-sequence')(mongoose);

const TransactionSchema: Schema = new Schema({
  _id: Number,
  account_id: Number,
  value: Number,
  date: Date,
});

TransactionSchema.plugin(AutoIncrement, { id: 'transaction_seq' });

const Transaction: Model<ITransaction> = model(
  'Transaction',
  TransactionSchema,
);

export default Transaction;

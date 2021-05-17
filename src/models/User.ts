import mongoose, { Schema, Model, model } from 'mongoose';

import IUser from '../types/IUser';

const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema: Schema = new Schema({
  _id: Number,
  name: String,
  cpf: String,
  date_of_birth: Date,
});

UserSchema.plugin(AutoIncrement, { id: 'user_seq' });

const User: Model<IUser> = model('User', UserSchema);

export default User;

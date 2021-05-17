import mongoose from 'mongoose';

import dbConfig from '../db/config';
import User from '../models/User';

async function createUser(): Promise<void> {
  const uri = 'mongodb://localhost:27017/dock_mongo';

  await mongoose.connect(uri, dbConfig.MONGOOSE_OPTS);

  await User.create({
    _id: 1,
    name: 'Usuário de teste',
    cpf: '00011122233',
    date_of_birth: new Date(1995, 11, 17),
  });

  process.exit();
}

createUser();

import mongoose from 'mongoose';

import dbConfig from '../db/config';
import User from '../models/User';

async function createUser(): Promise<void> {
  try {
    const uri = 'mongodb://db:27017/dock_mongo';

    await mongoose.connect(uri, dbConfig.MONGOOSE_OPTS);

    const user = await User.create({
      name: 'Usuário de teste',
      cpf: '00011122233',
      date_of_birth: new Date(1995, 11, 17),
    });

    console.log('Usuário criado', user);
  } catch (error) {
    console.error('Erro ao executar script:', error.message);
  } finally {
    process.exit();
  }
}

createUser();

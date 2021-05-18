import request from 'supertest';

import app from '../../app';
import { USER_NOT_FOUND } from '../../middlewares/errorHandling/errors/UserErrors';
import Account from '../../models/Account';
import User from '../../models/User';
import { dropCollections, expectError } from '../testHelpers';

const route = '/accounts';

export default (): void => {
  test('User not found', async () => {
    await User.deleteMany();

    const body = {
      user_id: 1,
      daily_withdrawal_limit: 100,
      type: 1,
    };
    return request(app)
      .post(route)
      .send(body)
      .then(expectError(USER_NOT_FOUND));
  });

  test('Account created', async () => {
    const user = await User.create({
      _id: 1,
      name: 'Usuário de teste',
      cpf: '00011122233',
      date_of_birth: new Date(1995, 11, 17),
    });

    const body = {
      user_id: user._id,
      daily_withdrawal_limit: 100,
      type: 1,
    };
    return request(app)
      .post(route)
      .send(body)
      .then(response => {
        expect(response.body).toMatchObject({
          user_id: user._id,
          balance: 0,
          daily_withdrawal_limit: 100,
          is_active: true,
          type: 1,
        });
      });
  });
};

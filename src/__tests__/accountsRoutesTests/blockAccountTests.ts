import request from 'supertest';

import app from '../../app';
import { ACCOUNT_NOT_FOUND } from '../../middlewares/errorHandling/errors/AccountErrors';
import Account from '../../models/Account';
import { expectError } from '../testHelpers';

const route = (account_id: number) => `/accounts/${account_id}/block`;

export default (): void => {
  test('Account not found', async () => {
    await Account.deleteMany();

    return request(app).post(route(1)).then(expectError(ACCOUNT_NOT_FOUND));
  });

  test('Account blocked', async () => {
    const account = await Account.create({
      _id: 1,
      user_id: 1,
      balance: 100,
      daily_withdrawal_limit: 50,
      is_active: true,
      type: 1,
    });

    return request(app)
      .post(route(account._id))
      .then(response => {
        expect(response.body).toMatchObject({
          _id: 1,
          is_active: false,
        });
      });
  });
};

import request from 'supertest';

import app from '../../app';
import {
  ACCOUNT_BLOCKED,
  ACCOUNT_NOT_FOUND,
} from '../../middlewares/errorHandling/errors/AccountErrors';
import Account from '../../models/Account';
import { expectError } from '../testHelpers';

const route = (account_id: number) => `/accounts/${account_id}/balance`;

export default (): void => {
  test('Account not found', async () => {
    await Account.deleteMany();
    return request(app).get(route(1)).then(expectError(ACCOUNT_NOT_FOUND));
  });

  test('Account blocked', async () => {
    const account = await Account.create({
      user_id: 1,
      balance: 100,
      daily_withdrawal_limit: 50,
      is_active: false,
      type: 1,
    });

    return request(app)
      .get(route(account._id))
      .then(expectError(ACCOUNT_BLOCKED));
  });

  const balance = 200;
  test(`Account balance is ${balance}`, async () => {
    const account = await Account.create({
      user_id: 1,
      balance,
      daily_withdrawal_limit: 50,
      is_active: true,
      type: 1,
    });

    return request(app)
      .get(route(account._id))
      .then(response => {
        expect(response.body).toBe(balance);
      });
  });
};

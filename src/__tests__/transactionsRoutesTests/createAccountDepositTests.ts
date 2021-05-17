import request from 'supertest';

import app from '../../app';
import {
  ACCOUNT_BLOCKED,
  ACCOUNT_NOT_FOUND,
} from '../../middlewares/errorHandling/errors/AccountErrors';
import Account from '../../models/Account';
import { expectError } from '../testHelpers';

const route = '/transactions/deposit';

export default (): void => {
  test('Account not found', async () => {
    await Account.deleteMany();

    const body = {
      account_id: 1,
      value: 100,
    };
    return request(app)
      .post(route)
      .send(body)
      .then(expectError(ACCOUNT_NOT_FOUND));
  });

  test('Account blocked', async () => {
    const account = await Account.create({
      user_id: 1,
      balance: 100,
      daily_withdrawal_limit: 50,
      is_active: false,
      type: 1,
    });

    const body = {
      account_id: account._id,
      value: 100,
    };

    return request(app)
      .post(route)
      .send(body)
      .then(expectError(ACCOUNT_BLOCKED));
  });

  test('Deposit made', async () => {
    const account = await Account.create({
      user_id: 1,
      balance: 100,
      daily_withdrawal_limit: 50,
      is_active: true,
      type: 1,
    });

    const body = {
      account_id: account._id,
      value: 100,
    };

    return request(app)
      .post(route)
      .send(body)
      .then(async response => {
        expect(response.body).toMatchObject({
          account_id: account._id,
          value: 100,
        });

        const updatedAccount = await Account.findById(account._id);
        if (updatedAccount) {
          expect(updatedAccount.balance).toBe(account.balance + body.value);
        }
      });
  });
};

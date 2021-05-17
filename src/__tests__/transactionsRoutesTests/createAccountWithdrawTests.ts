import request from 'supertest';

import app from '../../app';
import {
  ACCOUNT_BLOCKED,
  ACCOUNT_NOT_FOUND,
  DAILY_WITHDRAWAL_LIMIT_EXCEEDED,
  INSUFFICIENT_FUNDS,
} from '../../middlewares/errorHandling/errors/AccountErrors';
import Account from '../../models/Account';
import Transaction from '../../models/Transaction';
import { expectError } from '../testHelpers';

const route = '/transactions/withdraw';

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

  test('Insufficient funds', async () => {
    const account = await Account.create({
      user_id: 1,
      balance: 100,
      daily_withdrawal_limit: 50,
      is_active: true,
      type: 1,
    });

    const body = {
      account_id: account._id,
      value: 100.01,
    };

    return request(app)
      .post(route)
      .send(body)
      .then(expectError(INSUFFICIENT_FUNDS));
  });

  test('Daily withdrawal limit exceeded', async () => {
    const account = await Account.create({
      user_id: 1,
      balance: 101,
      daily_withdrawal_limit: 50,
      is_active: true,
      type: 1,
    });

    const [transaction1, transaction2] = await Promise.all([
      Transaction.create({
        account_id: account._id,
        value: -30,
        date: new Date(),
      }),
      Transaction.create({
        account_id: account._id,
        value: -10,
        date: new Date(),
      }),
    ]);

    const body = {
      account_id: account._id,
      value: 10.01,
      date: new Date(),
    };

    return request(app)
      .post(route)
      .send(body)
      .then(expectError(DAILY_WITHDRAWAL_LIMIT_EXCEEDED));
  });

  test('Withdraw made', async () => {
    const account = await Account.create({
      user_id: 1,
      balance: 100,
      daily_withdrawal_limit: 50,
      is_active: true,
      type: 1,
    });

    const body = {
      account_id: account._id,
      value: 50,
    };

    return request(app)
      .post(route)
      .send(body)
      .then(async response => {
        expect(response.body).toMatchObject({
          account_id: account._id,
          value: -50,
        });

        const updatedAccount = await Account.findById(account._id);
        if (updatedAccount) {
          expect(updatedAccount.balance).toBe(account.balance - body.value);
        }
      });
  });
};

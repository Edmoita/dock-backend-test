import request from 'supertest';

import app from '../../app';
import {
  ACCOUNT_BLOCKED,
  ACCOUNT_NOT_FOUND,
} from '../../middlewares/errorHandling/errors/AccountErrors';
import Account from '../../models/Account';
import Transaction from '../../models/Transaction';
import { expectError } from '../testHelpers';

const route = '/transactions/statement';

export default (): void => {
  test('Account not found', async () => {
    await Account.deleteMany();
    return request(app)
      .get(route)
      .query({ account_id: 1 })
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

    return request(app)
      .get(route)
      .query({ account_id: account._id })
      .then(expectError(ACCOUNT_BLOCKED));
  });

  test('Account statement ordered by date desc', async () => {
    const account = await Account.create({
      user_id: 1,
      balance: 101,
      daily_withdrawal_limit: 50,
      is_active: true,
      type: 1,
    });

    const [transaction1, transaction2, transaction3] = await Promise.all([
      Transaction.create({
        account_id: account._id,
        value: -30,
        date: new Date(2021, 10, 1),
      }),
      Transaction.create({
        account_id: account._id,
        value: -10,
        date: new Date(2021, 9, 1),
      }),
      Transaction.create({
        account_id: account._id,
        value: 100,
        date: new Date(2021, 11, 1),
      }),
    ]);

    return request(app)
      .get(route)
      .query({ account_id: account._id })
      .then(response => {
        expect(response.body).toHaveLength(3);
        expect(response.body[0]._id).toBe(transaction3._id);
        expect(response.body[1]._id).toBe(transaction1._id);
        expect(response.body[2]._id).toBe(transaction2._id);
      });
  });
};

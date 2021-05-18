import {
  ACCOUNT_BLOCKED,
  DAILY_WITHDRAWAL_LIMIT_EXCEEDED,
  INSUFFICIENT_FUNDS,
} from '../middlewares/errorHandling/errors/AccountErrors';
import * as accountsRepository from '../repositories/accountsRepository';
import * as transactionsRepository from '../repositories/transactionsRepository';
import ITransaction from '../types/ITransaction';

type Params = {
  account_id: number;
  value: number;
  date: Date;
};

export default async ({
  account_id,
  value,
  date,
}: Params): Promise<ITransaction> => {
  const account = await accountsRepository.findByIdOrFail(account_id);

  if (!account.is_active) throw ACCOUNT_BLOCKED;

  if (account.balance < value) throw INSUFFICIENT_FUNDS;

  const totalWithdrawal =
    await transactionsRepository.getTotalWithdrawalsFromAccountInDay({
      account_id,
      date,
    });

  if (totalWithdrawal + value > account.daily_withdrawal_limit) {
    throw DAILY_WITHDRAWAL_LIMIT_EXCEEDED;
  }

  const transaction = await transactionsRepository.create({
    account_id,
    value: -value,
    date,
  });

  const newBalance = Math.round((account.balance - value) * 100) / 100;

  account.balance = newBalance;

  await accountsRepository.save(account);

  return transaction;
};

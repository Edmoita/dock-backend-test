import { ACCOUNT_BLOCKED } from '../middlewares/errorHandling/errors/AccountErrors';
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

  const transaction = await transactionsRepository.create({
    account_id,
    value,
    date,
  });

  account.balance += value;

  await accountsRepository.save(account);

  return transaction;
};

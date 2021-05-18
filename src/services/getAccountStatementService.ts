import { ACCOUNT_BLOCKED } from '../middlewares/errorHandling/errors/AccountErrors';
import * as accountsRepository from '../repositories/accountsRepository';
import * as transactionsRepository from '../repositories/transactionsRepository';
import ITransaction from '../types/ITransaction';

type Params = {
  account_id: number;
};

export default async ({ account_id }: Params): Promise<ITransaction[]> => {
  const account = await accountsRepository.findByIdOrFail(account_id);

  if (!account.is_active) throw ACCOUNT_BLOCKED;

  const transactions =
    await transactionsRepository.listAllFromAccountSortedByDateDesc(
      account._id,
    );

  return transactions;
};

import * as accountsRepository from '../repositories/accountsRepository';
import * as transactionsRepository from '../repositories/transactionsRepository';
import ITransaction from '../types/ITransaction';

type Params = {
  account_id: number;
};

export default async ({ account_id }: Params): Promise<ITransaction[]> => {
  const account = await accountsRepository.findByIdOrFail(account_id);

  const transactions = await transactionsRepository.listAllFromAccount(
    account._id,
  );

  return transactions;
};

import { ACCOUNT_BLOCKED } from '../middlewares/errorHandling/errors/AccountErrors';
import * as accountsRepository from '../repositories/accountsRepository';
import * as transactionsRepository from '../repositories/transactionsRepository';
import ITransaction from '../types/ITransaction';

type Params = {
  account_id: number;
  beginDate?: string;
  endDate?: string;
};

export default async ({
  account_id,
  beginDate,
  endDate,
}: Params): Promise<ITransaction[]> => {
  const account = await accountsRepository.findByIdOrFail(account_id);

  if (!account.is_active) throw ACCOUNT_BLOCKED;

  if (beginDate && endDate) {
    return transactionsRepository.listAllFromAccountByPeriodSortedByDateDesc({
      account_id,
      beginDate: new Date(beginDate),
      endDate: new Date(endDate),
    });
  }

  return transactionsRepository.listAllFromAccountSortedByDateDesc(account._id);
};

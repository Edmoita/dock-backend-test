import { ACCOUNT_BLOCKED } from '../middlewares/errorHandling/errors/AccountErrors';
import * as accountsRepository from '../repositories/accountsRepository';

export default async (account_id: number): Promise<number> => {
  const account = await accountsRepository.findByIdOrFail(account_id);

  if (!account.is_active) throw ACCOUNT_BLOCKED;

  return account.balance;
};

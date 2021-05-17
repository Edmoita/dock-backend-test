import * as accountsRepository from '../repositories/accountsRepository';
import IAccount from '../types/IAccount';

export default async (account_id: number): Promise<IAccount> => {
  const account = await accountsRepository.findByIdOrFail(account_id);

  account.is_active = false;

  return accountsRepository.save(account);
};

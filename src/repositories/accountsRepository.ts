import { ACCOUNT_NOT_FOUND } from '../middlewares/errorHandling/errors/AccountErrors';
import Account from '../models/Account';
import IAccount from '../types/IAccount';

type AccountCreationParams = {
  user_id: number;
  daily_withdrawal_limit: number;
  type: number;
  balance: number;
  is_active: boolean;
};

export async function create(
  accountData: AccountCreationParams,
): Promise<IAccount> {
  return Account.create(accountData);
}

export async function findByIdOrFail(id: number): Promise<IAccount> {
  return Account.findById(id).orFail(ACCOUNT_NOT_FOUND);
}

export async function save(account: IAccount): Promise<IAccount> {
  return account.save();
}

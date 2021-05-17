import * as usersRepository from '../repositories/usersRepository';
import * as accountsRepository from '../repositories/accountsRepository';
import IAccount from '../types/IAccount';

type Params = {
  user_id: number;
  daily_withdrawal_limit: number;
  type: number;
};

export default async ({
  user_id,
  daily_withdrawal_limit,
  type,
}: Params): Promise<IAccount> => {
  const user = await usersRepository.findByIdOrFail(user_id);

  const account = await accountsRepository.create({
    user_id: user._id,
    daily_withdrawal_limit,
    type,
    balance: 0,
    is_active: false,
  });

  return account;
};

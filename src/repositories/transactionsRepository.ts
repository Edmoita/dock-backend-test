import { startOfDay, endOfDay } from 'date-fns';

import Transaction from '../models/Transaction';
import ITransaction from '../types/ITransaction';

type TransactionCreationParams = {
  account_id: number;
  value: number;
  date: Date;
};

export async function create(
  transactionData: TransactionCreationParams,
): Promise<ITransaction> {
  return Transaction.create(transactionData);
}

export async function listAllFromAccountSortedByDateDesc(
  account_id: number,
): Promise<ITransaction[]> {
  return Transaction.find({ account_id }).sort('-date');
}

type TotalWithdrawalsFromAccountInDayParams = {
  account_id: number;
  date: Date;
};

export async function getTotalWithdrawalsFromAccountInDay({
  account_id,
  date,
}: TotalWithdrawalsFromAccountInDayParams) {
  const result = await Transaction.aggregate()
    .match({
      account_id,
      value: { $lt: 0 },
      date: { $gte: startOfDay(date), $lte: endOfDay(date) },
    })
    .group({
      _id: { _id: '$account_id' },
      total: { $sum: '$value' },
    });

  if (!(result && result.length)) return 0;

  return -result[0].total;
}

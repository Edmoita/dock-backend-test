import { Request, Response } from 'express';

import createAccountWithdraw from '../services/createAccountWithdrawService';

export async function create(
  request: Request,
  response: Response,
): Promise<Response> {
  const { account_id, value, date = new Date() } = request.body;

  const transaction = await createAccountWithdraw({
    account_id,
    value,
    date: new Date(date),
  });

  return response.status(201).json(transaction);
}

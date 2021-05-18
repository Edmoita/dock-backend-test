import { Request, Response } from 'express';

import readAccountBalance from '../services/readAccountBalanceService';

export async function read(
  request: Request,
  response: Response,
): Promise<Response> {
  const { account_id } = request.params;

  const balance = await readAccountBalance(Number(account_id));

  return response.status(200).json(balance);
}

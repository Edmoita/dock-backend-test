import { Request, Response } from 'express';

import getAccountStatement from '../services/getAccountStatementService';

export async function read(
  request: Request,
  response: Response,
): Promise<Response> {
  const { account_id } = request.query;

  const transaction = await getAccountStatement({
    account_id: Number(account_id),
  });

  return response.json(transaction);
}

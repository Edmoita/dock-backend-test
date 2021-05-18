import { Request, Response } from 'express';

import blockAccount from '../services/blockAccountService';

export async function create(
  request: Request,
  response: Response,
): Promise<Response> {
  const { account_id } = request.params;

  const account = await blockAccount(Number(account_id));

  return response.status(201).json(account);
}

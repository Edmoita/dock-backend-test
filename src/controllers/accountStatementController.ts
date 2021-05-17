import { Request, Response } from 'express';

import getAccountStatement from '../services/getAccountStatementService';

export async function read(
  request: Request,
  response: Response,
): Promise<Response> {
  const { account_id } = request.body;

  const transaction = await getAccountStatement({ account_id });

  return response.json(transaction);
}

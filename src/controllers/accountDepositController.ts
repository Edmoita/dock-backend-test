import { Request, Response } from 'express';

import createAccountDeposit from '../services/createAccountDepositService';

export async function create(
  request: Request,
  response: Response,
): Promise<Response> {
  const { account_id, value, date } = request.body;

  const transaction = await createAccountDeposit({ account_id, value, date });

  return response.status(201).json(transaction);
}

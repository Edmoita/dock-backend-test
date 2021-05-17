import { Request, Response } from 'express';

import createAccount from '../services/createAccountService';

export async function create(
  request: Request,
  response: Response,
): Promise<Response> {
  const { user_id, daily_withdrawal_limit, type } = request.body;

  const account = await createAccount({
    user_id,
    daily_withdrawal_limit,
    type,
  });

  return response.json(account);
}

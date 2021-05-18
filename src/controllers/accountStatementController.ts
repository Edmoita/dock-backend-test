import { Request, Response } from 'express';

import getAccountStatement from '../services/getAccountStatementService';

export async function read(
  request: Request,
  response: Response,
): Promise<Response> {
  const { account_id, beginDate, endDate } = request.query;

  const transaction = await getAccountStatement({
    account_id: Number(account_id),
    beginDate: beginDate as string,
    endDate: endDate as string,
  });

  return response.json(transaction);
}

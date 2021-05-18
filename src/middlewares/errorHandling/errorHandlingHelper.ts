import { Boom, isBoom } from '@hapi/boom';
import { Request, Response, NextFunction } from 'express';

const UNDEFINED = new Boom('', {
  statusCode: 500,
  data: { internalCode: 900 },
});

export const wrapAsync = (asyncFunction: any) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    asyncFunction(req, res, next).catch(next);
  };
};

export const createErrorResponse = (err: Boom | Error): any => {
  const error = isBoom(err) ? err : UNDEFINED;

  return {
    ...error.output.payload,
    ...error.data,
  };
};

export const handleError = (
  err: Boom | Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): Response => {
  const error = isBoom(err) ? err : UNDEFINED;

  const myError = createErrorResponse(error);

  return res.status(error.output.statusCode).json(myError);
};

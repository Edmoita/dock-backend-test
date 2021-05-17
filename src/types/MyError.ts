export type MyError = {
  message: string;
  statusCode: number;
  internalCode: number;
  internalError?: Error;
};

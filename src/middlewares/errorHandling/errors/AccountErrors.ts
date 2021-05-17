import { createError } from './utils';

/* Model Account 710 - 719 */
export const ACCOUNT_NOT_FOUND = createError({
  message: 'Conta não encontrada',
  statusCode: 404,
  internalCode: 710,
});

export const ACCOUNT_BLOCKED = createError({
  message: 'Conta bloqueada',
  statusCode: 422,
  internalCode: 711,
});

export const INSUFFICIENT_FUNDS = createError({
  message: 'Saldo insuficiente',
  statusCode: 422,
  internalCode: 712,
});

export const DAILY_WITHDRAWAL_LIMIT_EXCEEDED = createError({
  message: 'Limite de saque diário excedido',
  statusCode: 422,
  internalCode: 713,
});

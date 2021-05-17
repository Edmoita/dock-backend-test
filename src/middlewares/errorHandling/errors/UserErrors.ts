import { createError } from './utils';

/* Model User 700 - 709 */
export const USER_NOT_FOUND = createError({
  message: 'Usuário não encontrado',
  statusCode: 404,
  internalCode: 700,
});

import { USER_NOT_FOUND } from '../middlewares/errorHandling/errors/UserErrors';
import User from '../models/User';
import IUser from '../types/IUser';

export async function findByIdOrFail(id: number): Promise<IUser> {
  return User.findById(id).orFail(USER_NOT_FOUND);
}

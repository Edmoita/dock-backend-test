import { Router } from 'express';

import * as accountsController from '../controllers/accountsController';
import * as accountBlockController from '../controllers/accountBlockController';
import * as accountBalanceController from '../controllers/accountBalanceController';

const accountsRouter = Router();

accountsRouter.post('/', accountsController.create);

accountsRouter.post('/:account_id/block', accountBlockController.create);

accountsRouter.get('/:account_id/balance', accountBalanceController.read);

export default accountsRouter;

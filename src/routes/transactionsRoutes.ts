import { Router } from 'express';

import * as accountDepositController from '../controllers/accountDepositController';
import * as accountWithdrawController from '../controllers/accountWithdrawController';
import * as accountStatementController from '../controllers/accountStatementController';

const transactionsRouter = Router();

transactionsRouter.post('/deposit', accountDepositController.create);

transactionsRouter.post('/withdraw', accountWithdrawController.create);

transactionsRouter.get('/statement', accountStatementController.read);

export default transactionsRouter;

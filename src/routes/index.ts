import { Router } from 'express';

import accountsRoutes from './accountsRoutes';
import transactionsRoutes from './transactionsRoutes';

const routes = Router();

routes.use('/accounts', accountsRoutes);
routes.use('/transactions', transactionsRoutes);

export default routes;

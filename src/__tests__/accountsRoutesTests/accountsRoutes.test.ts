import blockAccountTests from './blockAccountTests';
import createAccountTests from './createAccountTests';
import readAccountBalanceTests from './readAccountBalanceTests';

describe('Test Accounts Routes', () => {
  describe('Test POST /accounts/:account_id/block', blockAccountTests);

  describe('Test POST /accounts', createAccountTests);

  describe('Test GET /accounts/:account_id/balance', readAccountBalanceTests);
});

import createAccountDepositTests from './createAccountDepositTests';
import createAccountWithdrawTests from './createAccountWithdrawTests';
import readAccountStatementTests from './readAccountStatementTests';

describe('Test Transactions Routes', () => {
  describe('Test POST /transactions/deposit', createAccountDepositTests);

  describe('Test POST /transactions/withdraw', createAccountWithdrawTests);

  describe('Test GET /transactions/statement', readAccountStatementTests);
});

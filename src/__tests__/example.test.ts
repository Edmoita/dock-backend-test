import request from 'supertest';

import app from '../app';

const testRoot = (): Promise<void> => {
  return request(app)
    .get('/')
    .then(response => {
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        message: 'Dock Test API',
      });
    });
};

/** Testes de exemplo */
describe('Example Tests', () => {
  test('200 Server up', testRoot);
});

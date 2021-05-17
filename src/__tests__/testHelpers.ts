import { Model } from 'mongoose';
import { Boom } from '@hapi/boom';
import { Response } from 'supertest';

export async function dropCollections(models: Model<any>[]): Promise<void> {
  models.forEach(async model => {
    model.deleteMany();
  });
}

export const expectError =
  (errorObject: Boom) =>
    (response: Response): void => {
      expect(response.body).toMatchObject({
        statusCode: errorObject.output.payload.statusCode,
        internalCode: errorObject.data.internalCode,
        message: errorObject.output.payload.message,
      });
    };

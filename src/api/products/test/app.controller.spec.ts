import {Test, TestingModule} from '@nestjs/testing';
import {AppController} from '../../../app.controller';
import {AppService} from '../../../app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return plain text', () => {
      expect(appController.getHello()).toBe('Hello and welcome to my API, please refer to localhost:3000/api for the documentation');
    });
  });
});

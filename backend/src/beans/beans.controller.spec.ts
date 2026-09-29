import { Test, TestingModule } from '@nestjs/testing';
import { BeansController } from './beans.controller';

describe('BeansController', () => {
  let controller: BeansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeansController],
    }).compile();

    controller = module.get<BeansController>(BeansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

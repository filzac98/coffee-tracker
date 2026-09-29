import { Test, TestingModule } from '@nestjs/testing';
import { BrewsController } from './brews.controller';

describe('BrewsController', () => {
  let controller: BrewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrewsController],
    }).compile();

    controller = module.get<BrewsController>(BrewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { BrewsController } from './brews.controller';
import { BrewsService } from './brews.service';

describe('BrewsController', () => {
  let controller: BrewsController;
  const brewsService = { findAll: jest.fn() };

  beforeEach(async () => {
    jest.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrewsController],
      providers: [{ provide: BrewsService, useValue: brewsService }],
    }).compile();

    controller = module.get<BrewsController>(BrewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

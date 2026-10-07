import { Test, TestingModule } from '@nestjs/testing';
import { BeansController } from './beans.controller';
import { BeansService } from './beans.service';

describe('BeansController', () => {
  let controller: BeansController;
  const beansService = { findAll: jest.fn(), findOne: jest.fn() };

  beforeEach(async () => {
    jest.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeansController],
      providers: [{ provide: BeansService, useValue: beansService }],
    }).compile();

    controller = module.get<BeansController>(BeansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('returns the beans from the service', async () => {
    beansService.findAll.mockResolvedValue([{ id: 1, name: 'Tonga' }]);

    await expect(controller.findAll()).resolves.toEqual([
      { id: 1, name: 'Tonga' },
    ]);
  });
});

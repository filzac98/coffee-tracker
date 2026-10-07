import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Bean } from './bean.entity';
import { BeansService } from './beans.service';

describe('BeansService', () => {
  let service: BeansService;
  const beanRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    jest.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BeansService,
        { provide: getRepositoryToken(Bean), useValue: beanRepository },
      ],
    }).compile();

    service = module.get<BeansService>(BeansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('throws NotFoundException when a bean does not exist', async () => {
    beanRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
  });

  it('calculates brew count, average rating and best brew', async () => {
    beanRepository.findOne.mockResolvedValue({
      id: 1,
      brews: [
        { id: 1, rating: 3 },
        { id: 2, rating: 5 },
        { id: 3, rating: 4 },
      ],
    });

    const stats = await service.getStats(1);

    expect(stats.brewCount).toBe(3);
    expect(stats.averageRating).toBe(4);
    expect(stats.bestBrew).toEqual({ id: 2, rating: 5 });
  });

  it('returns zero stats for a bean without brews', async () => {
    beanRepository.findOne.mockResolvedValue({ id: 1, brews: [] });

    const stats = await service.getStats(1);

    expect(stats).toEqual({ brewCount: 0, averageRating: 0, bestBrew: null });
  });
});

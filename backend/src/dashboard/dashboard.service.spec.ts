import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Bean } from '../beans/bean.entity';
import { Brew } from '../brews/brew.entity';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  const queryBuilder = {
    select: jest.fn().mockReturnThis(),
    getRawOne: jest.fn(),
  };
  const beanRepository = { count: jest.fn(), find: jest.fn() };
  const brewRepository = {
    count: jest.fn(),
    createQueryBuilder: jest.fn(() => queryBuilder),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        { provide: getRepositoryToken(Bean), useValue: beanRepository },
        { provide: getRepositoryToken(Brew), useValue: brewRepository },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns totals, average rating and the highest rated bean', async () => {
    beanRepository.count.mockResolvedValue(2);
    brewRepository.count.mockResolvedValue(3);
    queryBuilder.getRawOne.mockResolvedValue({ average: '4.3333' });
    beanRepository.find.mockResolvedValue([
      { id: 1, name: 'Tonga', roaster: 'Saftig kaffe', rating: 4.8 },
    ]);

    await expect(service.getStats()).resolves.toEqual({
      totalBeans: 2,
      totalBrews: 3,
      averageBrewRating: 4.33,
      highestRatedBean: {
        id: 1,
        name: 'Tonga',
        roaster: 'Saftig kaffe',
        rating: 4.8,
      },
    });
  });

  it('returns zero and null when the database is empty', async () => {
    beanRepository.count.mockResolvedValue(0);
    brewRepository.count.mockResolvedValue(0);
    queryBuilder.getRawOne.mockResolvedValue({ average: null });
    beanRepository.find.mockResolvedValue([]);

    await expect(service.getStats()).resolves.toEqual({
      totalBeans: 0,
      totalBrews: 0,
      averageBrewRating: 0,
      highestRatedBean: null,
    });
  });
});

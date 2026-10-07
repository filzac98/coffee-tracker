import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Bean } from '../beans/bean.entity';
import { Brew } from './brew.entity';
import { BrewsService } from './brews.service';

describe('BrewsService', () => {
  let service: BrewsService;
  const brewRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };
  const beanRepository = { findOneBy: jest.fn() };

  const brewInput = {
    beanId: 1,
    brewMethod: 'Espresso',
    machine: 'Lelit Bianca',
    coffeeDose: 18,
    yield: 40,
    brewTime: 29,
    grindSize: '12',
    rating: 4,
  };

  beforeEach(async () => {
    jest.resetAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrewsService,
        { provide: getRepositoryToken(Brew), useValue: brewRepository },
        { provide: getRepositoryToken(Bean), useValue: beanRepository },
      ],
    }).compile();

    service = module.get<BrewsService>(BrewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('refuses a brew for a bean that does not exist', async () => {
    beanRepository.findOneBy.mockResolvedValue(null);

    await expect(service.create(brewInput)).rejects.toThrow(NotFoundException);
    expect(brewRepository.save).not.toHaveBeenCalled();
  });

  it('saves a brew linked to its bean', async () => {
    const bean = { id: 1, name: 'Tonga' };
    beanRepository.findOneBy.mockResolvedValue(bean);
    brewRepository.create.mockImplementation((brew: object) => brew);
    brewRepository.save.mockImplementation((brew: object) =>
      Promise.resolve({ id: 1, ...brew }),
    );

    const saved = await service.create(brewInput);

    expect(saved).toMatchObject({ id: 1, brewMethod: 'Espresso', bean });
  });
});

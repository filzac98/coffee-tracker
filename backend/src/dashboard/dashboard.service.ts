import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bean } from '../beans/bean.entity';
import { Brew } from '../brews/brew.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Bean)
    private readonly beanRepository: Repository<Bean>,

    @InjectRepository(Brew)
    private readonly brewRepository: Repository<Brew>,
  ) {}

  async getStats() {
    const totalBeans = await this.beanRepository.count();
    const totalBrews = await this.brewRepository.count();

    const averageResult = await this.brewRepository
      .createQueryBuilder('brew')
      .select('AVG(brew.rating)', 'average')
      .getRawOne<{ average: string | null }>();

    const [highestRatedBean] = await this.beanRepository.find({
      order: {
        rating: 'DESC',
      },
      take: 1,
    });

    const averageBrewRating = averageResult?.average
      ? Number(Number(averageResult.average).toFixed(2))
      : 0;

    return {
      totalBeans,
      totalBrews,
      averageBrewRating,
      highestRatedBean: highestRatedBean
        ? {
            id: highestRatedBean.id,
            name: highestRatedBean.name,
            roaster: highestRatedBean.roaster,
            rating: highestRatedBean.rating,
          }
        : null,
    };
  }
}

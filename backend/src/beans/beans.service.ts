import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bean } from './bean.entity';
import { CreateBeanDto } from './dto/create-bean.dto';
import { UpdateBeanDto } from './dto/update-bean.dto';

@Injectable()
export class BeansService {
  constructor(
    @InjectRepository(Bean)
    private readonly beanRepository: Repository<Bean>,
  ) {}

  findAll() {
    return this.beanRepository.find();
  }

  async findOne(id: number) {
    const bean = await this.beanRepository.findOne({
      where: { id },
      relations: { brews: true },
    });

    if (!bean) {
      throw new NotFoundException(`Bean with ID ${id} not found`);
    }

    return bean;
  }

  create(createBeanDto: CreateBeanDto) {
    const bean = this.beanRepository.create(createBeanDto);
    return this.beanRepository.save(bean);
  }

  async update(id: number, updateBeanDto: UpdateBeanDto) {
    const bean = await this.findOne(id);
    Object.assign(bean, updateBeanDto);
    return this.beanRepository.save(bean);
  }

  async remove(id: number) {
    const bean = await this.findOne(id);
    return this.beanRepository.remove(bean);
  }

  async findBrews(id: number) {
    const bean = await this.beanRepository.findOne({
      where: { id },
      relations: {
        brews: true,
      },
    });

    if (!bean) {
      throw new NotFoundException(`Bean with ID ${id} not found`);
    }

    return bean.brews;
  }

  async getStats(id: number) {
    const bean = await this.beanRepository.findOne({
      where: { id },
      relations: {
        brews: true,
      },
    });

    if (!bean) {
      throw new NotFoundException(`Bean with ID ${id} not found`);
    }

    const totalRating = bean.brews.reduce((sum, brew) => {
      return sum + brew.rating;
    }, 0);

    const averageRating =
      bean.brews.length > 0 ? totalRating / bean.brews.length : 0;

    const bestBrew =
      bean.brews.length > 0
        ? bean.brews.reduce((best, brew) => {
            return brew.rating > best.rating ? brew : best;
          })
        : null;

    return {
      brewCount: bean.brews.length,
      averageRating: Number(averageRating.toFixed(2)),
      bestBrew,
    };
  }
}

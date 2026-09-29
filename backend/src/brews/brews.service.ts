import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brew } from './brew.entity';
import { Bean } from '../beans/bean.entity';
import { CreateBrewDto } from './dto/create-brew.dto';
import { UpdateBrewDto } from './dto/update-brew.dto';

@Injectable()
export class BrewsService {
  constructor(
    @InjectRepository(Brew)
    private readonly brewRepository: Repository<Brew>,

    @InjectRepository(Bean)
    private readonly beanRepository: Repository<Bean>,
  ) {}

  findAll() {
    return this.brewRepository.find({
      relations: {
        bean: true,
      },
    });
  }

  async findOne(id: number) {
    const brew = await this.brewRepository.findOne({
      where: { id },
      relations: {
        bean: true,
      },
    });

    if (!brew) {
      throw new NotFoundException(`Brew with ID ${id} not found`);
    }

    return brew;
  }

  async create(createBrewDto: CreateBrewDto) {
    const bean = await this.beanRepository.findOneBy({
      id: createBrewDto.beanId,
    });

    if (!bean) {
      throw new NotFoundException(
        `Bean with ID ${createBrewDto.beanId} not found`,
      );
    }

    const { beanId, ...brewData } = createBrewDto;

    const brew = this.brewRepository.create({
      ...brewData,
      bean,
    });

    return this.brewRepository.save(brew);
  }

  async update(id: number, updateBrewDto: UpdateBrewDto) {
    const brew = await this.findOne(id);

    const { beanId, ...brewData } = updateBrewDto;

    Object.assign(brew, brewData);

    if (beanId !== undefined) {
      const bean = await this.beanRepository.findOneBy({ id: beanId });
      if (!bean) {
        throw new NotFoundException(`Bean with ID ${beanId} not found`);
      }
      brew.bean = bean;
    }

    return this.brewRepository.save(brew);
  }

  async remove(id: number) {
    const brew = await this.findOne(id);

    return this.brewRepository.remove(brew);
  }
}

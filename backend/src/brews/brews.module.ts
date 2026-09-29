import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrewsController } from './brews.controller';
import { BrewsService } from './brews.service';
import { Brew } from './brew.entity';
import { Bean } from '../beans/bean.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brew, Bean])],
  controllers: [BrewsController],
  providers: [BrewsService],
})
export class BrewsModule {}

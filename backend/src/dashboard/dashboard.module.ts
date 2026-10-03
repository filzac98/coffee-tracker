import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { Bean } from '../beans/bean.entity';
import { Brew } from '../brews/brew.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bean, Brew])],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}

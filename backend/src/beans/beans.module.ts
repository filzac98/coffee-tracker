import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeansController } from './beans.controller';
import { BeansService } from './beans.service';
import { Bean } from './bean.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bean])],
  controllers: [BeansController],
  providers: [BeansService],
})
export class BeansModule {}

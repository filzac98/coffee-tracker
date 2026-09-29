import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BeansService } from './beans.service';
import { CreateBeanDto } from './dto/create-bean.dto';
import { UpdateBeanDto } from './dto/update-bean.dto';

@Controller('beans')
export class BeansController {
  constructor(private readonly beansService: BeansService) {}

  @Get()
  findAll() {
    return this.beansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.beansService.findOne(id);
  }

  @Get(':id/brews')
  findBrews(@Param('id', ParseIntPipe) id: number) {
    return this.beansService.findBrews(id);
  }

  @Get(':id/stats')
  getStats(@Param('id', ParseIntPipe) id: number) {
    return this.beansService.getStats(id);
  }

  @Post()
  create(@Body() createBeanDto: CreateBeanDto) {
    return this.beansService.create(createBeanDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBeanDto: UpdateBeanDto,
  ) {
    return this.beansService.update(id, updateBeanDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.beansService.remove(id);
  }
}

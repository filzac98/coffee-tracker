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
import { BrewsService } from './brews.service';
import { CreateBrewDto } from './dto/create-brew.dto';
import { UpdateBrewDto } from './dto/update-brew.dto';

@Controller('brews')
export class BrewsController {
  constructor(private readonly brewsService: BrewsService) {}

  @Get()
  findAll() {
    return this.brewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.brewsService.findOne(id);
  }

  @Post()
  create(@Body() createBrewDto: CreateBrewDto) {
    return this.brewsService.create(createBrewDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBrewDto: UpdateBrewDto,
  ) {
    return this.brewsService.update(id, updateBrewDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.brewsService.remove(id);
  }
}

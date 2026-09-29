import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { RoastLevel } from '../bean.entity';

export class CreateBeanDto {
  @IsString()
  name!: string;

  @IsString()
  roaster!: string;

  @IsString()
  origin!: string;

  @IsString()
  process!: string;

  @IsEnum(RoastLevel)
  roastLevel!: RoastLevel;

  @IsDateString()
  roastDate!: string;

  @IsArray()
  @IsString({ each: true })
  tastingNotes!: string[];

  @IsNumber()
  @Min(1)
  @Max(5)
  rating!: number;
}

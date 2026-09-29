import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateBrewDto {
  @IsInt()
  beanId!: number;

  @IsString()
  brewMethod!: string;

  @IsString()
  machine!: string;

  @IsNumber()
  coffeeDose!: number;

  @IsNumber()
  yield!: number;

  @IsInt()
  brewTime!: number;

  @IsString()
  grindSize!: string;

  @IsOptional()
  @IsNumber()
  waterTemp?: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

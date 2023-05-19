import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDietDto {
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  breakfast: string;

  @IsString()
  @IsNotEmpty()
  lunch: string;

  @IsString()
  @IsNotEmpty()
  dinner: string;

  @IsString()
  @IsNotEmpty()
  observations: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}

export class EditDietDto {
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsString()
  @IsOptional()
  breakfast?: string;

  @IsString()
  @IsOptional()
  lunch?: string;

  @IsString()
  @IsOptional()
  dinner?: string;

  @IsString()
  @IsOptional()
  observations?: string;

  @IsString()
  @IsOptional()
  title?: string;
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/auth/decorator';
import { DietService } from './diet.service';
import { CreateDietDto, EditDietDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('diet')
export class DietController {
  constructor(private dietService: DietService) {}

  @Get()
  getDiets(@User('id') userId: string) {
    return this.dietService.getDiets(userId);
  }

  @Get(':id')
  getDietById(@User('id') userId: string, @Param('id') dietId: string) {
    return this.dietService.getDietById(userId, dietId);
  }

  @Post()
  createDiet(@User('id') userId: string, @Body() dto: CreateDietDto) {
    return this.dietService.createDiet(userId, dto);
  }

  @Patch(':id')
  updateDietById(
    @User('id') userId: string,
    @Param('id') dietId: string,
    @Body() dto: EditDietDto,
  ) {
    return this.dietService.updateDietById(userId, dietId, dto);
  }

  @Delete(':id')
  deleteDietById(@User('id') userId, @Param('id') dietId) {
    return this.dietService.deleteDietById(userId, dietId);
  }
}

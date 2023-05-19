import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from 'src/auth/decorator';
import { DietService } from './diet.service';
import { CreateDietDto, EditDietDto } from './dto';

@Controller('diet')
export class DietController {
  constructor(private dietService: DietService) {}

  @Get()
  getDiets(@User('id') userId) {
    return this.dietService.getDiets(userId);
  }

  @Get(':id')
  getDietById(@User('id') userId, @Param('id') dietId) {
    return this.dietService.getDietById(userId, dietId);
  }

  @Post()
  createDiet(@User('id') userId, @Body() dto: CreateDietDto) {
    return this.dietService.createDiet(userId, dto);
  }

  @Patch(':id')
  updateDietById(
    @User('id') userId,
    @Param('id') dietId,
    @Body() dto: EditDietDto,
  ) {
    return this.dietService.updateDietById(userId, dietId, dto);
  }

  @Delete(':id')
  deleteDietById(@User('id') userId, @Param('id') dietId) {
    return this.dietService.deleteDietById(userId, dietId);
  }
}

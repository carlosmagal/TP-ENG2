import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDietDto, EditDietDto } from './dto';

@Injectable()
export class DietService {
  constructor(private prisma: PrismaService) {}

  getDiets(userId: string) {
    return this.prisma.diet.findMany({
      where: {
        userId,
      },
    });
  }

  async getDietById(userId: string, bookmarkId: string) {
    try {
      return await this.prisma.diet.findFirstOrThrow({
        where: {
          id: bookmarkId,
          userId,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestException('Registro não foi encontrado');
      }
    }
  }

  createDiet(userId: string, dto: CreateDietDto) {
    return this.prisma.diet.create({
      data: {
        ...dto,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        userId,
      },
    });
  }

  async updateDietById(userId: string, bookmarkId: string, dto: EditDietDto) {
    const diet = await this.prisma.diet.findUnique({
      where: {
        id: bookmarkId,
      },
    });

    if (!diet) throw new BadRequestException('O registro não foi encontrado');

    if (diet.userId != userId)
      throw new ForbiddenException(
        'Você não possui permissão para alterar este registro',
      );

    return this.prisma.diet.update({
      where: {
        id: bookmarkId,
      },
      data: {
        ...dto,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        userId,
      },
    });
  }

  async deleteDietById(userId: string, bookmarkId: string) {
    const diet = await this.prisma.diet.findUnique({
      where: {
        id: bookmarkId,
      },
    });

    if (!diet) throw new BadRequestException('O registro não foi encontrado');

    if (diet.userId != userId)
      throw new ForbiddenException(
        'Você não possui permissão para deletar este registro',
      );

    return this.prisma.diet.delete({
      where: {
        id: bookmarkId,
      },
    });
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { DietService } from './diet.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Diet } from '@prisma/client';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

const mockDiet = {
  breakfast: '',
  createdAt: new Date(),
  dinner: '',
  endDate: new Date(),
  startDate: new Date(),
  id: '1',
  lunch: '',
  observations: '',
  title: 'Keto',
  updatedAt: new Date(),
  userId: '1',
};

describe('DietService', () => {
  let dietService: DietService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PrismaModule,
        ConfigModule.forRoot({ isGlobal: true }),
        JwtModule.register({
          secretOrPrivateKey: `secret`,
          global: true,
        }),
      ],
      providers: [DietService],
    }).compile();

    dietService = module.get<DietService>(DietService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('getDiets', () => {
    it('should return an array of diets', async () => {
      const result: Diet[] = new Array(5).fill(mockDiet);
      jest.spyOn(prismaService.diet, 'findMany').mockResolvedValue(result);

      expect(await dietService.getDiets('1')).toBe(result);
    });
  });

  describe('getDietById', () => {
    it('should return a single diet', async () => {
      const result = mockDiet;
      jest
        .spyOn(prismaService.diet, 'findFirstOrThrow')
        .mockResolvedValue(result);

      expect(await dietService.getDietById('1', '1')).toBe(result);
    });

    it('should throw BadRequestException if diet not found', async () => {
      jest
        .spyOn(prismaService.diet, 'findFirstOrThrow')
        .mockImplementation(() => {
          throw new PrismaClientKnownRequestError('Not Found', {
            code: 'P2025',
            clientVersion: '',
          });
        });

      await expect(dietService.getDietById('1', '1')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('createDiet', () => {
    it('should return a created diet', async () => {
      const dto = {
        ...mockDiet,
        startDate: '2023-06-18T23:16:42.983Z',
        endDate: '2023-07-18T23:16:42.983Z',
      };
      jest.spyOn(prismaService.diet, 'create').mockResolvedValue(mockDiet);

      expect(await dietService.createDiet('1', dto)).toBe(mockDiet);
    });
  });

  describe('updateDietById', () => {
    it('should return an updated diet', async () => {
      const dto = {
        ...mockDiet,
        startDate: '2023-06-18T23:16:42.983Z',
        endDate: '2023-07-18T23:16:42.983Z',
      };
      jest.spyOn(prismaService.diet, 'findUnique').mockResolvedValue(mockDiet);
      jest.spyOn(prismaService.diet, 'update').mockResolvedValue(mockDiet);

      expect(await dietService.updateDietById('1', '1', dto)).toBe(mockDiet);
    });
    it('should throw BadRequestException if diet not found', async () => {
      jest.spyOn(prismaService.diet, 'findUnique').mockResolvedValue(undefined);

      await expect(dietService.updateDietById('1', '1', {})).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw ForbiddenException if user is not owner', async () => {
      const diet = mockDiet; // the owner is a different user
      jest.spyOn(prismaService.diet, 'findUnique').mockResolvedValue(diet);

      await expect(dietService.updateDietById('2', '1', {})).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('deleteDietById', () => {
    it('should return a deleted diet', async () => {
      jest.spyOn(prismaService.diet, 'findUnique').mockResolvedValue(mockDiet);
      jest.spyOn(prismaService.diet, 'delete').mockResolvedValue(mockDiet);

      expect(await dietService.deleteDietById('1', '1')).toBe(mockDiet);
    });
  });
});

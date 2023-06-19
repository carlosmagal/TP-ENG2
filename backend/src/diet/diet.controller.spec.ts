import { Test, TestingModule } from '@nestjs/testing';
import { DietController } from './diet.controller';
import { DietService } from './diet.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
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

describe('DietController', () => {
  let dietController: DietController;
  let dietService: DietService;

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
      controllers: [DietController],
      providers: [DietService],
    }).compile();

    dietService = module.get<DietService>(DietService);
    dietController = module.get<DietController>(DietController);
  });

  describe('getDiets', () => {
    it('should return an array of diets', async () => {
      const result = [mockDiet];
      jest.spyOn(dietService, 'getDiets').mockResolvedValue(result);

      expect(await dietController.getDiets('1')).toBe(result);
    });
  });

  describe('getDietById', () => {
    it('should return a single diet', async () => {
      const result = mockDiet;
      jest.spyOn(dietService, 'getDietById').mockResolvedValue(result);

      expect(await dietController.getDietById('1', '1')).toBe(result);
    });
  });

  describe('createDiet', () => {
    it('should return a created diet', async () => {
      const dto = {
        ...mockDiet,
        startDate: '2023-06-18T23:16:42.983Z',
        endDate: '2023-07-18T23:16:42.983Z',
      };
      jest.spyOn(dietService, 'createDiet').mockResolvedValue(mockDiet);

      expect(await dietController.createDiet('1', dto)).toBe(mockDiet);
    });
  });

  describe('updateDietById', () => {
    it('should return an updated diet', async () => {
      const dto = {
        ...mockDiet,
        startDate: '2023-06-18T23:16:42.983Z',
        endDate: '2023-07-18T23:16:42.983Z',
      };
      jest.spyOn(dietService, 'updateDietById').mockResolvedValue(mockDiet);

      expect(await dietController.updateDietById('1', '1', dto)).toBe(mockDiet);
    });
  });

  describe('deleteDietById', () => {
    it('should return a deleted diet', async () => {
      jest.spyOn(dietService, 'deleteDietById').mockResolvedValue(mockDiet);

      expect(await dietController.deleteDietById('1', '1')).toEqual(mockDiet);
    });
  });
});

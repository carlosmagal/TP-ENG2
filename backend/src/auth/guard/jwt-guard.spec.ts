import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { JwtGuard } from './jwt.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

describe('JwtGuard', () => {
  let jwtGuard: JwtGuard;
  let jwtService: JwtService;
  let prismaService: PrismaService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtGuard, JwtService, ConfigService, PrismaService],
    }).compile();

    jwtGuard = module.get<JwtGuard>(JwtGuard);
    jwtService = module.get<JwtService>(JwtService);
    prismaService = module.get<PrismaService>(PrismaService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('canActivate', () => {
    it('should return true if token is valid', async () => {
      jest.spyOn(configService, 'get').mockResolvedValue('test_secret');
      jest
        .spyOn(jwtService, 'verify')
        .mockResolvedValue(({ sub: '1', email: 'test@test.com' }));
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue({
        id: '1',
        email: 'test@test.com',
        hash: 'adasdasdaweqweqwedghryutykyiluo789675yj5j6j7ukghjgf',
        name: 'João',
      });

      const context = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: { authorization: 'Bearer valid_token' },
          }),
        }),
      };

      expect(
        await jwtGuard.canActivate(context as ExecutionContext),
      ).toBeTruthy();
    });

    it('should return false if token is invalid', async () => {
      jest.spyOn(configService, 'get').mockResolvedValue('test_secret');
      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new Error();
      });

      const context = {
        switchToHttp: () => ({
          getRequest: () => ({
            headers: { authorization: 'Bearer invalid_token' },
          }),
        }),
      };

      expect(
        await jwtGuard.canActivate(context as ExecutionContext),
      ).toBeFalsy();
    });
  });
});

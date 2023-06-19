import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { randomInt } from 'crypto';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;
  let configService: ConfigService;

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
      providers: [AuthService, JwtService, ConfigService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('signup', () => {
    it('should return a token for a valid user', async () => {
      const email = `john${randomInt(100000000000)}@doe.com`;
      const dto = {
        name: 'John Doe',
        email,
        password: 'johnpassword',
      };
      const user = {
        id: '1',
        name: 'John Doe',
        email,
        hash: 'hashedpassword',
      };
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(user);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');
      jest.spyOn(configService, 'getOrThrow').mockReturnValue('jwt_secret');

      expect((await authService.signup(dto)).access_token).toBeDefined();
    });

    it('should throw ForbiddenException if email is already registered', async () => {
      const dto = {
        name: 'John Doe',
        email: 'john@doe.com',
        password: 'johnpassword',
      };
      jest.spyOn(prismaService.user, 'create').mockImplementation(() => {
        throw new Prisma.PrismaClientKnownRequestError(
          'Unique constraint failed on the fields: (`email`)',
          {
            code: 'P2002',
            clientVersion: 'PrismaClientKnownRequestError',
          },
        );
      });

      await expect(authService.signup(dto)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('signin', () => {
    it('should return a token for valid credentials', async () => {
      const dto = { email: 'john@doe.com', password: 'johnpassword' };
      const user = {
        id: '1',
        email: 'john@doe.com',
        hash: 'hashedpassword',
        name: `John Doe`,
      };
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');
      jest.spyOn(configService, 'getOrThrow').mockReturnValue('jwt_secret');

      expect((await authService.signin(dto)).access_token).toBeDefined();
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      const dto = { email: 'john@doe.com', password: 'johnqwepassword' };
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(undefined);

      await expect(authService.signin(dto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException for incorrect password', async () => {
      const dto = { email: 'john@doe.com', password: 'johnpassword' };
      const user = {
        id: '1',
        email: 'john@doe.com',
        hash: 'hashedpassword',
        name: 'John Doe',
      };
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);
      jest.spyOn(argon, 'verify').mockResolvedValue(false);

      await expect(authService.signin(dto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});

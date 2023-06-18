import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signup: jest.fn().mockResolvedValue({}),
            signin: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('should call authService.signup with the provided dto', async () => {
      const dto = {
        name: 'John Doe',
        email: 'john@doe.com',
        password: 'johnpassword',
      };

      await authController.signup(dto);

      expect(authService.signup).toHaveBeenCalledWith(dto);
    });
  });

  describe('signin', () => {
    it('should call authService.signin with the provided dto', async () => {
      const dto = { email: 'john@doe.com', password: 'johnpassword' };

      await authController.signin(dto);

      expect(authService.signin).toHaveBeenCalledWith(dto);
    });
  });
});

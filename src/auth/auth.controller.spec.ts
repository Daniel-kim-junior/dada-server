import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UserSignInParam } from './param.types';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /**
   * auth controller test
   */
  it('should return sign in', async () => {
    const result = await controller.signIn({} as UserSignInParam);
    expect(result).toBe('sign in');
  });
});

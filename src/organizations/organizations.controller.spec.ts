import { Test, TestingModule } from '@nestjs/testing';
import { OrganiztionsController } from './organizations.controller';

describe('OrganiztionsController', () => {
  let controller: OrganiztionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganiztionsController],
    }).compile();

    controller = module.get<OrganiztionsController>(OrganiztionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

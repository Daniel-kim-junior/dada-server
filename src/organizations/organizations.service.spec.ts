import { Test, TestingModule } from '@nestjs/testing';
import { OrganiztionsService } from './organizations.service';

describe('OrganiztionsService', () => {
  let service: OrganiztionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganiztionsService],
    }).compile();

    service = module.get<OrganiztionsService>(OrganiztionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

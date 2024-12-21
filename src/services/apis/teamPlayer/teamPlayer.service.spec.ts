import { Test, TestingModule } from '@nestjs/testing';
import { TeamPlayerService } from './teamPlayer.service';

describe('TeamPlayerService', () => {
  let service: TeamPlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamPlayerService],
    }).compile();

    service = module.get<TeamPlayerService>(TeamPlayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

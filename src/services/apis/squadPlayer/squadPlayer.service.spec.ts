import { Test, TestingModule } from '@nestjs/testing';
import { SquadPlayerService } from './squadPlayer.service';

describe('SquadPlayerService', () => {
  let service: SquadPlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SquadPlayerService],
    }).compile();

    service = module.get<SquadPlayerService>(SquadPlayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

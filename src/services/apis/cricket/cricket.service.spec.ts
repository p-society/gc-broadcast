import { Test, TestingModule } from '@nestjs/testing';
import { CricketService } from './cricket.service';

describe('CricketService', () => {
  let service: CricketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CricketService],
    }).compile();

    service = module.get<CricketService>(CricketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CricketController } from './cricket.controller';

describe('CricketController', () => {
  let controller: CricketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CricketController],
    }).compile();

    controller = module.get<CricketController>(CricketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

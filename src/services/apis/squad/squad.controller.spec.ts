import { Test, TestingModule } from '@nestjs/testing';
import { SquadController } from './squad.controller';

describe('SquadController', () => {
  let controller: SquadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SquadController],
    }).compile();

    controller = module.get<SquadController>(SquadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

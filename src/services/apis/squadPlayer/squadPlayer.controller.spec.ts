import { Test, TestingModule } from '@nestjs/testing';
import { SquadPlayerController } from './squadPlayer.controller';

describe('SquadPlayerController', () => {
  let controller: SquadPlayerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SquadPlayerController],
    }).compile();

    controller = module.get<SquadPlayerController>(SquadPlayerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

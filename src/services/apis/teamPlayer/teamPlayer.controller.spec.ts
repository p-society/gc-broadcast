import { Test, TestingModule } from '@nestjs/testing';
import { TeamPlayerController } from './teamPlayer.controller';

describe('TeamPlayerController', () => {
  let controller: TeamPlayerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamPlayerController],
    }).compile();

    controller = module.get<TeamPlayerController>(TeamPlayerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

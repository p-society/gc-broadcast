import { Test, TestingModule } from '@nestjs/testing';
import { ReactionService } from './reactions.service';
import { processReaction } from './reaction.helper';


describe('ReactionService', () => {
  let service: ReactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReactionService],
    }).compile();

    service = module.get<ReactionService>(ReactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('processReaction', () => {
    it('should process a valid reaction correctly', () => {
      const reaction = { emoji: ' 👍 ', sport: '  FOOTBALL ' };
      const processedReaction = processReaction(reaction);

      expect(processedReaction).toEqual({
        emoji: '👍',
        sport: 'football',
      });
    });

    it('should throw an error if emoji is missing', () => {
      const reaction = { emoji: '', sport: 'football' };

      expect(() => processReaction(reaction)).toThrowError(
        'Invalid emoji: Must be a non-empty string',
      );
    });

    it('should throw an error if emoji is not a string', () => {
      const reaction = { emoji: 123 as unknown as string, sport: 'football' };

      expect(() =>processReaction(reaction)).toThrowError(
        'Invalid emoji: Must be a non-empty string',
      );
    });

    it('should throw an error if sport is missing', () => {
      const reaction = { emoji: '👍', sport: '' };

      expect(() => processReaction(reaction)).toThrowError(
        'Invalid sport: Must be a non-empty string',
      );
    });

    it('should throw an error if sport is not a string', () => {
      const reaction = { emoji: '👍', sport: 123 as unknown as string };

      expect(() => processReaction(reaction)).toThrowError(
        'Invalid sport: Must be a non-empty string',
      );
    });

    it('should trim whitespace from emoji and sport', () => {
      const reaction = { emoji: '  👏 ', sport: '   basketball   ' };
      const processedReaction = processReaction(reaction);

      expect(processedReaction).toEqual({
        emoji: '👏',
        sport: 'basketball',
      });
    });

    it('should convert sport to lowercase', () => {
      const reaction = { emoji: '🔥', sport: 'TENNIS' };
      const processedReaction = processReaction(reaction);

      expect(processedReaction.sport).toBe('tennis');
    });
  });
});

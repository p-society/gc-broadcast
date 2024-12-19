import { Injectable } from '@nestjs/common';

@Injectable()
export class ReactionService {
  /**
   * Process and validate reaction data.
   * @param reaction - Object containing emoji and sport fields.
   * @returns Processed reaction data.
   */
  processReaction(reaction: { emoji: string; sport: string }): {
    emoji: string;
    sport: string;
  } {
    if (!reaction.emoji || typeof reaction.emoji !== 'string') {
      throw new Error('Invalid emoji: Must be a non-empty string');
    }

    if (!reaction.sport || typeof reaction.sport !== 'string') {
      throw new Error('Invalid sport: Must be a non-empty string');
    }

    return {
      emoji: reaction.emoji.trim(),
      sport: reaction.sport.trim().toLowerCase(),
    };
  }
}

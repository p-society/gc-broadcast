import { Injectable } from '@nestjs/common';

@Injectable()
export class ReactionService {
  /**
   * Save the reaction or perform other business logic.
   * @param reaction - Processed reaction data (already validated and transformed).
   */
  saveReaction(reaction: { emoji: string; sport: string }): string {
    // Simulate saving to a database or performing other business logic
    console.log('Saving reaction to database:', reaction);
    return 'Reaction saved successfully!';
  }
}

/**
 * DTO for incoming reaction payload.
 * This ensures the payload structure and validates fields.
 */
export class ReactionDto {
  /**
   * The emoji representing the reaction.
   * @example "👍"
   */
  emoji: string;

  /**
   * The sport associated with the reaction.
   * @example "football"
   */
  sport: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

/**
 * DTO for incoming reaction payload.
 * This ensures the payload structure and validates fields.
 */
export class ReactionDto {
  /**
   * The emoji representing the reaction.
   * @example "👍"
   */
  @IsNotEmpty({ message: 'Emoji must not be empty' })
  @IsString({ message: 'Emoji must be a string' })
  emoji: string;

  /**
   * The sport associated with the reaction.
   * @example "football"
   */
  @IsNotEmpty({ message: 'Sport must not be empty' })
  @IsString({ message: 'Sport must be a string' })
  sport: string;
}

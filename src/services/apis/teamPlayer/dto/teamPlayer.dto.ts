// team_player.dto.ts
import { z } from 'zod';
import { Types } from 'mongoose';
import { TeamPlayerStatus } from '../constants/TeamPlayerEnum';

// Enums
const TeamPlayerStatusEnum = z.nativeEnum(TeamPlayerStatus);

export const CreateTeamPlayerValidation = z.object({
  team: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid team ID',
  }),
  user: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid user ID',
  }),
  status: TeamPlayerStatusEnum.default(TeamPlayerStatus.Playing),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const PatchTeamPlayerValidation = z.object({
  team: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid team ID',
    })
    .optional(),
  user: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid user ID',
    })
    .optional(),
  status: TeamPlayerStatusEnum.optional(),
  updatedAt: z.date().optional(),
});

export const RemoveTeamPlayerValidation = z.object({
  id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid team_player ID',
  }),
});

export type CreateTeamPlayerDto = z.infer<typeof CreateTeamPlayerValidation>;
export type PatchTeamPlayerDto = z.infer<typeof PatchTeamPlayerValidation>;
export type RemoveTeamPlayerDto = z.infer<typeof RemoveTeamPlayerValidation>;

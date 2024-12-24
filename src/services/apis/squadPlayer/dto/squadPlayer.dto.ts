// squad_player.dto.ts
import { z } from 'zod';
import { Types } from 'mongoose';

// Enums
const SquadPlayerStatusEnum = z.enum(['approved', 'pending', 'rejected']);

export const CreateSquadPlayerValidation = z.object({
  squad: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid squad ID',
  }),
  user: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid user ID',
  }),
  status: SquadPlayerStatusEnum.default('pending'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const PatchSquadPlayerValidation = z.object({
  squad: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid squad ID',
    })
    .optional(),
  user: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid user ID',
    })
    .optional(),
  status: SquadPlayerStatusEnum.optional(),
  updatedAt: z.date().optional(),
});

export const RemoveSquadPlayerValidation = z.object({
  id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid squad_player ID',
  }),
});

export type CreateSquadPlayerDto = z.infer<typeof CreateSquadPlayerValidation>;
export type PatchSquadPlayerDto = z.infer<typeof PatchSquadPlayerValidation>;
export type RemoveSquadPlayerDto = z.infer<typeof RemoveSquadPlayerValidation>;

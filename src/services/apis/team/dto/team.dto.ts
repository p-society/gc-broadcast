import { z } from 'zod';
import { Types } from 'mongoose';

// Rename from Teams to Team for consistency
export const CreateTeamValidation = z.object({
  captain: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid captain ID',
  }),
  viceCaptain: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid vice-captain ID',
  }),
  squad: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid squad ID',
  }),
  sport: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid sport ID',
  }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const PatchTeamValidation = z.object({
  captain: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid captain ID',
    })
    .optional(),
  viceCaptain: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid vice-captain ID',
    })
    .optional(),
  squad: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid squad ID',
    })
    .optional(),
  sport: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid sport ID',
    })
    .optional(),
  updatedAt: z.date().optional(),
});

export const RemoveTeamValidation = z.object({
  id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid team ID',
  }),
});

export type CreateTeamDto = z.infer<typeof CreateTeamValidation>;
export type PatchTeamDto = z.infer<typeof PatchTeamValidation>;
export type RemoveTeamDto = z.infer<typeof RemoveTeamValidation>;

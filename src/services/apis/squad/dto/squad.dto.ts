import { z } from 'zod';
import { Types } from 'mongoose';
import Sports from 'src/constants/sports-enum';

const SportsEnum = z.nativeEnum(Sports);

export const CreateSquadValidation = z.object({
  branch: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid branch ID',
  }),
  name: z.string(),
  season: z.string(),
  sport: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid sport ID',
  }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const PatchSquadValidation = z.object({
  branch: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid branch ID',
    })
    .optional(),
  name: z.string().optional(),
  season: z.string().optional(),
  sport: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid sport ID',
    })
    .optional(),
  updatedAt: z.date().optional(),
});

export const RemoveSquadValidation = z.object({
  id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid squad ID',
  }),
});

export type CreateSquadDto = z.infer<typeof CreateSquadValidation>;
export type PatchSquadDto = z.infer<typeof PatchSquadValidation>;
export type RemoveSquadDto = z.infer<typeof RemoveSquadValidation>;

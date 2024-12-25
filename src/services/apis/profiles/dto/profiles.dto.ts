import { date, z } from 'zod';
import { Types } from 'mongoose';
import Sports from 'src/constants/sports-enum';

export const CreateProfilesValidation = z.object({
  sport: z.nativeEnum(Sports),
  user: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid user ID',
  }),

  position: z.string().trim(),
  approved: z.boolean().default(false),
  experience: z.number().default(0),
  active: z.boolean().default(true),
  approvedBy: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid user ID',
  }),

  achievements: z
    .array(
      z.object({
        achievementTitle: z.string().trim().max(30).min(3),
        date: z.date().default(new Date()),
        description: z.string().max(150).min(25).optional(),
      }),
    )
    .optional(),

  createdBy: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'invalid user ID',
  }),
});

export const PatchProfilesValidation = z.object({
  sport: z.nativeEnum(Sports).optional(),
  user: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid user ID',
    })
    .optional(),

  position: z.string().trim().optional(),
  approved: z.boolean().optional(),
  experience: z.number().optional(),
  active: z.boolean().optional(),
  approvedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid user ID',
    })
    .optional(),

  achievements: z
    .array(
      z.object({
        achievementTitle: z.string().trim().max(30).min(3),
        date: z.date(),
        description: z.string().max(150).min(25).optional(),
      }),
    )
    .optional(),

  createdBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'invalid user ID',
    })
    .optional(),
});

export const RemoveProfilesValidation = z.object({
  id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid user ID',
  }),
  deletedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deletedAt: z.date().optional(),
});

export type CreateProfilesDTO = z.infer<typeof CreateProfilesValidation>;
export type PatchProfilesDTO = z.infer<typeof PatchProfilesValidation>;
export type RemoveProfilesDTO = z.infer<typeof RemoveProfilesValidation>;

import { date, z } from 'zod';
import { Types } from 'mongoose';

export const CreateProfilesValidation = z.object({
  sport: z.enum(['Football', 'Cricket', 'Badminton', 'Basketball', 'Volleyball']),
  user: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid user ID',
    }),

  position: z.string().trim(),
  approved: z.boolean().default(false),
  experience: z.number().default(0),
  active: z.boolean().default(true),
  approvedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid user ID',
    }),

  achievements: z.array(
    z.object({
      achievementTitle: z.string().trim().max(30).min(3),
      date: z.date().default(new Date()),
      description: z.string().max(150).min(25).optional(),
    })
  ).optional(),

  createdBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: "invalid user ID"
    })


});

export const PatchProfilesValidation = z.object({
  sport: z.enum(['Football', 'Cricket', 'Badminton', 'Basketball', 'Volleyball']),
  user: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid user ID',
    }),

  position: z.string().trim(),
  approved: z.boolean().default(false),
  experience: z.number().default(0),
  active: z.boolean().default(true),
  approvedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid user ID',
    }),

  achievements: z.array(
    z.object({
      achievementTitle: z.string().trim().max(30).min(3),
      date: z.date().default(new Date()),
      description: z.string().max(150).min(25).optional(),
    })
  ).optional(),

  createdBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: "invalid user ID"
    })
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

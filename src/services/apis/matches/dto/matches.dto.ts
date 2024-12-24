import { z } from 'zod';
import { Types } from 'mongoose';

// Enums
const StageEnum = z.enum(['league', 'qualifier', 'final']);
const StatusEnum = z.enum([
  'live',
  'upcoming',
  'concluded',
  'paused',
  'postponed',
  'cancelled',
]);
const OutcomeEnum = z.enum(['team1', 'team2', 'draw', 'no_result']);
const ReasonEnum = z.enum(['bad_weather', 'insufficient_time', 'other']);

export const CreateMatchesValidation = z.object({
  scheduledFor: z.string(),
  team1: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid team1 ID',
  }),
  team2: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid team2 ID',
  }),
  sport: z.string(),
  stage: StageEnum,
  status: StatusEnum,
  outcome: OutcomeEnum.optional(),
  reasonForIncompletion: ReasonEnum.optional(),
  createdBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid creator ID',
    })
    .optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deleted: z.boolean().optional().default(false),
  deletedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deletedAt: z.date().optional(),
});

export const PatchMatchesValidation = z.object({
  scheduledFor: z.string().optional(),
  team1: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid team1 ID',
    })
    .optional(),
  team2: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid team2 ID',
    })
    .optional(),
  sport: z.string().optional(),
  stage: StageEnum.optional(),
  status: StatusEnum.optional(),
  outcome: OutcomeEnum.optional(),
  reasonForIncompletion: ReasonEnum.optional(),
  updatedAt: z.date().optional(),
  createdAt: z.date().optional(),
  deleted: z.boolean().optional(),
  deletedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deletedAt: z.date().optional(),
});

export const RemoveMatchesValidation = z.object({
  id: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid matches ID',
  }),
  deletedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deletedAt: z.date().optional(),
});

export type CreateMatchesDto = z.infer<typeof CreateMatchesValidation>;
export type PatchMatchesDto = z.infer<typeof PatchMatchesValidation>;
export type RemoveMatchesDto = z.infer<typeof RemoveMatchesValidation>;

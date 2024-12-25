import { z } from 'zod';
import { Types } from 'mongoose';
import {
  MatchIncompletionReason,
  MatchOutcome,
  MatchStage,
  MatchStatus,
} from '../constants/MatchEnums';

const StageEnum = z.nativeEnum(MatchStage);
const StatusEnum = z.nativeEnum(MatchStatus);
const OutcomeEnum = z.nativeEnum(MatchOutcome);
const IncompletionReasonEnum = z.nativeEnum(MatchIncompletionReason);

export const CreateMatchesValidation = z.object({
  scheduledFor: z.string(),
  team1: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid team1 ID',
  }),
  team2: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid team2 ID',
  }),
  sport: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid sport ID',
  }),
  stage: StageEnum,
  status: StatusEnum,
  outcome: OutcomeEnum.optional(),
  reasonForIncompletion: IncompletionReasonEnum.optional(),
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
  sport: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid sport ID',
    })
    .optional(),
  stage: StageEnum.optional(),
  status: StatusEnum.optional(),
  outcome: OutcomeEnum.optional(),
  reasonForIncompletion: IncompletionReasonEnum.optional(),
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

import { z } from 'zod';
import { Types } from 'mongoose';

export const createCricketEventDTO = z.object({
  match: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid UserID',
  }),
  type: z.string(),
  details: z.object({
    runs: z.number().nullable().optional(),
    playerOut: z.string().nullable().optional(),
    outReason: z.string().nullable().optional(),
    wickets: z.number().nullable().optional(),
    scoringType: z.number().nullable().optional(),
    illegal: z.number().nullable().optional(),
    penalty: z.string().nullable().optional(),
  }),
});

export const updateCricketEeventDTO = z.object({
  type: z.string().nonempty(),
  details: z.object({
    runs: z.number().nullable().optional(),
    playerOut: z.string().nullable().optional(),
    outReason: z.array(z.any()).nullable().optional(),
    wickets: z.number().nullable().optional(),
    scoringType: z.string().nullable().optional(),
    illegal: z.string().nullable().optional(),
    penalty: z.number().nullable().optional(),
  }),
});

export type updateCricketEeventDTOType = z.infer<typeof updateCricketEeventDTO>;
export type createCricketEventDTOType = z.infer<typeof createCricketEventDTO>;

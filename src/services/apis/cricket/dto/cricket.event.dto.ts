import { z } from 'zod';

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

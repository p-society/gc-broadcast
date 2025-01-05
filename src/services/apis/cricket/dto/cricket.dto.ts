import { z } from 'zod';
import { Types } from 'mongoose';

export const CreateCricketValidation = z.object({
  match: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Not valid id',
  }),

  innings: z.object({
    first: z.object({
      battingTeam: z.string(),
      totalRuns: z.number(),
      over: z.number(),
      wicketsFallen: z.number(),
      Batting: z.object({
        striker: z.object({
          name: z.string(),
          runs: z.number(),
          outReason: z.string().nullable(),
        }),
        nonStriker: z.object({
          name: z.string(),
          runs: z.number(),
          outReason: z.string().nullable(),
        }),
        order: z.array(
          z.object({
            name: z.string(),
            runs: z.number(),
            status: z.string(),
            profileLink: z.string(),
            outReason: z.array(z.string()),
          }),
        ),
      }),
      Bowling: z.object({
        freeHit: z.boolean(),
        bowler: z.object({
          name: z.string(),
          overs: z.number(),
          runsConceded: z.number(),
          wickets: z.number(),
        }),
        currentOver: z.array(
          z.object({
            ball: z.number(),
            runs: z.number(),
            illegal: z.string().nullable(),
          }),
        ),
        order: z.array(
          z.object({
            name: z.string(),
            overs: z.number(),
            runsConceded: z.number(),
            wickets: z.number(),
            profileLink: z.string(),
          }),
        ),
        extras: z.object({
          noBalls: z.number(),
          wides: z.number(),
          byes: z.number(),
          legByes: z.number(),
        }),
      }),
      inningsStatus: z.string(),
      target: z.number().nullable(),
    }),
    second: z.object({
      battingTeam: z.string(),
      totalRuns: z.number(),
      over: z.number(),
      wicketsFallen: z.number(),
      Batting: z.object({
        striker: z.string().nullable(),
        nonStriker: z.string().nullable(),
        order: z.array(
          z.object({
            name: z.string(),
            runs: z.number(),
            status: z.string(),
            profileLink: z.string(),
            outReason: z.array(z.string()),
          }),
        ),
      }),
      Bowling: z.object({
        bowler: z.string().nullable(),
        currentOver: z.array(z.any()),
        extras: z.object({
          noBalls: z.number(),
          wides: z.number(),
          byes: z.number(),
          legByes: z.number(),
        }),
      }),
      inningsStatus: z.string(),
      target: z.number(),
    }),
  }),

  interrupted: z.string(),
  teamACaptain: z.string(),
  teamBCaptain: z.string(),
  teamAWicketKeeper: z.string(),
  teamBWicketKeeper: z.string(),
  umpires: z.array(z.string()),
  matchStatus: z.string(),
  macthoutcome: z.array(z.string()),
});

export const PatchCricketValidation = z.object({
  innings: z.object({
    first: z.object({
      battingTeam: z.string(),
      totalRuns: z.number(),
      over: z.number(),
      wicketsFallen: z.number(),
      Batting: z.object({
        striker: z.object({
          name: z.string(),
          runs: z.number(),
          outReason: z.string().nullable(),
        }),
        nonStriker: z.object({
          name: z.string(),
          runs: z.number(),
          outReason: z.string().nullable(),
        }),
        order: z.array(
          z.object({
            name: z.string(),
            runs: z.number(),
            status: z.string(),
            profileLink: z.string(),
            outReason: z.array(z.string()),
          }),
        ),
      }),
      Bowling: z.object({
        freeHit: z.boolean(),
        bowler: z.object({
          name: z.string(),
          overs: z.number(),
          runsConceded: z.number(),
          wickets: z.number(),
        }),
        currentOver: z.array(
          z.object({
            ball: z.number(),
            runs: z.number(),
            illegal: z.string().nullable(),
          }),
        ),
        order: z.array(
          z.object({
            name: z.string(),
            overs: z.number(),
            runsConceded: z.number(),
            wickets: z.number(),
            profileLink: z.string(),
          }),
        ),
        extras: z.object({
          noBalls: z.number(),
          wides: z.number(),
          byes: z.number(),
          legByes: z.number(),
        }),
      }),
      inningsStatus: z.string(),
      target: z.number().nullable(),
    }),
    second: z.object({
      battingTeam: z.string(),
      totalRuns: z.number(),
      over: z.number(),
      wicketsFallen: z.number(),
      Batting: z.object({
        striker: z.string().nullable(),
        nonStriker: z.string().nullable(),
        order: z.array(
          z.object({
            name: z.string(),
            runs: z.number(),
            status: z.string(),
            profileLink: z.string(),
            outReason: z.array(z.string()),
          }),
        ),
      }),
      Bowling: z.object({
        bowler: z.string().nullable(),
        currentOver: z.array(z.any()),
        extras: z.object({
          noBalls: z.number(),
          wides: z.number(),
          byes: z.number(),
          legByes: z.number(),
        }),
      }),
      inningsStatus: z.string(),
      target: z.number(),
    }),
  }),

  interrupted: z.string(),
  teamACaptain: z.string(),
  teamBCaptain: z.string(),
  teamAWicketKeeper: z.string(),
  teamBWicketKeeper: z.string(),
  umpires: z.array(z.string()),
  matchStatus: z.string(),
  macthoutcome: z.array(z.string()),
});

export const RemoveCricketValidation = z.object({
  deletedBy: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid deleter ID',
    })
    .optional(),
  deletedAt: z.date().optional(),
});

export type CreateCricketDTO = z.infer<typeof CreateCricketValidation>;
export type PatchCricketDTO = z.infer<typeof PatchCricketValidation>;
export type RemoveCricketDTO = z.infer<typeof RemoveCricketValidation>;

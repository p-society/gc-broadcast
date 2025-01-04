import { z } from 'zod';

const PlayerSchema = z.object({
  name: z.string(),
  number: z.number().int().positive(),
});

const AssistSchema = PlayerSchema;

export const GoalEventSchema = z.object({
  type: z.literal('goal'),
  details: z.object({
    team: z.string(),
    scorer: PlayerSchema.extend({
      assist: AssistSchema.optional(),
    }),
    minute: z.number().int().min(0),
    description: z.string(),
  }),
  timestamp: z.date(),
  matchId: z.string(),
});

export const SubstitutionEventSchema = z.object({
  type: z.literal('substitution'),
  details: z.object({
    team: z.string(),
    outPlayer: PlayerSchema,
    inPlayer: PlayerSchema,
    minute: z.number().int().min(0),
  }),
  timestamp: z.date(),
  matchId: z.string(),
});

export const FoulEventSchema = z.object({
  type: z.literal('foul'),
  details: z.object({
    team: z.string(),
    player: PlayerSchema,
    type: z.string(),
    card: z.enum(['yellow', 'red', 'none']),
    minute: z.number().int().min(0),
  }),
  timestamp: z.date(),
  matchId: z.string(),
});

export const InjuryEventSchema = z.object({
  type: z.literal('injury'),
  details: z.object({
    team: z.string(),
    player: PlayerSchema,
    severity: z.enum(['minor', 'moderate', 'severe']),
    minute: z.number().int().min(0),
  }),
  timestamp: z.date(),
  matchId: z.string(),
});

export const PenaltyEventSchema = z.object({
  type: z.literal('penalty'),
  details: z.object({
    team: z.string(),
    player: PlayerSchema,
    success: z.boolean(),
    minute: z.number().int().min(0),
  }),
  timestamp: z.date(),
  matchId: z.string(),
});

export const VarEventSchema = z.object({
  type: z.literal('var_decision'),
  details: z.object({
    incident: z.string(),
    team: z.string(),
    player: PlayerSchema,
    decision: z.string(),
    minute: z.number().int().min(0),
  }),
  timestamp: z.date(),
  matchId: z.string(),
});

export const CreateMatchEventDto = z.discriminatedUnion('type', [
  GoalEventSchema,
  SubstitutionEventSchema,
  FoulEventSchema,
  InjuryEventSchema,
  PenaltyEventSchema,
  VarEventSchema,
]);

export type CreateMatchEventDtoType = z.infer<typeof CreateMatchEventDto>;

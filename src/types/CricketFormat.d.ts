enum PenaltyType {
  no_ball = 'no_ball',
  wide = 'wide',
  field_obstruction = 'field_obstruction',
  over_rate_exceeded = 'over_rate_exceeded',
}

declare type PenaltyActions = {
  illegal: PenaltyType;
  freeHit: boolean;
  penalty: number;
};

enum ExtraActionsType {
  byes = 'byes',
  leg_byes = 'leg_byes',
  feilding_error = 'feilding_error',
}

declare type ExtraActions = {
  type: ExtraActionsType;
  penalty: number;
  description: string;
};

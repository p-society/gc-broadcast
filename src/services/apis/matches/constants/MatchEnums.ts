export enum MatchStatus {
  Live = 'LIVE',
  Upcoming = 'UPCOMING',
  Concluded = 'CONCLUDED',
  Paused = 'PAUSED',
  Postponed = 'POSTPONED',
  Cancelled = 'CANCELLED',
}

export enum MatchOutcome {
  Team1 = 'TEAM1',
  Team2 = 'TEAM2',
  Draw = 'DRAW',
  NoResult = 'NO_RESULT',
}

export enum MatchIncompletionReason {
  BadWeather = 'BAD_WEATHER',
  InsufficientTime = 'INSUFFICIENT_TIME',
  Other = 'OTHER',
}

export enum MatchStage {
  LEAGUE = 'LEAGUE',
  QUALIFIER = 'QUALIFIER',
  FINAL = 'FINAL',
}

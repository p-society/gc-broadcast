import { Types } from 'mongoose';

declare type EventType = {
  match: Types.ObjectId;
  type: string;
  details: {
    runs?: number | null;
    playerOut?: string | null;
    outReason?: any[];
    wickets?: number | null;
    scoringType?: string | null;
    illegal?: string | null;
    penalty?: number | null;
  };
  createdAt: Date;
  updateAt: Date;
};

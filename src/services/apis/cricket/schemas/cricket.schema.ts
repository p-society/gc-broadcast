import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Matches } from '../../matches/schemas/matches.schema';
import { HydratedDocument, Types } from 'mongoose';
import EnsureObjectId from 'src/common/EnsureObjectId';
import { SoftDeleteSchema } from 'src/common/soft-delete-schema';

export type CricketStateDocument = HydratedDocument<CricketState>;

@Schema({
  timestamps: true,
})
export class CricketState extends SoftDeleteSchema {
  @Prop({
    type: Types.ObjectId,
    required: true,
    index: true,
    ref: Matches.name,
    set: EnsureObjectId,
  })
  match: Types.ObjectId;
  @Prop({
    type: Object,
    required: true,
  })
  innings: {
    first: {
      battingTeam: string;
      totalRuns: number;
      over: number;
      wicketsFallen: number;
      Batting: {
        striker: {
          name: string;
          runs: number;
          outReason: string | null;
        };
        nonStriker: {
          name: string;
          runs: number;
          outReason: string | null;
        };
        order: Array<{
          name: string;
          runs: number;
          status: string;
          profileLink: string;
          outReason: string[];
        }>;
      };
      Bowling: {
        freeHit: boolean;
        bowler: {
          name: string;
          overs: number;
          runsConceded: number;
          wickets: number;
        };
        currentOver: Array<{
          ball: number;
          runs: number;
          illegal: string | null;
        }>;
        order: Array<{
          name: string;
          overs: number;
          runsConceded: number;
          wickets: number;
          profileLink: string;
        }>;
        extras: {
          noBalls: number;
          wides: number;
          byes: number;
          legByes: number;
        };
      };
      inningsStatus: string;
      target: number | null;
    };
    second: {
      battingTeam: string;
      totalRuns: number;
      over: number;
      wicketsFallen: number;
      Batting: {
        striker: string | null;
        nonStriker: string | null;
        order: Array<{
          name: string;
          runs: number;
          status: string;
          profileLink: string;
          outReason: string[];
        }>;
      };
      Bowling: {
        bowler: string | null;
        currentOver: any[];
        extras: {
          noBalls: number;
          wides: number;
          byes: number;
          legByes: number;
        };
      };
      inningsStatus: string;
      target: number;
    };
  };

  @Prop({ trim: true })
  interrupted: string;

  @Prop({ trim: true })
  teamACaptain: string;

  @Prop({ trim: true })
  teamBCaptain: string;

  @Prop({ trim: true })
  teamAWicketKeeper: string;

  @Prop({ trim: true })
  teamBWicketKeeper: string;

  @Prop({
    type: [String],
  })
  umpires: string[];

  @Prop({ trim: true })
  matchStatus: string;

  @Prop({
    type: [String],
  })
  matchoutcome: string[];
}

export const CricketStateSchema = SchemaFactory.createForClass(CricketState);

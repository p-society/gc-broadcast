import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { Matches, MatchesSchema } from './schemas/matches.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Matches.name, schema: MatchesSchema }]),
  ],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MatchesService],
})
export class MatchesModule {}

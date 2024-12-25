import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SquadController } from './squad.controller';
import { SquadService } from './squad.service';
import { Squads, SquadsSchema } from './schemas/squad.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Squads.name, schema: SquadsSchema }]),
  ],
  controllers: [SquadController],
  providers: [SquadService],
  exports: [SquadService],
})
export class SquadModule {}

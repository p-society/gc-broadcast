import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SquadController } from './squad.controller';
import { SquadService } from './squad.service';
import { Squad, SquadSchema } from './schemas/squad.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Squad.name, schema: SquadSchema }]),
  ],
  controllers: [SquadController],
  providers: [SquadService],
  exports: [SquadService],
})
export class SquadModule {}

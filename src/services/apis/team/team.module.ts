import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { Teams, TeamsSchema } from './schemas/team.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Teams.name, schema: TeamsSchema }]),
  ],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}

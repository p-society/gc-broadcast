import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FootballController } from './football.controller';
import { FootballService } from './football.service';
import { Football, FootballSchema } from './schemas/football.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Football.name, schema: FootballSchema },
    ]),
  ],
  controllers: [FootballController],
  providers: [FootballService],
  exports: [FootballService],
})
export class FootballModule {}

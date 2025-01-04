import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FootballFormatController } from './format.controller';
import { MatchFormatService } from './format.service';
import { MatchFormat, MatchFormatSchema } from './format.schema';
import { AdminGuard } from '../admin.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MatchFormat.name, schema: MatchFormatSchema },
    ]),
  ],
  controllers: [FootballFormatController],
  providers: [MatchFormatService, AdminGuard],
  exports: [MatchFormatService],
})
export class FormatModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { Profiles, ProfilesSchema } from './schemas/profiles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Profiles.name, schema: ProfilesSchema },
    ]),
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService],
  exports: [ProfilesService],
})
export class ProfilesModule {}

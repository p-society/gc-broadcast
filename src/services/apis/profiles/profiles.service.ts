import { Injectable } from '@nestjs/common';
import { GlobalService } from 'src/common/global-service';
import { Profiles, ProfilesDocument } from './schemas/profiles.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProfilesService extends GlobalService<Profiles, ProfilesDocument> {
  constructor(
    @InjectModel(Profiles.name)
    private readonly profilesModel: Model<ProfilesDocument>,
  ) {
    super(profilesModel);
  }
}

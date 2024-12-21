import { Controller, Post } from '@nestjs/common';
import { ModifyBody, setCreatedBy } from 'src/decorators/ModifyBody.decorator';
import { ReactionService } from './reactions.service';
import { ReactionDto } from './dto/reactions.dto';
@Controller('reactions')
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) {}

  @Post()
  async create(@ModifyBody(setCreatedBy()) createReactionsDto: ReactionDto) {
    return await this.reactionService.enqueueReactions(createReactionsDto);
  }
}

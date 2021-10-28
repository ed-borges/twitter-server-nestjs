import { Controller, Get } from '@nestjs/common';
import { Comment } from '../entity/comment.entity';
import { CommentService } from '../services/comment.service';

@Controller('comments')
export class CommentController {
  constructor(private tweetService: CommentService) {}

  @Get()
  async findAll(): Promise<Comment[]> {
    return await this.tweetService.findAll();
  }
}

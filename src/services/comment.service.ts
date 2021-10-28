import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../entity/comment.entity';
import { CommentRepository } from '../repository/comment.repository';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private db: CommentRepository,
  ) {}

  findAll(): Promise<Comment[]> {
    return this.db.find({ relations: ['tweet'] });
  }

  create() {}
}

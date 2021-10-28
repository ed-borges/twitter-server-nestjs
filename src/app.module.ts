import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetRepository } from './repository/tweet.repository';
import { TweetController } from './controllers/tweet.controller';
import { CommentController } from './controllers/comment.controller';
import { TweetService } from './services/tweet.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommentRepository } from './repository/comment.repository';
import { ReactionRepository } from './repository/reaction.repository';
import { RetweetRepository } from './repository/retweet.repository';
import { CommentService } from './services/comment.service';
import { UserRepository } from './users/user.repository';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([
      TweetRepository,
      CommentRepository,
      UserRepository,
      ReactionRepository,
      RetweetRepository,
    ]),
  ],
  controllers: [TweetController, CommentController],
  providers: [TweetService, CommentService],
})
export class AppModule {}

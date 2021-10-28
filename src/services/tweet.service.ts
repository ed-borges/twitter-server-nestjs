import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from '../entity/tweet.entity';
import { TweetRepository } from '../repository/tweet.repository';
import { CreateTweetDto } from '../dto/create.tweet.dto';
import { UserRepository } from 'src/users/user.repository';
import { CreateCommentDto } from 'src/dto/create.comment.dto';
import { CommentRepository } from 'src/repository/comment.repository';
import { Comment } from 'src/entity/comment.entity';
import { RetweetRepository } from 'src/repository/retweet.repository';
import { ReactionRepository } from 'src/repository/reaction.repository';
import { Retweet } from 'src/entity/retweet.entity';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(TweetRepository)
    private db: TweetRepository,
    private dbUser: UserRepository,
    private dbComment: CommentRepository,
    private dbReaction: ReactionRepository,
    private dbRetweet: RetweetRepository,
  ) {}

  async findAll(): Promise<Tweet[]> {
    return await this.db.find({
      relations: ['comments', 'comments.user', 'reactions', 'user'],
    });
  }

  async findOne(id: number): Promise<Tweet> {
    return await this.db.findOne({ where: { id } });
  }

  async findAllComment(tweetId: number): Promise<Comment[]> {
    const tweet = await this.findOne(tweetId);
    return await this.dbComment.find({
      where: { tweet: tweet },
      relations: ['user'],
    });
  }

  async create(create: CreateTweetDto): Promise<Tweet> {
    const { post, userId } = create;
    const user = await this.dbUser.findOne({ where: { id: userId } });

    if (!user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const tweet: Tweet = await this.db.create({ user, post });
    await this.db.save(tweet);

    return tweet;
  }
  async createComment(create: CreateCommentDto): Promise<Comment> {
    const { content, userId, tweetId } = create;
    const user = await this.dbUser.findOne({ where: { id: userId } });
    const tweet = await this.db.findOne({ where: { id: tweetId } });

    if (!user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    if (!tweet) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const comment: Comment = await this.dbComment.create({
      user,
      tweet,
      content,
    });
    await this.dbComment.save(comment);

    return comment;
  }

  async deleteTweet(id) {
    await this.db.delete(id);
    // console.log(x);
  }

  async addLike(userId, tweetId): Promise<any> {
    const user = await this.dbUser.findOne({ where: { id: userId } });
    const tweet = await this.db.findOne({ where: { id: tweetId } });

    const like = await this.dbReaction.findOne({ where: { user, tweet } });

    if (like) {
      await this.dbReaction.delete(like.id);
      return { message: 'removido' };
    }
    const reaction = await this.dbReaction.create({ user, tweet });
    const x = await this.dbReaction.save(reaction);
    return { message: 'Adicionado!' };
  }

  async addRetweet(userId, tweetId): Promise<Retweet> {
    const user = await this.dbUser.findOne({ where: { id: userId } });
    const tweet = await this.db.findOne({ where: { id: tweetId } });

    const retweet = await this.dbRetweet.create({ user, tweet });
    await this.dbRetweet.save(retweet);

    return retweet;
  }

  async findAllRetweet(tweetId): Promise<Retweet[]> {
    const retweet = await this.findOne(tweetId);
    return await this.dbRetweet.find({
      where: { tweet: retweet },
      relations: ['user'],
    });
  }
}

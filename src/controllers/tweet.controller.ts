import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTweetDto } from 'src/dto/create.tweet.dto';
import { CreateCommentDto } from 'src/dto/create.comment.dto';
import { Tweet } from 'src/entity/tweet.entity';
import { TweetService } from '../services/tweet.service';
import { Comment } from 'src/entity/comment.entity';
import { Retweet } from 'src/entity/retweet.entity';

@Controller('post')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Tweet[]> {
    return await this.tweetService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() createTweetDto: CreateTweetDto,
  ): Promise<Tweet> {
    createTweetDto.userId = req.user.id;
    return await this.tweetService.create(createTweetDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:tweetId/comments')
  async createComment(
    @Request() req,
    @Param('tweetId') tweetId: number,
    @Body() createCommenttDto: CreateCommentDto,
  ): Promise<Comment> {
    createCommenttDto.userId = req.user.id;
    createCommenttDto.tweetId = tweetId;
    return await this.tweetService.createComment(createCommenttDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:tweetId/comments')
  async findAllComment(@Param('tweetId') tweetId: number): Promise<Comment[]> {
    return await this.tweetService.findAllComment(tweetId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:tweetId')
  async deleteTweet(@Param('tweetId') tweetId: number): Promise<void> {
    this.tweetService.deleteTweet(tweetId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:tweetId/like')
  async addLike(
    @Request() req,
    @Param('tweetId') tweetId: number,
  ): Promise<boolean> {
    return await this.tweetService.addLike(req.user.id, tweetId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:tweetId/retweet')
  async findAllretweet(
    @Request() req,
    @Param('tweetId') tweetId: number,
  ): Promise<Retweet[]> {
    return await this.tweetService.findAllRetweet(tweetId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:tweetId/retweet')
  async addretweet(
    @Request() req,
    @Param('tweetId') tweetId: number,
  ): Promise<Retweet> {
    return await this.tweetService.addRetweet(req.user.id, tweetId);
  }
}

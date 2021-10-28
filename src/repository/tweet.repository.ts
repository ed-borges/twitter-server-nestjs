import { EntityRepository, Repository } from 'typeorm';
import { Tweet } from '../entity/tweet.entity';

@EntityRepository(Tweet)
export class TweetRepository extends Repository<Tweet> {}

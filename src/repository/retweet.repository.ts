import { EntityRepository, Repository } from 'typeorm';
import { Retweet } from '../entity/retweet.entity';

@EntityRepository(Retweet)
export class RetweetRepository extends Repository<Retweet> {}

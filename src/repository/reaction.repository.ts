import { EntityRepository, Repository } from 'typeorm';
import { Reaction } from '../entity/reaction.entity';

@EntityRepository(Reaction)
export class ReactionRepository extends Repository<Reaction> {}

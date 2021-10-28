import { Tweet } from './tweet.entity';
import { User } from '../users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinTable,
} from 'typeorm';

@Entity('reaction')
export class Reaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reactions)
  @JoinTable()
  user: User;

  @ManyToOne(() => Tweet, (tweet) => tweet.reactions)
  @JoinTable()
  tweet: Tweet;

  @CreateDateColumn({ type: 'timestamp' })
  criacao_at: Date;
}

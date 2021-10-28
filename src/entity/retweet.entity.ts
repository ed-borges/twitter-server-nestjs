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

@Entity('retweet')
export class Retweet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.retweets)
  @JoinTable()
  user: User;

  @ManyToOne(() => Tweet, (tweet) => tweet.retweets)
  @JoinTable()
  tweet: Tweet;

  @CreateDateColumn({ type: 'timestamp' })
  criacao_at: Date;
}

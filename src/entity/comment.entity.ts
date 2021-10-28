import { Tweet } from './tweet.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @ManyToOne(() => User, (user) => user.tweets)
  user: User;

  @ManyToOne(() => Tweet, (tweet) => tweet.comments)
  @JoinColumn({ name: 'tweetId', referencedColumnName: 'id' })
  tweet: Tweet;

  @CreateDateColumn({ type: 'timestamp' })
  criacao_at: Date;
}

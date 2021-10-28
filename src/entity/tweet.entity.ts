import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Reaction } from './reaction.entity';
import { Retweet } from './retweet.entity';

@Entity('tweet')
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  post: string;

  @ManyToOne(() => User, (user) => user.tweets)
  @JoinTable()
  user: User;

  @OneToMany(() => Comment, (comment) => comment.tweet)
  @JoinTable()
  comments: Comment[];

  @OneToMany(() => Reaction, (reaction) => reaction.tweet)
  @JoinTable()
  reactions: Reaction[];

  @OneToMany(() => Retweet, (retweet) => retweet.tweet)
  @JoinTable()
  retweets: Retweet[];

  @CreateDateColumn({ type: 'timestamp' })
  criacao_at: Date;
}

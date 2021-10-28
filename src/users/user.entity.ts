import { Reaction } from '../entity/reaction.entity';
import { Tweet } from 'src/entity/tweet.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Comment } from '../entity/comment.entity';
import { Retweet } from 'src/entity/retweet.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 100 })
  password: string;

  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets: Tweet[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Reaction, (reaction) => reaction.user)
  reactions: Reaction[];

  @OneToMany(() => Retweet, (retweet) => retweet.user)
  retweets: Retweet[];

  //   @CreateDateColumn({ type: 'timestamp' })
  //   criacao_at: Date;
}

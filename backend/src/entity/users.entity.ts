import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './comments.entity';
import { Report } from './report_content.entity';
import { Review } from './reviews.entity';
import { Like } from './likes.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ comment: '비밀번호' })
  password!: string;

  @Column({ comment: '이메일', unique: true, nullable: false })
  email!: string;

  @Column({ comment: '닉네임', unique: true, nullable: false })
  nickname!: string;

  @Column({
    comment: '관리자, 일반 유저 구분',
    default: false,
  })
  isAdmin!: boolean;

  @Column({ type: 'int', comment: '정지된 횟수', default: 0 })
  suspensionCount!: number;

  @Column({ type: 'varchar', length: 50, default: '이용' })
  status!: string;

  @Column({ type: 'timestamp', nullable: true })
  banEndDate!: Date | null;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments!: Comment[];

  @OneToMany(() => Report, (report) => report.reporterUser)
  reportsMade!: Report[];

  @OneToMany(() => Report, (report) => report.reportedUser)
  reportsReceived!: Report[];

  @OneToMany(() => Review, (review) => review.user)
  reviews!: Review[];

  @OneToMany(() => Like, (like) => like.user)
  likes!: Like[];
}

import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity('report_content')
export class Report {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ comment: '신고 카테고리', type: 'varchar', length: 50 })
  reason!: string;

  @CreateDateColumn({ comment: '신고한 날짜' })
  reportedAt!: Date;

  @Column({
    comment: '처리 상태',
    type: 'varchar',
    length: 50,
    default: '대기',
  })
  status!: string;

  @Column({
    comment: '처리 결과',
    type: 'varchar',
    nullable: true,
    default: null,
  })
  result!: string | null;

  @UpdateDateColumn({ comment: '처리한 날짜', nullable: true, default: null })
  handledAt!: Date | null;

  @Column({ comment: '허위 신고 여부', type: 'boolean', default: false })
  isFalseReport!: boolean;

  @ManyToOne(() => User, (user) => user.reportsMade)
  @JoinColumn({ name: 'reporter_user_id' })
  reporterUser!: User;

  @ManyToOne(() => User, (user) => user.reportsReceived)
  @JoinColumn({ name: 'reported_user_id' })
  reportedUser!: User;
}

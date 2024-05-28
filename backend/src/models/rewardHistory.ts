import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class RewardHistory {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn()
    date!: Date;

    @Column()
    points!: number;

    @ManyToOne(() => User, (user) => user.givenRewards)
    givenBy!: User;

    @ManyToOne(() => User, (user) => user.receivedRewards)
    givenTo!: User;
}

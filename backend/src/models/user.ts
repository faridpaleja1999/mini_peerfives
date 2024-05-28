import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RewardHistory } from "./rewardHistory";

@Entity()
export class User{
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column("varchar", { length: 255 })
  name!: string;

  @Column({ default: 100 })
  p5Balance!: number;

  @Column({ default: 0 })
  rewardsBalance!: number;

  @OneToMany(() => RewardHistory, (rewardHistory) => rewardHistory.givenBy)
  givenRewards!: RewardHistory[];

  @OneToMany(() => RewardHistory, (rewardHistory) => rewardHistory.givenTo)
  receivedRewards!: RewardHistory[];
}

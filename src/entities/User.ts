import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { UserStatus } from './types/enums';
import { Group } from './Group';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false})
  name: string;

  @Column({ nullable: false})
  email: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.PENDING
  })
  status: UserStatus;

  @ManyToMany(() => Group, group => group.users)
  @JoinTable()
  groups: Group[];
}
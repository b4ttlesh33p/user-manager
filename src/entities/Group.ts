import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { GroupStatus } from './types/enums';
import { User } from './User';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: GroupStatus,
    default: GroupStatus.EMPTY
  })
  status: GroupStatus;

  @ManyToMany(() => User, user => user.groups)
  users: User[];
}
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn()
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: false })
  isAdmin: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}

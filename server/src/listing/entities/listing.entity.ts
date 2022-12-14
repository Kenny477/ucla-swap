import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { File } from '../../file/entities/file.entity';

@Entity()
export class Listing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('longtext')
  description: string;

  @Column({
    default: 0,
  })
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({
    default: '',
  })
  category: string;

  @Column({
    default: 0,
  })
  condition: number;

  @ManyToOne(() => User, (user) => user.listings)
  user: User;

  @OneToMany(() => File, (file) => file.listing)
  files: File[];

  @ManyToMany(() => User, (user) => user.likedListings)
  @JoinTable()
  userLikes: User[];
}

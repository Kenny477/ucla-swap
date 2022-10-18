import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Listing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('longtext')
  description: string;

  @Column(
    {
      default: 0,
    }
  )
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @Column({
    default: '',
  })
  category: string;

  @ManyToOne(() => User, (user) => user.listings)
  user: User;

  // @Column()
  // images: string[];
}

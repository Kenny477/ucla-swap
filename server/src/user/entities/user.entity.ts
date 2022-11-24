import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Listing } from '../../listing/entities/listing.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    default: false,
  })
  emailVerified: boolean;

  @Column({
    default: null,
  })
  verificationToken: string;

  @Column({
    default: null,
  })
  verificationTokenExpires: Date;

  @Column({
    default: null,
  })
  resetToken: string;

  @Column({
    default: null,
  })
  resetTokenExpires: Date;

  @OneToMany(() => Listing, (listing) => listing.user)
  listings: Listing[];

  @ManyToMany(() => Listing, (listing) => listing.userLikes)
  likedListings: Listing[];
}

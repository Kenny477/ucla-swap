import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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

  @OneToMany(() => Listing, (listing) => listing.user)
  listings: Listing[];
}

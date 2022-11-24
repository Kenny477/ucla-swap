import { Listing } from 'src/listing/entities/listing.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Listing, (listing) => listing.files)
  listing: Listing;
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { DeepPartial, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Listing } from './listing.entity';

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(Listing)
    private listingRepository: Repository<Listing>,
    private userService: UserService,
  ) {}

  findAll(): Promise<Listing[]> {
    return this.listingRepository.find();
  }

  findById(id: string): Promise<Listing> {
    return this.listingRepository.findOneBy({ id });
  }

  async createForUser(id: string, listing: DeepPartial<Listing>): Promise<Listing> {
    const user = await this.userService.findById(id);
    const listingWithUser = { ...listing, user };
    return this.listingRepository.save(listingWithUser);
  }

}

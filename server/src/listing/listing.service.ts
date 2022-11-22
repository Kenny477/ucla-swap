import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateListingDto } from './dto/create-listing.dto';
import { Listing } from './entities/listing.entity';

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(Listing)
    private listingRepository: Repository<Listing>,
    private userService: UserService,
  ) { }

  findAll(): Promise<Listing[]> {
    return this.listingRepository.find({ relations: ['files'] });
  }

  findById(id: string): Promise<Listing> {
    return this.listingRepository.findOne({ where: { id }, relations: ['files'] });
  }

  async findListingImage(id: string, imageId: string): Promise<string> {
    const listing = await this.findById(id);
    const file = listing.files.find((file) => file.id === imageId);
    return file.filename;
  }

  async createForUser(id: string, listing: CreateListingDto): Promise<Listing> {
    const user = await this.userService.findById(id);
    const listingWithUser = { ...listing, user };
    return this.listingRepository.save(listingWithUser);
  }
}

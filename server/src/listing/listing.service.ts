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
    return this.listingRepository.findOne({ where: { id }, relations: ['files', 'user'] });
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

  async likeListing(userId: string, listingId: string): Promise<boolean> {
    const listing = await this.listingRepository.findOne({ where: { id: listingId }, relations: ['userLikes'] });
    if (listing.userLikes.find((user) => user.id === userId)) {
      listing.userLikes = listing.userLikes.filter((user) => user.id !== userId);
      this.listingRepository.save(listing);
      return false;
    }
    const user = await this.userService.findById(userId);
    listing.userLikes.push(user);
    this.listingRepository.save(listing);
    return true;
  }

  async getLiked(userId: string, listingId: string): Promise<boolean> {
    const listing = await this.listingRepository.findOne({ where: { id: listingId }, relations: ['userLikes'] });
    console.log(listing);
    return listing.userLikes.some((user) => user.id === userId);
  }
}

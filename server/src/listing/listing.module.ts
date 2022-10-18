import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './listing.entity';
import { ListingService } from './listing.service';
import { ListingController } from './listing.controller';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Listing]), UserModule],
  providers: [ListingService],
  exports: [ListingService],
  controllers: [ListingController],
})
export class ListingModule {}

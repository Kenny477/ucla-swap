import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { ListingService } from './listing.service';
import { ListingController } from './listing.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Listing]), UserModule],
  providers: [ListingService],
  exports: [ListingService],
  controllers: [ListingController],
})
export class ListingModule {}

import { Listing } from './listing';

export type User = {
  id: string;
  email: string;
  listings: Listing[];
  likedListings: Listing[];
}
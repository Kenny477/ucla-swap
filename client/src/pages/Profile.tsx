import axios from 'axios';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { BsPersonCircle } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import ListingPreview from '../components/Listing/ListingPreview';
import { User } from '../types';

// Shown upon clicking "Profile"
// No image-setting function, default profile photo for now
function Profile() {
  const [user, setUser] = useState<User>({} as User);
  const [feedType, setFeedType] = useState<'listings' | 'favorites'>('listings');
  const [cookies, setCookie] = useCookies(['access_token']);
  const [self, setSelf] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    setSelf(id ? getUserId() === id : true);
  }, [id]);

  function getUserId(): string {
    const decoded = jwt_decode<JwtPayload>(cookies.access_token);
    return decoded.sub as string;
  }

  useEffect(() => {
    const url = `/api/user/profile/${id ? id : getUserId()}`;
    const res = axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.access_token}`,
      },
    }).then(
      (res) => {
        console.log(res.data);
        setUser(res.data);
      }
    )
  }, [id])

  return (
    <div className="grid grid-cols-4 pt-10">
      <div className="col-span-1 flex flex-col justify-center items-center px-10 space-y-10">
        <BsPersonCircle className="h-24 w-24 aspect-square text-primary_darkest"/>
        <p className="text-xl font-semibold">{user.email}</p>
      </div>
      <div className="col-span-3 px-10 flex flex-col space-y-10">
        <div className="flex flex-row space-x-4">
          <h1 className={`text-3xl font-bold cursor-pointer ${feedType === 'listings' ? 'border-b-4 border-primary' : ''}`} onClick={() => setFeedType('listings')}>Listings</h1>
          {self && (
            <h1 className={`text-3xl font-bold cursor-pointer ${feedType === 'favorites' ? 'border-b-4 border-primary' : ''}`} onClick={() => setFeedType('favorites')}>Favorites</h1>
          )}
        </div>
        <div className="grid grid-cols-3 h-[75vh] overflow-y-scroll">
          {feedType === 'listings' && user.listings && user.listings.map((listing) => (
            <ListingPreview key={listing.id} listing={listing} />
          ))}
          {feedType === 'favorites' && user.likedListings && user.likedListings.map((listing) => (
            <ListingPreview key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { User } from '../types';
import ListingPreview from '../components/ListingPreview';

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
      <div className="col-span-1 px-10">
        {user.email}
      </div>
      <div className="col-span-3 px-10 flex flex-col ">
        <div className="flex flex-row space-x-4">
          <h1 className={`text-xl cursor-pointer ${feedType === 'listings' ? '' : ''}`} onClick={() => setFeedType('listings')}>Listings</h1>
          {self && (
            <h1 className={`text-xl cursor-pointer ${feedType === 'favorites' ? '' : ''}`} onClick={() => setFeedType('favorites')}>Favorites</h1>
          )}
        </div>
        <div className="grid grid-cols-3">
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
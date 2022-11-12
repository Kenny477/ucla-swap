import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';

function Profile() {
  const [user, setUser] = useState(null);
  const [cookies, setCookie] = useCookies(['access_token']);

  useEffect(() => {
    const url = '/api/user/profile';
    const res = axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.access_token}`,
      },
    }).then(
      (res) => {
        setUser(res.data);
      }
    )
  })

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-3 row-span-1 flex justify-center">
        <h1 className="text-xl">Profile</h1>
      </div>
      <div className="col-span-1">
        {JSON.stringify(user)}
      </div>
      <div className="col-span-2">

      </div>
    </div>
  )
}

export default Profile
import React, { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import AboutUs from "./pages/AboutUs/About"
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NavLayout from "./layouts/NavLayout";
import CheckEmail from "./pages/CheckEmail";
import EmailNotVerified from "./pages/EmailNotVerified";
import EmailVerified from "./pages/EmailVerified";
import NewListing from "./pages/NewListing";
import Listing from "./pages/Listing";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from './pages/NotFound';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.access_token) {
      const decoded = jwt_decode<JwtPayload>(cookies.access_token);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        removeCookie('access_token');
        navigate('/login');
        setAuthenticated(false);
      }
      else {
        setAuthenticated(true);
      }
    }
    else {
      setAuthenticated(false);
    }
  }, [cookies.access_token]);

  return (
    <Routes>
      <Route path="/" element={<NavLayout authenticated={authenticated} />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {
          authenticated && (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/listing/:id" element={<Listing />} />
              <Route path="/new-listing" element={<NewListing />} />
            </>
          )
        }
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/email-verified"
          element={<EmailVerified />}
        />
        <Route
          path="/email-not-verified"
          element={<EmailNotVerified />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
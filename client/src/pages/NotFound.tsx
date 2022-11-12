import React from 'react'
import { useLocation } from 'react-router-dom';

function NotFound() {
  const location = useLocation();

  const path = location.pathname;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl">path {path} not found</p>
    </div>
  )
}

export default NotFound
import React from 'react'
import { NavLink } from 'react-router-dom'

function Nav() {
  return (
    <div className="flex flex-row justify-between items-center h-20 px-20 bg-primary text-white">
      <NavLink to="/" className="text-xl font-bold">UCLA Swap</NavLink>
      <div className="flex flex-row space-x-4 text-lg">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Signup</NavLink>
        <NavLink to="/feed">Feed</NavLink>
      </div>
    </div>
  )
}

export default Nav
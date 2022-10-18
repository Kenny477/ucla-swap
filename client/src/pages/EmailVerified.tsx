import React from 'react'
import { NavLink } from 'react-router-dom'

function EmailVerified() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8">
			<h1 className="text-xl">Email Verified</h1>
			<p>You may now login.</p>
      <NavLink to="/login" className="bg-primary text-white rounded-lg px-4">
        Login
      </NavLink>
    </div>
  )
}

export default EmailVerified
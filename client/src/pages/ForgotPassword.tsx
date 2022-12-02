import axios from 'axios'
import { useState } from 'react'

// Shown upon clicking "Forgot Password?" on the login screen
function ForgotPassword() {

  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  async function handleResetEmail() {
    const url = '/api/auth/forgot-password'
    const body = { email }
    const res = await axios.post(url, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }).then(res => {
      if (res.status === 200) {
        setMessage("An email has been sent to the provided address with instructions on how to reset your password.")
      }
    });
  }

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="flex flex-col items-center space-y-4 w-1/2">
        <h1 className="text-lg">Reset Password</h1>
        <p>Please input your email below. If an account exists with the email, a reset link will be sent to the account.</p>
        <input type="text" placeholder="email" className="focus:outline-0 focus:border-black border-b w-full"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="button" className="bg-primary text-white rounded-lg p-4" onClick={handleResetEmail}>Send Email</button>
      </div>
    </div>
  )
}

export default ForgotPassword
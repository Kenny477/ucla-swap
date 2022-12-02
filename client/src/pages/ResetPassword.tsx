import axios from 'axios';
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';

// Shown upon following the instructions sent after "Forgot Password?" completion
function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  async function handleResetPassword() {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    }
    else {
      const url = '/api/auth/reset-password'
      const body = { password, token }
      const res = await axios.post(url, body, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }).then(res => {
        if (res.status === 200) {
          navigate('/login')
        }
      }).catch(err => {
        if (err.response.status === 400) {
          setError(err.response.data.message)
        }
      });
    }

  }

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="flex flex-col items-center space-y-4 w-1/2">
        <h1 className="text-lg">Reset Password</h1>
        <input type="password" placeholder="password" className="focus:outline-0 focus:border-black border-b w-full"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="confirm password" className="focus:outline-0 focus:border-black border-b w-full"
          value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button type="button" className="bg-primary text-white rounded-lg p-4" onClick={handleResetPassword}>Reset Password</button>
        <p className="text-red-600">{error}</p>
      </div>
    </div>
  )
}

export default ResetPassword
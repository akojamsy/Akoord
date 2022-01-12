import React, { useState } from 'react'
import { Button } from '@mui/material'
import { provider, auth } from './firebase'
import { signInWithPopup } from 'firebase/auth'
import './login.css'

function Login() {
  const [error, setError] = useState([])
  const signIn = () => {
    signInWithPopup(auth, provider).catch((error) => setError(error.message))
  }
  return (
    <div className="login">
      <h1>Akoord</h1>
      {error.length ? <span className="errorMessage">{error}</span> : ''}
      <Button onClick={signIn}>Sign In</Button>
    </div>
  )
}

export default Login

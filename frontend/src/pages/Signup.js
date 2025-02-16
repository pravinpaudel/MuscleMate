import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [conPassword, setconPassword] = useState('')
    const { signup,  error, setError, isLoading } = useSignup()
    
    async function handleSubmit(e) {
        e.preventDefault()

        if(password !== conPassword){ 
            setError("Passwords don't match")
            return
        }
            
        await signup(email, password)
    }

  return (
   <form className='signup' onSubmit={handleSubmit}>
    <h3>Sign Up</h3>
    <label>Email</label>
    <input 
    type="text"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    />

<label>Password</label>
    <input 
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    />

<label>Confirm Password</label>
    <input 
    type="password"
    value={conPassword}
    onChange={(e) => setconPassword(e.target.value)}
    />
    
    <button disabled={isLoading}>Sign up</button>
    {error && <div className='error'>{error}</div>}
   </form>
  )
}

export default Signup

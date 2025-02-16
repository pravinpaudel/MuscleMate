import React from 'react'
import { Link } from 'react-router-dom'
import { useLogOut } from '../hooks/useLogOut'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logOut } = useLogOut()
  const { user } = useAuthContext()


  function handleClick() {
    logOut()
  }

  return (
    <header>
      <div className='container'>
        <Link to='/'>
          <h1>MuscleMate</h1>
        </Link>

        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar

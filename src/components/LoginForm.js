import React, { useState } from 'react'
import loginServices from '../services/login'
import blogServices from '../services/blogs'
import Notification from './Notification'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState({ msg:'', err: false })



  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginServices.login({
        username, password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setUser(user)
      blogServices.setToken(user.token)

      setUsername('')
      setPassword('')
    } catch (err) {
      if(!username && !password){
        setMessage({ msg:'Please Enter username and password!', err: true })
      }else{
        setMessage({ msg:'wrong username or password!', err: true })
      }
    }

    setTimeout(() => setMessage({ msg:'', err:false }), 5000)
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <Notification message={message} />
      <div>
            username
        <input
          type="text"
          value={username}
          id="username"
          name="Username"
          onChange={ ({ target }) => setUsername(target.value) }
        />
      </div>
      <div>
            password
        <input
          type="password"
          value={password}
          id="password"
          name="password"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </div>
      <button type="submit"> login </button>
    </form>
  )
}

export default LoginForm

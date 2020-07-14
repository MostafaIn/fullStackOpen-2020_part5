import React, { useState, useEffect } from 'react'
import './App.css'
import Blog from './components/Blog'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      }) 
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      setErrMsg('Wrong credentials!')
      setTimeout(() => setErrMsg(null), 5000)
    }
  }

  console.log(user)
  
  if(user === null){
    return (
      <form onSubmit={handleLogin}>
        <h2>log in to application</h2>
        <Notification message={errMsg} />
          <div>
            username
            <input 
              type="text"
              value={username}
              name="Username"
              onChange={ ({ target }) => setUsername(target.value) }
            />
          </div>
          <div>
            password
            <input 
              type="password"
              value={password}
              name="password"
              onChange={ ({ target }) => setPassword(target.value) }
            />
          </div>
          <button type="submit"> login </button>
        </form>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.username} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
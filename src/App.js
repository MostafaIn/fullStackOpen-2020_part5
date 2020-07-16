import React, { useState, useEffect } from 'react'
import './App.css'

import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
    )  

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      
      setUser(user)
      blogService.setToken(user.token)

    }
  }, [])

  console.log(user)

  return (
    <div>
      {(user === null)
        ?
        <LoginForm 
          setUser={setUser}
        />
        :
        <Blogs
          user={user}
          setUser={setUser}
          blogs={blogs}
          setBlogs={setBlogs}
        />
      }
    </div>
  )
}

export default App
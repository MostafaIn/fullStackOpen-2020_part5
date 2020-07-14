import React,{ useState } from 'react'
import AddBlog from './AddBlog'
import Blog from './Blog'
import Notification from './Notification'

const Blogs = ({setUser, user, setBlogs, blogs}) => {
    const [message, setMessage] = useState({msg:'', err: false})

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
    }

    return (
        <div>
           <h2>blogs</h2>
           <Notification message={message} />
            <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      
            <AddBlog 
                setBlogs={setBlogs}
                blogs={blogs}
                setMessage={setMessage}
            />
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )} 
        </div>
    )
}

export default Blogs

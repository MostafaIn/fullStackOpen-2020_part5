import React from 'react'
import AddBlog from './AddBlog'
import Blog from './Blog'

const Blogs = ({setUser, user, setBlogs, blogs}) => {

    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
    }

    return (
        <div>
           <h2>blogs</h2>
            <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      
            <AddBlog 
                setBlogs={setBlogs}
                blogs={blogs}
            />
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )} 
        </div>
    )
}

export default Blogs

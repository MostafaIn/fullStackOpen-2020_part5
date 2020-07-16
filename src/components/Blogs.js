import React,{ useState, useRef } from 'react'
import AddBlog from './AddBlog'
import Blog from './Blog'
import Notification from './Notification'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blogs = ({setUser, user, setBlogs, blogs}) => {
    const [message, setMessage] = useState({msg:'', err: false})

    const blogFormRef = useRef()
    
    const handleLogout = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
    }

    const handleAddBlog = async (newBlog) => {
        try {
            await blogService.createBlog(newBlog)
            await setBlogs([...blogs, newBlog])
            setMessage({msg:`a new blog ${newBlog.title} by ${newBlog.author} added!`, err: false})
            blogFormRef.current.toggleVisibility()
        } catch (error) {
            setMessage({msg:'Please Enter new blog values!', err: true})   
        }
        setTimeout(() => setMessage({msg:'', err: false}), 5000);
    }

    const handleLike = async (currBlog) => {
        const updated =  await blogService.updateBlog(currBlog)
        await setBlogs(blogs.map( blog => blog.id === currBlog.id ? updated : blog))
       }

    const handleDelete = async (targetBlog) => {
        if(window.confirm(`Remove blog ${targetBlog.title} by ${targetBlog.author}!`)){
            await blogService.deleteBlog(targetBlog)
            await setBlogs(blogs.filter( blog => blog.id !== targetBlog.id)) 
        }
    }

    return (
        <div>
           <h2>blogs</h2>
           <Notification message={message} />
            <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
            <Togglable btnLabel="new blog" ref={blogFormRef}>
            <AddBlog 
                handleSubmit={handleAddBlog}
            />
            </Togglable>
            {blogs.map(blog =>
                <Blog 
                    key={blog.id} 
                    blog={blog} 
                    handleLike={handleLike} 
                    user={user}
                    handleDelete={handleDelete}
                />
            )} 
        </div>
    )
}

export default Blogs

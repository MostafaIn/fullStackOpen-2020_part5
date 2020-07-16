import React,{ useState } from 'react'


const Blog = ({ blog, handleLike }) => {
  const [visible, setVisible] = useState(false)
  
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
    {blog.title} {blog.author} 
    <button onClick={toggleVisibility}> {!visible ? 'view' : 'hide'} </button>
    {visible &&
      <div>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={() => handleLike(blog)}>like</button></p>
        <p>{blog.author}</p>
      </div>
    }
    </div>
  )
}


export default Blog

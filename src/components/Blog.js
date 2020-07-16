/* eslint-disable linebreak-style */
import React,{ useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, handleLike, user, handleDelete }) => {
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
        {(blog.user.username === user.username) &&
        <button style={{ color:'red' }} onClick={() => handleDelete(blog)}>remove</button>
        }
      </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog

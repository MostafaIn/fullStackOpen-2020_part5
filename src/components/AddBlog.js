import React, { useState } from 'react'
import blogService from '../services/blogs'

const AddBlog = ({setBlogs, blogs, setMessage}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] =useState('')

    const handleAddBlog = async (e) => {
        e.preventDefault()
    
        try {
            const newBlog = {
                title: title,
                author: author,
                url: url
              }
             await blogService.createBlog(newBlog)
             await setBlogs([...blogs, newBlog])
             setMessage({msg:`a new blog ${title} by ${author} added!`, err: false})
             setTitle('')
             setAuthor('')
             setUrl('')
            } catch (error) {
                setMessage({msg:'Please Enter new blog values!', err: true})
            }
            setTimeout(() => setMessage({msg:'', err: false}), 5000);
      }

    return (
        <form onSubmit={handleAddBlog}>
          <h3>create new blog</h3>
          <table>
            <tbody>
            <tr>
              <td>title :</td>
              <td>
                <input 
                type="text"
                value={title}
                name="title"
                onChange={ ({ target }) => setTitle(target.value) }
                />
              </td>
            </tr>
            <tr>
              <td>author :</td>
              <td>
                <input 
                type="text"
                value={author}
                name="author"
                onChange={ ({ target }) => setAuthor(target.value) }
                />
              </td>
            </tr>
            <tr>
              <td>url :</td>
              <td>
                <input 
                type="text"
                value={url}
                name="url"
                onChange={ ({ target }) => setUrl(target.value) }
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td><button type="submit">create</button></td>
            </tr>
            </tbody>
          </table>
          
        </form>
    )
}

export default AddBlog

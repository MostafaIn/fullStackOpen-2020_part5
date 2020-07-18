import React, { useState } from 'react'

const AddBlog = ({ handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] =useState('')

  const handleAddBlog = async (e) => {
    e.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    await handleSubmit(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')

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
                id="title"
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
                id="author"
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
                id="url"
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

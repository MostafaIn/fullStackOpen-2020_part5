import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/Blog'

describe('displaying a blog renders', () => {

  test('just the blogs title & author', () => {
    const blog = {
      title:'This is just a test',
      author:'mostafa'
    }

    const component = render(
      <Blog blog={blog} />
    )

    const div = component.container.querySelector('.blog-title')
    expect(div).toHaveTextContent(
      'This is just a test'
    )
  })
})

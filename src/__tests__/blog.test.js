import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

describe('displaying a blog renders', () => {
  let component
  let mockLikeHandler
  const blog = {
    'likes': 127,
    'user': {
      'name': 'Mostafa Hazareh',
      'username': 'Mosi',
      'id': '5f09cb39a66d0722b282461e'
    },
    'title': 'My Exercise with Exercise During Lockdown',
    'author': 'Lizzie Speller',
    'url': 'https://https://www.studentmindsblog.co.uk/',
    'id': '5f09df19471f592b75ff5081'
  }
  const user = {
    'name': 'Mostafa Hazareh',
    'username': 'Mosi',
    'id': '5f09cb39a66d0722b282461e'
  }

  beforeEach(() => {
    mockLikeHandler = jest.fn()

    component = render(
      <Blog blog={blog} user={user} handleLike={mockLikeHandler} />
    )
  })

  test('just the blogs title & author', () => {

    const div = component.container.querySelector('.blog-title')
    expect(div).toHaveTextContent(
      'My Exercise with Exercise During Lockdown'
    )
  })

  test('checks that blogs url and number of likes are shown when the button controlling the shown details has been clicked', () => {

    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.blog-details')
    const urlElement = div.firstChild
    expect(urlElement).toHaveTextContent(
      'https://https://www.studentmindsblog.co.uk/'
    )

    const likes = urlElement.nextSibling
    expect(likes).toHaveTextContent(127)
  })

  test('if the like button is clicked twice',() => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const likeBtn = component.getByText('like')
    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })
})

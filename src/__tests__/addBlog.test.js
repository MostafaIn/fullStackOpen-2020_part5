import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AddBlog from '../components/AddBlog'

describe('test for the new blog form', () => {
  let component
  let mockHandleSubmit

  beforeEach(() => {
    mockHandleSubmit = jest.fn()

    component = render(
      <AddBlog handleSubmit={mockHandleSubmit} />
    )
  })

  test('check the form submit handler when a new blog is called',() => {

    const form = component.container.querySelector('form')
    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')

    fireEvent.change(titleInput, {
      target: { value: 'This is Blogs title.' }
    })

    fireEvent.change(authorInput, {
      target: { value: 'Mostafa Hazareh' }
    })

    fireEvent.change(urlInput, {
      target: { value: 'https://mostafa.io' }
    })

    fireEvent.submit(form)

    expect(mockHandleSubmit.mock.calls).toHaveLength(1)

    expect(mockHandleSubmit.mock.calls[0][0].title).toBe('This is Blogs title.')
    expect(mockHandleSubmit.mock.calls[0][0].author).toBe('Mostafa Hazareh')
    expect(mockHandleSubmit.mock.calls[0][0].url).toBe('https://mostafa.io')
  })
})

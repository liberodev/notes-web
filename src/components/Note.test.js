import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'This is a test',
    important: true
  }

  const component = render(<Note note={note} />)

  // Muestra lo que se está renderizando
  // component.debug()

  // Una manera de mostrar una lista, bien pintada.
  // const li = component.container.querySelector('li')
  // console.log(prettyDOM(li))
  component.getByText('This is a test')
  component.getByText('make not important')
  // expect(component.container).toHaveTextContent(note.content)
})


test('clicking the button calls event handler once', () => {
  const note = {
    content: 'This is a test clicking the button calls event handler once',
    important: true
  }

  const mockHandler = jest.fn()

  const component = render(<Note note={note} toggleImportance={mockHandler} />)

  const button = component.getByText('make not important')
  fireEvent.click(button)

  // Recuperaría la misma información, que es el número de veces que se ha llamado
  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler).toHaveBeenCalledTimes(1)
})

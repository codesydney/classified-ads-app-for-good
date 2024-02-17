import React from 'react'
import { render, screen } from '@testing-library/react'
import HelloWorld from './HelloWorld'

describe('HelloWorld', () => {
  test('renders HelloWorld component', () => {
    render(<HelloWorld />)
    expect(screen.getByText('Hello, World!')).toBeInTheDocument()
  })
})

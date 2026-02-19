import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import Header from './Header'

describe('Header UI', () => {
  test('renders main navigation link', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: 'Main' })).toBeTruthy()
  })

  test('handles click on Game link', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const gameLink = screen.getByRole('link', { name: 'Game' })
    fireEvent.click(gameLink)

    expect(gameLink.getAttribute('href')).toBe('/game')
  })
})

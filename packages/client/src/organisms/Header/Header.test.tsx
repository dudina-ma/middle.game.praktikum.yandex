import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import Header from './Header'
import { RoutesEnum } from '../../paths'

describe('Header UI', () => {
  test('renders main navigation link', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: 'Главная' })).toBeTruthy()
  })

  test('handles click on Game link', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const gameLink = screen.getByRole('link', { name: 'Игра' })
    fireEvent.click(gameLink)
    expect(gameLink.getAttribute('href')).toBe(RoutesEnum.Game)
  })
})

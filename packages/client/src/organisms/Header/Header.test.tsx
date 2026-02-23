import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import Header from './Header'
import { RoutesEnum } from '../../paths'

const mockedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}))

describe('Header UI', () => {
  test('renders main navigation link', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(screen.getByRole('menuitem', { name: 'Главная' })).toBeTruthy()
  })

  test('handles click on Game link', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    const gameLink = screen.getByRole('menuitem', { name: 'Игра' })
    fireEvent.click(gameLink)
    expect(mockedNavigate).toHaveBeenCalledWith(RoutesEnum.Game)
  })
})

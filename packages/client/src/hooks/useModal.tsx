import { useState } from 'react'

export const useModal = (state: boolean) => {
  const [isOpen, setIsOpen] = useState(state)

  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)

  return { isOpen, close, open }
}

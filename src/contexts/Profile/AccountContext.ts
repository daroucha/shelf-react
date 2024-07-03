import { createContext, useContext } from 'react'

const initialState = {
  name: '',
  email: '',
  bio: '',
  location: '',
  picture: '',
  setName: () => {},
  setPicture: () => {},
}

interface AccountContextModel {
  name: string
  email: string
  bio?: string
  location?: string
  picture?: string
  setName: (name: string) => void
  setPicture: (picture: string) => void
}

const AccountContext =
  createContext<AccountContextModel>(initialState)

export const useAccountContext = () => {
  const context = useContext(AccountContext)

  if (!context) {
    throw new Error(
      `This data cannot be rendered outside the Account page`
    )
  }

  return context
}

export default AccountContext

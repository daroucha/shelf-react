import { createContext, useContext } from 'react'

const initialState = {
  sent: false,
  setSent: () => {},
}

interface ForgotPasswordContextModel {
  sent: boolean
  setSent: (sent: boolean) => void
}

const ForgotPasswordContext =
  createContext<ForgotPasswordContextModel>(initialState)

export const useForgotPasswordContext = () => {
  const context = useContext(ForgotPasswordContext)

  if (!context) {
    throw new Error(
      `This data cannot be rendered outside the ForgotPassword page`
    )
  }

  return context
}

export default ForgotPasswordContext

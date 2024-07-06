import { SignUpType } from '../types/Auth'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import type { UserCredential } from 'firebase/auth'
import { signUpUser } from '../services/auth'

export function useSignUp() {
  const navigate = useNavigate()

  const { mutate: signUp, isPending } = useMutation({
    mutationFn: ({ name, email, password }: SignUpType) =>
      signUpUser(name, email, password),
    onSuccess: async (user: UserCredential) => {
      const token = await user.user.getIdToken()

      sessionStorage.setItem('token', token)

      navigate('/collections/me', { replace: true })
    },
  })

  return { signUp, isPending }
}

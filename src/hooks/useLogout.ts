import { auth } from '../services/firebase'
import { signOut } from 'firebase/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export function useLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: logout, isPending } = useMutation({
    mutationFn: async () => {
      await signOut(auth)

      sessionStorage.removeItem('token')
    },
    onSuccess: () => {
      queryClient.removeQueries()
      navigate('/login', { replace: true })
    },
  })

  return { logout, isPending }
}

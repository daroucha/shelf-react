import { getCurrentUser } from '../services/auth'
import { useQuery } from '@tanstack/react-query'
import type UserType from '../types/User'

interface UserQueryType {
  isLoading: boolean
  data: UserType | undefined
}

export function useUser() {
  const { isLoading, data: user }: UserQueryType = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  })

  return {
    isLoading,
    user,
    isAuthenticated: !!user,
  }
}

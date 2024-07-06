import { useNavigate } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'
import { useEffect } from 'react'
import RouteLoading from './RouteLoading'

interface PropsRouteGuard {
  children: React.ReactNode
}

function RouteGuard({ children }: PropsRouteGuard) {
  const navigate = useNavigate()

  const { isAuthenticated, isLoading } = useUser()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/login')
    }
  }, [isAuthenticated, isLoading, navigate])

  if (isLoading) {
    return <RouteLoading />
  }

  if (isAuthenticated) {
    return children
  }
}

export default RouteGuard

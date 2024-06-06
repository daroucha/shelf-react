import { NavLink } from 'remaster-ui'
import { useUser } from '../hooks/useUser'
import { useLogout } from '../hooks/useLogout'

function Explore() {
  const { user, isAuthenticated, isLoading } = useUser()
  const { logout } = useLogout()

  return (
    <main>
      <h1>Explorar</h1>

      {isAuthenticated && (
        <NavLink size="medium" onClick={logout}>
          Sair
        </NavLink>
      )}

      <hr />

      {!isLoading && <code>{JSON.stringify(user)}</code>}
    </main>
  )
}

export default Explore

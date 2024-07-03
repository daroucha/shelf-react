import { useUser } from '../../hooks/useUser'
import {
  ActionButton,
  Avatar,
  Collection,
  Dropdown,
  Header,
  NavigationLink,
} from 'remaster-ui'
import {
  Compass,
  Heart,
  SignOut,
  UserCircle,
} from '@phosphor-icons/react'
import { useLogout } from '../../hooks/useLogout'
import { useNavigate } from 'react-router-dom'

function AppHeader() {
  const { isAuthenticated, user } = useUser()
  const { logout } = useLogout()

  const navigate = useNavigate()

  return (
    <Header logo="Shelf">
      {isAuthenticated && (
        <NavigationLink
          text="Minha coleção"
          size="medium"
          leading={<Collection />}
          onClick={() => navigate('/collections/me')}
        />
      )}

      <NavigationLink
        text="Explorar"
        size="medium"
        leading={<Compass />}
        onClick={() => navigate('/explore')}
      />

      {isAuthenticated && user && (
        <>
          <NavigationLink
            text="Minha lista"
            size="medium"
            leading={<Heart />}
            onClick={() => navigate('/favorites')}
          />

          <Dropdown>
            <Dropdown.Button
              text={user.name}
              leading={<Avatar text={user.name} src={user.picture} />}
              size="medium"
            />

            <Dropdown.Menu>
              <Dropdown.Item
                title="Perfil"
                size="medium"
                leading={<UserCircle />}
                onClick={() => navigate('/profile/account')}
              />

              <Dropdown.Item
                title="Sair"
                size="medium"
                leading={<SignOut />}
                onClick={logout}
              />
            </Dropdown.Menu>
          </Dropdown>
        </>
      )}

      {!isAuthenticated && (
        <>
          <ActionButton
            size="small"
            variant="secondary"
            text="Criar conta"
          />

          <ActionButton
            size="small"
            variant="primary"
            text="Entrar"
            onClick={() => navigate('/login')}
          />
        </>
      )}
    </Header>
  )
}

export default AppHeader

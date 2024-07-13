import { GlobeSimple } from '@phosphor-icons/react'
import { ListComponent, Toggle } from 'remaster-ui'
import { useUser } from '../../hooks/useUser'

function ProfileCollectionStatus() {
  const { user } = useUser()

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    data: { checked: boolean }
  ) => {
    const isPublic = data.checked
    console.log(isPublic)
  }

  return (
    <ListComponent
      title="Tornar coleção pública"
      text="Todos os usuários poderão acessar sua coleção através da aba Explorar"
      leading={<GlobeSimple />}
    >
      <Toggle
        checked={user?.userCollection?.public}
        onChange={handleChange}
      />
    </ListComponent>
  )
}

export default ProfileCollectionStatus

import { GlobeSimple } from '@phosphor-icons/react'
import { ListComponent, Toggle } from 'remaster-ui'

function ProfileCollectionStatus() {
  return (
    <ListComponent
      title="Tornar coleção pública"
      text="Todos os usuários poderão acessar sua coleção através da aba Explorar"
      leading={<GlobeSimple />}
    >
      <Toggle checked={true} />
    </ListComponent>
  )
}

export default ProfileCollectionStatus

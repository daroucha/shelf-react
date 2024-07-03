import { Trash } from '@phosphor-icons/react'
import { ListComponent, ActionButton } from 'remaster-ui'

function ProfileCollectionDelete() {
  return (
    <ListComponent
      title="Apagar coleção"
      text="Uma vez que você deleta sua coleção, não há como voltar atrás"
      leading={<Trash />}
    >
      <ActionButton size="small" variant="secondary" text="Apagar" />
    </ListComponent>
  )
}

export default ProfileCollectionDelete

import { ActionButton, BaseImage, Dialog } from 'remaster-ui'
import CollectionTitlebar from '../../components/Collections/CollectionTitlebar'
import CollectionWrapper from '../../components/Collections/CollectionWrapper'
import { Plus } from '@phosphor-icons/react'
import { useState } from 'react'

function CollectionsMe() {
  const [visibility, setVisibility] = useState(false)

  return (
    <CollectionWrapper>
      <Dialog
        actions="stretch"
        use-divider={false}
        title="Dialog title"
        visibility={visibility}
        onDismiss={() => setVisibility(false)}
      >
        <BaseImage src="" ratio="1/1" alt="" />

        <ActionButton
          size="small"
          variant="tertiary"
          text="Cancel"
          onClick={() => setVisibility(false)}
        />

        <ActionButton size="small" variant="primary" text="Main" />
      </Dialog>

      <CollectionTitlebar>
        <CollectionTitlebar.Title>
          Minha coleção
        </CollectionTitlebar.Title>

        <CollectionTitlebar.Tools>
          <ActionButton
            variant="primary"
            size="small"
            text="Adicionar"
            leading={<Plus />}
            onClick={() => setVisibility(true)}
          />
        </CollectionTitlebar.Tools>
      </CollectionTitlebar>
    </CollectionWrapper>
  )
}

export default CollectionsMe

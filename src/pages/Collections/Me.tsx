import { ActionButton } from 'remaster-ui'
import CollectionTitlebar from '../../components/Collections/CollectionTitlebar'
import CollectionWrapper from '../../components/Collections/CollectionWrapper'
import { Plus } from '@phosphor-icons/react'
import { useState } from 'react'
import AddTitleContext, {
  PageModel,
} from '../../contexts/Collections/AddTitleContext'
import CollectionAdd from '../../features/Collections/CollectionAdd'
import TitleType from '../../types/Title'

function CollectionsMe() {
  const [visibility, setVisibility] = useState(false)
  const [page, setPage] = useState<PageModel>('page-1')
  const [titleData, setTitleData] = useState<TitleType | null>(null)

  const value = {
    page,
    setPage,
    setTitleData,
    setVisibility,
    titleData,
    visibility,
  }

  return (
    <AddTitleContext.Provider value={value}>
      <CollectionWrapper>
        <CollectionAdd />

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
    </AddTitleContext.Provider>
  )
}

export default CollectionsMe

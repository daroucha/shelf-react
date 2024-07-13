import { Modal } from 'remaster-ui'
import { useAddTitleContext } from '../../contexts/Collections/AddTitleContext'
import AddTitle1 from './AddTitle1'
import AddTitle2 from './AddTitle2'
import AddTitle3 from './AddTitle3'

function CollectionAdd() {
  const { visibility, page, setVisibility } = useAddTitleContext()

  return (
    <Modal
      visibility={visibility}
      onClickOutside={() => setVisibility(false)}
    >
      {page === 'page-1' && <AddTitle1 />}

      {page === 'page-2' && <AddTitle2 />}

      {page === 'page-3' && <AddTitle3 />}
    </Modal>
  )
}

export default CollectionAdd

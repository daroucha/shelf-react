import {
  ActionButton,
  Modal,
  Paginator,
  Select,
  TextInput,
} from 'remaster-ui'
import AddModalContent from '../../components/Collections/AddModalContent'
import { useAddTitleContext } from '../../contexts/Collections/AddTitleContext'
import { CaretRight, GlobeSimple } from '@phosphor-icons/react'
import { useState } from 'react'
import { createInitialData } from '../../services/title'

function AddPage1() {
  const { setVisibility, setPage, setTitleData } =
    useAddTitleContext()

  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [country, setCountry] = useState('')

  const handleSubmit = async () => {
    const typeSafeYear = new Date(year)

    const requestData = {
      year: typeSafeYear,
      name,
      country,
    }

    const responseData = await createInitialData(requestData)

    console.log(responseData)

    setTitleData(responseData)
    setPage('page-2')
  }

  return (
    <AddModalContent>
      <AddModalContent.Banner></AddModalContent.Banner>

      <AddModalContent.Content>
        <AddModalContent.Title>
          Adicione uma edição
        </AddModalContent.Title>

        <AddModalContent.Body>
          <TextInput
            type="text"
            label="Nome do edição"
            tip="O nome da edição pode ser diferente do Título do filme, como em coleções ou edições especiais"
            placeholder="Nome da edição"
            onChange={(event) => setName(event.target.value)}
          />

          <TextInput
            type="text"
            label="Ano da edição"
            placeholder="Ano da edição"
            onChange={(event) => setYear(event.target.value)}
          />

          <Select
            label="País da edição"
            leading={<GlobeSimple />}
            options={[
              { value: 'br', label: 'Brasil' },
              { value: 'us', label: 'Estados Unidos' },
              { value: 'uk', label: 'Reino Unido' },
            ]}
            onChange={(event) => {
              const typeSafeEvent =
                event as React.ChangeEvent<HTMLSelectElement>
              setCountry(typeSafeEvent.target.value)
            }}
          />
        </AddModalContent.Body>

        <AddModalContent.Action>
          <ActionButton
            variant="tertiary"
            size="medium"
            text="Cancelar"
            onClick={() => setVisibility(false)}
          />

          <Paginator page={1}>
            <Paginator.Indicator page={1} />
            <Paginator.Indicator page={2} />
            <Paginator.Indicator page={3} />
          </Paginator>

          <ActionButton
            variant="primary"
            size="medium"
            text="Continuar"
            trailing={<CaretRight />}
            onClick={handleSubmit}
          />
        </AddModalContent.Action>
      </AddModalContent.Content>
    </AddModalContent>
  )
}

function CollectionAdd() {
  const { visibility, page, setVisibility } = useAddTitleContext()

  return (
    <Modal
      visibility={visibility}
      onClickOutside={() => setVisibility(false)}
    >
      {page === 'page-1' && <AddPage1 />}
    </Modal>
  )
}

export default CollectionAdd

import {
  GlobeSimple,
  CaretRight,
  Warning,
} from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import {
  TextInput,
  Select,
  ActionButton,
  Paginator,
  Alert,
} from 'remaster-ui'
import AddModalContent from '../../components/Collections/AddModalContent'
import { useAddTitleContext } from '../../contexts/Collections/AddTitleContext'
import { useUser } from '../../hooks/useUser'
import { createDraftTitle } from '../../services/title'

function AddTitle1() {
  const errorFallback = {
    status: false,
    message: '',
  }

  const [error, setError] = useState(errorFallback)

  const handleError = (message: string) => {
    setError({
      status: true,
      message,
    })
  }

  const handleTimeout = () => {
    setError(errorFallback)
  }

  const { user } = useUser()

  const {
    cancelModal,
    disabled,
    setDisabled,
    setPage,
    setTitleData,
  } = useAddTitleContext()

  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const [country, setCountry] = useState('')

  useEffect(() => {
    const isFilled =
      country !== '' &&
      name !== '' &&
      year !== '' &&
      year.length === 4
        ? false
        : true
    setDisabled(isFilled)
  }, [country, name, year, setDisabled])

  const handleSubmit = async () => {
    setLoading(true)

    try {
      const typeSafeYear = new Date(year)

      const publicTitle = {
        year: typeSafeYear,
        name,
        country,
        userCollection: user?.userCollection?._id,
      }

      const responseData = await createDraftTitle(publicTitle)

      setTitleData(responseData)

      setPage('page-2')
    } catch (error) {
      const err = error as Error
      handleError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AddModalContent>
      <AddModalContent.Banner></AddModalContent.Banner>

      <AddModalContent.Content>
        <AddModalContent.Title>
          Adicione uma edição
        </AddModalContent.Title>

        {error.status && (
          <Alert
            leading={<Warning />}
            title="Algo deu errado"
            text={error.message}
            timer={4}
            onTimeout={handleTimeout}
          />
        )}

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
              { value: '', label: 'Selecione um país' },
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
            onClick={cancelModal}
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
            loading={loading}
            disabled={disabled}
          />
        </AddModalContent.Action>
      </AddModalContent.Content>
    </AddModalContent>
  )
}

export default AddTitle1

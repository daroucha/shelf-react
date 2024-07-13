import { FloppyDisk } from '@phosphor-icons/react'
import { ActionButton, Paginator } from 'remaster-ui'
import AddModalContent from '../../components/Collections/AddModalContent'
import { useAddTitleContext } from '../../contexts/Collections/AddTitleContext'

function AddTitle3() {
  const { setVisibility } = useAddTitleContext()

  return (
    <AddModalContent>
      <AddModalContent.Banner></AddModalContent.Banner>

      <AddModalContent.Content>
        <AddModalContent.Title>
          Show! Vamos continuar...
        </AddModalContent.Title>

        <AddModalContent.Body>
          <AddModalContent.Text>
            Tudo certo até aqui! Agora vamos incluir as informações
            técnicas da sua edição e escolher a capa mais adequadas
          </AddModalContent.Text>

          <AddModalContent.Action>
            <ActionButton
              variant="tertiary"
              size="medium"
              text="Cancelar"
              onClick={() => setVisibility(false)}
            />

            <Paginator page={3}>
              <Paginator.Indicator page={1} />
              <Paginator.Indicator page={2} />
              <Paginator.Indicator page={3} />
            </Paginator>

            <ActionButton
              variant="primary"
              size="medium"
              text="Salvar e prosseguir"
              leading={<FloppyDisk />}
            />
          </AddModalContent.Action>
        </AddModalContent.Body>
      </AddModalContent.Content>
    </AddModalContent>
  )
}

export default AddTitle3

import { useEffect, useState } from 'react'
import { useUser } from '../../hooks/useUser'
import {
  $color,
  $primitives,
  $size,
  $space,
  ActionButton,
  Modal,
  SansSerif,
  SvgSpinner,
} from 'remaster-ui'
import { styled } from 'goober'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { updateUserStatus } from '../../services/user'
import WelcomeIllustration from '../../assets/images/welcome.png'

const WelcomeModal = styled('div')`
  display: flex;
  flex-direction: column;
  max-width: 32vw;
`

const ModalIllustration = styled('div')`
  align-items: center;
  aspect-ratio: 16/9;
  display: flex;
  justify-content: center;
  width: 100%;
`

const ModalContent = styled('div')`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${$space.gap['4xl']};
  padding-inline: ${$space.inline.xl};
  padding-bottom: ${$space.block.xxl};
  padding-top: ${$space.block.lg};
`

const ModalTitle = styled(SansSerif)`
  color: ${$color.text.title.primary.light};
  display: block;
  font-size: ${$size.type.fontSize.title.lg};
  font-weight: ${$primitives.typography.fontWeight.sans.bold};
  line-height: ${$size.type.lineHeight.title.sm};
  margin: 0;
  padding: 0;
  width: 100%;
`

const ModalText = styled(SansSerif)`
  color: ${$color.text.plain.secondary.light};
  display: block;
  font-size: ${$size.type.fontSize.text.md};
  font-weight: ${$primitives.typography.fontWeight.sans.regular};
  line-height: ${$size.type.lineHeight.text.md};
  margin: 0;
  padding: 0;
`

const ModalActions = styled('div')`
  display: inherit;
  flex-direction: inherit;
  gap: ${$space.gap.lg};
  width: 100%;
`

function AppWelcome() {
  const navigate = useNavigate()

  const { isAuthenticated, user } = useUser()

  const [loading, setLoading] = useState(false)
  const [visibility, setVisibility] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.status === 'off') {
        setVisibility(true)
      }
    }
  }, [user])

  const handleDismiss = async (route: string) => {
    setLoading(true)

    const status = 'on'

    try {
      await updateUserStatus(status)

      user!.status = status

      setVisibility(false)

      navigate(route)
    } catch (error) {
      const err = error as Error
      toast(err.message)
    }
  }

  return (
    <Modal
      visibility={visibility}
      onClickOutside={() => setVisibility(true)}
    >
      <WelcomeModal>
        <ModalIllustration>
          <img src={WelcomeIllustration} alt="Bem-vindo ao Shelf" />
        </ModalIllustration>

        <ModalContent>
          <ModalTitle>Bem-vindo ao Shelf</ModalTitle>

          <ModalText>
            Agora você já pode publicar sua própria coleção, além de
            seguir suas coleções favoritas da aba Explorar
          </ModalText>

          {loading === false && (
            <ModalActions>
              <ActionButton
                size="medium"
                variant="primary"
                text="Começar minha coleção"
                onClick={() => handleDismiss('/collections/me')}
              />

              <ActionButton
                size="medium"
                variant="tertiary"
                text="Explorar"
                onClick={() => handleDismiss('/explore')}
              />
            </ModalActions>
          )}

          {loading === true && <SvgSpinner />}
        </ModalContent>
      </WelcomeModal>
    </Modal>
  )
}

export default AppWelcome

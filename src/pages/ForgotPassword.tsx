import { useState } from 'react'
import LoginBox from '../components/Login/LoginBox'
import LoginForm from '../components/Login/LoginForm'
import LoginText from '../components/Login/LoginText'
import LoginTitle from '../components/Login/LoginTitle'
import { Envelope, Warning } from '@phosphor-icons/react'
import { ActionButton, Alert, Link, TextInput } from 'remaster-ui'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../services/firebase'
import LoginCta from '../components/Login/LoginCta'
import { Link as RouterLink } from 'react-router-dom'
import EmailSentAsset from '../assets/images/email-sent.png'
import LoginIllustration from '../components/Login/LoginIllustration'
import ForgotPasswordContext, {
  useForgotPasswordContext,
} from '../contexts/ForgotPasswordContext'

function EmailSent() {
  const { setSent } = useForgotPasswordContext()

  return (
    <>
      <LoginIllustration>
        <img src={EmailSentAsset} alt="E-mail enviado" />
      </LoginIllustration>

      <LoginTitle as="h1">E-mail enviado</LoginTitle>

      <LoginForm as="div">
        <LoginText as="p">
          Nós te mandamos um e-mail com o link para você criar uma
          nova senha. Não encontrou? Pode ter ido para spam ou para
          lixeira...
        </LoginText>

        <LoginForm.Actions>
          <ActionButton
            as={RouterLink}
            to="/login"
            variant="primary"
            text="Voltar para login"
            size="medium"
          />

          <ActionButton
            variant="tertiary"
            text="Reenviar e-mail"
            size="medium"
            onClick={() => setSent(false)}
          />
        </LoginForm.Actions>
      </LoginForm>
    </>
  )
}

function EmailForm() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const { setSent } = useForgotPasswordContext()

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

  const handleSend = async (event: React.FormEvent) => {
    event.preventDefault()

    setLoading(true)

    try {
      await sendPasswordResetEmail(auth, email)
      setSent(true)
    } catch (error) {
      const err = error as Error
      handleError(err?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <LoginTitle as="h1">Esqueceu sua senha?</LoginTitle>

      {error.status && (
        <Alert
          leading={<Warning />}
          title="Algo deu errado"
          text={error.message}
          timer={4}
          onTimeout={handleTimeout}
        />
      )}

      <LoginForm onSubmit={handleSend}>
        <LoginText as="p">
          Não se preocupe, você pode definir uma nova senha digitando
          seu endereço de e-mail no campo abaixo
        </LoginText>

        <LoginForm.Fields>
          <TextInput
            label="E-mail"
            leading={<Envelope />}
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="E-mail"
            required
            type="text"
            value={email}
          />
        </LoginForm.Fields>

        <LoginForm.Actions>
          <ActionButton
            variant="primary"
            text="Enviar e-mail de verificação"
            size="medium"
            loading={loading}
          />

          <LoginCta>
            Lembrou sua senha?
            <Link as={RouterLink} to="/login" size="small">
              Fazer login
            </Link>
          </LoginCta>
        </LoginForm.Actions>
      </LoginForm>
    </>
  )
}

function ForgotPassword() {
  const [sent, setSent] = useState(false)

  const value = { sent, setSent }

  return (
    <ForgotPasswordContext.Provider value={value}>
      <LoginBox>
        {sent === false && <EmailForm />}

        {sent === true && <EmailSent />}
      </LoginBox>
    </ForgotPasswordContext.Provider>
  )
}

export default ForgotPassword

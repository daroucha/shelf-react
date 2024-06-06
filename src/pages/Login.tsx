import {
  ActionButton,
  Alert,
  BaseImage,
  IconButton,
  TextInput,
} from 'remaster-ui'
import {
  Envelope,
  Eye,
  EyeClosed,
  Icon,
  Lock,
  Warning,
} from '@phosphor-icons/react'
import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import LoginTitle from '../components/Login/LoginTitle'
import LoginBox from '../components/Login/LoginBox'
import LoginForm from '../components/Login/LoginForm'
import LoginCta from '../components/Login/LoginCta'
import { Link } from 'react-router-dom'
import LoginBillboard from '../components/Login/LoginBillboard'

const components: {
  password: Icon
  text: Icon
} = {
  password: Eye,
  text: EyeClosed,
}

function Login() {
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

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const handleEmail = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUser({
      email: event.target.value,
      password: user.password,
    })
  }

  const handlePassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUser({
      email: user.email,
      password: event.target.value,
    })
  }

  const [type, setType] = useState<'text' | 'password'>('password')

  const handlePasswordToggle = (event: React.MouseEvent<Element>) => {
    event.preventDefault()
    setType(type === 'password' ? 'text' : 'password')
  }

  const Icon = components[type]

  const { login, isPending } = useLogin()

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault()

    login(
      { email: user.email, password: user.password },
      {
        onError: (err) => {
          handleError(err?.message)
        },
      }
    )
  }

  return (
    <>
      <LoginBillboard>
        <BaseImage src="./cover.png" alt="Shelf" />
      </LoginBillboard>

      <LoginBox>
        <LoginTitle as="h1">Faça login em sua conta</LoginTitle>

        {error.status && (
          <Alert
            leading={<Warning />}
            title="Algo deu errado"
            text={error.message}
            timer={4}
            onTimeout={handleTimeout}
          />
        )}

        <LoginForm onSubmit={handleLogin}>
          <LoginForm.Fields>
            <TextInput
              label="E-mail"
              leading={<Envelope />}
              name="email"
              onChange={handleEmail}
              placeholder="E-mail"
              required
              type="text"
              value={user.email}
            />

            <TextInput
              label="Senha"
              leading={<Lock />}
              name="password"
              onChange={handlePassword}
              placeholder="Senha"
              required
              type={type}
              value={user.password}
              trailing={
                <IconButton
                  leading={<Icon />}
                  size="small"
                  onClick={handlePasswordToggle}
                />
              }
            />
          </LoginForm.Fields>

          <LoginForm.Actions>
            <ActionButton
              variant="primary"
              text="Entrar"
              size="medium"
              loading={isPending}
            />

            <LoginCta>
              Não tem uma conta?
              <Link to="/sign-up">Crie uma agora</Link>
            </LoginCta>
          </LoginForm.Actions>
        </LoginForm>
      </LoginBox>
    </>
  )
}

export default Login

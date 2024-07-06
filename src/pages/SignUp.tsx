import {
  ActionButton,
  Alert,
  IconButton,
  Link,
  TextInput,
} from 'remaster-ui'
import LoginBillboard from '../components/Login/LoginBillboard'
import LoginBox from '../components/Login/LoginBox'
import LoginForm from '../components/Login/LoginForm'
import LoginTitle from '../components/Login/LoginTitle'
import {
  Envelope,
  Eye,
  EyeClosed,
  Icon,
  User,
  Warning,
  Lock,
} from '@phosphor-icons/react'
import { useState } from 'react'
import LoginCta from '../components/Login/LoginCta'
import { Link as RouterLink } from 'react-router-dom'
import { useSignUp } from '../hooks/useSignUp'

const components: {
  password: Icon
  text: Icon
} = {
  password: Eye,
  text: EyeClosed,
}

function SignUp() {
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
    name: '',
    email: '',
    password: '',
  })

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      name: event.target.value,
      email: user.email,
      password: user.password,
    })
  }

  const handleEmail = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUser({
      name: user.name,
      email: event.target.value,
      password: user.password,
    })
  }

  const handlePassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUser({
      name: user.name,
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

  const { signUp, isPending } = useSignUp()

  const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault()

    signUp(
      {
        name: user.name,
        email: user.email,
        password: user.password,
      },
      {
        onError: (err) => {
          handleError(err?.message)
        },
      }
    )
  }

  return (
    <>
      <LoginBox>
        <LoginTitle as="h1">Crie sua conta</LoginTitle>

        {error.status && (
          <Alert
            leading={<Warning />}
            title="Algo deu errado"
            text={error.message}
            timer={4}
            onTimeout={handleTimeout}
          />
        )}

        <LoginForm onSubmit={handleSignUp}>
          <LoginForm.Fields>
            <TextInput
              type="text"
              label="Nome"
              placeholder="Nome"
              leading={<User />}
              required
              onChange={handleName}
              value={user.name}
            />

            <TextInput
              type="email"
              label="E-mail"
              placeholder="E-mail"
              leading={<Envelope />}
              required
              onChange={handleEmail}
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
              text="Criar conta"
              size="medium"
              loading={isPending}
            />

            <LoginCta>
              Já tem uma conta?
              <Link as={RouterLink} to="/login" size="small">
                Fazer login
              </Link>
            </LoginCta>
          </LoginForm.Actions>
        </LoginForm>
      </LoginBox>

      <LoginBillboard></LoginBillboard>
    </>
  )
}

export default SignUp

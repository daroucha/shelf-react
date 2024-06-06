import { ActionButton, Alert, TextInput } from 'remaster-ui'
import {
  Envelope,
  Lock,
  Warning,
} from '@phosphor-icons/react'
import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

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
    <main>
      <h1>Login</h1>

      {error.status && (
        <Alert
          leading={<Warning />}
          title="Algo deu errado"
          text={error.message}
          timer={4}
          onTimeout={handleTimeout}
        />
      )}

      <form onSubmit={handleLogin}>
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
          type="password"
          value={user.password}
        />

        <ActionButton
          variant="primary"
          text="Entrar"
          size="medium"
          loading={isPending}
        />
      </form>
    </main>
  )
}

export default Login

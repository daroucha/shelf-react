import {
  ActionButton,
  TextInput,
} from '@daroucha/master-ui'
import { Envelope, Lock } from '@phosphor-icons/react'
import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

function Login() {
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
        onSettled: () => {
          setUser({
            email: user.email,
            password: '',
          })
        },
        onError: (error) => {
          console.log(error)
        },
      }
    )
  }

  return (
    <main>
      <h1>Login</h1>

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

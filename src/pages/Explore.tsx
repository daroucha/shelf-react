import { useUser } from '../hooks/useUser'

function Explore() {
  const { user, isLoading } = useUser()

  return (
    <main>
      <h1>Explorar</h1>

      {!isLoading && <code>{JSON.stringify(user)}</code>}
    </main>
  )
}

export default Explore

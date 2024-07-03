import {
  User,
  Envelope,
  MapPin,
  PencilSimple,
} from '@phosphor-icons/react'
import { TextInput, TextArea, ActionButton } from 'remaster-ui'
import ProfileForm from '../../components/Profile/ProfileForm'
import { useAccountContext } from '../../contexts/Profile/AccountContext'
import { useState } from 'react'
import { updateUserDetails } from '../../services/user'

function ProfileData() {
  const {
    name: contextName,
    email,
    bio: contextBio,
    location: contextLocation,
    setName: setContextName,
  } = useAccountContext()

  const [name, setName] = useState(contextName)
  const [bio, setBio] = useState(contextBio)
  const [location, setLocation] = useState(contextLocation)

  const [loading, setLoading] = useState(false)

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    setLoading(true)

    try {
      const updateUser = await updateUserDetails(name, bio, location)

      setContextName(updateUser.name)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProfileForm onSubmit={onSubmit}>
      <ProfileForm.Fields>
        <TextInput
          type="text"
          label="Nome"
          placeholder="Nome"
          leading={<User />}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <TextInput
          type="email"
          label="E-mail"
          placeholder="E-mail"
          leading={<Envelope />}
          value={email}
          disabled={true}
        />

        <TextArea
          label="Bio"
          placeholder="Bio"
          value={bio}
          onChange={(event) => {
            const fixedEvent =
              event as React.ChangeEvent<HTMLTextAreaElement>
            setBio(fixedEvent.target.value)
          }}
        />

        <TextInput
          type="text"
          label="Localização"
          placeholder="Localização"
          leading={<MapPin />}
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
      </ProfileForm.Fields>

      <ProfileForm.Actions>
        <ActionButton
          size="medium"
          variant="primary"
          text="Atualizar perfil"
          leading={<PencilSimple />}
          loading={loading}
        />
      </ProfileForm.Actions>
    </ProfileForm>
  )
}

export default ProfileData

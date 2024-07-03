import {
  ActionButton,
  BaseImage,
  ListComponent,
  NavigationLink,
  ProgressBar,
  SectionTitle,
  SvgSpinner,
  TextArea,
  TextInput,
  Toggle,
} from 'remaster-ui'
import ProfileWrapper from '../../components/Profile/ProfileWrapper'
import {
  Envelope,
  FileImage,
  FloppyDisk,
  GlobeSimple,
  MapPin,
  PencilSimple,
  SignOut,
  Trash,
  User,
  UserCircle,
  X,
} from '@phosphor-icons/react'
import Divider from '../../components/Common/Divider'
import ProfileSidebar from '../../components/Profile/ProfileSidebar'
import ProfileContent from '../../components/Profile/ProfileContent'
import ProfileSection from '../../components/Profile/ProfileSection'
import ProfileFormBox from '../../components/Profile/ProfileFormBox'
import ProfileForm from '../../components/Profile/ProfileForm'
import ProfileImageFile from '../../components/Profile/ProfileImageFile'
import { useRef, useState } from 'react'
import ProfileList from '../../components/Profile/ProfileList'
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { storage } from '../../services/firebase'
import { uploadUserAvatar } from '../../services/user'
import toast from 'react-hot-toast'
import { useUser } from '../../hooks/useUser'

function ProfileData() {
  const onSubmit = () => {}

  return (
    <ProfileForm onSubmit={onSubmit}>
      <ProfileForm.Fields>
        <TextInput
          type="text"
          label="Nome"
          placeholder="Nome"
          leading={<User />}
        />

        <TextInput
          type="email"
          label="E-mail"
          placeholder="E-mail"
          leading={<Envelope />}
        />

        <TextArea label="Bio" placeholder="Bio" />

        <TextInput
          type="text"
          label="Localização"
          placeholder="Localização"
          leading={<MapPin />}
        />
      </ProfileForm.Fields>

      <ProfileForm.Actions>
        <ActionButton
          size="medium"
          variant="primary"
          text="Atualizar perfil"
          leading={<PencilSimple />}
        />
      </ProfileForm.Actions>
    </ProfileForm>
  )
}

function ProfileAvatarFile() {
  const fileRef = useRef<HTMLInputElement | null>(null)

  const [htmlFile, setHtmlFile] = useState<File | null>(null)
  const [pictureUrl, setPictureUrl] = useState('')
  const [avatarStatus, setAvatarStatus] = useState<
    'onEmpty' | 'onSelect' | 'onLoading' | 'onSuccess'
  >('onEmpty')

  const triggerFileInput = () => {
    if (!fileRef.current) {
      return
    }

    fileRef.current.click()
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files

    if (!file || file.length <= 0) {
      return
    }

    const localUrl = URL.createObjectURL(file[0])
    setPictureUrl(localUrl)
    setAvatarStatus('onSelect')

    setHtmlFile(file[0])
  }

  const handleUpload = async () => {
    if (!htmlFile) {
      return
    }

    setAvatarStatus('onLoading')

    try {
      const uploadedImage = await uploadUserAvatar(htmlFile)

      setPictureUrl(uploadedImage as string)
      setAvatarStatus('onSuccess')
    } catch (error) {
      const ApiError = error as Error
      toast(ApiError.message)
      setAvatarStatus('onSelect')
    }
  }

  const handleCancel = () => {
    setPictureUrl('')
    setAvatarStatus('onEmpty')
  }

  return (
    <ProfileImageFile>
      <ListComponent title="Imagem de perfil" />

      <BaseImage
        alt="Imagem de perfil"
        src={pictureUrl}
        ratio="1/1"
      />

      <ProfileImageFile.Input>
        <input
          type="file"
          ref={fileRef}
          onChange={handleChange}
          accept="image/*"
        />
      </ProfileImageFile.Input>

      <ProfileImageFile.Loading>
        {avatarStatus === 'onLoading' && <SvgSpinner />}
      </ProfileImageFile.Loading>

      <ProfileImageFile.Options>
        {avatarStatus === 'onEmpty' && (
          <NavigationLink
            size="small"
            text="Escolher imagem"
            leading={<FileImage />}
            onClick={triggerFileInput}
          />
        )}

        {avatarStatus === 'onSelect' && (
          <>
            <NavigationLink
              size="small"
              text="Salvar imagem"
              leading={<FloppyDisk />}
              onClick={handleUpload}
            />

            <NavigationLink
              size="small"
              text="Cancelar"
              leading={<X />}
              onClick={handleCancel}
            />
          </>
        )}

        {avatarStatus === 'onSuccess' && (
          <NavigationLink
            size="small"
            text="Mudar imagem"
            leading={<PencilSimple />}
            onClick={triggerFileInput}
          />
        )}
      </ProfileImageFile.Options>
    </ProfileImageFile>
  )
}

function ProfileCollectionStatus() {
  return (
    <ListComponent
      title="Tornar coleção pública"
      text="Todos os usuários poderão acessar sua coleção através da aba Explorar"
      leading={<GlobeSimple />}
    >
      <Toggle checked={true} />
    </ListComponent>
  )
}

function ProfileCollectionDelete() {
  return (
    <ListComponent
      title="Apagar coleção"
      text="Uma vez que você deleta sua coleção, não há como voltar atrás"
      leading={<Trash />}
    >
      <ActionButton size="small" variant="secondary" text="Apagar" />
    </ListComponent>
  )
}

function Profile() {
  const { user } = useUser()

  if (!user) {
    return
  }

  return (
    <ProfileWrapper>
      <ProfileSidebar
        title={user.name}
        text="400 títulos"
        avatar={user.picture}
      >
        <NavigationLink
          className="stretch"
          size="small"
          text="Conta"
          leading={<UserCircle />}
          active={true}
        />

        <Divider />

        <NavigationLink
          className="stretch"
          size="small"
          text="Sair"
          leading={<SignOut />}
        />
      </ProfileSidebar>

      <ProfileContent>
        <ProfileSection>
          <SectionTitle text="Perfil" />

          <ProfileFormBox>
            <ProfileData />

            <ProfileAvatarFile />
          </ProfileFormBox>
        </ProfileSection>

        <ProfileSection>
          <SectionTitle text="Ações sensíveis" />

          <ProfileList>
            <ProfileCollectionStatus />

            <ProfileCollectionDelete />
          </ProfileList>
        </ProfileSection>
      </ProfileContent>
    </ProfileWrapper>
  )
}

export default Profile

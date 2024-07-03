import {
  FileImage,
  FloppyDisk,
  X,
  PencilSimple,
} from '@phosphor-icons/react'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import {
  ListComponent,
  BaseImage,
  SvgSpinner,
  NavigationLink,
} from 'remaster-ui'
import ProfileImageFile from '../../components/Profile/ProfileImageFile'
import { uploadUserAvatar } from '../../services/user'
import { useAccountContext } from '../../contexts/Profile/AccountContext'

function ProfileAvatarFile() {
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [htmlFile, setHtmlFile] = useState<File | null>(null)

  const { picture, setPicture } = useAccountContext()
  const [pictureUrl, setPictureUrl] = useState(picture || '')

  const initialAvatarStatus = picture !== '' ? 'onSuccess' : 'onEmpty'
  const [avatarStatus, setAvatarStatus] = useState<
    'onEmpty' | 'onSelect' | 'onLoading' | 'onSuccess'
  >(initialAvatarStatus)

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

      setPicture(uploadedImage as string)
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

export default ProfileAvatarFile

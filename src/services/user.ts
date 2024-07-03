import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { storage } from './firebase'
import api from './api'

export const uploadUserAvatar = async (file: File) => {
  const sessionToken = sessionStorage.getItem('token')

  if (!sessionToken) {
    return null
  }

  try {
    const storageRef = ref(storage, `/avatars/${file.name}`)
    const snapshot = await uploadBytesResumable(storageRef, file)

    const downloadUrl = await getDownloadURL(snapshot.ref)

    await api.put(
      '/api/v1/auth/updateProfilePic',
      {
        picture: downloadUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    )

    return downloadUrl
  } catch (error: unknown) {
    throw new Error(error as string)
  }
}

import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { getFirebaseToken, storage } from './firebase'
import api from './api'
import type { AxiosResponse } from 'axios'

export const uploadUserAvatar = async (file: File) => {
  const token = await getFirebaseToken()

  try {
    const storageRef = ref(storage, `/avatars/${file.name}`)
    const snapshot = await uploadBytesResumable(storageRef, file)

    const downloadUrl = await getDownloadURL(snapshot.ref)

    await api.put(
      '/api/v1/auth/updateprofilepic',
      {
        picture: downloadUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return downloadUrl
  } catch (error) {
    throw new Error(error as string)
  }
}

export const updateUserDetails = async (
  name: string,
  bio?: string,
  location?: string
) => {
  const token = await getFirebaseToken()

  try {
    const { data: response }: AxiosResponse = await api.put(
      '/api/v1/auth/updatedetails',
      {
        name,
        bio,
        location,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data
  } catch (error) {
    throw new Error(error as string)
  }
}

import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { storage } from './firebase'
import api from './api'
import type { AxiosResponse } from 'axios'

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
      '/api/v1/auth/updateprofilepic',
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
  } catch (error) {
    throw new Error(error as string)
  }
}

export const updateUserDetails = async (
  name: string,
  bio?: string,
  location?: string
) => {
  const sessionToken = sessionStorage.getItem('token')

  if (!sessionToken) {
    return null
  }

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
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    )

    return response.data
  } catch (error) {
    throw new Error(error as string)
  }
}

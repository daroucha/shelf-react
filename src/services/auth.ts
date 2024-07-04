import type { AxiosError, AxiosResponse } from 'axios'
import api from './api'
import toast from 'react-hot-toast'
import { getFirebaseToken } from './firebase'

export const getCurrentUser = async () => {
  const token = await getFirebaseToken()

  if (!token) {
    return null
  }

  try {
    const { data: response }: AxiosResponse = await api.get(
      '/api/v1/auth/me',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data
  } catch (error) {
    const ApiError = error as AxiosError
    toast(ApiError.message)
    return null
  }
}

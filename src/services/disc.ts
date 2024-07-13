import { AxiosError } from 'axios'
import { ApiError } from '../types/Api'
import type DiscType from '../types/Disc'
import api from './api'
import { getFirebaseToken } from './firebase'

export const createDiscDraft = async (disc: DiscType) => {
  const token = await getFirebaseToken()

  try {
    const { data: response } = await api.post('/api/v1/discs', disc, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    const err = error as AxiosError
    const apiError = err.response?.data as ApiError

    throw new Error(apiError.error)
  }
}

import { AxiosError } from 'axios'
import type { PublicTitleType } from '../types/Title'
import api from './api'
import { getFirebaseToken } from './firebase'
import { ApiError } from '../types/Api'

export const createDraftTitle = async (
  publicTitle: PublicTitleType
) => {
  const token = await getFirebaseToken()

  try {
    const { data: response } = await api.post(
      '/api/v1/titles/draft',
      publicTitle,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data
  } catch (error) {
    const err = error as AxiosError
    const apiError = err.response?.data as ApiError

    throw new Error(apiError.error)
  }
}

export const getMovieData = async (movie: string) => {
  const token = await getFirebaseToken()

  try {
    const { data: response } = await api.get(
      `/api/v1/titles/movie?title=${movie}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data
  } catch (error) {
    const err = error as AxiosError
    const apiError = err.response?.data as ApiError

    throw new Error(apiError.error)
  }
}

export const updatePublicTitle = async (
  id: string,
  publicTitle: PublicTitleType
) => {
  const token = await getFirebaseToken()

  try {
    const { data: response } = await api.put(
      `/api/v1/titles/${id}`,
      publicTitle,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data
  } catch (error) {
    const err = error as AxiosError
    const apiError = err.response?.data as ApiError

    throw new Error(apiError.error)
  }
}

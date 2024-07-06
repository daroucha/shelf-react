import TitleType from '../types/Title'
import api from './api'
import { getFirebaseToken } from './firebase'

export const createInitialData = async (title: TitleType) => {
  const token = await getFirebaseToken()

  try {
    await api.post('/api/v1/titles', title, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    throw new Error(error as string)
  }
}

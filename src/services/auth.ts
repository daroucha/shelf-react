import type { AxiosError, AxiosResponse } from 'axios'
import api from './api'
import toast from 'react-hot-toast'
import { auth, getFirebaseToken } from './firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import type { UserCredential } from 'firebase/auth'

export const signUpUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const firebaseUser: UserCredential =
      await createUserWithEmailAndPassword(auth, email, password)

    await api.post('/api/v1/users', {
      name,
      email,
      status: 'off',
      firebaseUid: firebaseUser.user.uid,
    })

    return firebaseUser
  } catch (error) {
    throw new Error(error as string)
  }
}

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

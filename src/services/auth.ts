import type { AxiosResponse } from "axios";
import api from "./api";

export async function getCurrentUser() {
  const sessionToken = sessionStorage.getItem('token')

  if (!sessionToken) {
    return null
  }

  try {
    const { data: response }: AxiosResponse = await api
      .get('/api/v1/auth/me', {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      })

    return response.data
  } catch (error) {
    console.log(error)
  }
}
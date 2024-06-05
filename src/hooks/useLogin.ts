import { auth } from "../services/firebase"
import { LoginType } from "../types/Auth"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import type { UserCredential } from "firebase/auth"

export function useLogin() {
  const navigate = useNavigate()

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: LoginType) => signInWithEmailAndPassword(auth, email, password),
    onSuccess: async (user: UserCredential) => {
      const token = await user.user.getIdToken()

      sessionStorage.setItem('token', token)

      navigate('/collections/me', { replace: true })
    }
  })

  return { login, isPending }
}
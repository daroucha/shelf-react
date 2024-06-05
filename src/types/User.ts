import type { UserCredential } from "firebase/auth"

interface UserType extends UserCredential {
  _id: string
  name: string
  email: string
  status: 'on' | 'off'
}

export default UserType
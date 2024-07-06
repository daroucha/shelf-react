export interface LoginType {
  email: string
  password: string
}

export interface SignUpType extends LoginType {
  name: string
}

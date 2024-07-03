export default interface UserType {
  _id: string
  name: string
  email: string
  status: 'on' | 'off'
  picture?: string
  bio?: string
  location?: string
}

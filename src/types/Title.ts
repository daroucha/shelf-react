import DiscType from './Disc'
import UserType from './User'

export default interface TitleType {
  _id?: string
  name: string
  year: Date
  country: string
  type?: 'movie' | 'collection'
  cover?: string
  createdAt?: Date
  createdBy?: UserType
  discs?: DiscType[]
  box?:
    | 'amaray'
    | 'slim'
    | 'scanavo'
    | 'digipak'
    | 'digiduplo'
    | 'digibook'
    | 'elite'
}

import { createContext, useContext } from 'react'
import type TitleType from '../../types/Title'
import type DiscType from '../../types/Disc'

export type PageModel = 'page-1' | 'page-2' | 'page-3'

interface AddTitleContextModel {
  cancelModal: () => void
  disabled: boolean
  discData: DiscType[] | null
  page: PageModel
  setDisabled: (disabled: boolean) => void
  setDiscData: (disc: DiscType[]) => void
  setPage: (page: PageModel) => void
  setTitleData: (title: TitleType) => void
  setVisibility: (visibility: boolean) => void
  titleData: TitleType | null
  visibility: boolean
}

const initialState: AddTitleContextModel = {
  cancelModal: () => {},
  disabled: true,
  discData: null,
  page: 'page-1',
  setDisabled: () => {},
  setDiscData: () => {},
  setPage: () => {},
  setTitleData: () => {},
  setVisibility: () => {},
  titleData: null,
  visibility: false,
}

const AddTitleContext =
  createContext<AddTitleContextModel>(initialState)

export const useAddTitleContext = () => {
  const context = useContext(AddTitleContext)

  if (!context) {
    throw new Error(
      `This data cannot be rendered outside the Add context`
    )
  }

  return context
}

export default AddTitleContext

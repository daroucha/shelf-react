import { createContext, useContext } from 'react'
import TitleType from '../../types/Title'

export type PageModel = 'page-1' | 'page-2' | 'page-3'

interface AddTitleContextModel {
  page: PageModel
  setPage: (page: PageModel) => void
  setTitleData: (title: TitleType) => void
  setVisibility: (visibility: boolean) => void
  titleData: TitleType | null
  visibility: boolean
}

const initialState: AddTitleContextModel = {
  page: 'page-1',
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

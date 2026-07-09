import { create } from "zustand"

type BookItem = {
  isbn: string
  title: string
  contents: string
  url: string
  authors: string[]
  publisher: string
  price: number
  sale_price: number
  thumbnail: string
}

type State = {
  page: number
  isLastPage: boolean
  bookList: BookItem[]
  query: string
}

type Action = {
  actions: {
    setBookList: ({ bookList, page, isLastPage }: { bookList: BookItem[]; page: number; isLastPage: boolean }) => void
    setQuery: (query: string) => void
    reset: () => void
  }
}

const initialState: State = {
  page: 0,
  isLastPage: false,
  bookList: [],
  query: ""
}

export const useBookSearch = create<State & Action>((set) => ({
  ...initialState,
  actions: {
    setBookList: ({ bookList, page, isLastPage }) => set({ bookList, page, isLastPage }),
    setQuery: (query) => set({ query }),
    reset: () => set(initialState)
  }
}))

import { SEARCH_HISTORY_COOKIE, getCookie, setCookie } from "@/utils/cookie"
import { useBookSearch } from "../store/useBookSearch"

export type SearchTarget = "title" | "publisher" | "person"

const PAGE_SIZE = 10 as const
const MAX_HISTORY_LENGTH = 8 as const
const SEARCH_HISTORY_MAX_AGE_DAYS = 7 as const

const saveSearchHistory = (query: string) => {
  const raw = getCookie(SEARCH_HISTORY_COOKIE)
  const prevHistory = raw ? JSON.parse(raw) : []
  if (!Array.isArray(prevHistory)) return

  const nextHistory = [query, ...prevHistory.filter((item) => item !== query)].slice(0, MAX_HISTORY_LENGTH)
  setCookie(SEARCH_HISTORY_COOKIE, JSON.stringify(nextHistory), { days: SEARCH_HISTORY_MAX_AGE_DAYS })
}

const deleteSearchHistory = (query: string) => {
  const raw = getCookie(SEARCH_HISTORY_COOKIE)
  const prevHistory = raw ? JSON.parse(raw) : []
  if (!Array.isArray(prevHistory)) return

  const nextHistory = prevHistory.filter((item) => item !== query)
  setCookie(SEARCH_HISTORY_COOKIE, JSON.stringify(nextHistory), { days: SEARCH_HISTORY_MAX_AGE_DAYS })
}

function useSearchBook() {
  const page = useBookSearch((state) => state.page)
  const isLastPage = useBookSearch((state) => state.isLastPage)
  const currentQuery = useBookSearch((state) => state.query)
  const setBookList = useBookSearch((state) => state.actions.setBookList)
  const setQuery = useBookSearch((state) => state.actions.setQuery)
  const reset = useBookSearch((state) => state.actions.reset)

  const searchBookList = async (query: string, target?: SearchTarget) => {
    try {
      const trimmedQuery = query.trim()
      if (!trimmedQuery) {
        reset()
        return
      }

      const isNewQuery = trimmedQuery !== currentQuery
      if (!isNewQuery && isLastPage) return

      const nextPage = isNewQuery ? 1 : page + 1
      const params = new URLSearchParams({
        query: trimmedQuery,
        page: nextPage.toString(),
        size: PAGE_SIZE.toString()
      })

      if (target) params.append("target", target)

      const response = await fetch(`https://dapi.kakao.com/v3/search/book?${params.toString()}`, {
        cache: "no-store",
        headers: {
          Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`
        }
      })

      const result = await response.json()

      setBookList({
        bookList: result.documents,
        page: nextPage,
        isLastPage: result.meta.is_end
      })
      setQuery(trimmedQuery)
      saveSearchHistory(trimmedQuery)
    } catch {
      // TODO: Handle error
    }
  }

  return {
    searchBookList,
    query: currentQuery,
    deleteSearchHistory
  }
}

export default useSearchBook

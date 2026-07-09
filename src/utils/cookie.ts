export const SEARCH_HISTORY_COOKIE = "SEARCH_HISTORY" as const

export function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

type SetCookieOptions = {
  days?: number
  sameSite?: "Strict" | "Lax" | "None"
  secure?: boolean
}

export function setCookie(
  name: string,
  value: string,
  { days = 30, sameSite = "Strict", secure = true }: SetCookieOptions = {}
): void {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString()
  const secureFlag = secure ? "; Secure" : ""
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=${sameSite}${secureFlag}`
}

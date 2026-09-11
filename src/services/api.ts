const API_URL = 'https://script.google.com/macros/s/AKfycby2jCdUhnlHVCTh6yzXk-z-rVdV1vrYTrgxXiZqw9xCaRpw4xd_CL__1Q6mM4xFnB5KMw/exec'

interface ApiResponse<T> {
  ok: boolean
  data?: T
  error?: string
}

export async function apiGet<T>(action: string, params: Record<string, string> = {}) {
  const query = new URLSearchParams({ action, ...params })
  const response = await fetch(`${API_URL}?${query.toString()}`)
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
  const result = await response.json() as ApiResponse<T>
  if (!result.ok || result.data === undefined) throw new Error(result.error || 'The API returned an invalid response.')
  return result.data
}

export async function apiPost<T>(body: Record<string, unknown>) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
  const result = await response.json() as ApiResponse<T>
  if (!result.ok || result.data === undefined) throw new Error(result.error || 'The API returned an invalid response.')
  return result.data
}

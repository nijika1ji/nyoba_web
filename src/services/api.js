export const API_URL = 'http://localhost:5000/api'

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.message || 'Terjadi kesalahan pada server')
  }

  return data
}

export async function apiFormRequest(path, formData, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    method: options.method || 'POST',
    body: formData,
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.message || 'Terjadi kesalahan pada server')
  }

  return data
}
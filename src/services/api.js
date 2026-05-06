export const API_URL = 'http://localhost:5000/api'

function getAdminToken() {
  return localStorage.getItem('adminToken') || ''
}

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-admin-token': getAdminToken(),
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
    headers: {
      'x-admin-token': getAdminToken(),
      ...(options.headers || {}),
    },
    body: formData,
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.message || 'Terjadi kesalahan pada server')
  }

  return data
}
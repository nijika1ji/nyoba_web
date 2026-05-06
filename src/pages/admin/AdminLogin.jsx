import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../../services/api'

function AdminLogin() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!password) {
      alert('Password wajib diisi.')
      return
    }

    try {
      setLoading(true)

      const data = await apiRequest('/admin/login', {
        method: 'POST',
        body: JSON.stringify({ password }),
      })

      localStorage.setItem('adminToken', data.token)

      alert('Login admin berhasil.')
      navigate('/admin')
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
          Admin
        </p>

        <h1 className="text-3xl font-bold text-slate-950">
          Login Admin
        </h1>

        <p className="mt-3 text-sm text-slate-600">
          Masukkan password admin untuk mengakses dashboard.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Masukkan password admin"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? 'Memproses...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
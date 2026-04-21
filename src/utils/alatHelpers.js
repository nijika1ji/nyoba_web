export function slugify(text = '') {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function getStatusLabel(item) {
  if (item.tersedia === 0 && item.maintenance === item.totalUnit) {
    return 'Maintenance'
  }

  if (item.tersedia === 0) {
    return 'Stok Habis'
  }

  if (item.tersedia <= Math.max(2, Math.ceil(item.totalUnit / 3))) {
    return 'Stok Terbatas'
  }

  return 'Stok Tersedia'
}

export function getStatusTextClass(status) {
  if (status === 'Stok Tersedia') return 'text-emerald-600'
  if (status === 'Stok Terbatas') return 'text-amber-600'
  if (status === 'Maintenance') return 'text-rose-600'
  return 'text-red-600'
}

export function getStatusBadgeClass(status) {
  if (status === 'Stok Tersedia') {
    return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
  }

  if (status === 'Stok Terbatas') {
    return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
  }

  if (status === 'Maintenance') {
    return 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
  }

  return 'bg-red-50 text-red-700 ring-1 ring-red-200'
}

export function findAlatBySlug(slug, data) {
  return data.find((item) => slugify(item.nama) === slug)
}
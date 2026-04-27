const DEMO_NETWORK_DELAY = 700

export async function submitPeminjamanAlat(payload) {
  await simulateNetwork()
  return createDemoResponse('alat', payload)
}

export async function submitPeminjamanRuangan(payload) {
  await simulateNetwork()
  return createDemoResponse('ruangan', payload)
}

function simulateNetwork() {
  return new Promise((resolve) => {
    window.setTimeout(resolve, DEMO_NETWORK_DELAY)
  })
}

function createDemoResponse(type, payload) {
  return {
    ok: true,
    type,
    payload,
    submittedAt: new Date().toISOString(),
  }
}

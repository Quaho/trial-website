import { useState, useEffect } from 'react'

const STORAGE_KEY = 'quantum_progress'

const MODULES = [
  { id: 'intuition', label: 'Big-Picture Intuition' },
  { id: 'braket',    label: 'Bra-Ket Notation' },
  { id: 'phase',     label: 'Phase & Measurement' },
  { id: 'qiskit',    label: 'Qiskit' },
]

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function useProgress() {
  const [completed, setCompleted] = useState(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed))
  }, [completed])

  function markDone(moduleId) {
    setCompleted(prev => ({ ...prev, [moduleId]: true }))
  }

  function reset() {
    setCompleted({})
  }

  const count = Object.values(completed).filter(Boolean).length

  return { completed, markDone, reset, count, total: MODULES.length, modules: MODULES }
}

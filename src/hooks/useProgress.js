import { useState, useEffect } from 'react'

const STORAGE_KEY = 'quantum_progress_v2'

const MODULES = [
  { id: 'intuition', label: 'Big-Picture Intuition' },
  { id: 'braket',    label: 'Bra-Ket Notation' },
  { id: 'phase',     label: 'Phase & Measurement' },
  { id: 'qiskit',    label: 'Qiskit' },
]

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { modules: {}, lessons: {} }
  } catch {
    return { modules: {}, lessons: {} }
  }
}

export function useProgress() {
  const [state, setState] = useState(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  /** Mark an entire module as complete */
  function markDone(moduleId) {
    setState(prev => ({
      ...prev,
      modules: { ...prev.modules, [moduleId]: true }
    }))
  }

  /** Mark a specific lesson as passed (checkpoint answered correctly) */
  function markLessonPassed(moduleId, lessonIndex) {
    setState(prev => {
      const key = `${moduleId}:${lessonIndex}`
      return {
        ...prev,
        lessons: { ...prev.lessons, [key]: true }
      }
    })
  }

  /** Check if a specific lesson checkpoint has been passed */
  function isLessonPassed(moduleId, lessonIndex) {
    return !!state.lessons[`${moduleId}:${lessonIndex}`]
  }

  /** Get array of passed booleans for a module's lessons */
  function getLessonPassed(moduleId, total) {
    return Array.from({ length: total }, (_, i) => isLessonPassed(moduleId, i))
  }

  function reset() {
    setState({ modules: {}, lessons: {} })
  }

  const completed = state.modules
  const count = Object.values(completed).filter(Boolean).length

  return {
    completed,
    markDone,
    markLessonPassed,
    isLessonPassed,
    getLessonPassed,
    reset,
    count,
    total: MODULES.length,
    modules: MODULES,
  }
}

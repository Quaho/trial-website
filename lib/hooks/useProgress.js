import { useState, useEffect } from 'react'
import { MODULES, TOTAL_LESSONS } from '../data/modules'

const STORAGE_KEY = 'quantum_progress_v3'

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

  /** Mark a specific lesson checkpoint as passed */
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

  /** Get array of passed booleans for all lessons in a module */
  function getLessonPassed(moduleId, total) {
    return Array.from({ length: total }, (_, i) => isLessonPassed(moduleId, i))
  }

  /** Count total lesson checkpoints passed across all modules */
  function getTotalLessonsDone() {
    return MODULES.reduce((sum, m) => {
      return sum + getLessonPassed(m.id, m.lessons).filter(Boolean).length
    }, 0)
  }

  function reset() {
    setState({ modules: {}, lessons: {} })
  }

  const completed = state.modules
  const modulesCompleted = Object.values(completed).filter(Boolean).length

  return {
    completed,
    markDone,
    markLessonPassed,
    isLessonPassed,
    getLessonPassed,
    getTotalLessonsDone,
    reset,
    // module-level counts
    count: modulesCompleted,
    total: MODULES.length,
    modules: MODULES,
    // lesson-level counts
    totalLessons: TOTAL_LESSONS,
  }
}

import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'

const APP_BASE = '/trial-website'
const CHUNK_RETRY_PREFIX = 'chunk-retry'
const PENDING_ROUTE_KEY = 'pending-route'

function stripBase(path) {
  if (!path.startsWith(APP_BASE)) return path || '/'
  const stripped = path.slice(APP_BASE.length)
  return stripped || '/'
}

function lazyWithRecovery(key, importer) {
  return lazy(async () => {
    try {
      const module = await importer()
      sessionStorage.removeItem(`${CHUNK_RETRY_PREFIX}:${key}`)
      return module
    } catch (error) {
      const message = String(error?.message || error)
      const isChunkError = /Failed to fetch dynamically imported module|Importing a module script failed|ChunkLoadError|Failed to load module script/i.test(message)

      if (typeof window !== 'undefined' && isChunkError) {
        const retryKey = `${CHUNK_RETRY_PREFIX}:${key}`
        const hasRetried = sessionStorage.getItem(retryKey) === 'true'

        if (!hasRetried) {
          sessionStorage.setItem(retryKey, 'true')
          const targetPath = stripBase(`${window.location.pathname}${window.location.search}${window.location.hash}`)
          sessionStorage.setItem(PENDING_ROUTE_KEY, targetPath)
          window.location.replace(`${window.location.origin}${APP_BASE}/`)
          return new Promise(() => {})
        }
      }

      throw error
    }
  })
}

const Home = lazyWithRecovery('home', () => import('./pages/Home'))
const Intuition = lazyWithRecovery('intuition', () => import('./pages/Intuition'))
const BraKet = lazyWithRecovery('braket', () => import('./pages/BraKet'))
const PhaseAngle = lazyWithRecovery('phase', () => import('./pages/PhaseAngle'))
const Qiskit = lazyWithRecovery('qiskit', () => import('./pages/Qiskit'))
const Gates = lazyWithRecovery('gates', () => import('./pages/Gates'))
const MultiQubit = lazyWithRecovery('multiqubit', () => import('./pages/MultiQubit'))
const Entanglement = lazyWithRecovery('entanglement', () => import('./pages/Entanglement'))
const Circuits = lazyWithRecovery('circuits', () => import('./pages/Circuits'))
const Measurement = lazyWithRecovery('measurement', () => import('./pages/Measurement'))
const Algorithms = lazyWithRecovery('algorithms', () => import('./pages/Algorithms'))
const Labs = lazyWithRecovery('labs', () => import('./pages/Labs'))
const Noise = lazyWithRecovery('noise', () => import('./pages/Noise'))
const UseCases = lazyWithRecovery('usecases', () => import('./pages/UseCases'))
const Roadmap = lazyWithRecovery('roadmap', () => import('./pages/Roadmap'))
const Glossary = lazyWithRecovery('glossary', () => import('./pages/Glossary'))
const Challenges = lazyWithRecovery('challenges', () => import('./pages/Challenges'))
const References = lazyWithRecovery('references', () => import('./pages/References'))
const FirstCircuit = lazyWithRecovery('first-circuit', () => import('./pages/projects/FirstCircuit'))
const BellExplorer = lazyWithRecovery('bell-explorer', () => import('./pages/projects/BellExplorer'))
const AlgorithmShowdown = lazyWithRecovery('algorithm-showdown', () => import('./pages/projects/AlgorithmShowdown'))

function RouteFallback() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 text-sm text-slate-500">
      Loading page...
    </div>
  )
}

function PendingRouteRestorer() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const pendingRoute = sessionStorage.getItem(PENDING_ROUTE_KEY)
    if (!pendingRoute) return

    const currentRoute = `${location.pathname}${location.search}${location.hash}` || '/'
    if (pendingRoute === currentRoute) {
      sessionStorage.removeItem(PENDING_ROUTE_KEY)
      return
    }

    sessionStorage.removeItem(PENDING_ROUTE_KEY)
    navigate(pendingRoute, { replace: true })
  }, [location.hash, location.pathname, location.search, navigate])

  return null
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-slate-950">
        <ScrollToTop />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navbar />
        <main id="main-content">
          <PendingRouteRestorer />
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              {/* Existing modules */}
              <Route path="/"          element={<Home />} />
              <Route path="/intuition" element={<Intuition />} />
              <Route path="/braket"    element={<BraKet />} />
              <Route path="/phase"     element={<PhaseAngle />} />
              <Route path="/qiskit"    element={<Qiskit />} />

              {/* New modules — stubs until content is built */}
              <Route path="/gates"        element={<Gates />} />
              <Route path="/multiqubit"   element={<MultiQubit />} />
              <Route path="/entanglement" element={<Entanglement />} />
              <Route path="/circuits"     element={<Circuits />} />
              <Route path="/measurement"  element={<Measurement />} />
              <Route path="/algorithms"   element={<Algorithms />} />
              <Route path="/labs"         element={<Labs />} />
              <Route path="/noise"        element={<Noise />} />
              <Route path="/usecases"     element={<UseCases />} />

              {/* Extra pages */}
              <Route path="/roadmap"    element={<Roadmap />} />
              <Route path="/glossary"   element={<Glossary />} />
              <Route path="/references" element={<References />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/projects/first-circuit" element={<FirstCircuit />} />
              <Route path="/projects/bell-explorer" element={<BellExplorer />} />
              <Route path="/projects/algorithm-showdown" element={<AlgorithmShowdown />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </MotionConfig>
  )
}

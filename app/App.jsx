import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'

const Home = lazy(() => import('./pages/Home'))
const Intuition = lazy(() => import('./pages/Intuition'))
const BraKet = lazy(() => import('./pages/BraKet'))
const PhaseAngle = lazy(() => import('./pages/PhaseAngle'))
const Qiskit = lazy(() => import('./pages/Qiskit'))
const Gates = lazy(() => import('./pages/Gates'))
const MultiQubit = lazy(() => import('./pages/MultiQubit'))
const Entanglement = lazy(() => import('./pages/Entanglement'))
const Circuits = lazy(() => import('./pages/Circuits'))
const Measurement = lazy(() => import('./pages/Measurement'))
const Algorithms = lazy(() => import('./pages/Algorithms'))
const Labs = lazy(() => import('./pages/Labs'))
const Noise = lazy(() => import('./pages/Noise'))
const UseCases = lazy(() => import('./pages/UseCases'))
const Roadmap = lazy(() => import('./pages/Roadmap'))
const Glossary = lazy(() => import('./pages/Glossary'))
const Challenges = lazy(() => import('./pages/Challenges'))
const FirstCircuit = lazy(() => import('./pages/projects/FirstCircuit'))
const BellExplorer = lazy(() => import('./pages/projects/BellExplorer'))
const AlgorithmShowdown = lazy(() => import('./pages/projects/AlgorithmShowdown'))

function RouteFallback() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 text-sm text-slate-500">
      Loading page...
    </div>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-slate-950">
        <ScrollToTop />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navbar />
        <main id="main-content">
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

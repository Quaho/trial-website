import { Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'
import Home from './pages/Home'
import Intuition from './pages/Intuition'
import BraKet from './pages/BraKet'
import PhaseAngle from './pages/PhaseAngle'
import Qiskit from './pages/Qiskit'
import Gates from './pages/Gates'
import MultiQubit from './pages/MultiQubit'
import Entanglement from './pages/Entanglement'
import Circuits from './pages/Circuits'
import Measurement from './pages/Measurement'
import Algorithms from './pages/Algorithms'
import Labs from './pages/Labs'
import Noise from './pages/Noise'
import UseCases from './pages/UseCases'
import Roadmap from './pages/Roadmap'
import Glossary from './pages/Glossary'
import Challenges from './pages/Challenges'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-slate-950">
      <ScrollToTop />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <main id="main-content">
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
        </Routes>
      </main>
    </div>
    </MotionConfig>
  )
}

import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Intuition from './pages/Intuition'
import BraKet from './pages/BraKet'
import PhaseAngle from './pages/PhaseAngle'
import Qiskit from './pages/Qiskit'
import ComingSoon from './pages/ComingSoon'

export default function App() {
  return (
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
          <Route path="/gates"        element={<ComingSoon moduleId="gates" />} />
          <Route path="/multiqubit"   element={<ComingSoon moduleId="multiqubit" />} />
          <Route path="/entanglement" element={<ComingSoon moduleId="entanglement" />} />
          <Route path="/circuits"     element={<ComingSoon moduleId="circuits" />} />
          <Route path="/measurement"  element={<ComingSoon moduleId="measurement" />} />
          <Route path="/algorithms"   element={<ComingSoon moduleId="algorithms" />} />
          <Route path="/labs"         element={<ComingSoon moduleId="labs" />} />
          <Route path="/noise"        element={<ComingSoon moduleId="noise" />} />
          <Route path="/usecases"     element={<ComingSoon moduleId="usecases" />} />

          {/* Extra pages — stubs */}
          <Route path="/roadmap"    element={<ComingSoon moduleId="roadmap" />} />
          <Route path="/glossary"   element={<ComingSoon moduleId="glossary" />} />
          <Route path="/challenges" element={<ComingSoon moduleId="challenges" />} />
        </Routes>
      </main>
    </div>
  )
}

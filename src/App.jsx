import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Intuition from './pages/Intuition'
import BraKet from './pages/BraKet'
import PhaseAngle from './pages/PhaseAngle'
import Qiskit from './pages/Qiskit'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main>
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/intuition" element={<Intuition />} />
          <Route path="/braket"    element={<BraKet />} />
          <Route path="/phase"     element={<PhaseAngle />} />
          <Route path="/qiskit"    element={<Qiskit />} />
        </Routes>
      </main>
    </div>
  )
}

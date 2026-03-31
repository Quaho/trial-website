const KEYWORD_STYLES = {
  classical: 'text-slate-100',
  qubit: 'text-indigo-300',
  basis: 'text-fuchsia-300',
  phase: 'text-cyan-300',
  amplitude: 'text-sky-300',
  superposition: 'text-emerald-300',
  measurement: 'text-amber-300',
  interference: 'text-violet-300',
  ket: 'text-indigo-300',
  bra: 'text-violet-300',
  inner: 'text-emerald-300',
  gate: 'text-rose-300',
  unitary: 'text-sky-300',
  circuit: 'text-cyan-300',
  qiskit: 'text-emerald-300',
  backend: 'text-amber-300',
  tensor: 'text-teal-300',
  entanglement: 'text-fuchsia-300',
}

export default function Keyword({ tone = 'qubit', className = '', children }) {
  const toneClass = KEYWORD_STYLES[tone] || KEYWORD_STYLES.qubit
  return <span className={`font-medium ${toneClass}${className ? ` ${className}` : ''}`}>{children}</span>
}

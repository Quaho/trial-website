/**
 * Diagnostic placement question bank for the pilot (Phase 3a — see
 * CLAUDE.md's "Diagnostic Placement & Concept Evidence" section).
 *
 * Originally scoped to the 3 pilot areas only (intuition → states,
 * braket → math-notation, gates → gates). Extended in TASK-039, after
 * the pilot was reviewed, to 4 more areas — math-language, phase, noise,
 * usecases — at lighter density than the pilot (each new area's
 * concepts have exactly 2 tagging questions, not the pilot's 7-8 per
 * area). The other 7 modules from Qiskit onward (qiskit, multiqubit,
 * entanglement, circuits, measurement, algorithms, labs) intentionally
 * have no diagnostic area at all — they got standalone Qiskit Practice
 * Challenges instead (see CLAUDE.md), a real-graded, non-diagnostic
 * mechanism that doesn't fit this file's "select and move on, never
 * reveals correctness" model.
 *
 * This file intentionally does not import concepts.js. Both are siblings
 * feeding useDiagnostic.js (lib/data/modules.js, concepts.js, diagnostic.js
 * → useDiagnostic.js), not dependents of each other. Question `concepts`
 * arrays are kept consistent with concepts.js ids by convention — verify
 * both files together when editing either.
 *
 * Code-reading questions (added after the pilot/rollout above, per direct
 * user request to add "leetcode-like" programming questions to the
 * diagnostic itself): a question may carry an optional `code` field
 * ({ code, language }), rendered above the prompt via the same `CodeBlock`
 * component used everywhere else on the site. Behavior is otherwise
 * IDENTICAL to every other diagnostic question — silent, no-reveal, never
 * gates on getting it right (see DiagnosticQuestion.jsx's own doc
 * comment). This is a real code-reading question, not a reveal-graded
 * exercise; do not confuse it with CodeFillBlank/CodeOrdering, which are
 * a deliberately different, real-graded mechanism kept out of this file
 * (see "Qiskit Practice Challenges" in CLAUDE.md).
 *
 * Scoped to `gates` and `math-language` only, not all 7 areas: those are
 * the only two diagnostic-covered module pages that actually show real
 * code today (Gates.jsx has an established Qiskit gate-matrix vocabulary
 * plus its own CodeFillBlank exercise; Mathematical Language teaches
 * normalization via literal numbers, which maps cleanly onto a short,
 * genuine Python snippet). The other 5 areas' pages (intuition, braket,
 * phase, noise, usecases) show zero code — inventing "programming
 * questions" for them would mean fabricating disconnected snippets, the
 * same failure mode TASK-039 already flagged and avoided for
 * noise/usecases' Qiskit Practice Challenge placement. Flagged here
 * rather than silently narrowing scope.
 */

/**
 * Bump this whenever a question's meaning changes: its prompt, its choices,
 * its correct answer, its concept tags, or the scoring interpretation.
 * Copy/style-only edits (typo fixes, rewording that doesn't change what's
 * being asked or how it's graded) do NOT require a bump.
 *
 * useDiagnostic.js compares this against a student's stored `version`. A
 * mismatch means their stored answers were graded against questions they
 * may never have seen — the UI must treat that as stale and prompt a
 * retake, never silently rescore old answers against the new bank.
 */
export const DIAGNOSTIC_VERSION = 1

export const DIAGNOSTIC_AREAS = [
  { id: 'math-notation', label: 'Mathematical Language & Notation' },
  { id: 'states', label: 'Qubits & Superposition' },
  { id: 'gates', label: 'Single-Qubit Gates' },
  { id: 'math-language', label: 'Complex Numbers & Vectors' },
  { id: 'phase', label: 'Phase & Measurement Angles' },
  { id: 'noise', label: 'Noise & Hardware' },
  { id: 'usecases', label: 'Use Cases' },
]

/**
 * Authoring rule: a concept intended to ever collapse via ConceptSection
 * needs at least 2 questions tagging it (see CLAUDE.md's "Diagnostic
 * Placement & Concept Evidence" — a concept needs >=2 independently
 * correct answers before it counts as demonstrated). A concept tagged by
 * only 1 question here will always read as insufficient-evidence, which is
 * an acceptable pilot outcome, not a bug — some concepts below (e.g.
 * `notation-reading`, `pauli-z`, `s-t-gates`) are deliberately left at 1
 * question, and `quantum-advantage-limits` has none at all.
 */
export const DIAGNOSTIC_QUESTIONS = [
  // ── math-notation (7 questions) ─────────────────────────────────────
  {
    id: 'dq-math-1',
    area: 'math-notation',
    prompt: 'In the state |ψ⟩ = α|0⟩ + β|1⟩, what best describes |0⟩ and |1⟩?',
    choices: [
      'Two possible measurement probabilities',
      'The computational basis states',
      'Two separate, independent qubits',
      'The bra and the ket of the same state',
    ],
    correct: 1,
    concepts: ['ket-notation'],
  },
  {
    id: 'dq-math-2',
    area: 'math-notation',
    prompt: 'Written as a column vector, how is |ψ⟩ = α|0⟩ + β|1⟩ expressed?',
    choices: [
      '(α, β) as a two-entry column vector',
      '(α + β) as a single number',
      '(1, 1) regardless of α and β',
      '(β, α), with the entries swapped',
    ],
    correct: 0,
    concepts: ['ket-notation'],
  },
  {
    id: 'dq-math-3',
    area: 'math-notation',
    prompt: 'If |ψ⟩ is the column vector (α, β), what is the matching bra ⟨ψ|?',
    choices: [
      'The same column vector (α, β)',
      'The conjugate transpose, written as the row vector (α*, β*)',
      'The normalized version of |ψ⟩',
      'An unrelated state with its own amplitudes',
    ],
    correct: 1,
    concepts: ['bra-notation'],
  },
  {
    id: 'dq-math-4',
    area: 'math-notation',
    prompt: 'Why does forming a bra from a ket involve complex conjugation?',
    choices: [
      'So that kets and bras can be swapped freely in any expression',
      'So that inner products like ⟨ψ|ψ⟩ come out real and non-negative',
      'It is a notational convention with no mathematical necessity',
      'So that the bra has more entries than the ket',
    ],
    correct: 1,
    concepts: ['bra-notation'],
  },
  {
    id: 'dq-math-5',
    area: 'math-notation',
    prompt: 'What is ⟨0|0⟩ for the computational basis state |0⟩?',
    choices: ['0', '1', 'i', '1/√2'],
    correct: 1,
    concepts: ['inner-product'],
  },
  {
    id: 'dq-math-6',
    area: 'math-notation',
    prompt: 'What is ⟨0|1⟩ for the computational basis states |0⟩ and |1⟩?',
    choices: ['1, because both are valid states', '0, because the states are orthogonal', '1/√2', '-1'],
    correct: 1,
    concepts: ['inner-product'],
  },
  {
    id: 'dq-math-7',
    area: 'math-notation',
    prompt: 'Given P(φ) = |⟨φ|ψ⟩|², what does squaring the inner product give you?',
    choices: [
      'The amplitude of |ψ⟩ directly',
      'The probability of measuring outcome |φ⟩',
      'The normalization constant for |ψ⟩',
      'The phase difference between |φ⟩ and |ψ⟩',
    ],
    correct: 1,
    concepts: ['notation-reading'],
  },

  // ── states (7 questions) ─────────────────────────────────────────────
  {
    id: 'dq-states-1',
    area: 'states',
    prompt: 'How does a classical bit differ from a qubit in how its state is described?',
    choices: [
      'A classical bit takes a definite value 0 or 1; a qubit is described by amplitudes over both basis states',
      'A qubit can only take the value 1',
      'They are described identically until measured',
      'A classical bit can be in superposition, but a qubit cannot',
    ],
    correct: 0,
    concepts: ['classical-vs-qubit'],
  },
  {
    id: 'dq-states-2',
    area: 'states',
    prompt: "A single qubit's state before measurement is best described as:",
    choices: [
      'A hidden classical value that measurement simply reveals',
      'A combination of |0⟩ and |1⟩ weighted by amplitudes',
      'Always exactly |0⟩ until acted on',
      'Undefined until a gate is applied',
    ],
    correct: 1,
    concepts: ['classical-vs-qubit'],
  },
  {
    id: 'dq-states-3',
    area: 'states',
    prompt: 'What does it mean for a qubit to be in superposition?',
    choices: [
      'It is secretly 0 or 1, we just do not know which yet',
      'Its state is a linear combination of basis states with amplitudes',
      'It is entangled with another qubit',
      'It has been measured twice',
    ],
    correct: 1,
    concepts: ['superposition'],
  },
  {
    id: 'dq-states-4',
    area: 'states',
    prompt: 'For |ψ⟩ = (1/√2)|0⟩ + (1/√2)|1⟩, what determines the probability of each measurement outcome?',
    choices: [
      'The amplitude values directly, without modification',
      'The squared magnitude of each amplitude',
      'A coin flip unrelated to the amplitudes',
      'The order the basis states are written in',
    ],
    correct: 1,
    concepts: ['superposition', 'measurement-collapse'],
  },
  {
    id: 'dq-states-5',
    area: 'states',
    prompt: 'What happens immediately after a qubit in superposition is measured in the computational basis?',
    choices: [
      'It returns one definite classical outcome, 0 or 1',
      'It returns both 0 and 1 simultaneously',
      'It stays in superposition, unaffected',
      'It returns a probability value instead of an outcome',
    ],
    correct: 0,
    concepts: ['measurement-collapse'],
  },
  {
    id: 'dq-states-6',
    area: 'states',
    prompt: 'What is interference, in terms of amplitudes?',
    choices: [
      'Noise from the environment that corrupts a qubit',
      'The way amplitudes combine, reinforcing or canceling and changing measurement probabilities',
      'A synonym for entanglement between two qubits',
      'The process of reading out a measurement result',
    ],
    correct: 1,
    concepts: ['interference'],
  },
  {
    id: 'dq-states-7',
    area: 'states',
    prompt: 'Why does interference matter for quantum algorithms?',
    choices: [
      'It lets an algorithm route amplitude toward correct answers and away from incorrect ones',
      'It has no algorithmic use; it is only a theoretical curiosity',
      'It only matters for error correction, not algorithms',
      'It replaces the need for measurement entirely',
    ],
    correct: 0,
    concepts: ['interference'],
  },

  // ── gates (10 questions) ─────────────────────────────────────────────
  {
    id: 'dq-gates-1',
    area: 'gates',
    prompt: "What property must every single-qubit gate's 2×2 matrix U satisfy?",
    choices: ['U = U²', 'U†U = I (unitarity)', 'U has only real entries', 'U must be diagonal'],
    correct: 1,
    concepts: ['unitary-gate'],
  },
  {
    id: 'dq-gates-2',
    area: 'gates',
    prompt: 'Why must quantum gates be reversible?',
    choices: [
      'Because they are unitary operators, and unitary operators always have an inverse',
      'Because measurement is also reversible',
      'Reversibility is a convention, not a requirement',
      'Because classical logic gates are reversible too',
    ],
    correct: 0,
    concepts: ['unitary-gate'],
  },
  {
    id: 'dq-gates-3',
    area: 'gates',
    prompt: 'What does the Pauli-X gate do to the computational basis states?',
    choices: [
      'It leaves both |0⟩ and |1⟩ unchanged',
      'It swaps |0⟩ and |1⟩',
      'It multiplies |1⟩ by -1',
      'It creates a superposition of |0⟩ and |1⟩',
    ],
    correct: 1,
    concepts: ['pauli-x'],
  },
  {
    id: 'dq-gates-4',
    area: 'gates',
    prompt: 'Why does X|+⟩ = |+⟩, even though X flips |0⟩ and |1⟩?',
    choices: [
      'Because |+⟩ is an eigenstate of X',
      'Because X does not actually act on |+⟩',
      'Because |+⟩ is not a valid quantum state',
      'Because X only acts on the second qubit in a system',
    ],
    correct: 0,
    concepts: ['pauli-x'],
  },
  {
    id: 'dq-gates-5',
    area: 'gates',
    prompt: 'What does the Pauli-Z gate do to |0⟩ and |1⟩?',
    choices: [
      'It swaps |0⟩ and |1⟩, like X',
      'It leaves |0⟩ unchanged and multiplies |1⟩ by -1',
      'It leaves both states completely unchanged',
      'It creates an equal superposition of both',
    ],
    correct: 1,
    concepts: ['pauli-z'],
  },
  {
    id: 'dq-gates-6',
    area: 'gates',
    prompt: 'What does the Hadamard gate do to |0⟩?',
    choices: [
      'Maps it to |1⟩',
      'Maps it to |+⟩ = (|0⟩ + |1⟩)/√2',
      'Leaves it unchanged',
      'Maps it to -|0⟩',
    ],
    correct: 1,
    concepts: ['hadamard'],
  },
  {
    id: 'dq-gates-7',
    area: 'gates',
    prompt: 'What does H² = I tell you about the Hadamard gate?',
    choices: [
      'Applying H twice returns the original state — H is its own inverse',
      'H has no effect on any state',
      'H must be applied exactly twice to work',
      'H is not a valid unitary gate',
    ],
    correct: 0,
    concepts: ['hadamard'],
  },
  {
    id: 'dq-gates-8',
    area: 'gates',
    prompt: 'What do the identities S² = Z and T² = S express?',
    choices: [
      'S and T are unrelated to Z',
      'S and T are nested rotations about the same axis as Z',
      'S and T are bit-flip gates like X',
      'S and T undo the effect of the Hadamard gate',
    ],
    correct: 1,
    concepts: ['s-t-gates'],
  },
  {
    id: 'dq-gates-9',
    area: 'gates',
    prompt: 'Starting from |0⟩, what state does this circuit leave the qubit in?',
    code: { code: 'qc = QuantumCircuit(1)\nqc.h(0)\nqc.z(0)', language: 'python' },
    choices: [
      '|0⟩, unchanged',
      '|+⟩ = (|0⟩ + |1⟩)/√2',
      '|−⟩ = (|0⟩ − |1⟩)/√2',
      '|1⟩',
    ],
    correct: 2,
    concepts: ['hadamard', 'pauli-z'],
  },
  {
    id: 'dq-gates-10',
    area: 'gates',
    prompt: 'Starting from |0⟩, what state does this circuit leave the qubit in?',
    code: { code: 'qc = QuantumCircuit(1)\nqc.x(0)\nqc.x(0)', language: 'python' },
    choices: [
      '|0⟩ — the two X gates cancel, since X² = I',
      '|1⟩',
      '|+⟩',
      'This is invalid — a gate cannot be applied twice',
    ],
    correct: 0,
    concepts: ['pauli-x'],
  },

  // ── math-language (4 questions) ─────────────────────────────────────
  {
    id: 'dq-mathlang-1',
    area: 'math-language',
    prompt: 'A vector v = (a, b) is normalized when:',
    choices: [
      'a + b = 1',
      '|a|² + |b|² = 1',
      'a = b',
      'The product a·b equals 1',
    ],
    correct: 1,
    concepts: ['vector-normalization'],
  },
  {
    id: 'dq-mathlang-2',
    area: 'math-language',
    prompt: 'Which of these vectors is normalized?',
    choices: ['(3/5, 4/5)', '(1, 1)', '(3, 4)', '(1/2, 1/2)'],
    correct: 0,
    concepts: ['vector-normalization'],
  },
  {
    id: 'dq-mathlang-3',
    area: 'math-language',
    prompt: 'What does this code evaluate to?',
    code: { code: 'a, b = 0.6, 0.8\na**2 + b**2', language: 'python' },
    choices: ['0.0', '0.7', '1.0', '1.4'],
    correct: 2,
    concepts: ['vector-normalization'],
  },
  {
    id: 'dq-mathlang-4',
    area: 'math-language',
    prompt: 'This code checks whether (a, b) = (1, 1) is normalized. What does the result tell you?',
    code: { code: 'a, b = 1, 1\na**2 + b**2', language: 'python' },
    choices: [
      'The result is 1, so (1, 1) is normalized',
      'The result is 2, so (1, 1) is not normalized — it would need to be divided by √2',
      'The result is 0, so (1, 1) is the zero vector',
      'The code raises an error — normalization only applies to complex numbers',
    ],
    correct: 1,
    concepts: ['vector-normalization'],
  },

  // ── phase (4 questions) ──────────────────────────────────────────────
  {
    id: 'dq-phase-1',
    area: 'phase',
    prompt: 'What does phase add to a quantum amplitude, beyond an ordinary classical probability?',
    choices: [
      'Nothing — phase and probability are the same thing',
      'A directional (complex) part that enables constructive and destructive interference',
      'Phase makes the amplitude negative',
      'Phase only applies to systems with two or more qubits',
    ],
    correct: 1,
    concepts: ['phase-vs-probability'],
  },
  {
    id: 'dq-phase-2',
    area: 'phase',
    prompt: 'If -|ψ⟩ differs from |ψ⟩ only by an overall factor of -1 (a global phase), what happens to measurement statistics?',
    choices: [
      'They are unaffected, in every basis',
      'They flip completely',
      'The probabilities become negative',
      'It depends on which basis you measure in',
    ],
    correct: 0,
    concepts: ['phase-vs-probability'],
  },
  {
    id: 'dq-phase-3',
    area: 'phase',
    prompt: '|+⟩ and |-⟩ share the same computational-basis (Z-basis) probabilities. How can you actually tell them apart?',
    choices: [
      'You can\'t — they are the identical state',
      'Apply a Hadamard gate before measuring in the Z basis',
      'Measure the same qubit more times in the Z basis',
      'Compare the sign of their probabilities',
    ],
    correct: 1,
    concepts: ['basis-dependent-phase'],
  },
  {
    id: 'dq-phase-4',
    area: 'phase',
    prompt: 'What actually distinguishes |+⟩ = (|0⟩ + |1⟩)/√2 from |-⟩ = (|0⟩ - |1⟩)/√2?',
    choices: [
      'Nothing — they are the same state',
      'A relative phase between the |0⟩ and |1⟩ components',
      '|-⟩ is not normalized',
      '|+⟩ has more total probability',
    ],
    correct: 1,
    concepts: ['basis-dependent-phase'],
  },

  // ── noise (2 questions) ──────────────────────────────────────────────
  {
    id: 'dq-noise-1',
    area: 'noise',
    prompt: "An ideal Bell-state simulation returns only '00' and '11'. On real hardware, you sometimes also see '01' and '10'. What does that indicate?",
    choices: [
      'The circuit was built incorrectly',
      'Ordinary hardware noise, not a bug',
      'The simulator is broken',
      'Entanglement failed completely',
    ],
    correct: 1,
    concepts: ['hardware-noise'],
  },
  {
    id: 'dq-noise-2',
    area: 'noise',
    prompt: 'Which best describes hardware noise, as distinct from a coding error?',
    choices: [
      'Unwanted physical effects — stray bit flips, phase errors, measurement mistakes — that cause real output to diverge from the ideal prediction',
      'A missing import statement',
      'An incorrectly ordered gate sequence',
      'A typo in a qubit index',
    ],
    correct: 0,
    concepts: ['hardware-noise'],
  },

  // ── usecases (2 questions) ───────────────────────────────────────────
  {
    id: 'dq-usecases-1',
    area: 'usecases',
    prompt: 'What does NISQ stand for?',
    choices: [
      'Noisy Intermediate-Scale Quantum',
      'New Interactive Simulation of Qubits',
      'Non-Ideal Superconducting Qubits',
      'Networked Integrated Small Quantum',
    ],
    correct: 0,
    concepts: ['nisq-limitations'],
  },
  {
    id: 'dq-usecases-2',
    area: 'usecases',
    prompt: "Roughly how far are today's NISQ devices from what fault-tolerant, large-scale quantum computing requires?",
    choices: [
      'Already there',
      'Roughly 1,000x short in qubit count and 100x short in error rate',
      'Only a software update away',
      'About 2x short in qubit count',
    ],
    correct: 1,
    concepts: ['nisq-limitations'],
  },
]

/** Questions grouped by area, for the sectioned diagnostic UI. */
export const DIAGNOSTIC_QUESTIONS_BY_AREA = DIAGNOSTIC_AREAS.reduce((acc, area) => {
  acc[area.id] = DIAGNOSTIC_QUESTIONS.filter((q) => q.area === area.id)
  return acc
}, {})

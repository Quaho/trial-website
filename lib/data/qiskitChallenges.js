/**
 * Qiskit Challenges — a standalone, LeetCode-style problem set, added at
 * direct user request alongside the diagnostic's own new code-reading
 * questions (see lib/data/diagnostic.js). This is a THIRD, separate
 * mechanism from both the Diagnostic (silent, no-reveal, advisory) and
 * the inline "Qiskit Practice Challenges" (one CodeFillBlank/CodeOrdering
 * embedded per module page) — see CLAUDE.md's "Qiskit Challenges"
 * section for the full rationale and how it differs from both.
 *
 * Same constraints as the existing Qiskit Practice Challenges: no code
 * execution (static site, no backend/sandbox), so grading is a select-
 * based fill-in-the-blank, exact-match against `correctIndex` — not free
 * text. Every snippet uses only syntax already established elsewhere on
 * the site (QuantumCircuit, .h/.x/.z/.s/.cx, .measure/.measure_all,
 * AerSimulator-style counts framing).
 *
 * Deliberately NOT using the reorder-lines format (CodeOrdering's
 * pattern) here: several natural candidates for reordering involve gates
 * that commute (e.g. two CX gates sharing a control but targeting
 * different qubits, as in a GHZ recipe), which would make more than one
 * ordering legitimately correct — a real grading-correctness risk for a
 * component that only checks one exact sequence. Every problem below is
 * a single-blank fill instead, where exactly one choice is correct.
 *
 * Every problem's correct answer and explanation is grounded in a fact
 * already established elsewhere on the site (cited in each `groundedIn`
 * field below) — not invented for this file.
 *
 * Fields:
 *   id            – stable slug
 *   number        – display order / problem number
 *   title         – LeetCode-style problem title
 *   difficulty    – 'Easy' | 'Medium' | 'Hard' (informational metadata
 *                   about problem complexity, not a reward mechanic)
 *   moduleId      – which MODULES[] entry this problem's content comes from
 *   statement     – the problem description
 *   example       – { input, output } — an illustrative, non-executed
 *                   example, framed the way LeetCode frames "Example 1"
 *   before, after – non-editable code lines around the blank
 *   choices       – full statement strings, one is correct
 *   correctIndex  – index into `choices`
 *   explanation   – shown after checking, correct or not
 *   groundedIn    – short note on which existing page/fact this reuses
 */

export const QISKIT_CHALLENGES = [
  {
    id: 'qc-1',
    number: 1,
    title: 'Prepare a Deterministic |1⟩',
    difficulty: 'Easy',
    moduleId: 'gates',
    statement:
      'A qubit starts in |0⟩. Complete the circuit so it measures 1 on every single shot.',
    example: { input: '|0⟩', output: "'1' (every shot)" },
    before: ['qc = QuantumCircuit(1, 1)'],
    choices: ['qc.h(0)', 'qc.x(0)', 'qc.z(0)', 'qc.s(0)'],
    correctIndex: 1,
    after: ['qc.measure(0, 0)'],
    explanation:
      'X flips |0⟩ to |1⟩ deterministically. H creates a 50/50 superposition instead. Z and S both leave |0⟩ completely unchanged — they only add phase to the |1⟩ component, which is not present yet.',
    groundedIn: "Gates' Pauli-X and Pauli-Z definitions, and the S/T gate matrices.",
  },
  {
    id: 'qc-2',
    number: 2,
    title: 'Measure a Superposition',
    difficulty: 'Easy',
    moduleId: 'qiskit',
    statement:
      'The qubit is already in |+⟩. Complete the circuit so classical bit 0 records the measurement outcome.',
    example: { input: '|+⟩', output: "~50% '0', ~50% '1' over many shots" },
    before: ['qc = QuantumCircuit(1, 1)', 'qc.h(0)'],
    choices: ['qc.measure(0, 0)', 'qc.measure(1, 0)', 'qc.h(0)', 'return qc'],
    correctIndex: 0,
    after: [],
    explanation:
      'measure(0, 0) reads qubit 0 into classical bit 0. measure(1, 0) refers to a qubit index that does not exist in a 1-qubit register. Repeating h(0) would undo the superposition, since H² = I. return qc is not a circuit instruction.',
    groundedIn: "Qiskit module's minimal create → gate → measure workflow; H² = I from Gates.",
  },
  {
    id: 'qc-3',
    number: 3,
    title: 'Build the State |01⟩',
    difficulty: 'Medium',
    moduleId: 'multiqubit',
    statement:
      'Starting from |00⟩, complete the circuit so it deterministically reaches |01⟩.',
    example: { input: '|00⟩', output: "'01' (every shot)" },
    before: ['qc = QuantumCircuit(2)'],
    choices: ['qc.x(0)', 'qc.x(1)', 'qc.h(1)', 'qc.cx(1, 0)'],
    correctIndex: 1,
    after: [],
    explanation:
      'x(1) flips only the second qubit — the leftmost digit in the |01⟩ label — from |00⟩. x(0) would flip the first qubit instead, giving |10⟩. h(1) creates a superposition, not a definite |1⟩. cx(1, 0) does nothing, since its control qubit starts at |0⟩.',
    groundedIn: "MultiQubit's own \"Build the State |10⟩\" exercise and its little-endian ordering explanation.",
  },
  {
    id: 'qc-4',
    number: 4,
    title: 'Entangle in the Right Direction',
    difficulty: 'Medium',
    moduleId: 'circuits',
    statement:
      'Qubit 0 has already been put into superposition. Complete the circuit so both qubits become entangled into |Φ+⟩.',
    example: { input: '|00⟩ → H(0)', output: "~50% '00', ~50% '11', never '01'/'10'" },
    before: ['qc = QuantumCircuit(2, 2)', 'qc.h(0)'],
    choices: ['qc.cx(0, 1)', 'qc.cx(1, 0)', 'qc.x(1)', 'qc.h(1)'],
    correctIndex: 0,
    after: ['qc.measure_all()'],
    explanation:
      'cx(0, 1) uses the superposed qubit 0 as control, entangling both qubits into |Φ+⟩. cx(1, 0) uses qubit 1 — still |0⟩ — as control, so the gate does nothing and the qubits stay unentangled. x(1) and h(1) do not create the correlation between qubits that a CNOT does.',
    groundedIn: "Entanglement's Bell-state (H + CX) derivation and its own note that reversing the two gates leaves the qubits unentangled.",
  },
  {
    id: 'qc-5',
    number: 5,
    title: 'Prepare |Ψ+⟩ Instead of |Φ+⟩',
    difficulty: 'Hard',
    moduleId: 'entanglement',
    statement:
      'The standard Bell recipe (H then CX) prepares |Φ+⟩, where the two qubits always agree. Complete the circuit so it instead prepares |Ψ+⟩, where they always disagree.',
    example: { input: '|00⟩', output: "~50% '01', ~50% '10', never '00'/'11'" },
    before: ['qc = QuantumCircuit(2)', 'qc.h(0)'],
    choices: ['qc.x(1)', 'qc.z(1)', 'qc.x(0)', 'qc.h(1)'],
    correctIndex: 0,
    after: ['qc.cx(0, 1)'],
    explanation:
      'Flipping qubit 1 with X before entangling swaps the correlation pattern: the qubits now always disagree instead of always agreeing. z(1) only adds a phase, not a bit flip. x(0) flips the control qubit instead of the target. h(1) would break the perfect correlation entirely.',
    groundedIn: "Bell State Explorer (Machine Project): prepending qc.x(1) before qc.cx(0, 1) prepares |Ψ+⟩ instead of |Φ+⟩.",
  },
  {
    id: 'qc-6',
    number: 6,
    title: 'Complete a GHZ-State Recipe',
    difficulty: 'Hard',
    moduleId: 'labs',
    statement:
      'Extend the two-qubit Bell recipe to three qubits. Complete the circuit so it prepares a GHZ state.',
    example: { input: '|000⟩', output: "~50% '000', ~50% '111', no other outcomes" },
    before: ['qc = QuantumCircuit(3)', 'qc.h(0)', 'qc.cx(0, 1)'],
    choices: ['qc.cx(0, 2)', 'qc.cx(1, 2)', 'qc.h(2)', 'qc.cx(2, 0)'],
    correctIndex: 0,
    after: ['qc.measure_all()'],
    explanation:
      'Both entangling gates must be controlled by qubit 0, the one carrying the superposition — cx(0, 2) extends the same correlation to the third qubit. cx(1, 2) would link qubits 1 and 2 but leave qubit 0 out of the correlation. h(2) just adds an independent superposition. cx(2, 0) uses the wrong qubit — qubit 2, still |0⟩ — as control, so it does nothing.',
    groundedIn: "Labs' own GHZ mini-experiment: qc.h(0), qc.cx(0, 1), qc.cx(0, 2), qc.measure_all() → |000⟩/|111⟩ each ~50%.",
  },
]

/**
 * Concept graph for the Diagnostic Placement pilot (Phase 3a — see
 * CLAUDE.md's "Diagnostic Placement & Concept Evidence" section).
 *
 * This is deliberately finer-grained than MODULES[].prereqs in modules.js
 * and sits alongside it, not in place of it: MODULES[].prereqs keeps
 * driving navigation/Roadmap exactly as before. CONCEPTS exists only to
 * give the diagnostic and ConceptSection something more specific than
 * "have you done the whole module" to reason about.
 *
 * Scope: pilot only. Covers the three pilot modules — intuition, braket,
 * gates — not the full 13-module handbook. Do not add concepts for other
 * modules until the pilot is reviewed (CLAUDE.md, Phase 3a).
 *
 * Fields:
 *   id       – stable slug, referenced by DIAGNOSTIC_QUESTIONS[].concepts
 *              in diagnostic.js and by ConceptSection's `conceptIds` prop
 *   label    – short human-readable name
 *   area     – one of DIAGNOSTIC_AREAS[].id in diagnostic.js
 *   moduleId – which MODULES[] entry (modules.js) currently teaches this
 *   sectionId – the <section id="..."> in that page's outline this concept
 *              lives under, so a future ConceptSection wrapper can be
 *              placed correctly without re-deriving the mapping
 *   prereqs  – concept-level prerequisites, finer-grained than module-level
 */

export const CONCEPTS = [
  // ── Intuition ────────────────────────────────────────────────────────
  {
    id: 'classical-vs-qubit',
    label: 'Classical bits vs. qubits',
    area: 'states',
    moduleId: 'intuition',
    sectionId: 'intuition-bits',
    prereqs: [],
  },
  {
    id: 'superposition',
    label: 'Superposition',
    area: 'states',
    moduleId: 'intuition',
    sectionId: 'intuition-superposition',
    prereqs: ['classical-vs-qubit'],
  },
  {
    id: 'measurement-collapse',
    label: 'Measurement and collapse',
    area: 'states',
    moduleId: 'intuition',
    sectionId: 'intuition-measurement',
    prereqs: ['superposition'],
  },
  {
    id: 'interference',
    label: 'Interference',
    area: 'states',
    moduleId: 'intuition',
    sectionId: 'intuition-interference',
    prereqs: ['superposition'],
  },
  {
    id: 'quantum-advantage-limits',
    label: 'Why quantum computing matters, and its limits',
    area: 'states',
    moduleId: 'intuition',
    sectionId: 'intuition-limits',
    prereqs: ['interference', 'measurement-collapse'],
    // No diagnostic questions tag this concept in the pilot bank (see
    // diagnostic.js) — it is context/motivation rather than a testable
    // fact, so it always reads as insufficient-evidence and never
    // collapses. Intentional, not a gap to fill reflexively.
  },

  // ── Bra-Ket ──────────────────────────────────────────────────────────
  {
    id: 'ket-notation',
    label: 'Ket notation |ψ⟩ and the computational basis',
    area: 'math-notation',
    moduleId: 'braket',
    sectionId: 'braket-kets',
    prereqs: ['classical-vs-qubit'],
  },
  {
    id: 'bra-notation',
    label: 'Bra notation ⟨ψ| as the conjugate-transpose dual vector',
    area: 'math-notation',
    moduleId: 'braket',
    sectionId: 'braket-bras',
    prereqs: ['ket-notation'],
  },
  {
    id: 'inner-product',
    label: 'Inner products and overlap',
    area: 'math-notation',
    moduleId: 'braket',
    sectionId: 'braket-inner-products',
    prereqs: ['bra-notation'],
  },
  {
    id: 'notation-reading',
    label: 'Reading bra-ket notation in practice',
    area: 'math-notation',
    moduleId: 'braket',
    sectionId: 'braket-reading',
    prereqs: ['inner-product'],
  },

  // ── Gates ────────────────────────────────────────────────────────────
  {
    id: 'unitary-gate',
    label: 'Single-qubit gates as unitary operators',
    area: 'gates',
    moduleId: 'gates',
    sectionId: 'gates-unitary',
    prereqs: ['ket-notation'],
  },
  {
    id: 'pauli-x',
    label: 'Pauli-X gate',
    area: 'gates',
    moduleId: 'gates',
    sectionId: 'gates-x',
    prereqs: ['unitary-gate'],
  },
  {
    id: 'pauli-z',
    label: 'Pauli-Z gate',
    area: 'gates',
    moduleId: 'gates',
    sectionId: 'gates-z',
    prereqs: ['unitary-gate'],
  },
  {
    id: 'hadamard',
    label: 'Hadamard gate',
    area: 'gates',
    moduleId: 'gates',
    sectionId: 'gates-h',
    prereqs: ['pauli-x', 'pauli-z'],
  },
  {
    id: 's-t-gates',
    label: 'S and T phase gates',
    area: 'gates',
    moduleId: 'gates',
    sectionId: 'gates-phase',
    prereqs: ['hadamard'],
  },
]

/** O(1) lookup, used by useDiagnostic.js and ConceptSection. */
export const CONCEPTS_BY_ID = Object.fromEntries(CONCEPTS.map((c) => [c.id, c]))

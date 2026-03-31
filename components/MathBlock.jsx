import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export function MathInline({ children }) {
  return <InlineMath math={children} />
}

export function MathDisplay({ children }) {
  return (
    <div className="math-display my-5 w-full overflow-x-auto">
      <BlockMath math={children} />
    </div>
  )
}

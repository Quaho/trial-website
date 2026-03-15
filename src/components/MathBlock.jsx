import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

export function Math({ children }) {
  return <InlineMath math={children} />
}

export function MathDisplay({ children }) {
  return (
    <div className="my-4 w-full overflow-x-auto">
      <BlockMath math={children} />
    </div>
  )
}

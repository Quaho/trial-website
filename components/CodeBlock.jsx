import { useState, useEffect, useRef } from 'react'
import { Copy, Check } from 'lucide-react'
import Prism from 'prismjs'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-bash'

export default function CodeBlock({ code, language = 'python', label }) {
  const [copied, setCopied] = useState(false)
  const codeRef = useRef(null)

  useEffect(() => {
    if (codeRef.current) Prism.highlightElement(codeRef.current)
  }, [code, language])

  function copy() {
    navigator.clipboard.writeText(code.trim()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="rounded-xl overflow-hidden border border-slate-800">
      <div className="flex items-center justify-between bg-slate-900 px-4 py-2.5 border-b border-slate-800">
        <span className="text-xs text-slate-500 font-mono">{label || language}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 px-2 py-1 -my-0.5 rounded-lg text-xs text-slate-500 hover:text-slate-200 transition-colors
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          aria-label="Copy code"
        >
          {copied
            ? <Check className="w-3.5 h-3.5 text-green-400" />
            : <Copy className="w-3.5 h-3.5" />
          }
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto code-scroll bg-slate-950 m-0 leading-relaxed">
        <code ref={codeRef} className={`language-${language} text-sm font-mono`}>
          {code.trim()}
        </code>
      </pre>
    </div>
  )
}

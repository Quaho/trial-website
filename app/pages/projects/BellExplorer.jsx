import { Link } from 'react-router-dom'
import { ChevronLeft, Lock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function BellExplorer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="min-h-screen"
    >
      <div className="bg-gradient-to-b from-teal-950/70 to-slate-950 border-b border-slate-800 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            to="/roadmap"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-white mb-6 transition-colors
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 rounded"
          >
            <ChevronLeft className="w-4 h-4" />
            Course Roadmap
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border border-teal-800/40 bg-teal-900/40 text-teal-400">
              Machine Project 2
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Bell State Explorer</h1>
          <p className="text-slate-400 mt-2">Coming soon — complete the Circuits track to unlock.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center gap-3 text-slate-500">
          <Lock className="w-5 h-5" />
          <p>This project is under construction. Check back soon!</p>
        </div>
      </div>
    </motion.div>
  )
}

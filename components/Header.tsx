import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-cosmic-dark/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-2xl">🌌</span>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-sm font-bold tracking-widest text-cosmic-glow text-glow sm:text-base">
              SPACETIME NAVIGATORS
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400 sm:text-xs">
              Guild Gallery
            </span>
          </div>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-slate-300 transition-colors hover:text-cosmic-glow">
            Gallery
          </Link>
          <Link href="/collections" className="text-slate-300 transition-colors hover:text-cosmic-glow">
            Collections
          </Link>
        </nav>
      </div>
    </header>
  )
}
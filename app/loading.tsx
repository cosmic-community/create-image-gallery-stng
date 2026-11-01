export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-cosmic-glow/30 border-t-cosmic-glow" />
        <p className="font-display text-sm tracking-widest text-cosmic-glow">
          NAVIGATING SPACETIME...
        </p>
      </div>
    </div>
  )
}
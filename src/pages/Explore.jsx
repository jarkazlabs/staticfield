// Explore.jsx — Responsive
import DiscoveryFeed from '../components/DiscoveryFeed.jsx'

export default function Explore() {
  return (
    <div className="min-h-screen pt-14 bg-ss-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-10 sm:pt-14 pb-8 sm:pb-10 border-b border-ss-border">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-ss-accent" />
            <span className="font-sans text-2xs text-ss-ghost tracking-widest uppercase">Discovery</span>
          </div>
          <h1 className="font-sans font-bold text-3xl sm:text-5xl text-ss-ink">Explore Signals</h1>
          <p className="text-sm text-ss-dim mt-2 max-w-md">
            Fragments from the archive — images, sounds, gear, notes and connections.
          </p>
        </div>
      </div>
      <DiscoveryFeed />
    </div>
  )
}

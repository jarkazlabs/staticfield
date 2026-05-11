// Explore.jsx — Discovery Feed mit kuratierten Sektionen
import DiscoveryFeed from '../components/DiscoveryFeed.jsx'

export default function Explore() {
  return (
    <div className="min-h-screen pt-14 bg-ss-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="pt-14 pb-10 border-b border-ss-border">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-ss-accent" />
            <span className="font-sans text-2xs text-ss-ghost tracking-widest uppercase">Discovery</span>
          </div>
          <h1 className="font-sans font-bold text-5xl text-ss-ink">Explore Signals</h1>
          <p className="text-sm text-ss-dim mt-2 max-w-md">
            Curated signals from sound, texture and signal culture. Keep scrolling.
          </p>
        </div>
      </div>
      <DiscoveryFeed />
    </div>
  )
}

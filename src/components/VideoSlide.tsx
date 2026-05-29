import { useEffect, useRef, useState } from 'react'

type Props = {
  /** clips played back-to-back */
  sources: string[]
  poster?: string
  /** hold-to-pause from the parent */
  paused: boolean
  /** advance the story once the final clip finishes */
  onEnded: () => void
  /** report overall 0..1 progress across all clips to drive the progress bar */
  onProgress: (p: number) => void
}

export function VideoSlide({ sources, poster, paused, onEnded, onProgress }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const bgRef = useRef<HTMLVideoElement>(null)
  const [clip, setClip] = useState(0)
  const [failed, setFailed] = useState(false)

  const total = sources.length

  // mirror parent pause state onto both video elements
  useEffect(() => {
    const vids = [ref.current, bgRef.current]
    if (failed) return
    for (const v of vids) {
      if (!v) continue
      if (paused) v.pause()
      else void v.play().catch(() => {})
    }
  }, [paused, failed, clip])

  const handleEnded = () => {
    if (clip < total - 1) setClip((c) => c + 1)
    else onEnded()
  }

  const handleError = () => {
    // skip a broken clip rather than blocking the montage
    if (clip < total - 1) setClip((c) => c + 1)
    else setFailed(true)
  }

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-bg-light">
      {!failed ? (
        <>
          {/* blurred copy fills the letterbox bars so nothing looks empty */}
          <video
            ref={bgRef}
            key={`bg-${clip}`}
            className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
            src={sources[clip]}
            playsInline
            autoPlay
            muted
            aria-hidden
          />
          {/* the actual clip, shown in full (no cropping) */}
          <video
            ref={ref}
            key={clip}
            className="relative z-10 h-full w-full object-contain"
            src={sources[clip]}
            poster={poster}
            playsInline
            autoPlay
            // unmuted so birthday messages are heard; a tap earlier in the story
            // satisfies the browser autoplay-with-sound gesture requirement
            onEnded={handleEnded}
            onError={handleError}
            onTimeUpdate={(e) => {
              const v = e.currentTarget
              if (v.duration) onProgress((clip + v.currentTime / v.duration) / total)
            }}
          />
        </>
      ) : (
        <div className="glass mx-6 px-7 py-7 text-center">
          <p className="chip bg-soft-pink">montage unavailable ♡</p>
          <p className="body-copy mt-5 text-text-dark">
            The clips couldn’t load. Tap right to continue.
          </p>
        </div>
      )}
    </div>
  )
}

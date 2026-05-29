import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { slides, SLIDE_DURATION } from './slides'
import { SlideLayout } from './components/SlideLayout'
import { ProgressBar } from './components/ProgressBar'
import { VideoSlide } from './components/VideoSlide'
import { useSlideAudio } from './useSlideAudio'

export default function App() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  // bumped on every (re)entry so the progress fill restarts
  const [runId, setRunId] = useState(0)
  // audio: browsers block sound until a user gesture; `primed` flips on first tap
  const [primed, setPrimed] = useState(false)
  const [muted, setMuted] = useState(false)

  const slide = slides[index]
  const isVideo = slide.kind === 'video'

  // background-music engine (persists across slides; handles fades + continuity)
  useSlideAudio({
    track: slide.track,
    isVideo,
    paused,
    enabled: primed && !muted,
  })

  const goTo = useCallback((nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= slides.length) return
    setIndex(nextIndex)
    setVideoProgress(0)
    setRunId((r) => r + 1)
  }, [])

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  // keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      setPrimed(true) // any key counts as the gesture that unlocks audio
      if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === ' ') setPaused((p) => !p)
      else if (e.key.toLowerCase() === 'm') setMuted((m) => !m)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  // hold-to-pause: distinguish a tap (navigate) from a press-and-hold (pause)
  const holdTimer = useRef<number | null>(null)
  const heldRef = useRef(false)

  const onPointerDown = () => {
    setPrimed(true) // first tap unlocks audio playback
    heldRef.current = false
    holdTimer.current = window.setTimeout(() => {
      heldRef.current = true
      setPaused(true)
    }, 220)
  }

  const endHold = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current)
      holdTimer.current = null
    }
    if (heldRef.current) setPaused(false)
  }

  const onZoneClick = (dir: 'prev' | 'next') => {
    // ignore the click that ends a long-press pause
    if (heldRef.current) return
    if (dir === 'next') next()
    else prev()
  }

  const durationMs = slide.duration ?? SLIDE_DURATION

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-card-blue/60">
      {/* mobile frame on desktop, full-bleed on phones.
          story-frame sets container-type so cqw-based type scales to THIS box. */}
      <div className="story-frame relative h-full w-full overflow-hidden bg-bg-light sm:h-[100dvh] sm:max-h-[900px] sm:w-[min(440px,100vw)] sm:rounded-[36px] sm:shadow-soft sm:ring-8 sm:ring-white/70">
        <ProgressBar
          total={slides.length}
          index={index}
          durationMs={durationMs}
          fillKey={runId}
          paused={paused}
          manualProgress={isVideo ? videoProgress : undefined}
          onComplete={next}
        />

        <AnimatePresence initial={false} mode="popLayout">
          <SlideLayout
            key={slide.id}
            slide={slide}
            media={
              isVideo && slide.videos?.length ? (
                <VideoSlide
                  sources={slide.videos}
                  poster={slide.videoPoster}
                  paused={paused}
                  onEnded={next}
                  onProgress={setVideoProgress}
                />
              ) : undefined
            }
          />
        </AnimatePresence>

        {/* tap zones: left third = back, right two-thirds = forward */}
        <button
          aria-label="Previous"
          className="tap-zone absolute inset-y-0 left-0 z-40 w-1/3"
          onPointerDown={onPointerDown}
          onPointerUp={endHold}
          onPointerLeave={endHold}
          onClick={() => onZoneClick('prev')}
        />
        <button
          aria-label="Next"
          className="tap-zone absolute inset-y-0 right-0 z-40 w-2/3"
          onPointerDown={onPointerDown}
          onPointerUp={endHold}
          onPointerLeave={endHold}
          onClick={() => onZoneClick('next')}
        />

        {/* paused indicator */}
        {paused && (
          <div className="pointer-events-none absolute left-1/2 top-5 z-50 -translate-x-1/2 rounded-pill bg-white/80 px-3 py-1 font-body text-xs font-bold text-text-dark shadow-soft">
            paused ⏸
          </div>
        )}

        {/* mute / unmute toggle */}
        <button
          aria-label={muted ? 'Unmute music' : 'Mute music'}
          onClick={() => {
            setPrimed(true)
            setMuted((m) => !m)
          }}
          className="absolute right-3 top-5 z-50 rounded-pill bg-white/80 px-3 py-1 font-body text-sm font-bold text-text-dark shadow-soft"
        >
          {muted ? '🔇' : '🔊'}
        </button>

        {/* one-time hint until the first gesture starts the music */}
        {!primed && (
          <div className="pointer-events-none absolute bottom-12 left-1/2 z-50 -translate-x-1/2 animate-float rounded-pill bg-white/85 px-4 py-2 font-body text-sm font-bold text-text-dark shadow-soft">
            tap to start ♫
          </div>
        )}
      </div>
    </div>
  )
}

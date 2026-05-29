import { useEffect, useRef } from 'react'

// A single persistent <audio> object (created once, lives for the App's
// lifetime) manages background music across slide transitions.
//
// Continuity rule: slides that share the SAME track path keep playing without
// a restart (slides 1 & 2). When the path changes, the old track fades out and
// the new one starts from the beginning — works the same skipping forward or
// back. <audio> natively decodes both .mp3 and .mp4 (AAC), so the same element
// handles both extensions just by setting .src.

const TARGET_VOLUME = 0.7
const FADE_MS = 450

type Options = {
  /** track for the current slide (mp3 or mp4), or undefined for none */
  track?: string
  /** video slides duck the music so the montage audio is heard */
  isVideo: boolean
  /** hold-to-pause */
  paused: boolean
  /** primed by a user gesture AND not muted */
  enabled: boolean
}

export function useSlideAudio({ track, isVideo, paused, enabled }: Options) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const currentSrcRef = useRef<string | null>(null)
  const rampRef = useRef<number | null>(null)

  function getAudio() {
    if (!audioRef.current) {
      const a = new Audio()
      a.preload = 'auto'
      a.volume = 0
      audioRef.current = a
    }
    return audioRef.current
  }

  function clearRamp() {
    if (rampRef.current != null) {
      cancelAnimationFrame(rampRef.current)
      rampRef.current = null
    }
  }

  function ramp(to: number, ms: number, done?: () => void) {
    const a = getAudio()
    clearRamp()
    const from = a.volume
    const start = performance.now()
    const step = (now: number) => {
      const t = ms <= 0 ? 1 : Math.min(1, (now - start) / ms)
      a.volume = Math.max(0, Math.min(1, from + (to - from) * t))
      if (t < 1) rampRef.current = requestAnimationFrame(step)
      else {
        rampRef.current = null
        done?.()
      }
    }
    rampRef.current = requestAnimationFrame(step)
  }

  function startFresh(src: string) {
    const a = getAudio()
    a.src = src
    try {
      a.currentTime = 0
    } catch {
      /* ignore */
    }
    a.volume = 0
    currentSrcRef.current = src
    a.play()
      .then(() => ramp(TARGET_VOLUME, FADE_MS))
      .catch(() => {
        /* autoplay blocked until a gesture; will retry when enabled flips */
      })
  }

  function switchTo(src: string) {
    const a = getAudio()
    if (currentSrcRef.current && !a.paused && a.volume > 0.001) {
      ramp(0, FADE_MS, () => {
        a.pause()
        startFresh(src)
      })
    } else {
      startFresh(src)
    }
  }

  // react to slide/track changes (and to becoming enabled)
  useEffect(() => {
    const a = getAudio()

    if (!enabled) {
      // muted or not yet primed → ensure silence, remember position
      if (!a.paused) ramp(0, 200, () => a.pause())
      return
    }

    if (isVideo || !track) {
      // montage / no track → fade music out so voices are clear
      if (currentSrcRef.current && !a.paused) ramp(0, FADE_MS, () => a.pause())
      currentSrcRef.current = null
      return
    }

    if (currentSrcRef.current === track) {
      // continuous (e.g. slides 1↔2): keep playing, just make sure it's audible
      if (!paused && a.paused) {
        a.play()
          .then(() => ramp(TARGET_VOLUME, 200))
          .catch(() => {})
      }
      return
    }

    switchTo(track)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track, isVideo, enabled])

  // hold-to-pause toggles the music too (video slides manage their own audio)
  useEffect(() => {
    const a = audioRef.current
    if (!a || !enabled || isVideo) return
    if (paused) {
      if (!a.paused) ramp(0, 180, () => a.pause())
    } else if (currentSrcRef.current) {
      a.play()
        .then(() => ramp(TARGET_VOLUME, 180))
        .catch(() => {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused])

  // cleanup on unmount
  useEffect(() => {
    return () => {
      clearRamp()
      audioRef.current?.pause()
    }
  }, [])
}

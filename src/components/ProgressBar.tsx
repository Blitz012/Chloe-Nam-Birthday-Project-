type Props = {
  total: number
  index: number
  /** ms duration of the active segment's auto-fill (timed slides) */
  durationMs: number
  /** changes whenever the active slide (re)starts, to restart the fill */
  fillKey: string | number
  /** pause the active fill (hold-to-pause) */
  paused: boolean
  /** explicit 0..1 fill for the active segment (video slides) */
  manualProgress?: number
  /** fired when the active timed segment finishes filling */
  onComplete: () => void
}

export function ProgressBar({
  total,
  index,
  durationMs,
  fillKey,
  paused,
  manualProgress,
  onComplete,
}: Props) {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex gap-1 px-2 pt-2">
      {Array.from({ length: total }).map((_, i) => {
        const done = i < index
        const active = i === index
        return (
          <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-pill bg-white/50">
            {done && <div className="h-full w-full rounded-pill bg-text-dark" />}
            {active &&
              (manualProgress != null ? (
                <div
                  className="h-full rounded-pill bg-text-dark"
                  style={{ width: `${Math.min(1, manualProgress) * 100}%` }}
                />
              ) : (
                <div
                  key={fillKey}
                  className="h-full w-full origin-left rounded-pill bg-text-dark"
                  onAnimationEnd={onComplete}
                  style={{
                    animation: `progressfill ${durationMs}ms linear forwards`,
                    animationPlayState: paused ? 'paused' : 'running',
                  }}
                />
              ))}
          </div>
        )
      })}
    </div>
  )
}

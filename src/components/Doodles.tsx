// Soft, cutesy hand-drawn SVG doodles for the pastel aesthetic.

type DoodleProps = { className?: string; color?: string }

export function Heart({ className = '', color = '#FFC8DD' }: DoodleProps) {
  return (
    <svg viewBox="0 0 32 30" className={className} aria-hidden>
      <path
        d="M16 28C16 28 2 19 2 9.5C2 4.8 5.8 2 9.5 2C12.4 2 14.8 3.8 16 6C17.2 3.8 19.6 2 22.5 2C26.2 2 30 4.8 30 9.5C30 19 16 28 16 28Z"
        fill={color}
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />
    </svg>
  )
}

export function Star({ className = '', color = '#A2D2FF' }: DoodleProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path
        d="M50 8 C56 34 66 44 92 50 C66 56 56 66 50 92 C44 66 34 56 8 50 C34 44 44 34 50 8 Z"
        fill={color}
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Sparkle({ className = '', color = '#BDE0FE' }: DoodleProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path
        d="M20 2 C22 14 26 18 38 20 C26 22 22 26 20 38 C18 26 14 22 2 20 C14 18 18 14 20 2 Z"
        fill={color}
      />
    </svg>
  )
}

export function Cloud({ className = '', color = '#FFFFFF' }: DoodleProps) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden>
      <path
        d="M16 34 C7 34 2 28 2 22 C2 16 7 11 14 12 C16 5 23 1 30 3 C36 4 40 9 41 14 C50 12 58 18 58 26 C58 31 54 34 48 34 Z"
        fill={color}
        opacity="0.9"
      />
    </svg>
  )
}

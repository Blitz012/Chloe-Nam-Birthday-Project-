import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import type { Slide, Accent } from '../slides'
import { Heart, Star, Sparkle, Cloud } from './Doodles'

const ACCENT_HEX: Record<Accent, string> = {
  'card-blue': '#BDE0FE',
  'accent-blue': '#A2D2FF',
  'soft-pink': '#FFC8DD',
  'soft-lav': '#CDB4DB',
  'soft-mint': '#CDEAC0',
}

// Soft, gentle slide transition (no brutalist snaps).
const slideVariants: Variants = {
  enter: { opacity: 0, y: 26, scale: 0.985 },
  center: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -18, scale: 0.99 },
}

const reveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i + 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
}

type Props = {
  slide: Slide
  media?: ReactNode
}

export function SlideLayout({ slide, media }: Props) {
  const accent = ACCENT_HEX[slide.accent]
  const bg = slide.images?.[0]
  const isFullBleed = slide.layout === 'fullbleed'
  const isPolaroid = slide.layout === 'polaroid'

  return (
    <motion.section
      className="absolute inset-0 overflow-hidden"
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ---- background layer ---- */}
      {isFullBleed && bg && slide.kind !== 'video' ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bg})` }}
          />
          {/* soft overlay so text stays legible over the photo */}
          <div className="absolute inset-0 bg-text-dark/35" />
        </>
      ) : (
        <div className="soft-bg absolute inset-0 animate-driftbg" />
      )}

      {/* floating cutesy doodles */}
      <Sparkle className="absolute right-7 top-20 h-9 w-9 animate-twinkle" color={accent} />
      <Heart className="absolute left-6 top-28 h-7 w-7 animate-float" color="#FFC8DD" />
      <Star className="absolute left-8 bottom-28 h-8 w-8 animate-twinkle" color={accent} />
      <Cloud className="absolute right-6 bottom-32 h-10 w-16 animate-float opacity-80" color="#FFFFFF" />

      {/* full-bleed media (video) */}
      {media}

      {/* ---- content ---- */}
      {slide.kind !== 'video' && (
        <div className="relative z-20 flex h-full flex-col items-center justify-center gap-5 px-6 pb-24 pt-16 text-center">
          {/* polaroid photo card */}
          {isPolaroid && bg && (
            <motion.div
              variants={reveal}
              initial="hidden"
              animate="show"
              custom={0}
              className="polaroid w-[min(70cqw,260px)] animate-float"
              style={{ transform: 'rotate(-3deg)' }}
            >
              <img src={bg} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </motion.div>
          )}

          <Content slide={slide} accent={accent} glass={isFullBleed} />
        </div>
      )}

      {/* soft bottom signature */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pb-3 text-center">
        <span className="font-script text-sm text-text-dark/70 mix-blend-multiply">
          chloe’s friendship wrapped ♡
        </span>
      </div>
    </motion.section>
  )
}

function Content({
  slide,
  accent,
  glass,
}: {
  slide: Slide
  accent: string
  glass: boolean
}) {
  const wrapClass = glass
    ? 'glass max-w-[min(86cqw,440px)] px-6 py-6'
    : 'max-w-[min(88cqw,460px)]'
  const textTone = glass ? 'text-text-dark' : 'text-text-dark'

  return (
    <div className={`flex flex-col items-center gap-4 ${wrapClass} ${textTone}`}>
      {slide.eyebrow && (
        <motion.span
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={1}
          className="chip"
        >
          {slide.eyebrow}
        </motion.span>
      )}

      {slide.kind === 'stat' && (
        <motion.span
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={2}
          className="stat-number"
          style={{ color: '#2B4C7E', textShadow: `0 4px 0 ${accent}` }}
        >
          {slide.stat}
        </motion.span>
      )}

      {slide.kind === 'stat' && slide.statCaption && (
        <motion.span
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={2}
          className="body-copy font-display"
        >
          {slide.statCaption}
        </motion.span>
      )}

      {slide.title && (
        <motion.h1
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={slide.kind === 'transition' ? 1 : 2}
          className={slide.kind === 'transition' ? 'headline' : 'headline-sm'}
        >
          {slide.title}
        </motion.h1>
      )}

      {slide.body && (
        <motion.p
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={3}
          className="body-copy"
        >
          {slide.body}
        </motion.p>
      )}

      {slide.kind === 'ending' && (
        <motion.span
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={4}
          className="chip bg-soft-pink"
        >
          Happy Birthday Chloe ♡
        </motion.span>
      )}
    </div>
  )
}

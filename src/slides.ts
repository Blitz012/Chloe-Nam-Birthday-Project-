// Modular slide configuration for Chloe's Friendship Wrapped.
// Swap image paths / colors / layouts / tracks freely here — the UI is data-driven.
//
// Images: themed board folders copied into /public/assets/<theme>/
//   physics · college · commonapp · minecraft · trumpet · blue · food · redvelvet
// Audio:  /public/assets/songs/ (mp3 + mp4 both supported by <audio>)

export type SlideKind =
  | 'intro'
  | 'text'
  | 'stat'
  | 'transition'
  | 'image'
  | 'video'
  | 'ending'

// Layout variants:
//  - 'solid':     soft pastel background, no photo (intro / transitions)
//  - 'polaroid':  pastel bg + contained, slightly-rotated rounded photo card
//  - 'fullbleed': photo fills the screen; text sits in a glass card for legibility
export type Layout = 'solid' | 'polaroid' | 'fullbleed'

export type Accent = 'card-blue' | 'accent-blue' | 'soft-pink' | 'soft-lav' | 'soft-mint'

export interface Slide {
  id: number
  kind: SlideKind
  layout: Layout
  /** handwritten-script tag above the headline */
  eyebrow?: string
  /** bubbly headline */
  title?: string
  /** soft body copy */
  body?: string
  /** giant stat number (stat slides) */
  stat?: string
  statCaption?: string
  /** asset paths served from /public; [0] is the full-bleed background */
  images?: string[]
  /** video clips played back-to-back (montage slide) */
  videos?: string[]
  videoPoster?: string
  /** background-music track (mp3 or mp4). Slides sharing the same path play
   *  continuously across them without restarting (e.g. slides 1 & 2). */
  track?: string
  /** pastel accent for chips / doodles */
  accent: Accent
  /** ms before auto-advance */
  duration?: number
}

const A = (p: string) => `/assets/${p}`
const T = (f: string) => `/assets/songs/${f}`

export const slides: Slide[] = [
  {
    id: 1,
    kind: 'intro',
    layout: 'solid',
    eyebrow: 'Friendship Wrapped',
    title: 'Hey Chloe — Happy Birthday!',
    body:
      'Sorry I missed your birthday. I decided to make it up to you in the only way I know. PROGRAMMING!!!!!!!!!',
    track: T('redvelvet-cosmic.mp4'), // continuous across slides 1 & 2
    accent: 'soft-pink',
  },
  {
    id: 2,
    kind: 'text',
    layout: 'solid',
    eyebrow: 'the rules',
    title: 'Stay strapped in',
    body:
      "This is going to be a friendship wrapped of all the things that we've done in the past year. So stay strapped in.",
    track: T('redvelvet-cosmic.mp4'), // same file as slide 1 → does NOT restart
    accent: 'accent-blue',
  },
  {
    id: 3,
    kind: 'image',
    layout: 'polaroid',
    eyebrow: 'situationships',
    title: 'Tortured poets era',
    body:
      'We start off around the beginning of summer. You were in your tortured poets era because I listened to 17 talks about a certain trumpet boy! 😉',
    images: [A('trumpet/trumpet2.jpg')],
    track: T('mitski-best-american-girl.mp4'),
    accent: 'soft-lav',
  },
  {
    id: 4,
    kind: 'stat',
    layout: 'fullbleed',
    eyebrow: 'spain',
    title: 'FaceTime from Spain',
    stat: '336',
    statCaption: 'hours of Spain FaceTimes',
    body:
      "Every day at UMich I was met with a FaceTime from Spain — for around 2 weeks straight. That's 336 hours! I could've watched The Godfather 100 times in that span.",
    images: [A('trumpet/trumpet1.jpg')],
    track: T('miranda-lo-que-siento.mp4'), // Spanish track for the Spain slide
    accent: 'accent-blue',
  },
  {
    id: 5,
    kind: 'image',
    layout: 'polaroid',
    eyebrow: 'first semester',
    title: 'One shared struggle…',
    body: 'The first semester was marked mainly by one shared struggle….',
    images: [A('physics/physics1.jpg')],
    track: T('rachmaninoff-pc3.mp3'), // classical
    accent: 'soft-mint',
  },
  {
    id: 6,
    kind: 'text',
    layout: 'fullbleed',
    eyebrow: 'it was…',
    title: 'AP Physics…',
    images: [A('physics/physics3.jpg')],
    track: T('tchaikovsky-symph5.mp3'), // classical
    accent: 'soft-pink',
    duration: 5000,
  },
  {
    id: 7,
    kind: 'stat',
    layout: 'fullbleed',
    eyebrow: 'AP Physics C',
    title: 'Tears were shed',
    stat: '1.3M',
    statCaption: 'tears shed over AP Physics',
    body:
      'Over 1.3 million tears were shed over AP Physics. Maybe not from you but I cried over AP Physics…',
    images: [A('physics/physics4.jpg')],
    track: T('romeo-juliet.mp4'), // classical
    accent: 'accent-blue',
  },
  {
    id: 8,
    kind: 'transition',
    layout: 'solid',
    title: 'But in the end… we made it through… all that’s left is',
    track: T('two-door-what-you-know.mp4'),
    accent: 'soft-lav',
    duration: 6000,
  },
  {
    id: 9,
    kind: 'text',
    layout: 'solid',
    eyebrow: 'the phase',
    title: 'Minecraft 2 week phase',
    track: T('glassbeach-cold-weather.mp4'),
    accent: 'soft-mint',
  },
  {
    id: 10,
    kind: 'image',
    layout: 'polaroid',
    eyebrow: 'MC phase',
    title: 'Crafting & laughing',
    body:
      'This winter break was spent with some crafting and a lot of laughing. We had some nice inside jokes…',
    images: [A('minecraft/minecraft1.jpg')],
    track: T('rare-occasions-darling.mp4'),
    accent: 'soft-pink',
  },
  {
    id: 11,
    kind: 'stat',
    layout: 'fullbleed',
    eyebrow: 'bedwars',
    title: 'We lost a lot',
    stat: '83',
    statCaption: 'bedwars games · ~3 wins lol',
    body: 'This winter break we played 83 bedwars games. We won like maybe 3 lol.',
    images: [A('minecraft/minecraft4.jpg')],
    track: T('idkhow-clusterhug.mp4'),
    accent: 'accent-blue',
  },
  {
    id: 12,
    kind: 'text',
    layout: 'polaroid',
    eyebrow: 'plot twist',
    title: 'Betrayal in the air',
    body: "But we didn't just play bedwars… betrayal was in the air.",
    images: [A('minecraft/minecraft6.jpg')],
    track: T('mcr-save-yourself.mp4'),
    accent: 'soft-lav',
  },
  {
    id: 13,
    kind: 'stat',
    layout: 'fullbleed',
    eyebrow: 'murder mystery',
    title: 'Backstabbed twice',
    stat: '92',
    statCaption: 'murder mystery games',
    body:
      "This winter break we played 92 murder mystery games. I was backstabbed twice. I'll never forget.",
    images: [A('minecraft/minecraft5.png')],
    track: T('bulletproof-heart.mp4'),
    accent: 'soft-pink',
  },
  {
    id: 14,
    kind: 'image',
    layout: 'polaroid',
    eyebrow: 'the realm',
    title: 'Where the joy came',
    body: 'Hypixel was fun and all but the realm was where the joy really came.',
    images: [A('minecraft/minecraft2.png')],
    track: T('with-confidence-drops-of-jupiter.mp4'),
    accent: 'soft-mint',
  },
  {
    id: 15,
    kind: 'image',
    layout: 'fullbleed',
    eyebrow: 'realm memories',
    title: 'So many memories',
    body:
      'From getting killed by the warden, to me failing to save you from lava, to you grinding max gear only to die in the funniest ways possible. We made a lot of memories.',
    images: [A('minecraft/minecraft7.jpg')],
    track: T('iv-spades-come-inside.mp4'),
    accent: 'accent-blue',
  },
  {
    id: 16,
    kind: 'text',
    layout: 'polaroid',
    eyebrow: 'realm hours',
    title: 'Not tracking this bro…',
    body: 'You spent a LOT of time on the realm. I am not tracking this bro…',
    images: [A('minecraft/minecraft3.jpg')],
    track: T('cody-jon-m2m.mp4'),
    accent: 'soft-lav',
  },
  {
    id: 17,
    kind: 'image',
    layout: 'fullbleed',
    eyebrow: "school's coming to a close",
    title: 'Fun but also sad',
    body:
      'As the second semester came, we spent a lot of time together. It was fun but also sad — time together was coming short, but at least we kept having fun.',
    images: [A('blue/blue1.jpg')],
    track: T('piano-concerto2.mp4'), // classical
    accent: 'soft-pink',
  },
  {
    id: 18,
    kind: 'image',
    layout: 'polaroid',
    eyebrow: 'prom & graduation',
    title: 'The #1 speech',
    body:
      'Prom and graduation were pretty fun with you around. You gave the #1 speech at graduation. Definitely not because I am biased.',
    images: [A('food/food1.jpg')],
    track: T('mozart-figaro.mp4'), // classical
    accent: 'soft-mint',
  },
  {
    id: 19,
    kind: 'image',
    layout: 'fullbleed',
    eyebrow: 'off to MIT',
    title: 'Pseudo app reviewer',
    body:
      'As you head off to MIT I wanted to leave you with a couple of nice messages. That can wait though — first let’s talk about your job as a pseudo college app reviewer.',
    images: [A('college/college5.jpg')],
    track: T('libertango.mp4'), // classical
    accent: 'accent-blue',
  },
  {
    id: 20,
    kind: 'stat',
    layout: 'polaroid',
    eyebrow: 'locked in',
    title: 'Look at you go',
    stat: '15',
    statCaption: 'college essays you helped with',
    body:
      'You were locked in helping other people. Even though community essays were my nightmare, you helped me with 15 college essays. Look at you go, rockstar.',
    images: [A('commonapp/commonapp1.jpg')],
    track: T('ravel-daphnis-chloe.mp4'), // classical — Daphnis et Chloé ♡
    accent: 'soft-pink',
  },
  {
    id: 21,
    kind: 'text',
    layout: 'solid',
    eyebrow: 'okay but seriously…',
    title: 'You are pretty goated',
    body:
      "You left a massive impression on a ton of people. Here's a little video montage of a ton of people saying happy birthday to you since you are pretty goated.",
    track: T('queen-somebody-to-love.mp4'),
    accent: 'soft-lav',
  },
  {
    id: 22,
    kind: 'transition',
    layout: 'solid',
    title: 'Alright… here you go.',
    track: T('iv-spades-sweet-shadow.mp3'),
    accent: 'accent-blue',
    duration: 4000,
  },
  {
    id: 23,
    kind: 'video',
    layout: 'fullbleed',
    eyebrow: 'the montage',
    // Clips play back-to-back, then the story auto-advances.
    // Background music is paused here so the montage voices are heard.
    videos: [
      A('montage/clip1.mp4'),
      A('montage/clip2.mp4'),
      A('montage/clip3.mp4'),
      A('montage/clip4.mp4'),
      A('montage/clip5.mp4'),
      A('montage/clip6.mp4'),
      A('montage/clip7.mp4'),
      A('montage/clip8.mp4'),
      A('montage/clip9.mp4'),
      A('montage/clip10.mp4'),
      A('montage/clip11.mp4'),
    ],
    videoPoster: A('trumpet/trumpet1.jpg'),
    track: T('cranberries-linger.mp4'),
    accent: 'accent-blue',
  },
  {
    id: 24,
    kind: 'ending',
    layout: 'polaroid',
    eyebrow: 'one last thing',
    title: 'Meet me on the trail',
    body:
      'Now I still feel bad that I forgot ur birthday. So expect a little basket from me to say my thanks for being such a great friend. Meet me on the trail.',
    images: [A('redvelvet/redvelvet1.jpg')],
    track: T('paramore-still-into-you.mp4'),
    accent: 'soft-pink',
  },
]

export const SLIDE_DURATION = 8000

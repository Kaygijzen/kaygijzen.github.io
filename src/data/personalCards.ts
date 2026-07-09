import type { PersonalCard } from '../types/content'

// Desktop 6-col equal-card grid:
//   Row 1 → Leiden[2]  Music[2]  Traveling[2]
//   Row 2 → _[1]  Surfing[2]  Limburg[2]  _[1]  (centered via col-start-2)
// Mobile → single column, stacked in order.
export const personalCards: PersonalCard[] = [
  {
    title: 'Leiden',
    subtitle: 'Where I studied, and ultimately decided to stay.',
    imageSrc: '/images/leiden.png',
    imageAlt: 'Leiden canal',
    accentBorder: '#85B7EB',
    accentTint: '#E6F1FB',
    className: 'h-56 md:h-[260px] md:col-span-2',
  },
  {
    title: 'Music',
    subtitle: 'Playing guitar in my own bands, and enjoying live music, from reggae to punk.',
    imageSrc: '/images/guitar.jpg',
    imageAlt: 'Guitar',
    accentBorder: '#F0997B',
    accentTint: '#FAECE7',
    className: 'h-56 md:h-[260px] md:col-span-2',
  },
  {
    title: 'Travel',
    subtitle: 'Exploring new cultures, ways of thinking, and amazing views.',
    imageSrc: '/images/machu_picchu_cropped.jpeg',
    imageAlt: 'Traveling',
    accentBorder: '#5DCAA5',
    accentTint: '#E1F5EE',
    className: 'h-56 md:h-[260px] md:col-span-2',
  },
  {
    title: 'Surfing',
    subtitle: 'Making time to surf whenever I can.',
    imageSrc: '/images/surf_cropped.jpeg',
    imageAlt: 'Surfing',
    accentBorder: '#5DCAA5',
    accentTint: '#E1F5EE',
    className: 'h-56 md:h-[260px] md:col-span-2 md:col-start-2',
  },
  {
    title: 'Limburg',
    subtitle: 'Born and raised in the sunny south.',
    imageSrc: '/images/limburg.png',
    imageAlt: 'Vlaai',
    accentBorder: '#EF9F27',
    accentTint: '#FAEEDA',
    className: 'h-56 md:h-[260px] md:col-span-2',
  },
]

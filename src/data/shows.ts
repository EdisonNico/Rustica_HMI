export interface Show {
  artist: string
  date: string
  location: string
  /** Hoja de afiches (1, 2 o 3) de la que se recorta el afiche */
  sheet: 1 | 2 | 3
  size: string
  position: string
}

export const shows: Show[] = [
  { artist: 'Indira Orbegoso', date: '05 de octubre', location: 'Rústica Costa Verde', sheet: 1, size: '335.9% 246.1%', position: '3.1% 4.5%' },
  { artist: 'Dana Leia', date: '06 de octubre', location: 'Rústica Costa Verde', sheet: 1, size: '335.9% 246.1%', position: '47.3% 4.5%' },
  { artist: 'Pati Rumbaut', date: '07 de octubre', location: 'Rústica Costa Verde', sheet: 1, size: '335.9% 246.1%', position: '91.5% 4.5%' },
  { artist: 'Zaperoko', date: '08 de octubre', location: 'Arriero Pachacamac', sheet: 1, size: '335.9% 246.1%', position: '3.1% 87.4%' },
  { artist: 'Nicolle La Rumba', date: '08 de octubre', location: 'Rústica Costa Verde', sheet: 1, size: '335.9% 246.1%', position: '47.3% 87.4%' },
  { artist: 'Kate Candela y Son Tentación', date: '09 de octubre', location: 'Rústica Mall Aventura Santa Anita', sheet: 1, size: '335.9% 246.1%', position: '91.5% 87.4%' },
  { artist: 'Gustavo Ruiz', date: '09 de octubre', location: 'Rústica Costa Verde', sheet: 2, size: '321.2% 243.2%', position: '3% 2.5%' },
  { artist: 'Chevy y su Caliente', date: '09 de octubre', location: 'Rústica San Miguel', sheet: 2, size: '321.2% 243.2%', position: '50.4% 2.5%' },
  { artist: 'Conquistadores de la Salsa', date: '10 de octubre', location: 'Rústica Mall Aventura Santa Anita', sheet: 2, size: '321.2% 243.2%', position: '97.8% 2.5%' },
  { artist: 'Ana Olortegui', date: '10 de octubre', location: 'Rústica Costa Verde', sheet: 2, size: '321.2% 243.2%', position: '3% 87.3%' },
  { artist: 'Rumba Negra', date: '11 de octubre', location: 'Rústica Mall Aventura Santa Anita', sheet: 2, size: '321.2% 243.2%', position: '50.4% 87.3%' },
  { artist: 'Nia Carpio', date: '11 de octubre', location: 'Rústica Costa Verde', sheet: 2, size: '321.2% 243.2%', position: '97.8% 87.3%' },
  { artist: 'Natasha Hernandez', date: '12 de octubre', location: 'Rústica Costa Verde', sheet: 3, size: '318.2% 241.7%', position: '1.7% 1.9%' },
  { artist: 'Lesly Becorena', date: '13 de octubre', location: 'Rústica Costa Verde', sheet: 3, size: '318.2% 241.7%', position: '49.7% 1.9%' },
  { artist: 'Pati Rumbaut', date: '14 de octubre', location: 'Rústica Costa Verde', sheet: 3, size: '318.2% 241.7%', position: '97.8% 1.9%' },
  { artist: 'Josimar y su Yambú', date: '16 de octubre', location: 'Rústica Costa Verde', sheet: 3, size: '318.2% 241.7%', position: '1.7% 87.6%' },
  { artist: 'Nsamble y Zaperoko', date: '16 de octubre', location: 'Rústica Mall Aventura Santa Anita', sheet: 3, size: '318.2% 241.7%', position: '49.7% 87.6%' },
  { artist: 'Gustavo Ruiz', date: '16 de octubre', location: 'Rústica Costa Verde', sheet: 3, size: '318.2% 241.7%', position: '97.8% 87.6%' },
]

export const showDescriptions: Record<string, string[]> = {
  'Indira Orbegoso|05 de octubre': [
    'Este lunes 5 de octubre, disfruta una noche especial junto a Indira Orbegoso. Una cena show llena de música, alegría y buena energía para compartir con amigos y familia.',
    'Ven a disfrutar de una noche diferente con todo el sabor y entretenimiento de Rústica.',
    '¡Te esperamos en Rústica Costa Verde!',
  ],
  'Dana Leia|06 de octubre': [
    'Este martes 6 de octubre, disfruta una noche diferente junto a Dana Leia. Una cena show para relajarte, compartir y dejarte llevar por la música y su talento en vivo.',
    'Ven con tu gente y disfruta una noche llena de buena energía.',
    '¡Te esperamos en Rústica Costa Verde!',
  ],
  'Pati Rumbaut|07 de octubre': [
    'Este miércoles 7 de octubre, acompáñanos a disfrutar de una noche llena de música y diversión junto a Pati Rumbaut.',
    'Prepara a tu gente, disfruta nuestra gastronomía y déjate sorprender por un show pensado para cantar, bailar y pasarla increíble.',
    '¡Te esperamos en Rústica Costa Verde!',
  ],
  'Zaperoko|08 de octubre': [
    'Este jueves 8 de octubre, la fiesta se vive en Arriero Pachacamac junto a Zaperoko. Una noche para disfrutar de la salsa, bailar y celebrar con toda la energía que caracteriza a Rústica.',
    'Ven con tus amigos, disfruta una deliciosa cena y prepárate para vivir un show inolvidable.',
    '¡Te esperamos en Arriero Pachacamac!',
  ],
  'Nicolle La Rumba|08 de octubre': [
    'Este jueves 8 de octubre, vive una noche llena de ritmo y diversión junto a Nicolle La Rumba.',
    'Disfruta de una cena especial acompañada de música en vivo, buena energía y todo el ambiente que necesitas para convertir una noche cualquiera en una celebración.',
    '¡Te esperamos en Rústica Costa Verde!',
  ],
  'Kate Candela y Son Tentación|09 de octubre': [
    'Este viernes 9 de octubre, prepárate para una noche llena de sabor y ritmo junto a Kate Candela y Son Tentación.',
    'Disfruta de una experiencia musical imperdible, acompaña la noche con tus platos favoritos y déjate llevar por la energía de la salsa en vivo.',
    '¡Te esperamos en Rústica Mall Aventura Santa Anita!',
  ],
  'Gustavo Ruiz|09 de octubre': [
    'Este viernes 9 de octubre, Gustavo Ruiz llega a Rústica Costa Verde para ponerle música y emoción a tu noche.',
    'Comparte una cena especial, disfruta de buena música en vivo y vive un viernes diferente junto a quienes más quieres.',
    '¡Te esperamos en Rústica Costa Verde!',
  ],
  'Chevy y su Caliente|09 de octubre': [
    'Este viernes 9 de octubre, la diversión llega a Rústica San Miguel junto a Chevy y su Caliente.',
    'Ven a disfrutar una noche llena de música, baile y mucha energía. El plan perfecto para cerrar la semana disfrutando de buena comida y un gran show en vivo.',
    '¡Te esperamos en Rústica San Miguel!',
  ],
  'Conquistadores de la Salsa|10 de octubre': [
    'Este sábado 10 de octubre, disfruta de una noche salsera junto a Conquistadores de la Salsa.',
    'Ven a bailar, cantar y disfrutar de una experiencia llena de ritmo, acompañada de la mejor gastronomía y el ambiente que solo Rústica puede ofrecer.',
    '¡Te esperamos en Rústica Mall Aventura Santa Anita!',
  ],
  'Ana Olortegui|10 de octubre': [
    'Este sábado 10 de octubre, disfruta una velada especial junto a Ana Olortegui.',
    'Una noche perfecta para compartir, disfrutar de música en vivo y dejarte envolver por un ambiente lleno de alegría y buena energía.',
    '¡Te esperamos en Rústica Costa Verde!',
  ],
  'Rumba Negra|11 de octubre': [
    'Este domingo 11 de octubre, termina el fin de semana con toda la energía de Rumba Negra.',
    'Disfruta una noche llena de ritmo, baile y diversión junto a tus amigos y familia, con una cena que hará de tu domingo una experiencia especial.',
    '¡Te esperamos en Rústica Mall Aventura Santa Anita!',
  ],
  'Nia Carpio|11 de octubre': [
    'Este domingo 11 de octubre, acompáñanos a disfrutar de una noche especial junto a Nia Carpio.',
    'Música en vivo, buena gastronomía y un ambiente perfecto para compartir y cerrar el fin de semana de la mejor manera.',
    '¡Te esperamos en Rústica Costa Verde!',
  ],
  'Natasha Hernandez|12 de octubre': [
    'Este lunes 12 de octubre, empieza la semana con una noche diferente junto a Natasha Hernandez.',
    'Disfruta de una cena acompañada de música en vivo, buena compañía y toda la energía que necesitas para hacer de este lunes un momento especial.',
    '¡Te esperamos en Rústica Costa Verde!',
  ],
  'Lesly Becorena|13 de octubre': [
    'Este martes 13 de octubre, vive una noche llena de música y entretenimiento junto a Lesly Becorena.',
    'Comparte con tus personas favoritas, disfruta nuestros sabores y déjate llevar por una presentación preparada para hacer de tu noche una experiencia inolvidable.',
    '¡Te esperamos en Rústica Costa Verde!',
  ],
  'Pati Rumbaut|14 de octubre': [
    'Este miércoles 14 de octubre, Pati Rumbaut vuelve a Rústica Costa Verde para regalarte una noche llena de música y diversión.',
    'Ven a disfrutar de una deliciosa cena, buena compañía y un show en vivo perfecto para cantar, bailar y disfrutar hasta el último momento.',
    '¡Te esperamos en Rústica Costa Verde!',
  ],
  'Josimar y su Yambú|16 de octubre': [
    'Este viernes 16 de octubre, prepárate para una noche inolvidable junto a Josimar y su Yambú.',
    'La salsa y la fiesta se apoderan de Rústica Costa Verde en una noche perfecta para bailar, cantar y disfrutar con toda la energía.',
    '¡Te esperamos para vivir una noche espectacular!',
  ],
  'Nsamble y Zaperoko|16 de octubre': [
    'Este viernes 16 de octubre, disfruta una noche cargada de ritmo junto a Nsamble y Zaperoko.',
    'Dos grandes propuestas musicales se unen para ofrecerte una noche llena de salsa, baile y diversión. Ven con tus amigos y prepárate para disfrutar hasta el final.',
    '¡Te esperamos en Rústica Mall Aventura Santa Anita!',
  ],
  'Gustavo Ruiz|16 de octubre': [
    'Este viernes 16 de octubre, vuelve a disfrutar de una noche especial junto a Gustavo Ruiz.',
    'Déjate acompañar por la música en vivo mientras disfrutas de tus platos favoritos y compartes una noche llena de alegría, buena energía y momentos para recordar.',
    '¡Te esperamos en Rústica Costa Verde!',
  ],
}

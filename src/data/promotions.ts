export interface Promotion {
  title: string
  subtitle: string
  price?: string
  position: string
  details: string[]
  terms?: string[]
}

export const promotions: Promotion[] = [
  {
    title: 'Happy Hour todos los días hasta las 8:00 PM',
    subtitle: 'Happy Hour 2 x S/ 28 en tus cócteles favoritos. 14 opciones para elegir y aumentar tu diversión.',
    price: '2 x S/ 28',
    position: '3.5% 10.1%',
    details: ['Disponible todos los días hasta las 8:00 p. m.'],
    terms: [
      'El Red Bull Watermelon Gin, Whiscola, Johnnie Tropical Fresa y Johnnie Tropical Maracuyá están a 2 x S/ 39.',
      'Solo se pueden elegir 2 cócteles del mismo tipo.',
      'No válido en feriados ni días festivos. No acumulable con otras promociones ni descuentos.',
      'Máximo 3 promociones por mesa.',
      'Pide la promoción presentando tu DNI.',
      'En Costa Verde, Rústica Granjita Pachacamac y Rústica Hoteles: 2 x S/ 35.',
    ],
  },
  {
    title: 'Buffet Criollo Rústica Granjita Pachacamac',
    subtitle: 'Come todo lo que quieras en el Buffet Criollo.',
    price: 'S/ 79.90',
    position: '49.8% 10.1%',
    details: [
      'Disponible todos los sábados y domingos de 12:00 p. m. a 4:00 p. m.',
      'Rústica Granjita Pachacamac — Av. Manuel Valle, Pachacamac 15823.',
      'Buffet infantil de 5 a 10 años: S/ 34.90.',
      'A partir del 14 de agosto: viernes, sábados, domingos y feriados en Rústica Retablo, MallPlaza Bellavista, Mall Aventura Santa Anita y Wilson; sábados, domingos y feriados en Rústica Barranco y Rústica Granjita Pachacamac.',
    ],
    terms: ['No incluye bebidas.'],
  },
  {
    title: 'Buffet Criollo Barranco',
    subtitle: 'Celebra los 20 años de Rústica Buffet y come todo lo que quieras.',
    price: 'S/ 59.90',
    position: '96.1% 10.1%',
    details: [
      'Disponible sábados, domingos y feriados de 12:00 p. m. a 4:00 p. m.',
      'Buffet infantil de 5 a 10 años: S/ 29.90.',
      'Rústica Barranco — Av. Pedro de Osma 105, Parque Municipal de Barranco.',
      'A partir del 14 de agosto: viernes, sábados, domingos y feriados en Rústica Retablo, MallPlaza Bellavista, Mall Aventura Santa Anita y Wilson; sábados, domingos y feriados en Rústica Barranco y Rústica Granjita Pachacamac.',
    ],
    terms: ['Precios válidos hasta el 31 de agosto.'],
  },
  {
    title: 'Cócteles Aperol',
    subtitle: 'El sabor del Aperol llegó a Rústica.',
    price: 'Desde S/ 24.90',
    position: '3.5% 90.5%',
    details: [
      'Descubre tu favorito: Aperol Spritz, Aperol Tropical, Orange Coffee, Sangría Italiana o Aperol Sour.',
      'Ven a Rústica y brinda con nosotros.',
    ],
  },
  {
    title: 'Menús Criollos',
    subtitle: 'Nuevos menús criollos con entrada y bebida gratis.',
    price: 'Desde S/ 15.90',
    position: '49.8% 90.5%',
    details: [
      'Nuevos platos criollos se suman al menú para que tengas más opciones.',
      'Pídelos de lunes a viernes de 12:00 p. m. a 5:00 p. m. en tu local favorito.',
      'En Granjita Pachacamac, desde S/ 25.90.',
    ],
    terms: [
      'No válido en feriados ni días festivos.',
      'No válido en Rústica Hoteles ni en Rústica Costa Verde.',
      'El precio desde S/ 15.90 corresponde al menú spaguetti y al menú pizza.',
    ],
  },
  {
    title: 'Buffet Criollo',
    subtitle: 'El mejor Buffet Criollo del Perú.',
    price: 'S/ 59.90',
    position: '96.1% 90.5%',
    details: [
      'Disponible sábados, domingos y feriados de 12:00 p. m. a 4:00 p. m.',
      'Rústica MallPlaza Bellavista.',
      'Rústica Mall Aventura Santa Anita.',
      'Rústica Wilson.',
    ],
  },
]

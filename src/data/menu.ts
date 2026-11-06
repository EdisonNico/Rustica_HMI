export type MenuCategory =
  | 'menus'
  | 'trios'
  | 'especiales'
  | 'exclusivos'
  | 'clasicos'
  | 'torres-bebidas'
  | 'sangrias'
  | 'cervezas'
  | 'botellas'
  | 'bebidas'
  | 'torres-piqueos'
  | 'piqueos'
  | 'pizzas'
  | 'pastas'
  | 'parrillas'
  | 'pollos'
  | 'peruanitos'

export interface Dish {
  id: number
  name: string
  description: string
  price: string
  image: string
  category: MenuCategory
  badge?: string
  featured?: boolean
}

export interface MenuCategoryInfo {
  value: MenuCategory
  label: string
  description: string
}

type MenuItem = [name: string, description: string, price: string]

const categoryImages: Record<MenuCategory, string> = {
  menus: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop&auto=format',
  trios: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600&h=400&fit=crop&auto=format',
  especiales: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&h=400&fit=crop&auto=format',
  exclusivos: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&h=400&fit=crop&auto=format',
  clasicos: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&h=400&fit=crop&auto=format',
  'torres-bebidas': 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=600&h=400&fit=crop&auto=format',
  sangrias: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&h=400&fit=crop&auto=format',
  cervezas: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=600&h=400&fit=crop&auto=format',
  botellas: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600&h=400&fit=crop&auto=format',
  bebidas: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=400&fit=crop&auto=format',
  'torres-piqueos': 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop&auto=format',
  piqueos: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=600&h=400&fit=crop&auto=format',
  pizzas: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?w=600&h=400&fit=crop&auto=format',
  pastas: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=600&h=400&fit=crop&auto=format',
  parrillas: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop&auto=format',
  pollos: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&h=400&fit=crop&auto=format',
  peruanitos: 'https://images.unsplash.com/photo-1562625964-ffe9b2f617fc?w=600&h=400&fit=crop&auto=format',
}

const sections: Array<MenuCategoryInfo & { items: MenuItem[] }> = [
  {
    value: 'menus',
    label: 'Menús',
    description: 'Lunes a viernes de 12 PM a 5 PM · Entradas: Papa a la Huancaína, Ocopa, Causa de Pollo o Ensalada.',
    items: [
      ['Ají de Gallina', 'Incluye una entrada a elegir.', 'S/ 19.90'],
      ['Carapulcra', 'Incluye una entrada a elegir.', 'S/ 19.90'],
      ['Arroz con Pollo', 'Incluye una entrada a elegir.', 'S/ 21.90'],
      ['Seco de Res con Yuca', 'Incluye una entrada a elegir.', 'S/ 28.90'],
      ['Seco de Res con Frejoles', 'Incluye una entrada a elegir.', 'S/ 29.90'],
      ['Pollo Saltado', 'Menú de almuerzo.', 'S/ 19.90'],
      ['Tallarín Saltado', 'Menú de almuerzo.', 'S/ 19.90'],
      ['Filete de Pollo', 'Con arroz y papas fritas.', 'S/ 19.90'],
      ['Chuleta', 'Con arroz y papas fritas.', 'S/ 19.90'],
      ['Pollada', 'Con arroz y papas fritas.', 'S/ 21.90'],
      ['Filete de Pollo a lo Pobre', 'Con arroz, huevo, plátano y papas fritas.', 'S/ 22.90'],
      ['Mostrito Broaster', '1/4 de pollo broaster, papas fritas y arroz chaufa.', 'S/ 24.90'],
      ['Lasagna en Salsa de Carne', 'Con media porción de pan al ajo.', 'S/ 22.90'],
      ['Spaguetti Verde con Milanesa', 'Menú de almuerzo.', 'S/ 22.90'],
      ['Spaguetti con Carne o a lo Alfredo', 'Con media porción de pan al ajo.', 'S/ 15.90'],
      ['1/4 M Pizza Americana o Chorizo', 'Con media porción de pan al ajo.', 'S/ 15.90'],
    ],
  },
  {
    value: 'trios',
    label: 'Tríos de Experiencias',
    description: 'Tres sabores para compartir y descubrir.',
    items: [
      ['Tres Pisco Sours', 'Clásico, maracuyá y frutos del bosque.', 'S/ 29.90'],
      ['Tres Vinos', 'Gran Rosé, Borgoña y Champagne Dulce.', 'S/ 19.90'],
      ['Tres Chilcanos', 'Clásico, maracuyá y frutos del bosque.', 'S/ 29.90'],
    ],
  },
  {
    value: 'especiales',
    label: 'Especiales de la Casa',
    description: 'Promociones especiales y cocteles emblemáticos de Rústica.',
    items: [
      ['Antistress de Terror', 'Ron, vodka, tequila y pisco.', 'S/ 37.90 c/u'],
      ['Antistress', 'Ron, vodka y tequila.', 'S/ 36.90 c/u'],
      ['Titanic de Tragos Emblemáticos', '4 Perú Carajo, 1 Antistress, 1 Vacuna, 1 Antistress de Terror y 1 Chilcanos 6 Sabores.', 'S/ 146.90'],
      ['Cuba Libre Pirata', 'Medio litro de Cuba Libre con Coca-Cola y ron.', 'S/ 30.90'],
      ['Chalana de Tragos', '1 Antistress de Terror y 4 Perú Carajo.', 'S/ 63.90'],
      ['Los Mamones', 'Baileys y secretos de la casa. Mamón o Mamona.', 'S/ 27.90 c/u'],
      ['La Vacuna', 'Vodka, tequila y ron. Versiones China, USA o Rusa; una dosis.', 'S/ 23.90'],
      ['Piscina', 'Ron, pisco, vodka, tequila, blue curaçao y jugo de piña.', 'S/ 32.90'],
    ],
  },
  {
    value: 'exclusivos',
    label: 'Cocteles Exclusivos',
    description: 'Creaciones y combinaciones exclusivas de la casa.',
    items: [
      ['Perú Carajo', 'Shot de pisco, ají, sal y limón.', 'S/ 15.90'],
      ['Tinto de Verano', 'Coctel refrescante a base de vino.', 'S/ 23.90'],
      ['Paloma', 'Coctel cítrico y refrescante.', 'S/ 25.90'],
      ['Moscow Mule', 'Maracuyá, clásico o fresa.', 'S/ 30.90 c/u'],
      ['Vodka Pirata', 'Especial de la casa.', 'S/ 26.90'],
      ['Vodka Tropicals', 'Sabores tropicales.', 'S/ 24.90 c/u'],
      ['Chilcanos Seis Sabores', 'Degustación de seis sabores.', 'S/ 31.90'],
      ['Cócteles Aperol', 'Preparaciones con Aperol.', 'S/ 24.90'],
    ],
  },
  {
    value: 'clasicos',
    label: 'Cocteles Clásicos',
    description: 'Coctelería clásica, licores, whisky y opciones sin alcohol.',
    items: [
      ['Pisco Sour de Sabores', 'Sabores a elegir.', 'S/ 26.90 c/u'],
      ['Chilcanos de Sabores', 'Sabores a elegir.', 'S/ 26.90 c/u'],
      ['Mojito', 'Coctel clásico.', 'S/ 27.90'],
      ['Daiquiris', 'Sabores a elegir.', 'S/ 29.90 c/u'],
      ['Caipirinha Fresh', 'Versión fresca de la clásica caipirinha.', 'S/ 26.00'],
      ['Tiki Rústico', 'Especial tiki de la casa.', 'S/ 26.00'],
      ['Shot de Pisco', 'Pisco servido en shot.', 'S/ 13.90'],
      ['Sours Rústica', 'Pisco Sour, Maracuyá Sour o Pisco Sour Rústico.', 'S/ 26.26'],
      ['Chilcano', 'Preparación clásica.', 'S/ 26.24'],
      ['Algarrobina', 'Coctel cremoso tradicional.', 'S/ 24.24'],
      ['Machu Picchu', 'Coctel clásico peruano.', 'S/ 24.00'],
      ['Cuba Libre', 'Ron y Coca-Cola.', 'S/ 22.00'],
      ['Daiquiri de Durazno', 'Daiquiri frutal.', 'S/ 29.25'],
      ['Piña Colada', 'Piña, coco y ron.', 'S/ 25.27'],
      ['Shot Tequila', 'Tequila servido en shot.', 'S/ 21.90'],
      ['Tequila Sunrise', 'Tequila y cítricos.', 'S/ 24.30'],
      ['Margarita', 'Coctel clásico con tequila.', 'S/ 30.90'],
      ['Gin con Gin', 'Combinación de la casa.', 'S/ 25.90'],
      ['Vodka con Naranja', 'Vodka y jugo de naranja.', 'S/ 23.90'],
      ['Vodka Spicy Orange', 'Vodka con naranja y notas picantes.', 'S/ 23.19'],
      ['Shot Spicy Tamarind', 'Shot de tamarindo picante.', 'S/ 19.24'],
      ['Sex on the Beach', 'Coctel frutal clásico.', 'S/ 24.27'],
      ['Orgasmo', 'Coctel cremoso.', 'S/ 27.33'],
      ['Apple Martini', 'Martini de manzana.', 'S/ 33.90'],
      ['Whiskys por Vaso', 'JW Etiqueta Roja S/ 23.00 · JW Etiqueta Negra S/ 31.24 · Whiscola S/ 24.00.', 'Desde S/ 23.00'],
      ['Caipirinha', 'Preparación clásica.', 'S/ 22.00'],
      ['Baileys', 'Licor cremoso servido en copa.', 'S/ 25.90'],
      ['Hawaiano Azul', 'Coctel tropical azul.', 'S/ 26.26'],
      ['Long Island', 'Long Island Iced Tea.', 'S/ 26.26'],
      ['Amor en Llamas', 'Especial flameado de la casa.', 'S/ 26.33'],
      ['El Ingeniero', 'Coctel especial de la casa.', 'S/ 33.90'],
      ['Tragos Vírgenes', 'Primavera o Virgen Colada.', 'S/ 18.90'],
    ],
  },
  {
    value: 'torres-bebidas',
    label: 'Torres Juergueras',
    description: 'Torres y formatos para compartir · 1.5 litros.',
    items: [
      ['Torre Chelera', 'Arequipeña S/ 58.90 · Pilsen S/ 58.90 · Cusqueña Dorada S/ 59.90.', 'Desde S/ 58.90'],
      ['Torre de Chilcanos', 'Sabor a elegir, 1.5 litros.', 'S/ 146.90'],
      ['Torre de Vodka con Naranja', '1.5 litros.', 'S/ 146.90'],
      ['Torre Vodka Spice Orange', '1.5 litros.', 'S/ 146.90'],
      ['Sangría', 'Jarra de 1.5 litros.', 'S/ 76.90'],
      ['Sangría Borracha', '1.5 litros de sangría clásica con tequila.', 'S/ 83.90'],
      ['Whiskera', '1 botella JW Etiqueta Roja y 1 litro de Guaraná o Coca-Cola.', 'S/ 186.00'],
      ['Torre Cuba Libre', '1.5 litros.', 'S/ 146.90'],
    ],
  },
  {
    value: 'sangrias',
    label: 'Sangrías',
    description: 'Sangrías clásicas y frutales por copa o jarra.',
    items: [
      ['Sangría Clásica Jarra', 'Jarra de 1 litro.', 'S/ 49.90'],
      ['Sangría Copa', 'Precio según versión.', 'S/ 15.90 / 25.90'],
      ['Sangría de Sabores', 'Maracuyá, fresa, maracumango o frutos del bosque.', 'S/ 25.90 c/u'],
    ],
  },
  {
    value: 'cervezas',
    label: 'Cervezas, Choops y Jarras',
    description: 'Cervezas nacionales e importadas en distintos formatos.',
    items: [
      ['Margarita Real', 'Margarita servida con Coronita.', 'S/ 38.90'],
      ['Choop Vikingo', 'Arequipeña S/ 25.90 · Pilsen S/ 25.90 · Dorada S/ 27.90.', 'Desde S/ 25.90'],
      ['Jarra de Cerveza', 'Arequipeña S/ 33.90 · Pilsen S/ 33.90 · Dorada S/ 34.90.', 'Desde S/ 33.90'],
      ['Cerveza Botella Chica', 'Pilsen S/ 12.90 · Cusqueña Dorada, Negra o Trigo S/ 13.90 · Corona, Corona Cero o Stella Artois S/ 17.90.', 'Desde S/ 12.90'],
    ],
  },
  {
    value: 'botellas',
    label: 'Botellas y Vinos',
    description: 'Botellas, vinos, destilados y bebidas energéticas.',
    items: [
      ['Vinos y Espumantes', 'Rossé S/ 51.90 · Borgoña S/ 51.90 · Gran Tinto S/ 51.90 · Champagne Clásico o Dulce S/ 49.90.', 'Desde S/ 49.90'],
      ['Pisco Tabernero Botija', 'Botella.', 'S/ 120.00'],
      ['Ron Barceló', 'Añejo S/ 145.00 · Dorado S/ 120.00.', 'Desde S/ 120.00'],
      ['Vodka Smirnoff', 'Clásico o Spicy Tamarind.', 'S/ 140.00'],
      ['Tequila Cuervo', 'Botella.', 'S/ 190.00'],
      ["Gin Gordon's", 'Botella.', 'S/ 150.00'],
      ['Johnnie Walker', 'Etiqueta Roja S/ 175.00 · Etiqueta Negra S/ 280.00 · Etiqueta Dorada S/ 450.00.', 'Desde S/ 175.00'],
      ['Red Bull Drinks', 'Red Gin, Tropical Gin, Watermelon Gin o Pomelo Gin.', 'S/ 30.90 c/u'],
      ['Red Bull Cans', 'Energy Drink, Sugarfree, Red Edition o Lila Edition.', 'S/ 16.90'],
    ],
  },
  {
    value: 'bebidas',
    label: 'Bebidas y Refrescos',
    description: 'Bebidas sin alcohol, frozen, café, infusiones y milkshakes.',
    items: [
      ['Gaseosas', 'Presentaciones disponibles.', 'S/ 7.90'],
      ['Agua San Luis', 'Agua embotellada.', 'S/ 6.90'],
      ['Limonada', 'Vaso S/ 10.90 · Jarra S/ 21.90.', 'Desde S/ 10.90'],
      ['Limonada Frozen', 'Vaso S/ 11.90 · Jarra S/ 23.90.', 'Desde S/ 11.90'],
      ['Chicha Morada', 'Vaso S/ 10.90 · Jarra S/ 21.90.', 'Desde S/ 10.90'],
      ['Chicha Morada Frozen', 'Vaso S/ 11.90 · Jarra S/ 23.90.', 'Desde S/ 11.90'],
      ['Maracuyá', 'Vaso S/ 10.90 · Jarra S/ 21.90.', 'Desde S/ 10.90'],
      ['Maracuyá Frozen', 'Vaso S/ 11.90 · Jarra S/ 23.90.', 'Desde S/ 11.90'],
      ['Limonadas de Sabores', 'Silvestre, mango, fresa, frambuesa, maracumango o frutos del bosque.', 'S/ 13.90'],
      ['Refrescantes Schweppes', 'Con hielo y sabor: maracuyá, mango, maracumango, fresa, frambuesa o frutos del bosque.', 'S/ 14.90'],
      ['Frozen de Frutas', 'Mango, fresa, frambuesa, durazno, frutos del bosque o maracumango.', 'S/ 17.90'],
      ['Jarra de Néctar de Naranja', 'Jarra para compartir.', 'S/ 18.90'],
      ['Jarra de Guaraná', 'Jarra para compartir.', 'S/ 18.90'],
      ['Schweppes', 'Bebida refrescante.', 'S/ 18.90'],
      ['Infusiones', 'Variedades disponibles.', 'S/ 4.90'],
      ['Café', 'Café caliente.', 'S/ 5.90'],
      ['Milkshakes', 'Fresa, vainilla, maracuyá, mango, maracumango, frambuesa o frutos del bosque S/ 24.90 · Con Baileys S/ 29.90.', 'Desde S/ 24.90'],
    ],
  },
  {
    value: 'torres-piqueos',
    label: 'Torres de Piqueos',
    description: 'Torres abundantes para compartir entre 2 y 4 personas.',
    items: [
      ['Torre Mundialista', '5 alitas BBQ, 5 broaster, 5 acevichadas, 5 picantes, 5 anticucheras, 5 tequeños de queso, nachitos, 200 g de chicharrón de pollo y salchipapas. Para 3.', 'S/ 119.90'],
      ['Torre de Alitas 4 Sabores', '7 picantes, 7 broaster, 7 BBQ, 7 acevichadas y papas fritas. Para 3.', 'S/ 97.90'],
      ['Torre Broaster', '4 piezas de pollo broaster, 7 alitas acevichadas y papas fritas. Para 2.', 'S/ 74.90'],
      ['Torre 3 Pisos', '5 BBQ, 5 picantes, 5 broaster, 5 tequeños de queso, 200 g de chicharrón de pollo y papas fritas. Para 2.', 'S/ 84.90'],
      ['Torre 5 Pisos', 'Torre 3 Pisos, 5 alitas acevichadas, 5 tequeños venezolanos, 4 boliyucas crunch y 4 empanaditas. Para 3.', 'S/ 126.90'],
      ['Torres Gemelas', 'Torre 3 Pisos, 5 tequeños venezolanos, 8 boliyucas crunch, 2 hot dogs Frankfurt, 2 chorizos, 1 anticucho y 250 g de mollejitas. Para 4.', 'S/ 149.90'],
    ],
  },
  {
    value: 'piqueos',
    label: 'Piqueos',
    description: 'Para abrir el apetito o compartir en grupo.',
    items: [
      ['Piqueo Titanic', '1/4 pizza americana, filete de pollo, chorizo, mollejitas, 5 alitas BBQ, 5 picantes, 5 broaster, 5 tequeños mozzarella, 200 g de chicharrón de pollo y papas fritas. Para 4.', 'S/ 133.90'],
      ['Tabla Juerguera', '200 g de chicharrón de pollo, 5 alitas picantes, 5 tequeños mozzarella, 4 boliyucas crunch, 5 tequeños venezolanos y papas fritas. Para 3.', 'S/ 67.90'],
      ['Piqueo Rústico', '200 g de chicharrón de pollo, 7 alitas BBQ, 5 tequeños y papas fritas. Para 2.', 'S/ 61.90'],
      ['Alitas 14 unidades', 'BBQ, picantes, broaster o acevichadas.', 'S/ 45.90 c/u'],
      ['Alitas 3 Sabores', '7 BBQ, 7 picantes, 7 broaster y papas fritas.', 'S/ 60.90'],
      ['Chicharrón de Pollo', '200 g de filete de pechuga y papas fritas.', 'S/ 28.90'],
      ['Salchipatas Clásica', 'Papas y salchicha.', 'S/ 15.90'],
      ['Salchipatas Especial', 'Versión especial de la casa.', 'S/ 25.90'],
      ['Salchipatas Asesina', 'La versión más contundente.', 'S/ 35.90'],
      ['Tacos', '3 unidades de pollo a la parrilla o pollo crunch.', 'S/ 32.90'],
      ['Piqueo Anticuchero', 'Anticucho, mollejitas, alitas anticucheras y papas fritas.', 'S/ 54.90'],
      ['Piqueo Parrillero', 'Chuleta, bife, filete de pollo, chorizo parrillero, alitas parrilleras, 200 g de mollejitas y papas fritas.', 'S/ 69.90'],
      ['Tequeños Clásicos', '10 unidades rellenas de mozzarella.', 'S/ 30.90'],
      ['Tequeños Venezolanos', '5 unidades rellenas de mozzarella.', 'S/ 16.90'],
      ['Boliyucas Crunch', '8 unidades.', 'S/ 16.90'],
      ['Empanaditas Rústicas', '4 unidades de carne.', 'S/ 14.90'],
      ['Nachitos Rústicos', 'Nachos de la casa.', 'S/ 13.90'],
      ['Brochetas de Pollo', '2 brochetas y papas fritas.', 'S/ 29.90'],
    ],
  },
  {
    value: 'pizzas',
    label: 'Pizzas',
    description: 'Pizzas por cuarto o medio metro.',
    items: [
      ['Pizza Americana', '1/4 metro S/ 17.90 · 1/2 metro S/ 31.90.', 'Desde S/ 17.90'],
      ['Pizza de Chorizo', '1/4 metro S/ 17.90 · 1/2 metro S/ 31.90.', 'Desde S/ 17.90'],
      ['Pizza Hawaiana', '1/4 metro S/ 21.90 · 1/2 metro S/ 38.90.', 'Desde S/ 21.90'],
      ['Pizza 4 x 4', 'Italiana, hawaiana, americana y chorizo. 1/4 metro S/ 23.90 · 1/2 metro S/ 41.90.', 'Desde S/ 23.90'],
      ['Pizza Rústica', '1/4 metro S/ 26.90 · 1/2 metro S/ 48.90.', 'Desde S/ 26.90'],
      ['Pizza Italiana', '9 ingredientes. 1/4 metro S/ 26.90 · 1/2 metro S/ 48.90.', 'Desde S/ 26.90'],
    ],
  },
  {
    value: 'pastas',
    label: 'Pastas',
    description: 'Lasagnas, ravioles, fetuccinis y spaguettis.',
    items: [
      ['Póker de Pastas', 'Lasagna, fetuccini y ravioles. En salsa de carne o a lo Alfredo.', 'S/ 37.90'],
      ['Lasagnas', 'Salsa de carne S/ 31.90 · Dos carnes S/ 33.90.', 'Desde S/ 31.90'],
      ['Ravioles', 'En salsa de carne o a lo Alfredo.', 'S/ 29.90'],
      ['Fetuccinis', 'Salsa de carne S/ 28.90 · Alfredo S/ 28.90 · Huancaína S/ 27.90 · Alfredo con bife S/ 54.90 · Huancaína con lomo fino S/ 61.90.', 'Desde S/ 27.90'],
      ['Spaguettis', 'En salsa de carne, a lo Alfredo o a la huancaína.', 'S/ 21.90'],
      ['Pan al Ajo', 'Simple S/ 6.90 · Especial S/ 8.90.', 'Desde S/ 6.90'],
      ['Salsa Rústica', 'Porción adicional.', 'S/ 8.90'],
    ],
  },
  {
    value: 'parrillas',
    label: 'Parrillas',
    description: 'Carnes, anticuchos y parrillas para compartir.',
    items: [
      ['Costillas BBQ', 'Con papas fritas. Media costilla S/ 41.90 · Costilla completa S/ 64.90.', 'Desde S/ 41.90'],
      ['Complemento 7 Alitas BBQ', '7 alitas con salsa BBQ.', 'S/ 19.90'],
      ['Bife', '250 g con papas fritas y ensalada.', 'S/ 49.90'],
      ['Lomo Fino', '250 g con papas fritas y ensalada.', 'S/ 60.90'],
      ['Mollejitas', '250 g con papas fritas y ensalada.', 'S/ 27.90'],
      ['Chuleta', '200 g con papas fritas y ensalada.', 'S/ 28.90'],
      ['Chuleta 3 Sabores', 'Con papas fritas y ensalada.', 'S/ 35.90'],
      ['Anticuchos', '2 palitos con papas fritas.', 'S/ 29.90'],
      ['Anticuchos con Mollejitas', '2 palitos, mollejitas y papas fritas.', 'S/ 35.90'],
      ['1/2 Parrilla', 'Para 2 personas.', 'S/ 74.90'],
      ['Parrilla Entera', 'Para 3 a 4 personas.', 'S/ 134.90'],
      ['Complementos Extra', 'Mozzarella S/ 4.90 · Jamón S/ 3.90 · Hot dog S/ 5.90 · Mollejitas 125 g S/ 6.90 · Anticucho de pollo S/ 7.90 · Chorizo S/ 6.90 · Arroz blanco S/ 6.90 · Chaufa S/ 8.90 · Anticucho de corazón S/ 12.90 · Ensalada S/ 12.90 · Papas fritas S/ 15.90.', 'Desde S/ 3.90'],
    ],
  },
  {
    value: 'pollos',
    label: 'Pollos',
    description: 'Pollada, broaster, pollo a la brasa y filetes.',
    items: [
      ['Pollada 1/4 con Papas', 'Cuarto de pollada con papas fritas.', 'S/ 27.90'],
      ['Pollada 1/4 Completa', 'Cuarto de pollada con papas fritas y ensalada.', 'S/ 29.90'],
      ['Pollo Broaster', '2 piezas con papas S/ 23.90 · 4 piezas con papas S/ 42.90.', 'Desde S/ 23.90'],
      ['Pollo a la Brasa', '1/4 pollo S/ 22.90 · 1/2 pollo S/ 40.90 · 1 pollo con papas y ensalada S/ 70.90.', 'Desde S/ 22.90'],
      ['Mostrito Broaster Parrillero', 'Especial de la casa.', 'S/ 33.90'],
      ['Mostrito Brasa', 'Pollo a la brasa con arroz chaufa.', 'S/ 29.90'],
      ['Mostrito Broaster', 'Pollo broaster con arroz chaufa.', 'S/ 29.90'],
      ['Filete de Pechuga a lo Pobre Parrillero', 'Filete parrillero con acompañamientos a lo pobre.', 'S/ 38.90'],
      ['Filete a lo Pobre', 'Filete con acompañamientos a lo pobre.', 'S/ 34.90'],
      ['Filete Parrillero', 'Filete de pollo a la parrilla.', 'S/ 37.90'],
      ['Filete 3 Sabores a lo Pobre', 'Tres sabores con acompañamientos a lo pobre.', 'S/ 31.90'],
      ['Filete 3 Sabores', 'Filete con tres sabores.', 'S/ 39.90'],
      ['Filete Rústico con Papas', 'Filete rústico y papas fritas.', 'S/ 29.90'],
      ['Filete Rústico Especial', 'Con jamón, tocino, papas fritas y ensalada.', 'S/ 33.90'],
      ['Ensalada Rústica Light', 'Precio según versión.', 'S/ 24.90 / 27.90'],
    ],
  },
  {
    value: 'peruanitos',
    label: 'Peruanitos y Postres',
    description: 'Sabores peruanos, platos de fondo y postres.',
    items: [
      ['Lomo Saltado', '250 g de lomo.', 'S/ 59.90'],
      ['Tallarín Saltado con Pollo', 'Con 200 g de pollo.', 'S/ 26.90'],
      ['Pollo Saltado', 'Con 200 g de pollo.', 'S/ 26.90'],
      ['Aeropuerto Rústico', 'Arroz chaufa y tallarín saltado al estilo Rústica.', 'S/ 26.90'],
      ['Chaufa de Pollo', 'Con 200 g de filete de pechuga.', 'S/ 26.90'],
      ['Fetuccini Verde con Milanesa', 'Con milanesa de 200 g.', 'S/ 33.90'],
      ['Milanesa de Pollo', 'Milanesa de 200 g.', 'S/ 31.90'],
      ['Milanesa de Pollo a lo Pobre', 'Milanesa de 200 g con acompañamientos a lo pobre.', 'S/ 34.90'],
      ['Anticuchos', '2 palitos con papas fritas.', 'S/ 29.90'],
      ['Anticuchos con Mollejitas', 'Anticuchos y mollejitas.', 'S/ 35.90'],
      ['Volcán de Chocolate con Helado', 'Bizcocho tibio de chocolate con helado.', 'S/ 14.90'],
      ['Helados', '1 bola S/ 5.90 · 2 bolas S/ 9.90 · 3 bolas S/ 14.90.', 'Desde S/ 5.90'],
    ],
  },
]

export const categories: MenuCategoryInfo[] = sections.map(({ value, label, description }) => ({
  value,
  label,
  description,
}))

export const dishes: Dish[] = sections.flatMap((section, sectionIndex) =>
  section.items.map(([name, description, price], itemIndex) => ({
    id: sectionIndex * 100 + itemIndex + 1,
    name,
    description,
    price,
    image: categoryImages[section.value],
    category: section.value,
  })),
)

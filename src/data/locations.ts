export interface LocationInfo {
  value: string
  label: string
  address: string
  attention: string
  karaoke: string
  disco: string
}

const location = (
  value: string,
  label: string,
  address: string,
  attention: string,
  karaoke: string,
  disco: string,
): LocationInfo => ({ value, label, address, attention, karaoke, disco })

export const locationGroups: Array<{ label: string; locations: LocationInfo[] }> = [
  {
    label: 'Lima y Callao',
    locations: [
      location('barranco', 'Barranco', 'Parque Municipal Nro. 105 - 107', 'Domingo a jueves 12:00 p. m. – 1:00 a. m.; viernes y sábado hasta 3:00 a. m.', 'No indicado', 'Domingo a jueves 12:00 p. m. – 1:00 a. m.; viernes y sábado hasta 3:00 a. m.'),
      location('brena', 'Breña', 'Av. Venezuela Nro. 930 - Breña', 'Domingo a jueves 12:00 p. m. – 2:00 a. m.; viernes y sábado hasta 3:00 a. m.', 'Domingo a jueves 1:00 p. m. – 2:00 a. m.; viernes y sábado hasta 3:00 a. m.', 'Domingo a jueves 6:00 p. m. – 2:00 a. m.; viernes y sábado hasta 3:00 a. m.'),
      location('canto-rey', 'Canto Rey', 'Mza. C1 Lt. 24 Urb. Los Pinos Lima - San Juan de Lurigancho', 'Domingo a jueves 11:00 a. m. – 12:00 a. m.; viernes y sábado 11:00 a. m. – 3:00 a. m.', 'Todos los días 4:00 p. m. – 3:00 a. m.', 'Lunes a domingo 6:00 p. m. – 3:00 a. m.'),
      location('centro-civico', 'Centro Cívico', 'Av. Inca Garcilazo de la Vega - Cercado de Lima', 'Domingo a jueves 11:00 a. m. – 1:00 a. m.; viernes y sábado 11:00 a. m. – 2:00 a. m.', 'Lunes a domingo 11:00 a. m. – 2:00 a. m.', 'Lunes a domingo 6:00 p. m. – 2:00 a. m.'),
      location('chimu', 'Chimú', 'Av. Gran Chimú Nro. 674 Urb. Zarate', 'Lunes a domingo 12:00 p. m. – 2:00 a. m.', 'Lunes a domingo 6:00 p. m. – 2:00 a. m.', 'No indicado'),
      location('chorrillos', 'Chorrillos', 'Real Plaza Guardia Civil 1er Piso', 'Lunes a domingo 12:00 p. m. – 3:00 a. m.', 'Lunes a domingo 1:00 p. m. – 3:00 a. m.', 'No indicado'),
      location('chosica', 'Chosica', 'Av. Trujillo Sur 414 - Lurigancho - Chosica - Plaza de Armas de Chosica', 'Domingo a jueves 12:00 p. m. – 2:00 a. m.; viernes y sábado 11:00 a. m. – 4:00 a. m.', 'Domingo a jueves 6:00 p. m. – 2:00 a. m.; viernes y sábado 4:00 p. m. – 4:00 a. m.', 'No indicado'),
      location('costa-verde', 'Costa Verde', 'Playa Barranquito - Circuito de Playas, Barranco', 'Lunes a domingo 11:00 a. m. – 3:00 a. m.', 'No indicado', 'No indicado'),
      location('granjita-pachacamac', 'Granjita Pachacamac', 'Av. Manuel Valle 15823, Lurín 15823 - Ex Granjita del Arriero', 'No indicado', 'No indicado', 'No indicado'),
      location('lince-risso', 'Lince – Risso', 'Jr. Risso Nro. 147', 'Domingo a jueves 12:00 p. m. – 1:00 a. m.; viernes y sábado 12:00 p. m. – 3:00 a. m.', 'Domingo a jueves 2:00 p. m. – 1:00 a. m.; viernes y sábado no indicado.', 'Domingo a jueves 6:00 p. m. – 1:00 a. m.; viernes y sábado 6:00 p. m. – 3:00 a. m.'),
      location('los-olivos-izaguirre', 'Los Olivos – Izaguirre', 'Av. Carlos A. Izaguirre Nro. 271 - 275', 'Lunes a domingo 12:00 p. m. – 5:00 a. m.', 'No indicado', 'Lunes a domingo 6:00 p. m. – 5:00 a. m.'),
      location('los-olivos-palmeras', 'Los Olivos – Palmeras', 'Av. Las Palmeras Nro. 3810 - Los Olivos', 'Lunes a domingo 12:00 p. m. – 12:00 a. m.', 'No indicado', 'No indicado'),
      location('los-olivos-pro', 'Los Olivos – Pro', 'Av. Los Próceres Nro. 7868 Urb. Pro - Los Olivos', 'Lunes a domingo 12:00 p. m. – 1:00 a. m.', 'Domingo a jueves 3:00 p. m. – 2:00 a. m.; viernes y sábado hasta 4:00 a. m.', 'Lunes a domingo 12:00 p. m. – 1:00 a. m.'),
      location('mall-aventura-sjl', 'Mall Aventura San Juan de Lurigancho', 'Mall Aventura SJL 3er piso', 'Lunes a jueves 12:00 p. m. – 11:00 p. m.', 'No indicado', 'Lunes a jueves 12:00 p. m. – 11:00 p. m.'),
      location('mall-aventura-santa-anita', 'Mall Aventura Santa Anita', 'Mall Aventura Santa Anita 3er Piso', 'Domingo a jueves 12:00 p. m. – 1:00 a. m.; viernes y sábado 12:00 p. m. – 5:00 a. m.', 'No indicado', 'No indicado'),
      location('mall-del-sur', 'Mall del Sur', 'Los Lirios San Juan de Miraflores 15801', 'Lunes a domingo 12:00 p. m. – 3:00 a. m.', 'Lunes a domingo 4:00 p. m. – 3:00 a. m.', 'No indicado'),
      location('mallplaza-bellavista', 'MallPlaza Bellavista', 'MallPlaza Bellavista 1er Piso - Callao', 'Todos los días desde el mediodía; domingo a jueves hasta 1:00 a. m.; viernes y sábado hasta 3:00 a. m.', 'Todos los días desde 5:00 p. m.; domingo a jueves hasta 1:00 a. m.; viernes y sábado hasta 3:00 a. m.', 'Todos los días desde 6:00 p. m.; domingo a jueves hasta 1:00 a. m.; viernes y sábado hasta 3:00 a. m.'),
      location('mallplaza-comas', 'MallPlaza Comas', 'Av. Los Angeles Nro. 602 - 2do Nivel MallPlaza Comas', 'Domingo a jueves 12:00 p. m. – 10:00 p. m.; viernes y sábado 12:00 p. m. – 2:00 a. m.', 'Domingo a jueves 12:00 p. m. – 10:00 p. m.; jueves a sábado 12:00 p. m. – 2:00 a. m.', 'No indicado'),
      location('megaplaza', 'MegaPlaza', 'Centro Comercial Megaplaza Independencia - Plaza Conquistadores 3er Nivel', 'Domingo a jueves 12:00 p. m. – 1:00 a. m.; viernes y sábado 12:00 p. m. – 3:00 a. m.', 'Todos los días 6:00 p. m. – 3:00 a. m.', 'Todos los días 6:00 p. m. – 3:00 a. m.'),
      location('minka', 'Minka', 'Av. Argentina 3093 - 2do Nivel (Arriba del Patio de Comidas) - Callao', 'Lunes a domingo 12:00 p. m. – 2:00 a. m.', 'Lunes a domingo 12:00 p. m. – 1:00 a. m.', 'No indicado'),
      location('miraflores-calle-pizzas', 'Miraflores – Calle Las Pizzas', 'Pasaje San Ramon 104 - Miraflores', 'Domingo a jueves 12:00 p. m. – 2:00 a. m.; viernes y sábado hasta 3:00 a. m.', 'Domingo a jueves 6:00 p. m. – 2:00 a. m.; viernes y sábado hasta 3:00 a. m.', 'No indicado'),
      location('miraflores-figari', 'Miraflores – Figari', 'Calle Juan Figari Nro. 135', 'Domingo a jueves 12:00 p. m. – 2:00 a. m.; viernes y sábado 12:00 p. m. – 3:00 a. m.', 'Domingo a jueves 12:00 p. m. – 2:00 a. m.; viernes y sábado 12:00 p. m. – 3:00 a. m.', 'Domingo a jueves 6:00 p. m. – 2:00 a. m.; viernes y sábado 6:00 p. m. – 3:00 a. m.'),
      location('ovalo-santa-anita', 'Óvalo Santa Anita', 'Calle Los Flamencos Nro. 121 - Santa Anita', 'Domingo a jueves 12:00 p. m. – 2:00 a. m.; viernes y sábado 12:00 p. m. – 3:00 a. m.', 'No indicado', 'No indicado'),
      location('plaza-norte-fiori', 'Plaza Norte – Fiori', 'Centro Comercial Plaza Norte 1er piso - Plaza Restaurantes', 'Domingo a jueves 12:00 p. m. – 2:00 a. m.; viernes y sábado hasta 4:00 a. m.', 'Domingo a jueves 3:00 p. m. – 2:00 a. m.; viernes y sábado hasta 4:00 a. m.', 'Domingo a jueves 6:00 p. m. – 2:00 a. m.; viernes y sábado hasta 4:00 a. m.'),
      location('plaza-san-martin', 'Plaza San Martín', 'Av. Nicolás de Piérola Nro. 190 Cercado de Lima - Lima', 'Domingo a jueves 11:00 a. m. – 2:00 a. m.; viernes y sábado 11:00 a. m. – 3:00 a. m.', 'Domingo a jueves 6:00 p. m. – 2:00 a. m.; viernes y sábado 6:00 p. m. – 3:00 a. m.', 'Domingo a jueves 6:00 p. m. – 2:00 a. m.; viernes y sábado 6:00 p. m. – 3:00 a. m.'),
      location('puente-piedra', 'Puente Piedra', 'Av. Buenos Aires Nro. 366 Urb. Cercado de Puente Piedra - Lima - Puente Piedra', '12:00 p. m. – 4:10 a. m.', 'No indicado', 'No indicado'),
      location('puruchuco', 'Puruchuco', 'Real Plaza Puruchuco - 2do Piso. Plaza Sabor', 'Lunes a domingo 12:00 p. m. – 2:00 a. m.', 'Lunes a domingo 6:00 p. m. – 2:00 a. m.', 'No indicado'),
      location('retablo', 'Retablo', 'Av. Jose de la Torre Ugarte Nro. 420 Urb. El Retablo', 'Todos los días 12:00 p. m. – 3:00 a. m.', 'Todos los días 6:00 p. m. – 3:00 a. m.', 'Todos los días 6:00 p. m. – 3:00 a. m.'),
      location('rimac-tarapaca', 'Rímac – Tarapacá', 'Av. Felipe Arancibia Nro. 773', 'Domingo a jueves 12:00 p. m. – 1:00 a. m.; viernes y sábado 11:00 a. m. – 3:00 a. m.', 'Domingo a jueves 6:00 p. m. – 1:00 a. m.', 'No indicado'),
      location('san-borja', 'San Borja', 'Av. Aviación Nro. 2482 - San Borja', 'Lunes a domingo 12:00 p. m. – 2:00 a. m.', 'No indicado', 'No indicado'),
      location('san-juan-lurigancho', 'San Juan de Lurigancho', 'Av. Próceres de la Independencia Nro. 1718 Urb. San Hilarion Etapa 2', 'Domingo a jueves 12:00 p. m. – 1:00 a. m.; viernes y sábado 12:00 p. m. – 3:00 a. m.', 'Domingo a jueves 3:00 p. m. – 3:00 a. m.', 'Lunes a domingo 6:00 p. m. – 3:00 a. m.'),
      location('san-juan-miraflores', 'San Juan de Miraflores', 'Av. San Juan Nro. 150 - SJM', 'Lunes a domingo 12:00 p. m. – 3:00 a. m.', 'Lunes a domingo 12:00 p. m. – 3:00 a. m.', 'Jueves a domingo 12:00 p. m. – 3:00 a. m.'),
      location('san-martin-porres', 'San Martín de Porres', 'Av. Perú Nº 3398 Urb. Perú', 'Lunes a domingo 12:00 p. m. – 2:00 a. m.', 'Lunes a domingo 12:00 p. m. – 3:00 a. m.', 'Lunes a domingo 12:00 p. m. – 4:00 a. m.'),
      location('san-miguel', 'San Miguel', 'Av. La Marina Nro. 2631 - San Miguel', 'Domingo a jueves 12:00 p. m. – 1:00 a. m.; viernes y sábado 12:00 p. m. – 3:00 a. m.', 'Domingo a jueves 12:00 p. m. – 1:00 a. m.', 'Viernes y sábado 6:00 p. m. – 3:00 a. m.'),
      location('santa-clara', 'Santa Clara', 'Centro Comercial Real Plaza Santa Clara 1er piso', 'Domingo a jueves 12:00 p. m. – 1:00 a. m.; viernes y sábado 12:00 p. m. – 3:00 a. m.', 'Domingo a jueves 6:00 p. m. – 1:00 a. m.; viernes y sábado 6:00 p. m. – 3:00 a. m.', 'Domingo a jueves 6:00 p. m. – 1:00 a. m.; viernes y sábado 6:00 p. m. – 3:00 a. m.'),
      location('surco', 'Surco', 'Av. Aviación 4917 - Cerca al Óvalo Higuereta', 'Domingo a jueves 12:00 p. m. – 1:00 a. m.; viernes y sábado 12:00 p. m. – 3:00 a. m.', 'Domingo a jueves 12:00 p. m. – 1:00 a. m.; viernes y sábado 12:00 p. m. – 3:00 a. m.', 'No indicado'),
      location('ventanilla', 'Ventanilla', 'Plaza Vea Ventanilla 2do Piso', 'Domingo a jueves 12:00 p. m. – 2:00 a. m.; viernes y sábado 12:00 p. m. – 4:00 a. m.', 'Lunes a domingo 3:00 p. m. – 2:00 a. m.; viernes y sábado 3:00 p. m. – 4:00 a. m.', 'Lunes a domingo 6:00 p. m. – 2:00 a. m.; viernes y sábado 6:00 p. m. – 4:00 a. m.'),
      location('villa-salvador', 'Villa El Salvador', 'Esquina de Óvalo Mariátegui y Av. Mariano Pastor Sevilla - Villa El Salvador', 'Lunes a domingo 12:00 p. m. – 3:00 a. m.', 'Lunes a domingo 6:00 p. m. – 3:00 a. m.', 'Lunes a domingo 6:00 p. m. – 3:00 a. m.'),
      location('villa-maria-triunfo', 'Villa María del Triunfo', 'Av. Villa María 201 - A.H. Villa Jardín. Cruce con Nicolás de Piérola', 'Lunes a domingo 12:00 p. m. – 3:00 a. m.', 'Lunes a domingo 6:00 p. m. – 3:00 a. m.', 'Lunes a domingo 6:00 p. m. – 3:00 a. m.'),
      location('wilson', 'Wilson', 'Av. Inca Garcilaso de la Vega (Ex Av. Wilson) Nro. 828, Cercado de Lima', 'Lunes a domingo 12:00 p. m. – 3:00 a. m.', 'Lunes a domingo 6:00 p. m. – 3:00 a. m.', 'Lunes a domingo 6:00 p. m. – 3:00 a. m.'),
    ],
  },
  {
    label: 'Provincias',
    locations: [
      location('arequipa', 'Arequipa', 'Av. Dolores Nro. 105', 'Domingo a jueves 12:00 p. m. – 2:00 a. m.; viernes y sábado 12:00 p. m. – 2:00 a. m.', 'Domingo a jueves 6:00 p. m. – 2:00 a. m.; viernes y sábado 6:00 p. m. – 2:00 a. m.', 'Jueves 6:00 p. m. – 2:00 a. m.; viernes y sábado 6:00 p. m. – 2:00 a. m.'),
      location('cajamarca', 'Cajamarca', 'Centro Comercial Real Plaza Cajamarca 2do Piso', 'Lunes a domingo 12:00 p. m. – 2:00 a. m.', 'Lunes a domingo 4:00 p. m. – 2:00 a. m.', 'No indicado'),
      location('huanuco', 'Huánuco', 'Real Plaza Huánuco 2do Piso', 'Lunes a domingo 12:00 p. m. – 12:00 a. m.', 'Lunes a sábado 5:00 p. m. – 12:00 a. m.; domingos 1:00 p. m. – 12:00 a. m.', 'No indicado'),
      location('ica', 'Ica', 'Av. Jose Matías Manzanilla Nro. 190', 'Domingo a jueves 12:00 p. m. – 2:00 a. m.; viernes y sábado 12:00 p. m. – 3:00 a. m.', 'Domingo a jueves 6:00 p. m. – 2:00 a. m.; viernes y sábado 6:00 p. m. – 3:00 a. m.', 'Domingo a jueves 6:00 p. m. – 2:00 a. m.; viernes y sábado 6:00 p. m. – 3:00 a. m.'),
      location('iquitos', 'Iquitos', 'Av. José Abelardo Quiñonez Lt. 02 Urb. Zona Urbana San Juan Bautista', 'Lunes a miércoles 12:00 p. m. – 12:00 a. m.; jueves a domingo 12:00 p. m. – 4:00 a. m.', 'Lunes a miércoles 12:00 p. m. – 12:00 a. m.; jueves a domingo 12:00 p. m. – 4:00 a. m.', 'No indicado'),
      location('juliaca', 'Juliaca', 'Centro Comercial Real Plaza Juliaca 1er piso', 'Domingo a jueves 12:00 p. m. – 3:00 a. m.; viernes y sábado 12:00 p. m. – 4:00 a. m.', 'Domingo a jueves 6:00 p. m. – 2:00 a. m.; viernes y sábado 12:00 p. m. – 3:00 a. m.', 'Domingo a jueves 6:00 p. m. – 2:00 a. m.; viernes y sábado 12:00 p. m. – 3:00 a. m.'),
      location('mall-aventura-chiclayo', 'Mall Aventura Chiclayo', 'Mall Aventura Chiclayo 2do piso', 'Domingo a jueves 12:00 p. m. – 12:00 a. m.; viernes y sábado 12:00 p. m. – 2:00 a. m.', 'Domingo a jueves 4:00 p. m. – 12:00 a. m.; viernes y sábado 4:00 p. m. – 2:00 a. m.', 'No indicado'),
      location('real-plaza-chiclayo', 'Real Plaza Chiclayo', 'C.C. Real Plaza Chiclayo 2do piso', 'Domingo a jueves 12:00 p. m. – 12:00 a. m.; viernes y sábado 12:00 p. m. – 2:00 a. m.', 'Domingo a jueves 4:00 p. m. – 12:00 a. m.; viernes y sábado 4:00 p. m. – 2:00 a. m.', 'No indicado'),
      location('piura', 'Piura', 'Centro Comercial Real Plaza Piura 2do piso', 'Lunes a domingo 12:00 p. m. – 3:00 a. m.', 'Lunes a domingo 6:00 p. m. – 3:00 a. m.', 'Lunes a domingo 6:00 p. m. – 3:00 a. m.'),
      location('pucallpa', 'Pucallpa', 'Centro Comercial Real Plaza Pucallpa 2do Piso', 'Lunes a domingo 12:00 p. m. – 2:00 a. m.', 'Lunes a domingo 3:00 p. m. – 2:00 a. m.', 'Lunes a domingo 6:00 p. m. – 3:00 a. m.'),
      location('trujillo', 'Trujillo', 'Av. Larco 699, Urb. La Merced - Trujillo', 'Lunes a domingo 12:00 p. m. – 3:00 a. m.', 'Lunes a domingo 12:00 p. m. – 3:00 a. m.', 'Lunes a domingo 6:00 p. m. – 2:00 a. m.'),
    ],
  },
]

export const branchGroups = locationGroups.map(group => ({
  label: group.label,
  branches: group.locations.map(({ value, label }) => ({ value, label })),
}))

export const branches = branchGroups.flatMap(group => group.branches)

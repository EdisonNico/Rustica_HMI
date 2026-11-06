interface LegalSection {
  title: string
  paragraphs?: string[]
  bullets?: string[]
  groups?: { subtitle: string; bullets: string[] }[]
  footer?: string
}

export const legalSections: LegalSection[] = [
  {
    title: '1. IDENTIDAD DEL TITULAR DEL BANCO DE DATOS PERSONALES',
    paragraphs: [
      'Rustica Club Membresias S.A.C. (en adelante, “La Empresa”), identificada con RUC N.º 20612988014, con domicilio en Jr. Francisco Moreyra y Riglos Nro. 525 Urb. Oscar Raul Benavides, Lima, Perú, es titular de los bancos de datos personales y responsable del tratamiento de los mismos, en cumplimiento de la Ley N.º 29733 – Ley de Protección de Datos Personales, su Reglamento aprobado por Decreto Supremo N.º 003-2013-JUS, sus modificatorias, incluyendo el Decreto Supremo N.º 016-2024-JUS, y demás normas complementarias.',
      'Para cualquier consulta, el Titular de los Datos Personales podrá comunicarse al correo electrónico: contacto@rustica.com.pe',
    ],
  },
  {
    title: '2. PRINCIPIOS RECTORES',
    bullets: [
      'Legalidad: conforme a la normativa vigente.',
      'Consentimiento: previo, libre, expreso, informado e inequívoco.',
      'Finalidad: para fines determinados, explícitos y lícitos.',
      'Proporcionalidad: únicamente los datos necesarios.',
      'Calidad: datos veraces, exactos y actualizados.',
      'Seguridad: protección contra accesos no autorizados.',
      'Disposición de recurso: respeto a los derechos del Titular.',
    ],
  },
  {
    title: '3. DATOS PERSONALES RECOPILADOS',
    paragraphs: ['La Empresa podrá recopilar y tratar datos personales de sus clientes, usuarios, proveedores, trabajadores y/o postulantes, tales como:'],
    bullets: [
      'Datos de identificación (nombre, DNI, carnet de extranjería u otro documento).',
      'Datos de contacto (correo electrónico, teléfono, dirección).',
      'Información de consumo y preferencias.',
      'Información de interacción en plataformas digitales.',
      'Datos de facturación y transaccionales (cuando corresponda).',
    ],
    footer: 'La Empresa no recopila datos sensibles, salvo que sea estrictamente necesario y previa autorización expresa del Titular.',
  },
  {
    title: '4. FINALIDADES DEL TRATAMIENTO DE DATOS PERSONALES',
    groups: [
      {
        subtitle: '4.1 Finalidades necesarias',
        bullets: [
          'Gestionar la relación contractual o precontractual.',
          'Administrar servicios, membresías, reservas o compras.',
          'Atender consultas, solicitudes o reclamos.',
          'Garantizar la seguridad de personas e instalaciones.',
          'Cumplir obligaciones legales y regulatorias.',
        ],
      },
      {
        subtitle: '4.2 Finalidades adicionales (sujetas a consentimiento)',
        bullets: [
          'Envío de promociones, ofertas y beneficios comerciales.',
          'Personalización de contenidos y experiencias.',
          'Ejecución de campañas publicitarias.',
          'Análisis de comportamiento y perfilamiento comercial.',
        ],
      },
    ],
    footer: 'El Titular podrá negar o revocar su consentimiento para estas finalidades sin afectar el acceso a los servicios principales.',
  },
  {
    title: '5. CONSENTIMIENTO DEL TITULAR',
    paragraphs: ['El tratamiento de los datos personales se realizará únicamente cuando el Titular haya otorgado su consentimiento conforme a ley.'],
    bullets: [
      'Formularios físicos o digitales.',
      'Aceptación en plataformas web o aplicaciones.',
      'Marcación de casillas (checkbox).',
      'El Titular podrá revocar su consentimiento en cualquier momento.',
    ],
  },
  {
    title: '6. PLAZO DE CONSERVACIÓN DE LOS DATOS PERSONALES',
    bullets: [
      'Mientras dure la relación contractual.',
      'Por el tiempo necesario para cumplir obligaciones legales.',
      'Hasta que el Titular solicite su cancelación, cuando corresponda.',
    ],
  },
  {
    title: '7. TRANSFERENCIA Y ENCARGADOS DE TRATAMIENTO',
    groups: [
      { subtitle: '7.1 Encargados de tratamiento', bullets: ['Plataformas tecnológicas y CRM.', 'Servicios de marketing digital.', 'Proveedores de almacenamiento y hosting.'] },
      { subtitle: '7.2 Terceros vinculados', bullets: ['Empresas del grupo empresarial.', 'Aliados comerciales.', 'Entidades financieras o aseguradoras.'] },
      { subtitle: '7.3 Transferencias internacionales', bullets: ['Los datos podrán ser transferidos a servidores ubicados fuera del Perú, garantizando niveles adecuados de protección.'] },
    ],
  },
  {
    title: '8. DERECHOS DEL TITULAR DE LOS DATOS PERSONALES',
    bullets: ['Acceso.', 'Rectificación.', 'Cancelación.', 'Oposición.', 'Revocación del consentimiento.', 'Portabilidad (cuando resulte aplicable).'],
  },
  {
    title: '9. PROCEDIMIENTO PARA EL EJERCICIO DE DERECHOS',
    paragraphs: ['El Titular deberá enviar una solicitud al correo electrónico: contacto@rustica.com.pe'],
    bullets: ['Nombre completo y documento de identidad.', 'Petición concreta.', 'Medio de respuesta.'],
    footer: 'Plazos de atención: respuesta general, hasta 10 días hábiles; derecho de acceso, hasta 20 días hábiles.',
  },
  {
    title: '10. MEDIDAS DE SEGURIDAD',
    paragraphs: ['La Empresa adopta medidas técnicas, organizativas y administrativas necesarias para garantizar la seguridad de los datos personales.'],
  },
  {
    title: '11. INCIDENTES DE SEGURIDAD',
    bullets: [
      'Se adoptarán medidas correctivas inmediatas.',
      'Se notificará a la autoridad competente cuando corresponda.',
      'Se informará al Titular en caso de riesgo relevante.',
    ],
  },
  {
    title: '12. USO DE COOKIES Y TECNOLOGÍAS DIGITALES',
    bullets: ['Mejorar la experiencia del usuario.', 'Analizar el comportamiento de navegación.', 'Ofrecer contenido personalizado.'],
  },
  {
    title: '13. LIMITACIÓN DEL USO DE DATOS PERSONALES',
    bullets: ['No sean necesarios para la relación contractual.', 'Haya revocado su consentimiento.'],
  },
  {
    title: '14. MODIFICACIONES DE LA POLÍTICA',
    paragraphs: [
      'La Empresa se reserva el derecho de modificar la presente Política de Privacidad en cualquier momento.',
      'Cualquier modificación será comunicada mediante su publicación en los sitios web oficiales.',
      'Las modificaciones entrarán en vigencia a partir de su publicación.',
      'Se recomienda revisar periódicamente esta Política.',
    ],
  },
  {
    title: '15. ACEPTACIÓN',
    paragraphs: ['El uso de los servicios de La Empresa implica la aceptación de la presente Política de Privacidad.'],
  },
]

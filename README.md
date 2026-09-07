# ICM PORTAL DE GLORIA

Plataforma Web Oficial, Moderna y Responsive para la Iglesia Cristiana ICM Portal de Gloria.
Pastores Principales: **Pedro Rodriguez & Omaida Cruz**

## Identidad Visual
- **Colores Principales**: Negro profundo, Dorado ceremonial, Blanco puro y Crema espiritual.
- **Inspiración del Logo**: Arco dorado monumental, cruz radiante y tipografía serif clásica y elegante.
- **Diseño Mobile-First**: Optimizado para teléfonos celulares (iOS / Android), tabletas y computadoras.
- **Barra Inferior Móvil**: Navegación rápida fija con accesos a Inicio, Ubicación, Oración, WhatsApp y el botón central destacado "QUIERO SER PARTE".
- **Botón Flotante de WhatsApp**: Selector interactivo con mensajes preconfigurados según el interés del visitante.

## Tecnologías Utilizadas
- React 18 + TypeScript
- Vite 6
- Tailwind CSS
- Supabase (PostgreSQL en la nube, Row Level Security, persistencia en tiempo real)
- Capa Híbrida Resiliente (Persistencia dual Supabase + LocalStorage)
- Lucide Icons

## Secciones Incluidas
1. **Header Fijo**: Logo oficial con arco dorado, navegación completa, botón "QUIERO SER PARTE", menú hamburguesa móvil.
2. **Hero Principal**: Fondo cinematográfico de adoración y congregación, overlay oscuro, logo oficial, lema congregacional y dual CTA.
3. **Bienvenida**: 3 tarjetas de discipulado (Conoce a Dios, Crece en Fe, Vive en Comunidad).
4. **Quiénes Somos**: Declaraciones de Misión, Visión y Valores (Fe, Amor, Familia, Servicio, Oración, Discipulado).
5. **Nuestros Pastores**: Perfiles de Pedro Rodriguez y Omaida Cruz con fotos en alta definición, cargos, biografías pastorales y modal expandible.
6. **Servicios y Horarios**: Culto general, Escuela bíblica, Jóvenes, Damas, Caballeros, Familiar y Noche de oración (todos configurables y editables).
7. **Próximos Eventos**: Actividades con imagen, fecha, lugar, descripción y modal de detalles.
8. **Células de Hogar**: Beneficios de congregarse en grupos pequeños, formulario modal interactivo y enlace directo a WhatsApp.
9. **Ministerio de Intercesión**: Llamado a la oración y formulario de postulación.
10. **Peticiones de Oración**: Formulario con selector estricto de Confidencialidad (Sí/No). Las confidenciales se reservan únicamente para el panel de pastores.
11. **Donaciones y Generosidad**: Datos bancarios, transferencias, código QR, instrucciones y botón para copiar número de cuenta con un solo toque.
12. **Galería Fotográfica**: Cuadrícula tipo Masonry con filtros por categoría (Cultos, Adoración, Jóvenes, Familias, Células, Eventos, Bautismos, Intercesión, Comunidad) y visor Lightbox a pantalla completa.
13. **Ubicación y Visítanos**: Dirección, mapa interactivo de Google Maps embebido con vista oscura y botones "Cómo llegar" y "Abrir en Google Maps".
14. **Contacto**: Canales directos y formulario de mensajes conectado a la base de datos.
15. **Llamado Final**: Invitación cálida previa al pie de página.
16. **Footer Oficial**: Redes sociales, lema congregacional y copyright 2026.

## Panel Administrativo (/admin o #admin)
Acceso restringido con clave administrativa para los pastores y líderes autorizados:
- **Clave predeterminada**: admin2026 (o portaldegloria)
- **Módulos de Gestión**:
  - Resumen (KPIs): Solicitudes pendientes, peticiones confidenciales, mensajes y eventos.
  - Gestor de Células: Visualización y cambio de estado (Pendiente, Contactado, Asignado).
  - Gestor de Intercesión: Nuevos miembros para la red de clamor.
  - Peticiones de Oración: Filtro especial para peticiones confidenciales protegidas.
  - Bandeja de Contacto: Mensajes recibidos de la comunidad.
  - Gestor de Eventos: Crear, editar, despublicar y eliminar eventos.
  - Gestor de Servicios: Modificar días, horarios y lugares de culto.
  - Gestor de Pastores: Actualizar biografías y fotos de los pastores Pedro y Omaida.
  - Gestor de Donaciones: Editar cuentas bancarias e instrucciones.
  - Gestor de Galería: Subir fotos, asignarlas a categorías y eliminar.
  - Configuración General: Cambiar teléfono, WhatsApp, correo, dirección, mapa y redes sociales.

## Instalación y Uso Local
```bash
npm install
npm run dev
npm run build
```

© 2026 ICM Portal de Gloria. Todos los derechos reservados.

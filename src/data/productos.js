// Catálogo de productos de AkumaTech
// Las imágenes locales se importan para que Vite las procese

import mouseLogitech from '../assets/img/mouse_logitech_whiteee.png'
import tecladoAlloy from '../assets/img/teclado_alloy_pro_fps.png'
import rtx5070 from '../assets/img/rtx20ti_transparente.png'
import procesadorRyzen from '../assets/img/procesador_ryzen_56000x.png'
import fuenteCorsair from '../assets/img/fuente.png'
import gabineteExodia from '../assets/img/gabinete_exodia_white.png'
import fanLianLi from '../assets/img/Firefly_RemoveBackground.png'
import refrigeracionLiquida from '../assets/img/aquapulse_liquida_aio_white_xyz.png'
import ssdSamsung from '../assets/img/samsung 980 pro m.2.png'

export const productos = [
  {
    id: 1,
    nombre: 'Audífonos Razer BlackShark V2 X',
    precio: 39990,
    imagen: 'https://media.spdigital.cl/thumbnails/products/4vdgea3g_d38e5d9c_thumbnail_4096.png',
    descripcion:
      'Audífonos gamer con sonido 7.1, drivers de 50 mm y diseño cómodo para largas sesiones de juego.',
  },
  {
    id: 2,
    nombre: 'Mouse Logitech G Pro Wireless',
    precio: 29990,
    imagen: mouseLogitech,
    descripcion:
      'Mouse gamer inalámbrico de alta precisión, con sensor HERO y tecnología LIGHTSPEED, ideal para juegos competitivos.',
  },
  {
    id: 3,
    nombre: 'Teclado Mecánico HyperX Alloy FPS Pro',
    precio: 49990,
    imagen: tecladoAlloy,
    descripcion:
      'Teclado mecánico gamer resistente y preciso, ideal para juegos competitivos y sesiones largas.',
  },
  {
    id: 4,
    nombre: 'MSI GeForce RTX 5070 Ti FRIEREN Edition',
    precio: 1399990,
    imagen: rtx5070,
    descripcion:
      'RTX 5070 Ti de 16 GB GDDR7 con DLSS 4, potente refrigeración y diseño especial edición Frieren.',
  },
  {
    id: 5,
    nombre: 'Monitor Gamer OLED MSI MAG 272QP X24',
    precio: 453990,
    imagen:
      'https://storage-asset.msi.com/global/picture/product/product_175738613265ae8f1336fa1d0d2a172acec0f779a1.webp',
    descripcion:
      'Monitor gamer OLED de 27 pulgadas con resolución QHD, tasa de refresco de 240Hz y tiempo de respuesta de 0.03ms.',
  },
  {
    id: 6,
    nombre: 'AMD Ryzen 5 5600X',
    precio: 149990,
    imagen: procesadorRyzen,
    descripcion:
      'Procesador Ryzen 5 5600X con 6 núcleos y 12 hilos, ideal para gaming y productividad.',
  },
  {
    id: 7,
    nombre: 'Fuente de Poder Corsair RM850x',
    precio: 129990,
    imagen: fuenteCorsair,
    descripcion:
      'Fuente de poder modular de 850W con certificación 80 PLUS Gold, ideal para sistemas de alto rendimiento.',
  },
  {
    id: 8,
    nombre: 'RTX 5080 Gaming Trio',
    precio: 1999990,
    imagen: 'https://media.solotodo.com/media/products/2014734_picture_1738343912.png',
    descripcion:
      'Tarjeta de video de última generación con soporte para Ray Tracing y DLSS 4, ideal para juegos AAA.',
  },
  {
    id: 9,
    nombre: 'Tarjeta Madre MSI B550 Tomahawk',
    precio: 199990,
    imagen: 'https://img.terabyteshop.com.br/archive/306771404/placa-mae-msi-mag-b550-tomahawk01.png',
    descripcion: 'Tarjeta madre con chipset B550, ideal para sistemas con procesadores AMD Ryzen.',
  },
  {
    id: 10,
    nombre: 'Memoria RAM Corsair Vengeance LPX 32GB',
    precio: 149990,
    imagen: 'https://media.spdigital.cl/thumbnails/products/crii92y0_8ab41b80_thumbnail_4096.png',
    descripcion:
      'Memoria RAM de alta velocidad y capacidad, ideal para sistemas de alto rendimiento.',
  },
  {
    id: 11,
    nombre: 'Exodia Panel Zro - White (7 Ventiladores)',
    precio: 64990,
    imagen: gabineteExodia,
    descripcion:
      'Gabinete Mid Tower con excelente refrigeración y 7 ventiladores ARGB preinstalados. Compatible con placas ATX, mATX e ITX.',
  },
  {
    id: 12,
    nombre: 'Refrigeración Líquida XYZ AQUAPULSE AIO 240mm White',
    precio: 54990,
    imagen: refrigeracionLiquida,
    descripcion:
      'Refrigeración líquida AIO de alto rendimiento en color blanco, con bloque de bomba y pantalla digital para temperatura en tiempo real.',
  },
  {
    id: 13,
    nombre: 'Lian Li UNI FAN SL V2 SL120 SL140 Evolution Actualización Versión ARGB Fan Kit L-Connect 3 Control 1/3 Pack',
    precio: 35800,
    imagen: fanLianLi,
    descripcion: 'El ventilador Lian Li UNI FAN SL V2 ofrece un nivel máximo de ruido de 29.2 dB, ideal para entornos donde se requiere tranquilidad sin sacrificar el enfriamiento eficiente.',
  },

  {
    id: 14,
    nombre: 'SSD NVMe Samsung 980 PRO 1TB',
    precio: 129990,
    imagen: ssdSamsung,
    descripcion: 'SSD NVMe M.2 de alto rendimiento con capacidad de 1TB, ideal para sistemas de escritorio y portátiles.',
  }
]

// Códigos de descuento de la tienda
export const codigosDescuento = {
  AKUMA10: 10,
  GAMER30: 30,
  BIENVENIDO15: 15,
  DESCUENTO5: 5,
  CYBERAKUMA40: 40,
}

// Costos de envío
export const opcionesEnvio = [
  { id: 'gratis', nombre: 'Envío estándar', precio: 0, detalle: 'Entrega en 5-7 días hábiles' },
  { id: 'express', nombre: 'Envío express', precio: 4990, detalle: 'Entrega en 2-3 días hábiles' },
  { id: 'same-day', nombre: 'Same Day', precio: 9990, detalle: 'Entrega el mismo día en Santiago' },
]

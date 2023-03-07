export const formatearFecha = fecha => {
  const opciones = {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }

  const fechaNueva = new Date(fecha)

  return fechaNueva.toLocaleDateString('es-ES', opciones)
}
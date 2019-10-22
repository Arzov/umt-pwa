// EXPORT
export default ({ route, store, redirect }) => {
  // Ruta actual
  const currentPath = route.name

  // Si se encuentra dentro de la app revisar los filtros requeridos
  if (currentPath !== process.env.routes.start.name) {
    // Faltan filtros
    if (!store.state.user.matchFilter) {
      // Reenviar a filtros requeridos siempre y cuando no se este en la vista de filtros o atributos
      if (currentPath !== process.env.routes.required_filters.name && currentPath !== process.env.routes.required_attr.name) {
        redirect(process.env.routes.required_filters.path)
      }

    // Filtros completos entonces ir al Home
    } else if (currentPath === process.env.routes.required_filters.name) {
      redirect(process.env.routes.home.path)
    }
  }
}

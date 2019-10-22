// EXPORT
export default ({ route, store, redirect }) => {
  // Ruta actual
  const currentPath = route.name

  // Si se encuentra dentro de la app revisar los atributos requeridos
  if (currentPath !== process.env.routes.start.name) {
    // Faltan atributos
    if (store.state.user.birthdate === ' ') {
      // Si no esta en la vista RequiredAttr entonces redireccionar
      if (currentPath !== process.env.routes.required_attr.name) {
        redirect(process.env.routes.required_attr.path)
      }

    // Los atributos estan completos entonces ir al Home
    } else if (currentPath === process.env.routes.required_attr.name) {
      redirect(process.env.routes.home.path)
    }
  }
}

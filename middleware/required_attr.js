// EXPORT
export default ({ route, store, redirect }) => {
  // Ruta actual
  const currentPath = route.name

  // Si se encuentra dentro de la app revisar los atributos requeridos
  if (currentPath !== process.env.routes.start.name) {
    // Revisar que atributos requeridos esten completos
    if (store.state.user.birthdate === ' ') {
      if (currentPath !== process.env.routes.required_attr.name) {
        redirect(process.env.routes.required_attr.path)
      }
    } else if (currentPath === process.env.routes.required_attr.name) {
      redirect(process.env.routes.home.path)
    }
  }
}

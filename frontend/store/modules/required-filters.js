const actions = {
  /**
   * Guarda filtros del usuario.
   *
   * @param {object} ctx Contexto de Nuxt.
   * @param {object} data Filtros a guardar _match_, _gender_, _age_.
   */
  saveFilters (ctx, data) {
    const age = Array.from(data.age, x => String(x))
    const params = {
      matchFilter: data.match,
      genderFilter: data.gender,
      ageMinFilter: age[0],
      ageMaxFilter: age[1]
    }

    // Guardar estados para usuario
    ctx.commit('user/setState', { params }, { root: true })
  }
}

export default {
  namespaced: true,
  actions
}

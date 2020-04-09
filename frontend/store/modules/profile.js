const actions = {
    /**
     * Guarda datos del usuario.
     *
     * @param {object} data Datos de autenticación _email_ y _password_.
     */
    saveProfile (ctx, data) {
        ctx.dispatch('requiredAttributes/saveAttributes', { data }, { root: true })
            .then(() => {
                ctx.dispatch('requiredFilters/saveFilters', { data }, { root: true })
                    .then(() => {
                        // Guardado
                    })
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e))
    }
}

export default {
    namespaced: true,
    actions
}

const actions = {
    saveProfile (ctx, data) {
        return new Promise(async (resolve, reject) => {
            await ctx.dispatch('requiredAttributes/saveAttributes', data, { root: true })
                .then(() => {
                    ctx.dispatch('requiredFilters/saveFilters', data, { root: true })
                        .then(() => {
                            // Guardado
                            resolve()
                        })
                        .catch(e => reject(e))
                })
                .catch(e => reject(e))
        })
    }
}

export default {
    namespaced: true,
    actions
}

const actions = {
    uploadPhoto (ctx, data) {
        return new Promise(async (resolve, reject) => {
            await this.$AWS.Storage.put('example.png', data.file, { contentType: 'image/png' })
                .then((key) => {
                    console.log(key)

                    resolve()
                })
                // eslint-disable-next-line no-console
                .catch(e => reject(e))
        })
    },
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

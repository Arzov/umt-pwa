import { dataURItoBlob } from '@/utils/inputUtils'

const actions = {
    uploadPhoto (ctx, data) {
        return new Promise(async (resolve, reject) => {
            let file = dataURItoBlob(data.file, 'image/png')

            await this.$AWS.Storage.put(ctx.rootState.user.email + '+profile.png', file, { contentType: 'image/png' })
                .then(async (key) => {
                    await this.$AWS.Storage.get(key.key)
                        .then((imgURL) => {
                            // TODO: Crear Lambda para actualizar foto (solo pasar string email+profile.png)

                            // Actualizar foto de perfil
                            const params = {
                                picture: imgURL
                            }

                            ctx.commit('user/setState', { params }, { root: true })

                            resolve()
                        })
                        .catch(e => reject(e))

                    resolve()
                })
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

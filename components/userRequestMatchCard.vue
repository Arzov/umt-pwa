<template>
    <div id="component-user-request-match-card" @click="onClick">
        <div class="image">
            <profile-image type="border-hot bkg-grey" :src="userData.adversaryPicture" />
        </div>

        <div v-if="userData.isCreator" class="text">
            <h5>{{ userData.adversaryName }}</h5>
            <h5 v-if="userData.matchStatus === 'P'">
                Solicitud enviada
            </h5>
            <h5 v-else-if="userData.matchStatus === 'D'">
                Solicitud rechazada
            </h5>
        </div>

        <div v-else>
            <h5>{{ userData.adversaryName }}</h5>
            <h5 v-if="userData.matchStatus === 'P'">
                Aceptar solicitud
            </h5>
            <h5 v-else-if="userData.matchStatus === 'D'">
                Solicitud rechazada
            </h5>
        </div>

        <div class="button-area">
            <a-button
                v-if="showAccept"
                u-button
                u-type="circle"
                u-color="hot"
                icon="check"
                value="A"
                @click="onClick"
            />

            <a-button
                v-if="showCancel"
                u-button
                u-type="circle"
                u-color="cold"
                icon="close"
                value="C"
                @click="onClick"
            />

            <a-button
                v-if="showRefuse"
                u-button
                u-type="circle"
                u-color="cold"
                icon="close"
                value="D"
                @click="onClick"
            />
        </div>
    </div>
</template>

<script>
    import ProfileImage from '@/components/profileImage'

    export default {
        name: 'UserRequestMatchCard',
        components: { ProfileImage },
        props: {
            userData: {
                required: true,
                default: {}
            },
            index: {
                required: true
            }
        },
        data () {
            return {
                params: {},
                showCancel: false,
                showAccept: false,
                showRefuse: false
            }
        },
        mounted () {
            this.updateMatchStatus()
        },
        updated () {
            this.updateMatchStatus()
        },
        methods: {
            onClick (event) {
                this.$emit('submit', {
                    ...this.params,
                    userStatus: event.target.value
                })

                event.stopPropagation()
            },

            updateMatchStatus () {
                this.params = {
                    hashKey: this.userData.hashKey,
                    rangeKey: this.userData.rangeKey,
                    matchId: this.userData.matchId,
                    userStatus: undefined
                }

                if (this.userData.isCreator) {
                    this.showCancel = true
                } else if (this.userData.matchStatus === 'P') {
                    this.showAccept = true
                    this.showRefuse = true
                } else if (this.userData.matchStatus === 'D') {
                    this.showCancel = true
                }
            }
        }
    }
</script>

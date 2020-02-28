<template>
    <div id="component-user-search-card">
        <div class="image">
            <profile-image type="border-hot bkg-grey" :src="userData.picture" />
        </div>

        <div class="text">
            <h5>{{ userData.firstName }} ({{ userData.age }} años)</h5>
            <h5>A {{ userData.distance }} kilómetros de distancia</h5>
        </div>

        <div class="button">
            <a-button u-button u-type="rounded" block @click="addMatch(userData, index)">
                Solicitar
            </a-button>
        </div>
    </div>
</template>

<script>
    import ProfileImage from '@/components/profileImage'

    export default {
        name: 'UserSearchCard',
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
        methods: {
            addMatch (userData, index) {
                const params = {
                    rangeKey: userData.hashKey,
                    firstName: userData.firstName,
                    picture: userData.picture,
                    index
                }
                
                this.$emit('submit', params)
            }
        }
    }
</script>

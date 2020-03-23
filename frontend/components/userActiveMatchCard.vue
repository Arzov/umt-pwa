<template>
    <div id="component-user-active-match-card" @click="onClick">
        <div class="image">
            <profile-image type="border-hot bkg-grey" :src="userData.adversaryPicture" />
        </div>

        <div class="text">
            <h5>{{ userData.adversaryName }}</h5>
        </div>

        <div class="last-message">
            <h6>Hoy 18:20</h6>
        </div>
    </div>
</template>

<script>
    import ProfileImage from '@/components/profileImage'

    export default {
        name: 'UserActiveMatchCard',
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
            onClick () {
                this.$emit('click')
            }
        }
    }
</script>

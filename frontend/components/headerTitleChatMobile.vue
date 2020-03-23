<template>
    <div id="component-header-title-chat-mobile">
        <div class="image">
            <profile-image type="border-hot bkg-grey" :src="userData.adversaryPicture" />
        </div>

        <a-row type="flex" justify="center" align="middle">
            <h6>{{ userData.adversaryName }}</h6>
        </a-row>

        <div class="close-button-wrapper">
            <nuxt-link to="/match">
                <img src="./../assets/icons/cancel-02.svg">
            </nuxt-link>
        </div>

        <div class="border-bottom" />
    </div>
</template>

<script>
    import ProfileImage from '@/components/profileImage'

    export default {
        name: 'HeaderTitleChatMobile',
        components: { ProfileImage },
        props: {
            userData: {
                required: true
            }
        }
    }
</script>

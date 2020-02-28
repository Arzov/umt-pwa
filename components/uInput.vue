<template>
    <div u-input>
        <label>{{ title }}</label>
        <slot />
    </div>
</template>

<script>
    export default {
        name: 'UInput',
        props: {
            title: {
                required: false,
                default: ''
            }
        }
    }
</script>

<style scoped>

</style>

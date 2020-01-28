<template>
    <div u-radio-group>
        <label>{{ title }}</label>
        <slot />
    </div>
</template>

<script>
    export default {
        name: 'URadioGroup',
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

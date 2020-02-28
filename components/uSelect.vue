<template>
    <div u-select>
        <label>{{ title }}</label>
        <slot />
    </div>
</template>

<script>
    export default {
        name: 'USelect',
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

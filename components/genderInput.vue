<template>
    <div>
        <a-radio-group name="radioGroup" @change="setGender">
            <a-radio v-for="gender in genderOptions" :key="'g' + gender.value" :value="gender.value">
                {{ gender.name }}
            </a-radio>
        </a-radio-group>
    </div>
</template>

<script>
    export default {
        name: 'GenderInput',
        props: ['value'],
        data () {
            return {
                genderOptions: [
                    { name: 'Masculino', value: 'M' },
                    { name: 'Femenino', value: 'F' }
                ]
            }
        },
        methods: {
            setGender (event) {
                this.$emit('input', event.target.value)
            }
        }
    }
</script>

<style scoped>

</style>

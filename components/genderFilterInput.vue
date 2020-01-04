<template>
    <div>
        <a-radio-group name="radioGroup" :defaultValue="value" @change="setGender">
            <a-radio v-for="gender in genderOptions" :key="'g' + gender.value" :value="gender.value">
                {{ gender.key }}
            </a-radio>
        </a-radio-group>
    </div>
</template>

<script>
    export default {
        name: 'GenderFilterInput',
        props: ['value'],
        data () {
            return {
                genderOptions: [
                    { key: 'Hombres', value: 'M' },
                    { key: 'Mujeres', value: 'F' }
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

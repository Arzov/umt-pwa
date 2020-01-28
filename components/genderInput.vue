<template>
    <div id="component-gender-input">
        <u-radio-group title="sexo">
            <a-radio-group name="radioGroup" :default-value="value" @change="setGender">

                <a-radio v-for="gender in genderOptions" :key="'g' + gender.value" :value="gender.value">
                    {{ gender.key }}
                </a-radio>

            </a-radio-group>
        </u-radio-group>
    </div>
</template>

<script>
    import URadioGroup from '@/components/uRadioGroup'

    export default {
        name: 'GenderInput',
        components: { URadioGroup },
        props: ['value'],
        data () {
            return {
                genderOptions: [
                    { key: 'Masculino', value: 'M' },
                    { key: 'Femenino', value: 'F' }
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

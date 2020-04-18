<template>
    <div id="component-gender-input" component-gender-input>
        <u-radio-group :title="_title">
            <a-radio-group v-model="_value" name="radioGroup" :default-value="_option" @change="setGender">
                <a-radio v-for="gender in _options" :key="'g' + gender.value" :value="gender.value">
                    {{ gender.text }}
                </a-radio>
            </a-radio-group>
        </u-radio-group>
    </div>
</template>

<script>
    import URadioGroup from '@/components/uRadioGroup'

    // TODO: Revisar warning de Vue para _value para el v-model
    export default {
        name: 'GenderInput',
        components: { URadioGroup },
        props: ['value', 'title', 'options'],
        data () {
            return {
                genderOptions: [
                    { text: 'Masculino', value: 'M' },
                    { text: 'Femenino', value: 'F' }
                ],

                genderOptionsFilter: [
                    { text: 'Hombres', value: 'M' },
                    { text: 'Mujeres', value: 'F' }
                ]
            }
        },
        computed: {
            _title () {
                return this.title ? this.title : 'Sexo'
            },

            _option () {
                return this.value ? this.value : 'M'
            },

            _options () {
                return this[this.options] ? this[this.options] : this.genderOptions
            },

            _value () {
                return this.value ? this.value : 'M'
            }
        },
        methods: {
            setGender (event) {
                this.$emit('change', event.target.value)
            }
        }
    }
</script>

<style scoped>

</style>

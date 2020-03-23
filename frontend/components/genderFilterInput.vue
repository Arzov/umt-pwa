<template>
    <div id="component-gender-filter-input">
        <u-radio-group title="busco rivales">
            <a-radio-group name="radioGroup" :default-value="defaultOption" @change="setGender">

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
        name: 'GenderFilterInput',
        components: { URadioGroup },
        props: ['value'],
        data () {
            return {
                genderOptions: [
                    { key: 'Hombres', value: 'M' },
                    { key: 'Mujeres', value: 'F' }
                ]
            }
        },
        computed: {
            defaultOption () {
                return this.value ? this.value : 'M'
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

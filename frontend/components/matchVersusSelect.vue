<template>
    <div id="component-match-versus-select">
        <u-radio-group title="tipo de juego">
            <a-radio-group name="radioGroup" :default-value="defaultOption" @change="setMatch">

                <a-radio v-for="match in matchOptions" :key="'m' + match.value" :value="match.value">
                    {{ match.key }}
                </a-radio>

            </a-radio-group>
        </u-radio-group>
    </div>
</template>

<script>
    import URadioGroup from '@/components/uRadioGroup'

    export default {
        name: 'MatchVersusSelect',
        components: { URadioGroup },
        props: ['value'],
        data () {
            return {
                matchOptions: [
                    { key: '5v5', value: '5v5' },
                    { key: '7v7', value: '7v7' },
                    { key: '11v11', value: '11v11' }
                ]
            }
        },
        computed: {
            defaultOption () {
                return this.value ? this.value : '7v7'
            }
        },
        methods: {
            setMatch (event) {
                this.$emit('input', event.target.value)
            }
        }
    }
</script>

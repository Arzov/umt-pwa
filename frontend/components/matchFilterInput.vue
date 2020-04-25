<template>
    <div id="component-match-filter-input" component-match-filter-input>
        <u-radio-group title="tipo de juego">
            <a-radio-group v-model="valueMatch" name="radioGroup" :default-value="valueMatch" @change="setMatch">

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
        name: 'MatchFilterInput',
        components: { URadioGroup },
        props: ['value'],
        data () {
            return {
                matchOptions: [
                    { key: '5v5', value: '5v5' },
                    { key: '7v7', value: '7v7' },
                    { key: '11v11', value: '11v11' }
                ],

                valueMatch: this.value
            }
        },
        methods: {
            setMatch (event) {
                this.$emit('change', event.target.value)
            }
        }
    }
</script>

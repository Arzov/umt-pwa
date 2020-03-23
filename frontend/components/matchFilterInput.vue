<template>
    <div>
        <a-radio-group name="radioGroup" :defaultValue="value" @change="setMatch">
            <a-radio v-for="match in matchOptions" :key="'m' + match.value" :value="match.value">
                {{ match.key }}
            </a-radio>
        </a-radio-group>
    </div>
</template>

<script>
    export default {
        name: 'MatchFilterInput',
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
        methods: {
            setMatch (event) {
                this.$emit('input', event.target.value)
            }
        }
    }
</script>

<style scoped>

</style>

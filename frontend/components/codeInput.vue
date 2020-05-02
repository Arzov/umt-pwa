<template>
    <div id="component-code-input" component-code-input>
        <input
            v-for="n in length"
            :key="n"
            :ref="'cn-' + n"
            type="number"
            :min="0"
            :max="9"
            :placeholder="n"
            @keyup="onKeyPress($event, n)"
            @focus="onFocus($event, n)"
            @blur="onBlur($event, n)"
            @change="triggerChange"
        >
    </div>
</template>

<script>
    export default {
        name: 'CodeInput',
        data () {
            return {
                code: [],
                length: 6,
                previousValue: undefined
            }
        },
        created () {
            for (let i = 0; i < this.length; i++)
                this.code[i] = undefined
        },
        methods: {
            onKeyPress (event, key) {
                let aux = this.code[key - 1] ? this.code[key - 1] + event.key : undefined

                // Número mayor a 10
                if (this.code[key - 1] && aux && Number(aux) > 10) {
                    event.preventDefault()
                    this.code[key - 1] = Number(event.key)
                } else if (Number(event.keyCode) < 48 || Number(event.keyCode) > 57) { // Dígito distinto entre 0 y 9
                    event.preventDefault()
                } else {
                    this.code[key - 1] = Number(event.key)
                }

                this.$refs['cn-' + key][0].value = this.code[key - 1]

                if ((Number(event.keyCode) >= 48 && Number(event.keyCode) <= 57)) {
                    // Si hay siguiente
                    if (this.$refs['cn-' + (key + 1)]) {
                        this.$refs['cn-' + (key + 1)][0].focus()
                    } else { // En el último se sale
                        this.$refs['cn-' + key][0].blur()
                    }
                } else if (event.key === 'Backspace' && this.$refs['cn-' + (key - 1)]) {
                    this.$refs['cn-' + (key - 1)][0].focus()
                }
            },

            onFocus (event, key) {
                this.previousValue = this.code[key - 1]
                this.code[key - 1] = undefined
                this.$refs['cn-' + key][0].value = this.code[key - 1]
                this.triggerChange()
            },

            onBlur (event, key) {
                if (this.$refs['cn-' + key][0].value === undefined || this.$refs['cn-' + key][0].value === '') {
                    this.$refs['cn-' + key][0].value = this.previousValue
                    this.code[key - 1] = this.previousValue
                }

                this.previousValue = undefined
                this.triggerChange()
            },

            triggerChange () {
                let code = ''
                this.code.forEach((n) => {
                    if (n || n === 0)
                        code += n.toString()
                    else
                        code += ''
                })

                this.$emit('change', code)
            }
        }
    }
</script>

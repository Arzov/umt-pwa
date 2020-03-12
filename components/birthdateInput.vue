<template>
    <div id="component-birthdate-input" component-birthdate-input>
        <label>Fecha de nacimiento</label>

        <div class="row">
            <u-select>
                <a-select :dropdown-match-select-width="false" placeholder="Día" :default-value="birthdate.day" @change="setDay">
                    <a-select-option v-for="day in dayOptions" :key="'d' + day" :value="day">
                        {{ day }}
                    </a-select-option>
                </a-select>
            </u-select>

            <u-select>
                <a-select :dropdown-match-select-width="false" placeholder="Mes" :default-value="birthdate.month" @change="setMonth">
                    <a-select-option v-for="month in monthOptions" :key="'m' + month.value" :value="month.value">
                        {{ month.key }}
                    </a-select-option>
                </a-select>
            </u-select>

            <u-select>
                <a-select :dropdown-match-select-width="false" placeholder="Año" :default-value="birthdate.year" @change="setYear">
                    <a-select-option v-for="year in yearOptions" :key="'y' + year" :value="year">
                        {{ year }}
                    </a-select-option>
                </a-select>
            </u-select>
        </div>
    </div>
</template>

<script>
    import USelect from '@/components/uSelect'

    export default {
        name: 'BirthdateInput',
        components: { USelect },
        props: ['value'],
        data () {
            return {
                monthOptions: [
                    { key: 'Enero', value: '01' },
                    { key: 'Febrero', value: '02' },
                    { key: 'Marzo', value: '03' },
                    { key: 'Abril', value: '04' },
                    { key: 'Mayo', value: '05' },
                    { key: 'Junio', value: '06' },
                    { key: 'Julio', value: '07' },
                    { key: 'Agosto', value: '08' },
                    { key: 'Septiembre', value: '09' },
                    { key: 'Octubre', value: '10' },
                    { key: 'Noviembre', value: '11' },
                    { key: 'Diciembre', value: '12' }
                ],
                birthdate: {
                    day: this.value.day,
                    month: this.value.month,
                    year: this.value.year
                }
            }
        },
        computed: {
            dayOptions () {
                return Array.from({ length: 31 }, (value, index) => {
                    const d = 1 + index

                    if (d < 10) { return '0' + String(d) } else { return String(d) }
                })
            },
            yearOptions () {
                const year = new Date().getFullYear()
                return Array.from({ length: year - 1899 }, (value, index) => 1900 + index).reverse()
            }
        },
        methods: {
            setDay (day) {
                this.birthdate.day = day
                this.triggerChange({ day })
            },

            setMonth (month) {
                this.birthdate.month = month
                this.triggerChange({ month })
            },

            setYear (year) {
                this.birthdate.year = year
                this.triggerChange({ year })
            },

            triggerChange (changedValue) {
                this.$emit('change', this.birthdate)
            }
        }
    }
</script>

<style scoped>

</style>

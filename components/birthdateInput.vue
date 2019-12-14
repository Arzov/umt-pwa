<template>
    <div>
        <a-select placeholder="Día" style="width: 100px" :defaultValue="birthdate.day" @change="setDay">
            <a-select-option v-for="day in dayOptions" :key="'d' + day" :value="day">
                {{ day }}
            </a-select-option>
        </a-select>
        <a-select placeholder="Mes" style="width: 100px" :defaultValue="birthdate.month" @change="setMonth">
            <a-select-option v-for="month in monthOptions" :key="'m' + month.value" :value="month.value">
                {{ month.key }}
            </a-select-option>
        </a-select>
        <a-select placeholder="Año" style="width: 100px" :defaultValue="birthdate.year" @change="setYear">
            <a-select-option v-for="year in yearOptions" :key="'y' + year" :value="year">
                {{ year }}
            </a-select-option>
        </a-select>
    </div>
</template>

<script>
    export default {
        name: 'BirthdateInput',
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
                this.$emit('input', this.birthdate)
            },

            setMonth (month) {
                this.birthdate.month = month
                this.$emit('input', this.birthdate)
            },

            setYear (year) {
                this.birthdate.year = year
                this.$emit('input', this.birthdate)
            }
        }
    }
</script>

<style scoped>

</style>

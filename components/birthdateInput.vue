<template>
    <div>
        <a-select placeholder="Día" style="width: 100px" @change="setDay">
            <a-select-option v-for="day in dayOptions" :key="'d' + day" :value="day">
                {{ day }}
            </a-select-option>
        </a-select>
        <a-select placeholder="Mes" style="width: 100px" @change="setMonth">
            <a-select-option v-for="month in monthOptions" :key="'m' + month.value" :value="month.value">
                {{ month.name }}
            </a-select-option>
        </a-select>
        <a-select placeholder="Año" style="width: 100px" @change="setYear">
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
                    { name: 'Enero', value: '01' },
                    { name: 'Febrero', value: '02' },
                    { name: 'Marzo', value: '03' },
                    { name: 'Abril', value: '04' },
                    { name: 'Mayo', value: '05' },
                    { name: 'Junio', value: '06' },
                    { name: 'Julio', value: '07' },
                    { name: 'Agosto', value: '08' },
                    { name: 'Septiembre', value: '09' },
                    { name: 'Octubre', value: '10' },
                    { name: 'Noviembre', value: '11' },
                    { name: 'Diciembre', value: '12' }
                ],
                birthdate: {
                    day: undefined,
                    month: undefined,
                    year: undefined
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

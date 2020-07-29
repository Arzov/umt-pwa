<template>
    <div id="page-required-filters-mobile">
        <header-title-mobile title="Filtros Requeridos" />

        <div>
            <a-form :form="formRequired" @submit="saveFilters($event)">
                <a-row type="flex" justify="center" u-input-row>
                    <a-form-item :required="decorator.match.required" :extra="decorator.match.extra" u-form-custom-item>
                        <match-filter-input v-decorator="decorator.match.decorator" />
                    </a-form-item>
                </a-row>

                <a-row type="flex" justify="center" u-input-row>
                    <a-form-item :required="genderFilterDecorator.required" :extra="genderFilterDecorator.extra" u-form-custom-item>
                        <gender-input v-decorator="genderFilterDecorator.decorator" title="busco rivales" options="genderOptionsFilter" />
                    </a-form-item>
                </a-row>

                <a-row type="flex" justify="center" u-input-row>
                    <a-form-item :required="decorator.age.required" :extra="decorator.age.extra" u-form-custom-item>
                        <age-filter-input v-decorator="decorator.age.decorator" />
                    </a-form-item>
                </a-row>

                <a-row type="flex" justify="center" u-button-row>
                    <a-button u-button u-type="primary" html-type="submit" block>
                        Continuar
                    </a-button>
                </a-row>

                <a-row type="flex" justify="center" u-button-row>
                    <a u-anchor u-size="large" @click="signOut">
                        <span u-a>Cerrar sesión</span>
                    </a>
                </a-row>
            </a-form>
        </div>
        
    </div>
</template>

<script>
    import decorator from '@/static/decorator'
    import GenderInput from '@/components/genderInput'
    import MatchFilterInput from '@/components/matchFilterInput'
    import AgeFilterInput from '@/components/ageFilterInput'

    export default {
        name: 'RequiredFiltersMobile',
        components: { GenderInput, MatchFilterInput, AgeFilterInput },
        props: {
            event: {
                type: Object,
                required: true
            }
        },
        data () {
            return {
                decorator,
                formRequired: this.$form.createForm(this),
                genderFilterDecorator: decorator.gender('genderFilter')
            }
        },
        methods: {
            saveFilters (event) {
                event.preventDefault()

                this.formRequired.validateFields((errors, values) => {
                    if (!errors) {
                        const params = {
                            type: this.event.SAVE_FILTERS,
                            genderFilter: values.genderFilter,
                            matchFilter: values.match,
                            ageFilter: values.age
                        }
                        
                        this.$emit('emit', params)
                    }
                })
            },
            signOut () {
                const params = {
                    type: this.event.SIGNOUT
                }

                this.$emit('emit', params)
            }
        }
    }
</script>

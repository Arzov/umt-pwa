<template>
    <div id="component-u-tabs">
        <div class="u-tabs-titles">
            <h6 v-for="(title, index) in tabs" :key="index" class="u-tab-title" :selected="isSelected(index)" @click="selectTab(index)">
                {{ title }}
            </h6>
        </div>

        <div class="u-tabs-content">
            <div class="u-tabs-content-position">
                <div class="u-tabs-content-wrapper">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'UTabs',
        props: {
            tabs: {
                required: true,
                type: Array
            }
        },
        data () {
            return {
                element: {
                    titles: [],
                    content: [],
                    contentWrapper: undefined,
                    wrappers: []
                },
                currentTab: 0
            }
        },
        mounted () {
            this.element.titles = this.$el.getElementsByClassName('u-tab-title')
            this.element.content = this.$el.querySelectorAll('.u-tabs-content-wrapper > *')
            this.element.contentWrapper = this.$el.getElementsByClassName('u-tabs-content-wrapper')[0]
            this.element.contentWrapper.style.width = this.element.content.length * 100 + '%'

            this.element.content.forEach((div, index) => {
                let wrapper = document.createElement('div')
                wrapper.classList.add('u-tab-wrapper')
                wrapper.setAttribute('show', this.isSelected(index))
                this.element.contentWrapper.appendChild(wrapper)
                wrapper.appendChild(this.element.content[index])
                this.element.wrappers.push(wrapper)
            })

            this.currentTab = 0
        },
        methods: {
            selectTab (index) {
                this.currentTab = index
                this.element.wrappers.forEach((wrapper, index) => {
                    wrapper.setAttribute('show', this.isSelected(index))
                })
                this.element.contentWrapper.style.marginLeft = index * -100 + '%'
            },

            isSelected (index) {
                return index === this.currentTab
            }
        }
    }
</script>

export default [
    {
        id: 'match',
        label: 'encuentros',
        icon: {
            normal: 'whistle.svg',
            active: 'whistle-active.svg'
        },
        to: '/match',
        enable: {
            mobile: true,
            tablet: true,
            desktop: true
        },
        menu: undefined
    },
    {
        id: 'home',
        label: 'inicio',
        icon: {
            normal: 'football.svg',
            active: 'football-active.svg'
        },
        to: '/home',
        enable: {
            mobile: true,
            tablet: true,
            desktop: true
        },
        menu: undefined
    },
    {
        id: 'map',
        label: 'canchas',
        icon: {
            normal: 'corner-flag.svg',
            active: 'corner-flag-active.svg'
        },
        to: '/map',
        enable: {
            mobile: true,
            tablet: true,
            desktop: true
        },
        menu: undefined
    }
]

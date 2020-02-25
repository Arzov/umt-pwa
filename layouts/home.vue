<template>
    <div id="layout-home">
        <mq-layout :mq="['mobile', 'tablet']">
            <nuxt />
            <footer-navbar />
        </mq-layout>
    </div>
</template>

<script>
    export default {
        name: 'Home'
    }
</script>

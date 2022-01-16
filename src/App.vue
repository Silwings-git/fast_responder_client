<template>
    <div id="app" class="grid" style="background-size:100%;background: rgb(242, 243, 245)">
        <SHeader/>
        <router-view id="routerView"/>
    </div>
</template>

<script>
    import SHeader from "@/components/SHeader.vue";

    export default {
        components: {
            SHeader: SHeader,
        }
    };
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .grid {
        width: 100%;
        min-height: 98vh;
    }

</style>

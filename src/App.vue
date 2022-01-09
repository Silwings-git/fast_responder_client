<template>
    <div id="app" class="grid">
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
        color: #2c3e50;
    }

    .grid {
        width: 100%;
        min-height: 98vh;
        background: url("https://silwings-tools.oss-cn-shanghai.aliyuncs.com/icon/001.jpg") no-repeat center top/ 100%;
    }

    input,
    textarea {
        width: 150px;
        background: rgba(255, 255, 255) !important;
    }

    #routerView{
        height: 90vh;
    }
</style>

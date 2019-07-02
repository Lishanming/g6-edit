<template>
    <div id="container">
        <BaseFlow :data="data" :getData="save" @sendJson="getJsonData" :key="dataKey"/>
    </div>
</template>

<script>
    import BaseFlow from '../components/BaseFlow'

    export default {
        name: "home",
        components: {
            BaseFlow
        },
        data() {
            return {
                data: {},
                dataKey: 1
            }
        },

        methods: {
            save() {},
            getJsonData(data) {
                this.data = JSON.parse(data)
                this.dataKey++
            },
        }
    }
</script>

<style scoped>
    #container {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        height: 100%;
    }
</style>
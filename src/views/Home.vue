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
                data: {
    "nodes": [
        {
            "x": 226,
            "y": 220,
            "keyShape": "rect",
            "label": "哈哈",
            "labelCfg": {
                "position": "center",
                "style": {
                    "fill": "#666",
                    "opacity": 1
                }
            },
            "id": "g1",
            "size": [
                60,
                60
            ],
            "shape": "juxing",
            "style": {
                "fill": "#1890FF",
                "stroke": "#1890FF",
                "fillOpacity": 0.3
            }
        },
        {
            "x": 350,
            "y": 119,
            "keyShape": "rect",
            "label": "呵呵",
            "labelCfg": {
                "position": "center",
                "style": {
                    "fill": "#666",
                    "opacity": 1
                }
            },
            "id": "g2",
            "size": [
                60,
                60
            ],
            "shape": "juxing",
            "style": {
                "fill": "#1890FF",
                "stroke": "#1890FF",
                "fillOpacity": 0.3
            }
        }
    ],
    "edges": [
        {
            "id": 1562477183065,
            "shape": "flow-line",
            "label": "",
            "source": "g1",
            "sourceAnchor": 1,
            "target": "g2",
            "targetAnchor": 0,
            "labelCfg": {
                "position": "center",
                "autoRotate": true
            },
            "size": 1
        },
        {
            "id": 1562477183065,
            "shape": "flow-line",
            "label": "",
            "source": "g1",
            "sourceAnchor": 1,
            "target": "g2",
            "targetAnchor": 1,
            "labelCfg": {
                "position": "center",
                "autoRotate": true
            },
            "size": 1
        },
        {
            "id": 1562477183065,
            "shape": "flow-line",
            "label": "",
            "source": "g1",
            "sourceAnchor": 1,
            "target": "g2",
            "targetAnchor": 2,
            "labelCfg": {
                "position": "center",
                "autoRotate": true
            },
            "size": 1
        },
        {
            "id": 1562477183065,
            "shape": "flow-line",
            "label": "",
            "source": "g1",
            "sourceAnchor": 1,
            "target": "g2",
            "targetAnchor": 3,
            "labelCfg": {
                "position": "center",
                "autoRotate": true
            },
            "size": 1
        }

        
    ]
},
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
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
                            "x": 371.6875,
                            "y": 155,
                            "label": "模型节点",
                            "keyShape": "rect",
                            "labelCfg": {
                                "position": "center",
                                "style": {
                                    "fill": "#666",
                                    "opacity": 1
                                }
                            },
                            "id": "g1",
                            "size": [
                                90,
                                60
                            ],
                            "shape": "ellipse",
                            "style": {
                                "fill": "#722ED1",
                                "stroke": "#722ED1",
                                "fillOpacity": 0.3
                            }
                        },
                        {
                            "x": 644.6875,
                            "y": 170,
                            "keyShape": "rect",
                            "label": "常规结点",
                            "labelCfg": {
                                "position": "center",
                                "style": {
                                    "fill": "#666",
                                    "opacity": 1
                                }
                            },
                            "id": "g2",
                            "size": [
                                80,
                                50
                            ],
                            "shape": "juxing",
                            "style": {
                                "fill": "#1890FF",
                                "stroke": "#1890FF",
                                "fillOpacity": 0.3
                            }
                        },
                        {
                            "shape": "circle",
                            "size": 4,
                            "x": 427.1875,
                            "y": 155
                        },
                        {
                            "shape": "circle",
                            "size": 4,
                            "x": 594.1875,
                            "y": 170
                        },
                        {
                            "shape": "circle",
                            "size": 4,
                            "x": 316.1875,
                            "y": 114.5
                        },
                        {
                            "shape": "circle",
                            "size": 4,
                            "x": 427.1875,
                            "y": 114.5
                        },
                        {
                            "shape": "circle",
                            "size": 4,
                            "x": 427.1875,
                            "y": 195.5
                        },
                        {
                            "shape": "circle",
                            "size": 4,
                            "x": 316.1875,
                            "y": 195.5
                        },
                        {
                            "shape": "circle",
                            "size": 4,
                            "x": 594.1875,
                            "y": 134.5
                        },
                        {
                            "shape": "circle",
                            "size": 4,
                            "x": 695.1875,
                            "y": 134.5
                        },
                        {
                            "shape": "circle",
                            "size": 4,
                            "x": 695.1875,
                            "y": 205.5
                        },
                        {
                            "shape": "circle",
                            "size": 4,
                            "x": 594.1875,
                            "y": 205.5
                        },
                        {
                            "shape": "circle",
                            "size": 4,
                            "x": 594.1875,
                            "y": 114.5
                        },
                        {
                            "shape": "circle",
                            "size": 4,
                            "x": 695.1875,
                            "y": 114.5
                        },
                        {
                            "shape": "circle",
                            "size": 4,
                            "x": 594.1875,
                            "y": 195.5
                        },
                        {
                            "shape": "circle",
                            "size": 4,
                            "x": 695.1875,
                            "y": 195.5
                        },
                        {
                            "shape": "circle",
                            "size": 4,
                            "x": 316.1875,
                            "y": 205.5
                        },
                        {
                            "shape": "circle",
                            "size": 4,
                            "x": 427.1875,
                            "y": 134.5
                        },
                        {
                            "shape": "circle",
                            "size": 4,
                            "x": 427.1875,
                            "y": 205.5
                        },
                        {
                            "shape": "circle",
                            "size": 4,
                            "x": 594.1875,
                            "y": 155
                        },
                        {
                            "shape": "circle",
                            "size": 4,
                            "x": 427.1875,
                            "y": 170
                        }
                    ],
                    "edges": [
                        {
                            "id": 1563346664863,
                            "shape": "flow-line",
                            "label": "",
                            "source": "g1",
                            "sourceAnchor": 1,
                            "target": "g2",
                            "labelCfg": {
                                "position": "center",
                                "autoRotate": true
                            },
                            "size": 1,
                            "targetAnchor": 3
                        }
                    ]
                },
                dataKey: 1
            }
        },

        methods: {
            save() {
            },
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
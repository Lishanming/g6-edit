<template>
    <div></div>
</template>

<script>
    export default {
        name: "addNodeBydrag",
        methods: {
            dragBehavior(G6) {
                let _this = this;
                const graph = this.graph
                G6.registerBehavior('init-drag-node', {
                    getEvents() {
                        return {
                            'mousemove': 'onMousemove',       // 注册一个阴影节点跟随
                            'mouseup': 'onMouseup'            // 点击画布，addItem
                        };
                    },
                    //鼠标移动，画线跟随
                    onMousemove(ev) {
                        //跟随
                        // debugger
                        console.log('drag:onMousemove', ev)
                        graph.updateItem(graph.node, {
                            x: ev.x,
                            y: ev.y
                        });
                        console.log('getCurrentMode:',  this.graph.getCurrentMode())
                    },
                    onMouseup(ev) {
                        console.log('drag:onMouseup', ev)
                        graph.removeItem(graph.node);
                        graph.addItem('node', {
                            x: ev.x,
                            y: ev.y,
                            // keyShape:'rect',
                            label: '起始节点',
                            labelCfg: {
                                position: 'center',
                                style: {
                                    fill: '#666',
                                    opacity: 1,
                                    zIndex: 10
                                }
                            },
                            id: _this.Util.uniqueId(),
                            size: [60, 60],
                            shape: 'myCircle',
                            style: {
                                fill: '#FA8C16',
                                stroke: '#FA8C16',
                                fillOpacity: 0.3
                            },
                        });
                        //点击添加图片的开关
                        this.addbegin = false
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>
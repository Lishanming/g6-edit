<template>
    <div></div>
</template>

<script>
    import * as Tool from  '@/util/point'
    import { _throttle,_debounce } from "@/util/throttle";
    export default {
        name: "addLine",
        methods:{
            registerEdge(G6){
                G6.registerEdge('flow-line', {
                    getControlPoints(cfg) {
                        // console.log(cfg.sourceAnchor)
                        // console.log(cfg.targetAnchor)
                        // console.log(cfg)
                        // debugger;
                        if (cfg.shape == 'flow-line' && cfg.sourceAnchor!=undefined&& cfg.targetAnchor!=undefined) {
                            // console.log('pppppppppppppppppppppppppppppp');

                            let {startPoint,endPoint,sourceAnchor,targetAnchor} = cfg
                            // console.log(startPoint);
                            // console.log(endPoint);
                            //先得到两个辅助点
                            let sourceAssistPoint = Tool.getAssistPoint(startPoint,sourceAnchor)
                            let targetAssistPoint = Tool.getAssistPoint(endPoint,targetAnchor)
                            //再得到两个折点
                            // debugger;
                            let brokenPoint = Tool.getBrokenPoint(sourceAssistPoint,targetAssistPoint)
                            // console.log([sourceAssistPoint,...brokenPoint,targetAssistPoint]);

                            return [sourceAssistPoint,...brokenPoint,targetAssistPoint]
                        }else {
                            return []
                        }
                    },
                }, 'polyline');
            },
            //注册一个画线行为
            addEdgeBehavior(G6) {
                let _this = this;
                G6.registerBehavior('click-add-edge', {
                    getEvents() {
                        return {
                            'node:mousedown': 'onMousedown',
                            'mousemove': 'onMousemove',
                            'mouseup': 'onMouseup' // 点击空白处，取消边
                        };
                    },
                    //鼠标按住开始画线
                    onMousedown(ev) {
                        // debugger
                        const node = ev.item;
                        const graph = this.graph;
                        const point = {x: ev.x, y: ev.y};
                        const model = node.getModel();
                        if (graph.addingEdge && graph.edge) {
                            graph.updateItem(this.edge, {
                                target: model.id
                            });
                            // graph.setItemState(this.edge, 'selected', true);
                            graph.edge = null;
                            graph.addingEdge = false;
                        } else {
                            graph.edge = graph.addItem('edge', {
                                id: new Date().getTime(),
                                shape: 'line',
                                label:'',
                                source: model.id,
                                sourceAnchor: graph.currSourceAnchorIndex,
                                target: point,
                                labelCfg: {
                                    position: 'center',
                                    autoRotate: true,
                                }
                            });
                            graph.addingEdge = true;
                        }
                        //拖出线，其他结点的锚点显示
                        for (let i = 0; i < _this.graph._cfg.nodes.length; i++) {
                            for (let j = 0; j < _this.graph._cfg.nodes[i]._cfg.group._cfg.children.slice(2, 6).length; j++) {
                                _this.graph._cfg.nodes[i]._cfg.group._cfg.children.slice(2, 6)[j].attr('opacity', '1');
                            }
                        }
                    },
                    //鼠标移动，画线跟随
                    onMousemove(ev) {
                        const point = {x: ev.x, y: ev.y};
                        // debugger;
                        let graph = this.graph
                        //是否正在画线，并且线是否存在
                        if (graph.addingEdge && graph.edge) {
                                graph.updateItem(graph.edge, {
                                    target: point
                                })
                        }

                    },
                    //在画布上松开鼠标，则不画线
                    onMouseup(ev) {
                        // debugger;
                        let graph = this.graph
                        if (graph.addingEdge) {
                            graph.removeItem(graph.edge);
                            graph.edge = null;
                            graph.addingEdge = false;
                        }
                        //连线完成，其他结点的锚点消失
                        for (let i = 0; i < _this.graph._cfg.nodes.length; i++) {
                            for (let j = 0; j < _this.graph._cfg.nodes[i]._cfg.group._cfg.children.slice(2, 6).length; j++) {
                                _this.graph._cfg.nodes[i]._cfg.group._cfg.children.slice(2, 6)[j].attr('opacity', '0');
                            }
                        }
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>
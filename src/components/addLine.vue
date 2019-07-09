<template>
    <div></div>
</template>

<script>
    import * as Tool from  '@/util/point'
    import * as Anthor from  '@/util/anthor'
    import { _throttle,_debounce } from "@/util/throttle";
    export default {
        name: "addLine",
        methods:{
            registerEdge(G6){
                G6.registerEdge('flow-line', {
                    getControlPoints(cfg) {
                        // console.log(cfg.sourceAnchor)
                        // console.log(cfg.targetAnchor)getBBox
                        // console.log(cfg)
                        // console.log('画了一条flow-line');
                        
                        if (cfg.shape == 'flow-line' && cfg.sourceAnchor!=undefined&& cfg.targetAnchor!=undefined) {
                            
                            //2种折线：1折线，2折线
                            //先分析起始节点，目标节点的位置关系
                            let {sourceNode,targetNode,startPoint,endPoint,sourceAnchor,targetAnchor} = cfg
                            let sourceBBox = sourceNode.getBBox()
                            let targetBBox = targetNode.getBBox()
                            // debugger;
                            //两个辅助点
                            let sourceAssistPoint = Tool.getAssistPoint(startPoint,sourceAnchor)
                            let targetAssistPoint = Tool.getAssistPoint(endPoint,targetAnchor)

                            if (Tool.isCover(sourceBBox,targetBBox)) {

                                let sourceFloodType = Tool.getFloodType(sourceAssistPoint,targetAssistPoint,sourceBBox)
                                let targetFloodType = Tool.getFloodType(sourceAssistPoint,targetAssistPoint,targetBBox)
                                if (sourceFloodType == targetFloodType && sourceFloodType!='O') {
                                    //2折线
                                    let brokenPoint = Tool.getTwoBrokenPoint(sourceAssistPoint,targetAssistPoint,sourceBBox,targetBBox)
                                    return [sourceAssistPoint,...brokenPoint,targetAssistPoint]
                                }else {
                                    //1折线
                                    let brokenPoint = Tool.getOneBrokenPoint(sourceAssistPoint,targetAssistPoint,sourceBBox,targetBBox)
                                    return [sourceAssistPoint,brokenPoint,targetAssistPoint]
                                }
                                // return []
                            }else {
                                //现在两个节点在x,y轴上不重叠，接着需要判断是画1折线 or 2折线
                                //这里有个算法，以起点辅助点，终点辅助点做对角线，形成的区域记作A,起始节点和终点如果被A淹没，记作X淹没，Y淹没，如果两个节点都淹没，并且淹没类型相同，则为2折线
                                //淹没：把图形沿着X，Y轴延展，最后形成一个十字架
                                let sourceFloodType = Tool.getFloodType(sourceAssistPoint,targetAssistPoint,sourceBBox)
                                let targetFloodType = Tool.getFloodType(sourceAssistPoint,targetAssistPoint,targetBBox)
                                if (sourceFloodType == targetFloodType && sourceFloodType!='O') {
                                    //2折线
                                    let brokenPoint = Tool.getTwoBrokenPoint(sourceAssistPoint,targetAssistPoint,sourceBBox,targetBBox)
                                    return [sourceAssistPoint,...brokenPoint,targetAssistPoint]
                                }else {
                                    //1折线
                                    let brokenPoint = Tool.getOneBrokenPoint(sourceAssistPoint,targetAssistPoint,sourceBBox,targetBBox)
                                    return [sourceAssistPoint,brokenPoint,targetAssistPoint]
                                }
                            }
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
                        console.log(this);
                        
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
                                shape: 'flow-line',
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
                        //找到所有可以连接的节点
                        if (graph.sourceNode && graph.sourceNode.id) {
                            //开启可连接锚点的激活状态
                            Anthor.setAnchorActive(this.graph,true)
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
                        // alert(9999)
                        let graph = this.graph
                        if (graph.addingEdge) {
                            //关闭可连接锚点的激活状态
                            Anthor.setAnchorActive(this.graph,false)
                            graph.removeItem(graph.edge);
                            graph.edge = null;
                            graph.addingEdge = false;                          
                        }
                        // this.graph.setItemState(ev.item, 'showOtherAnchor', false)

                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>
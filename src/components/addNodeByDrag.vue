<template>
    <div></div>
</template>

<script>
    import {_throttle, _debounce} from "@/util/throttle";

    // const imgUrl = this.initNodesData.nodes[i].url
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
                            'dragend': 'onMouseup'        // 点击画布，addItem
                        };
                    },
                    //鼠标移动，節點跟隨
                    onMousemove(ev) {
                        // console.log('drag:onMousemove', ev)
                        // debugger
                        const point = {x: ev.x, y: ev.y};
                        // debugger
                        //拖拽出节点是初始化一个节点
                        if(this.graph.node == null &&   this.graph.beginaddNode == true ){
                            // debugger
                            _this.initDragNode(ev)
                        }else{
                            this.graph.updateItem(this.graph.node, {
                                ...point
                            })
                        }
                        // graph.removeItem(graph.node);
                        ev.target.attr('cursor', 'hand');
                        // console.log('getCurrentMode:', this.graph.getCurrentMode())
                    },
                    onMouseup(ev) {
                        // debugger
                        console.log('drag:onMouseup', ev)
                        graph.removeItem(graph.node);
                        graph.node = null;
                        //没有在这执行
                        _this.realCreateNode(ev)
                        //点击添加图片的开关
                        _this.graph.beginaddNode= false
                        //转换为默认模式
                        this.graph.setMode('default');
                    }
                });
            },
            initDragNode(ev) {
                let _this = this;
                // debugger
                const graph = this.graph
                //mousedown的ev.target =  this.graph.nodeAttrbutes
                _this.currentSrc = this.graph.nodeAttrbutes.currentSrc
                _this.currentNodeType =this.graph.nodeAttrbutes.dataset.kind
                switch (_this.nodeClick.getAttribute('data-shape')) {
                    case 'yuan':
                        // debugger
                        graph.node = this.graph.addItem('node', {
                            x: -60,
                            y: -60,
                            // keyShape:'rect',
                            label: '起始节点',
                            labelCfg: {
                                position: 'center',
                                style: {
                                    fill: '#666',
                                    opacity: 0.3,
                                    zIndex: 10
                                }
                            },
                            // id: this.Util.uniqueId(),
                            size: [60, 60],
                            shape: 'myCircle',
                            style: {
                                fill: '#FA8C16',
                                stroke: '#FA8C16',
                                fillOpacity: 0.1,
                                borderStyle: 'dashed'
                            },
                        })
                        break
                    case 'juxing':
                        // 矩形
                        graph.node = this.graph.addItem('node', {
                            x: -60,
                            y: -60,
                            keyShape: 'rect',
                            label: '常规节点',
                            labelCfg: {
                                position: 'center',
                                style: {
                                    fill: '#666',
                                    opacity: 0.3,
                                }
                            },
                            // id: this.Util.uniqueId(),
                            size: [80, 50],
                            shape: 'juxing',
                            style: {
                                fill: '#1890FF',
                                stroke: '#1890FF',
                                fillOpacity: 0.1,
                                borderStyle: 'dashed',
                                borderRadius: 2,
                            },
                        })
                        break
                    case 'diamond':
                        // 菱形
                        graph.node = this.graph.addItem('node', {
                            x: -60,
                            y: -60,
                            label: '分叉节点',
                            keyShape: 'rect',
                            labelCfg: {
                                position: 'center',
                                style: {
                                    fill: '#666',
                                    opacity: 0.3,
                                }
                            },
                            // id: this.Util.uniqueId(),
                            size: [60, 60],
                            shape: 'diamond',
                            color: 'black',
                            style: {
                                fill: '#13C2C2',
                                stroke: '#13C2C2',
                                fillOpacity: 0.1,
                                borderStyle: 'dashed'
                            },
                        })
                        break
                    case 'ellipse':
                        // 椭圆
                        graph.node = this.graph.addItem('node', {
                            x: -60,
                            y: -60,
                            label: '模型节点',
                            keyShape: 'rect',
                            labelCfg: {
                                position: 'center',
                                style: {
                                    fill: '#666',
                                    opacity: 0.3,
                                }
                            },
                            // id: this.Util.uniqueId(),
                            size: [90, 60],
                            shape: 'ellipse',
                            style: {
                                fill: '#722ED1',
                                stroke: '#722ED1',
                                fillOpacity: 0.1,
                                borderStyle: 'dashed'
                            },
                        })
                        break
                    case 'image':
                        // debugger

                        graph.node = this.graph.addItem('node', {
                            x: -60,
                            y: -60,
                            img:  _this.currentSrc,
                            keyShape: 'rect',
                            labelCfg: {
                                position: 'top',
                                style: {
                                    fill: '#666',
                                    opacity: 0.3,
                                }
                            },
                            kind:  _this.currentNodeType,
                            label: '图片',
                            // id: this.Util.uniqueId(),
                            size: [60, 60],
                            shape: 'image',
                            style: {
                                fill: '#722ED1',
                                stroke: '#722ED1',
                                fillOpacity: 0.1,
                                borderStyle: 'dashed'
                            },
                        })
                        break
                    default:
                        graph.node = this.graph.addItem('node', {
                            x: -60,
                            y: -60,
                            keyShape: 'rect',
                            labelCfg: {
                                position: 'center',
                                style: {
                                    fill: '#666',
                                    opacity: 0.3,
                                }
                            },
                            label: '',
                            // id: this.Util.uniqueId(),
                            size: [60, 60],
                            shape: 'image',
                            style: {
                                fill: '#722ED1',
                                stroke: '#722ED1',
                                fillOpacity: 0.1,
                                borderStyle: 'dashed'
                            },
                        })
                        break
                }
            },
            realCreateNode(ev) {
                let _this = this;
                const graph = this.graph
                switch (_this.nodeClick.getAttribute('data-shape')) {
                    case 'yuan':
                        this.graph.addItem('node', {
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
                            id: this.Util.uniqueId(),
                            size: [60, 60],
                            shape: 'myCircle',
                            style: {
                                fill: '#FA8C16',
                                stroke: '#FA8C16',
                                fillOpacity: 0.3
                            },
                        })
                        break
                    case 'juxing':
                        // 矩形
                        this.graph.addItem('node', {
                            x: ev.x,
                            y: ev.y,
                            keyShape: 'rect',
                            label: '常规结点',
                            labelCfg: {
                                position: 'center',
                                style: {
                                    fill: '#666',
                                    opacity: 1,
                                }
                            },
                            id: this.Util.uniqueId(),
                            size: [80, 50],
                            shape: 'juxing',
                            style: {
                                fill: '#1890FF',
                                stroke: '#1890FF',
                                fillOpacity: 0.3,
                            },
                        })
                        break
                    case 'diamond':
                        // 菱形
                        this.graph.addItem('node', {
                            x: ev.x,
                            y: ev.y,
                            label: '分叉节点',
                            keyShape: 'rect',
                            labelCfg: {
                                position: 'center',
                                style: {
                                    fill: '#666',
                                    opacity: 1,
                                }
                            },
                            id: this.Util.uniqueId(),
                            size: [60, 60],
                            shape: 'diamond',
                            color: 'black',
                            style: {
                                fill: '#13C2C2',
                                stroke: '#13C2C2',
                                fillOpacity: 0.3
                            },
                        })
                        break
                    case 'ellipse':
                        // 椭圆
                        this.graph.addItem('node', {
                            x: ev.x,
                            y: ev.y,
                            label: '模型节点',
                            keyShape: 'rect',
                            labelCfg: {
                                position: 'center',
                                style: {
                                    fill: '#666',
                                    opacity: 1,
                                }
                            },
                            id: this.Util.uniqueId(),
                            size: [90, 60],
                            shape: 'ellipse',
                            style: {
                                fill: '#722ED1',
                                stroke: '#722ED1',
                                fillOpacity: 0.3
                            },
                        })
                        break
                    case 'image':
                        // debugger
                        graph.realnode= this.graph.addItem('node', {
                            x: ev.x,
                            y: ev.y,
                            img: _this.currentSrc,
                            keyShape: 'rect',
                            labelCfg: {
                                position: 'top',
                                style: {
                                    fill: '#666',
                                    opacity: 1,
                                }
                            },
                            label: ' ',
                            kind:_this.currentNodeType,
                            id: this.Util.uniqueId(),
                            size: [60, 60],
                            shape: 'image',
                            style: {
                                fill: '#722ED1',
                                stroke: '#722ED1',
                                fillOpacity: 0.3
                            },
                        })
                        //给nodesInfo对象加上自定义的属性名称
                        this.$set(this.nodesInfo,graph.realnode._cfg.id,{})
                        let nodeId = this.graph.realnode._cfg.id
                        let kinds = _this.config[_this.graph.realnode._cfg.model.kind]
                        kinds.forEach(kind=>{
                            _this.$set(_this.nodesInfo[nodeId],kind.vmodel,'')
                        })
                        console.log('nodesInfo生成节点设置自定义属性之后',_this.nodesInfo[nodeId])
                        break
                    default:
                        this.graph.addItem('node', {
                            x: ev.x,
                            y: ev.y,
                            keyShape: 'rect',
                            labelCfg: {
                                position: 'center',
                                style: {
                                    fill: '#666',
                                    opacity: 1,
                                }
                            },
                            label: '',
                            id: this.Util.uniqueId(),
                            size: [60, 60],
                            shape: 'image',
                            style: {
                                fill: '#722ED1',
                                stroke: '#722ED1',
                                fillOpacity: 0.3
                            },
                        })
                        break
                }
            },
        }
    }
</script>

<style scoped>

</style>
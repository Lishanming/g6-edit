<template>
    <div></div>
</template>

<script>
    import {_throttle, _debounce} from "@/util/throttle";

    const imgUrl = require('@/assets/images/222.png')
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
                    //鼠标移动，画线跟随
                    onMousemove(ev) {
                        // console.log('drag:onMousemove', ev)
                        // debugger
                        const point = {x: ev.x, y: ev.y};

                        this.graph.updateItem(this.graph.node, {
                            ...point
                        })
                        // graph.removeItem(graph.node);

                        ev.target.attr('cursor', 'hand');
                        // console.log('getCurrentMode:', this.graph.getCurrentMode())
                    },
                    onMouseup(ev) {
                        // debugger
                        console.log('drag:onMouseup', ev)
                        graph.removeItem(graph.node);
                        graph.node = null;
                        _this.realCreateNode(ev)
                        //点击添加图片的开关
                        _this.addbegin = false
                    }
                });
            },
            initDragNode(ev) {
                let _this = this;
                // debugger
                const graph = this.graph
                graph.node = this.graph.addItem('node', {
                                    x: -60,
                                    y: -60,
                                    size: [60, 60],
                                    shape: 'rect',

                                })
                // switch (_this.nodeClick.getAttribute('data-shape')) {
                //     case 'yuan':
                //         // debugger
                //         graph.node = this.graph.addItem('node', {
                //             x: -60,
                //             y: -60,
                //             // keyShape:'rect',
                //             label: '起始节点',
                //             labelCfg: {
                //                 position: 'center',
                //                 style: {
                //                     fill: '#666',
                //                     opacity: 0.3,
                //                     zIndex: 10
                //                 }
                //             },
                //             // id: this.Util.uniqueId(),
                //             size: [60, 60],
                //             shape: 'myCircle',
                //             style: {
                //                 fill: '#FA8C16',
                //                 stroke: '#FA8C16',
                //                 fillOpacity: 0.1,
                //                 borderStyle: 'dashed'
                //             },
                //         })
                //         break
                //     case 'juxing':
                //         // 矩形
                //         graph.node = this.graph.addItem('node', {
                //             x: -60,
                //             y: -60,
                //             keyShape: 'rect',
                //             label: '常规节点',
                //             labelCfg: {
                //                 position: 'center',
                //                 style: {
                //                     fill: '#666',
                //                     opacity: 0.3,
                //                 }
                //             },
                //             // id: this.Util.uniqueId(),
                //             size: [60, 60],
                //             shape: 'juxing',
                //             style: {
                //                 fill: '#1890FF',
                //                 stroke: '#1890FF',
                //                 fillOpacity: 0.1,
                //                 borderStyle: 'dashed'
                //             },
                //         })
                //         break
                //     case 'diamond':
                //         // 菱形
                //         graph.node = this.graph.addItem('node', {
                //             x: -60,
                //             y: -60,
                //             label: '分叉节点',
                //             keyShape: 'rect',
                //             labelCfg: {
                //                 position: 'center',
                //                 style: {
                //                     fill: '#666',
                //                     opacity: 0.3,
                //                 }
                //             },
                //             // id: this.Util.uniqueId(),
                //             size: [60, 60],
                //             shape: 'diamond',
                //             color: 'black',
                //             style: {
                //                 fill: '#13C2C2',
                //                 stroke: '#13C2C2',
                //                 fillOpacity: 0.1,
                //                 borderStyle: 'dashed'
                //             },
                //         })
                //         break
                //     case 'ellipse':
                //         // 椭圆
                //         graph.node = this.graph.addItem('node', {
                //             x: -60,
                //             y: -60,
                //             label: '模型节点',
                //             keyShape: 'rect',
                //             labelCfg: {
                //                 position: 'center',
                //                 style: {
                //                     fill: '#666',
                //                     opacity: 0.3,
                //                 }
                //             },
                //             // id: this.Util.uniqueId(),
                //             size: [90, 60],
                //             shape: 'ellipse',
                //             style: {
                //                 fill: '#722ED1',
                //                 stroke: '#722ED1',
                //                 fillOpacity: 0.1,
                //                 borderStyle: 'dashed'
                //             },
                //         })
                //         break
                //     case 'image':
                //         graph.node = this.graph.addItem('node', {
                //             x: -60,
                //             y: -60,
                //             img: imgUrl,
                //             keyShape: 'rect',
                //             labelCfg: {
                //                 position: 'top',
                //                 style: {
                //                     fill: '#666',
                //                     opacity: 0.3,
                //                 }
                //             },
                //             label: '图片',
                //             // id: this.Util.uniqueId(),
                //             size: [60, 60],
                //             shape: 'image',
                //             style: {
                //                 fill: '#722ED1',
                //                 stroke: '#722ED1',
                //                 fillOpacity: 0.1,
                //                 borderStyle: 'dashed'
                //             },
                //         })
                //         break
                //     default:
                //         graph.node = this.graph.addItem('node', {
                //             x: -60,
                //             y: -60,
                //             keyShape: 'rect',
                //             labelCfg: {
                //                 position: 'center',
                //                 style: {
                //                     fill: '#666',
                //                     opacity: 0.3,
                //                 }
                //             },
                //             label: '',
                //             // id: this.Util.uniqueId(),
                //             size: [60, 60],
                //             shape: 'image',
                //             style: {
                //                 fill: '#722ED1',
                //                 stroke: '#722ED1',
                //                 fillOpacity: 0.1,
                //                 borderStyle: 'dashed'
                //             },
                //         })
                //         break
                // }
            },
            realCreateNode(ev) {
                let _this = this;
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
                            size: [60, 60],
                            shape: 'juxing',
                            style: {
                                fill: '#1890FF',
                                stroke: '#1890FF',
                                fillOpacity: 0.3
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
                        this.graph.addItem('node', {
                            x: ev.x,
                            y: ev.y,
                            img: imgUrl,
                            keyShape: 'rect',
                            labelCfg: {
                                position: 'top',
                                style: {
                                    fill: '#666',
                                    opacity: 1,
                                }
                            },
                            label: ' ',
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
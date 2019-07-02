<template>
    <div></div>
</template>

<script>
    const imgUrl = require('@/assets/images/111.png')
    const G6 = require('@antv/g6')
    export default {
        name: "createNode",
        methods:{
            //构造多种结点
            createNode() {
                let _this = this
                let graph = this.graph
                graph.addingEdge = false
                //构造矩形结点
                G6.registerNode('juxing', {
                    //设置鼠标移入结点时锚点显示
                    setState(name, value, item) {
                        const group = item.getContainer();
                        const shape = group.get('children').slice(1, 5); // 顺序根据 draw 时确定
                        if (name === 'hover') {
                            if (value) {
                                for (let i = 0; i < shape.length; i++) {
                                    shape[i].attr('opacity', '1');
                                }
                            } else {
                                for (let i = 0; i < shape.length; i++) {
                                    shape[i].attr('opacity', '0');
                                }
                            }
                        } else if (name === 'selected') {
                            if (value) {
                                group.get('children')[0].attr('lineWidth', '2');
                            } else {
                                group.get('children')[0].attr('lineWidth', '1');
                            }
                        }
                    },
                    //绘制后的附加操作
                    afterDraw(cfg, group) {
                        //锚点相对结点位置
                        let anchorPosition = [
                            [0, -30], [0, 30], [30, 0], [-30, 0]
                        ]
                        // this.graph.setItemState(node, 'selected', true);
                        // group.get('children')[0].on('click',ev=>{
                        //     // .setState('selected', true)
                        //     // console.log(ev)
                        // })

                        //创建锚点构造函数
                        const Anchor = (index) => {
                            const anchor = group.addShape('circle', {
                                attrs: {
                                    x: anchorPosition[index][0],
                                    y: anchorPosition[index][1],
                                    r: 4,
                                    opacity: 0,
                                    fill: '#d6fffe',
                                    stroke: '#55aecc',
                                    curcor: 'default'
                                }
                            });
                            //鼠标移入锚点
                            anchor.on('mouseenter', ev => {
                                //鼠标变为十字形
                                ev.target.attr('cursor', 'crosshair');
                                //设置模式为连线
                                graph.setMode('addEdge');
                                // debugger
                                //记录鼠标移入时的锚点索引
                                if (graph.addingEdge == false || graph == false) {
                                    graph.currSourceAnchorIndex = index
                                } else {
                                    graph.currTargetAnchorIndex = index
                                }
                            });
                            //鼠标松开
                            anchor.on('mouseup', ev => {
                                let model = ev.target.getParent()._cfg.item.getModel()
                                // console.log('0333333', graph, ev)
                                // debugger
                                graph.updateItem(graph.edge, {
                                    target: model.id,
                                    targetAnchor: graph.currTargetAnchorIndex
                                });
                                graph.addingEdge = false
                            })
                        }
                        const topAnchor = new Anchor(0)
                        const rightAnchor = new Anchor(1)
                        const bottomAnchor = new Anchor(2)
                        const leftAnchor = new Anchor(3)
                    },
                    getAnchorPoints() {
                        return [
                            [0.5, 0],
                            [0.5, 1],
                            [1, 0.5],
                            [0, 0.5]
                        ]
                    }
                }, 'rect');
                //构造菱形结点
                G6.registerNode('diamond', {
                    //设置鼠标移入结点时锚点显示
                    setState(name, value, item) {
                        const group = item.getContainer();
                        const shape = group.get('children').slice(1, 5); // 顺序根据 draw 时确定
                        if (name === 'hover') {
                            if (value) {
                                for (let i = 0; i < shape.length; i++) {
                                    shape[i].attr('opacity', '1');
                                }
                            } else {
                                for (let i = 0; i < shape.length; i++) {
                                    shape[i].attr('opacity', '0');
                                }
                            }
                        } else if (name === 'selected') {
                            if (value) {
                                group.get('children')[0].attr('lineWidth', '2');
                            } else {
                                group.get('children')[0].attr('lineWidth', '1');
                            }
                        }
                    },
                    draw(cfg, group) {
                        const size = cfg.size || [40, 40]; // 如果没有 size 时的默认大小
                        const width = size[0];
                        const height = size[1];
                        const shape = group.addShape('path', {
                            attrs: {
                                path: [
                                    ['M', 0, 0 - height / 2], // 上部顶点
                                    ['L', width / 2, 0], // 右侧点
                                    ['L', 0, height / 2], // 下部
                                    ['L', -width / 2, 0], // 左侧
                                    ['Z'] // 封闭
                                ],
                                // stroke: cfg.color, // 颜色应用到边上，如果应用到填充，则使用 fill: cfg.color,
                                fill: '#13C2C2',
                                stroke: '#13C2C2',
                                fillOpacity:0.3,
                            }
                        });
                        // if (cfg.label) { // 如果有文本
                        //     // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
                        //     // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
                        //     // style.text = cfg.label;
                        //     group.addShape('text', {
                        //         // attrs: style
                        //         attrs: {
                        //             id: new Date().getTime(),
                        //             x: 0, // 居中
                        //             y: 5,
                        //             textAlign: 'center',
                        //             textBaseline: 'middle',
                        //             text: cfg.label,
                        //             fill: '#d6fffe',
                        //             stroke: '#55aecc',
                        //         }
                        //     });
                        // }
                        return shape;
                    },
                    afterDraw(cfg, group) {
                        //锚点相对结点位置
                        let anchorPosition = [
                            [0, -30], [0, 30], [30, 0], [-30, 0]
                        ]
                        //创建锚点构造函数
                        const Anchor = (index) => {
                            const anchor = group.addShape('circle', {
                                attrs: {
                                    x: anchorPosition[index][0],
                                    y: anchorPosition[index][1],
                                    r: 4,
                                    opacity: 0,
                                    fill: '#d6fffe',
                                    stroke: '#55aecc',
                                    curcor: 'default'
                                }
                            });
                            //鼠标移入锚点
                            anchor.on('mouseenter', ev => {
                                //鼠标变为十字形
                                ev.target.attr('cursor', 'crosshair');
                                //设置模式为连线
                                graph.setMode('addEdge');
                                //记录鼠标移入时的锚点索引
                                if (graph.addingEdge == false || graph == false) {
                                    graph.currSourceAnchorIndex = index
                                } else {
                                    graph.currTargetAnchorIndex = index
                                }
                            });
                            //鼠标松开
                            anchor.on('mouseup', ev => {
                                let model = ev.target.getParent()._cfg.item.getModel()
                                // console.log('0333333', graph, ev)
                                // debugger
                                graph.updateItem(graph.edge, {
                                    target: model.id,
                                    targetAnchor: graph.currTargetAnchorIndex
                                });
                                graph.addingEdge = false
                            })
                        }
                        const topAnchor = new Anchor(0)
                        const rightAnchor = new Anchor(1)
                        const bottomAnchor = new Anchor(2)
                        const leftAnchor = new Anchor(3)

                    },
                    getAnchorPoints() {
                        return [
                            [0.5, 0],
                            [0.5, 1],
                            [1, 0.5],
                            [0, 0.5]
                        ]
                    }
                });
                //构造圆形结点
                G6.registerNode('myCircle', {
                    //设置鼠标移入结点时锚点显示
                    setState(name, value, item) {
                        const group = item.getContainer();
                        const shape = group.get('children').slice(1, 5); // 顺序根据 draw 时确定
                        if (name === 'hover') {
                            if (value) {
                                for (let i = 0; i < shape.length; i++) {
                                    shape[i].attr('opacity', '1');
                                }
                            } else {
                                for (let i = 0; i < shape.length; i++) {
                                    shape[i].attr('opacity', '0');
                                }
                            }
                        } else if (name === 'selected') {
                            if (value) {
                                group.get('children')[0].attr('lineWidth', '3');
                            } else {
                                group.get('children')[0].attr('lineWidth', '1');
                            }
                        }
                    },
                    afterDraw(cfg, group) {
                        //锚点相对结点位置
                        let anchorPosition = [
                            [0, -30], [0, 30], [30, 0], [-30, 0]
                        ]
                        //创建锚点构造函数
                        const Anchor = (index) => {
                            const anchor = group.addShape('circle', {
                                attrs: {
                                    x: anchorPosition[index][0],
                                    y: anchorPosition[index][1],
                                    r: 4,
                                    opacity: 0,
                                    fill: '#d6fffe',
                                    stroke: '#55aecc',
                                    curcor: 'default'
                                }
                            });
                            //鼠标移入锚点
                            anchor.on('mouseenter', ev => {
                                //鼠标变为十字形
                                ev.target.attr('cursor', 'crosshair');
                                //设置模式为连线
                                graph.setMode('addEdge');
                                //记录鼠标移入时的锚点索引
                                if (graph.addingEdge == false || graph == false) {
                                    graph.currSourceAnchorIndex = index
                                } else {
                                    graph.currTargetAnchorIndex = index
                                }
                            });
                            //鼠标松开
                            anchor.on('mouseup', ev => {
                                let model = ev.target.getParent()._cfg.item.getModel()
                                // console.log('0333333', graph, ev)
                                // debugger
                                graph.updateItem(graph.edge, {
                                    target: model.id,
                                    targetAnchor: graph.currTargetAnchorIndex
                                });
                                graph.addingEdge = false
                            })
                        }
                        const topAnchor = new Anchor(0)
                        const rightAnchor = new Anchor(1)
                        const bottomAnchor = new Anchor(2)
                        const leftAnchor = new Anchor(3)

                    },
                    getAnchorPoints() {
                        return [
                            [0.5, 0],
                            [0.5, 1],
                            [1, 0.5],
                            [0, 0.5]
                        ]
                    }
                }, 'circle');
                //构造椭圆形
                G6.registerNode('ellipse', {
                    //设置鼠标移入结点时锚点显示
                    setState(name, value, item) {
                        const group = item.getContainer();
                        const shape = group.get('children').slice(1, 5); // 顺序根据 draw 时确定
                        if (name === 'hover') {
                            if (value) {
                                for (let i = 0; i < shape.length; i++) {
                                    shape[i].attr('opacity', '1');
                                }
                            } else {
                                for (let i = 0; i < shape.length; i++) {
                                    shape[i].attr('opacity', '0');
                                }
                            }
                        } else if (name === 'selected') {
                            if (value) {
                                group.get('children')[0].attr('lineWidth', '3');
                            } else {
                                group.get('children')[0].attr('lineWidth', '1');
                            }
                        }
                    },
                    afterDraw(cfg, group) {
                        //锚点相对结点位置
                        let anchorPosition = [
                            [0, -30], [0, 30], [45, 0], [-45, 0]
                        ]
                        //创建锚点构造函数
                        const Anchor = (index) => {
                            const anchor = group.addShape('circle', {
                                attrs: {
                                    x: anchorPosition[index][0],
                                    y: anchorPosition[index][1],
                                    r: 4,
                                    opacity: 0,
                                    fill: '#d6fffe',
                                    stroke: '#55aecc',
                                    curcor: 'default'
                                }
                            });
                            //鼠标移入锚点
                            anchor.on('mouseenter', ev => {
                                //鼠标变为十字形
                                ev.target.attr('cursor', 'crosshair');
                                //设置模式为连线
                                graph.setMode('addEdge');
                                //记录鼠标移入时的锚点索引
                                if (graph.addingEdge == false || graph == false) {
                                    graph.currSourceAnchorIndex = index
                                } else {
                                    graph.currTargetAnchorIndex = index
                                }
                            });
                            //鼠标松开
                            anchor.on('mouseup', ev => {
                                let model = ev.target.getParent()._cfg.item.getModel()
                                // console.log('0333333', graph, ev)
                                // debugger
                                graph.updateItem(graph.edge, {
                                    target: model.id,
                                    targetAnchor: graph.currTargetAnchorIndex
                                });
                                graph.addingEdge = false
                            })
                        }
                        const topAnchor = new Anchor(0)
                        const rightAnchor = new Anchor(1)
                        const bottomAnchor = new Anchor(2)
                        const leftAnchor = new Anchor(3)

                    },
                    //设置锚点
                    getAnchorPoints() {
                        return [
                            [0.5, 0],
                            [0.5, 1],
                            [1, 0.5],
                            [0, 0.5]
                        ]
                    }
                }, 'ellipse');
                //构造图片结点
                G6.registerNode('image', {
                    //设置鼠标移入结点时锚点显示
                    draw(cfg, group) {
                        // debugger
                        const image = group.addShape('image', {
                            attrs: {
                                x: -48,
                                y: -40,
                                size: [60, 60],
                                img: imgUrl
                            }
                        })
                        return image;
                    },
                    setState(name, value, item) {
                        const group = item.getContainer();
                        const shape = group.get('children').slice(1, 5); // 顺序根据 draw 时确定
                        if (name === 'hover') {
                            if (value) {
                                for (let i = 0; i < shape.length; i++) {
                                    shape[i].attr('opacity', '1');
                                }
                            } else {
                                for (let i = 0; i < shape.length; i++) {
                                    shape[i].attr('opacity', '0');
                                }
                            }
                        } else if (name === 'selected') {
                            if (value) {
                                group.get('children')[0].attr('lineWidth', '3');
                            } else {
                                group.get('children')[0].attr('lineWidth', '1');
                            }
                        }
                    },
                    afterDraw(cfg, group) {
                        //锚点相对结点位置
                        let anchorPosition = [
                            [0, -30], [0, 30], [30, 0], [-30, 0]
                        ]
                        //创建锚点构造函数
                        const Anchor = (index) => {
                            const anchor = group.addShape('circle', {
                                attrs: {
                                    x: anchorPosition[index][0],
                                    y: anchorPosition[index][1],
                                    r: 4,
                                    opacity: 0,
                                    fill: '#d6fffe',
                                    stroke: '#55aecc',
                                    curcor: 'default',
                                }
                            });
                            //鼠标移入锚点
                            anchor.on('mouseenter', ev => {
                                //鼠标变为十字形
                                ev.target.attr('cursor', 'crosshair');
                                //设置模式为连线
                                graph.setMode('addEdge');
                                //记录鼠标移入时的锚点索引
                                if (graph.addingEdge == false || graph == false) {
                                    graph.currSourceAnchorIndex = index
                                } else {
                                    graph.currTargetAnchorIndex = index
                                }
                            });
                            //鼠标松开
                            anchor.on('mouseup', ev => {
                                let model = ev.target.getParent()._cfg.item.getModel()
                                // console.log('0333333', graph, ev)
                                // debugger
                                graph.updateItem(graph.edge, {
                                    target: model.id,
                                    targetAnchor: graph.currTargetAnchorIndex
                                });
                                graph.addingEdge = false
                            })
                        }
                        const topAnchor = new Anchor(0)
                        const rightAnchor = new Anchor(1)
                        const bottomAnchor = new Anchor(2)
                        const leftAnchor = new Anchor(3)
                    },
                    getAnchorPoints() {
                        return [
                            [0.5, 0],
                            [0.5, 1],
                            [1, 0.5],
                            [0, 0.5]
                        ]
                    }
                }, 'image');
            },
        }
    }
</script>

<style scoped>

</style>
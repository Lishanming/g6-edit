<template>
    <div></div>
</template>

<script>
    const G6 = require('@antv/g6')
    import * as Anthor from  '@/util/anthor'
    export default {
        name: "createNode",
        methods:{
            //构造多种结点
            createNode() {
                const anchor = [
                    [0.5, 0],
                    [1, 0.5],
                    [0.5, 1],
                    [0, 0.5]
                ]
                let _this = this
                let graph = this.graph
                graph.addingEdge = false
                //构造矩形结点
                G6.registerNode('juxing', {
                    //设置鼠标移入结点时锚点显示
                    setState(name, value, item) {
                        _this.setNodeState(name, value, item)
                    },
                    afterUpdate(cfg, node) {
                        _this.changeAnthorPosition(cfg, node)
                    },
                    //绘制后的附加操作
                    afterDraw(cfg, group) {
                      _this.createAnchor(cfg,group)
                    },
                    getAnchorPoints() {
                        return anchor
                    }
                }, 'rect');
                //构造菱形结点
                G6.registerNode('diamond', {
                    //设置鼠标移入结点时锚点显示
                    setState(name, value, item) {
                        _this.setNodeState(name, value, item)
                    },
                    afterUpdate(cfg, node) {
                        _this.changeAnthorPosition(cfg, node)
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
                        if (cfg.label) { // 如果有文本
                            // 如果需要复杂的文本配置项，可以通过 labeCfg 传入
                            // const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
                            // style.text = cfg.label;
                            group.addShape('text', {
                                // attrs: style
                                attrs: {
                                    id: new Date().getTime(),
                                    x: 0, // 居中
                                    y: 0,
                                    textAlign: 'center',
                                    textBaseline: 'middle',
                                    text: cfg.label,
                                    fill: '#666',
                                    // stroke: '#55aecc',
                                }
                            });
                        }
                        return shape;
                    },
                    afterDraw(cfg, group) {
                        _this.createAnchor(cfg,group)
                    },
                    getAnchorPoints() {
                        return anchor
                    }
                });
                //构造圆形结点
                G6.registerNode('myCircle', {
                    //设置鼠标移入结点时锚点显示
                    afterUpdate(cfg, node) {
                        _this.changeAnthorPosition(cfg, node)
                    },
                    setState(name, value, item) {
                        _this.setNodeState(name, value, item)
                    },
                    afterDraw(cfg, group) {
                        _this.createAnchor(cfg,group)
                    },
                    getAnchorPoints() {
                        return anchor
                    }
                }, 'circle');
                //构造椭圆形
                G6.registerNode('ellipse', {
                    //设置鼠标移入结点时锚点显示
                    setState(name, value, item) {
                        _this.setNodeState(name, value, item)
                    },
                    //创建锚点
                    afterDraw(cfg, group) {
                        _this.createAnchor(cfg,group)
                    },
                    afterUpdate(cfg, node) {
                        _this.changeAnthorPosition(cfg, node)
                    },
                    //设置锚点
                    getAnchorPoints() {
                        return anchor
                    }
                }, 'ellipse');
                //构造图片结点
                G6.registerNode('image', {
                    afterUpdate(cfg, node) {
                        _this.changeAnthorPosition(cfg, node)
                    },
                    setState(name, value, item) {
                        _this.setNodeState(name, value, item)
                    },
                    afterDraw(cfg, group) {
                        _this.createAnchor(cfg,group)
                    },
                    getAnchorPoints() {
                        return anchor
                    }
                }, 'image');
            },

            //创建锚点
            createAnchor(cfg,group){
                let anchorPosition = [
                    [0, -cfg.size[1]/2], [cfg.size[0]/2, 0],[0, cfg.size[1]/2], [-cfg.size[0]/2, 0]
                ]
                // debugger
                //创建锚点构造函数
                const Anchor = (index) => {
                    const anchor = group.addShape('circle', {
                        attrs: {
                            // id: this.count++,
                            x: anchorPosition[index][0],
                            y: anchorPosition[index][1],
                            r: 4,
                            opacity: 0,
                            fill: '#d6fffe',
                            stroke: '#55aecc',
                            curcor: 'default'
                        }
                    });
                    //鼠标移入事件
                    anchor.on('mouseenter', ev => {
                        // console.log('anchor:mousedown')
                        //鼠标变为十字形
                        // debugger
                        ev.target.attr('cursor', 'crosshair')
                        // ev.currentTarget.attr('fill', '#2dccbe');
                        //记录鼠标移入时的锚点索引
                        if (this.graph.addingEdge == true) {
                            this.graph.currTargetAnchorIndex = index
                            console.log('设置了起始锚点索引: '+this.graph.currTargetAnchorIndex);
                        }
                    });
                    //鼠标按下事件
                    anchor.on('mousedown', ev => {

                        //鼠标变为十字形
                        ev.target.attr('cursor', 'crosshair');
                        //设置模式为连线
                        this.graph.setMode('addEdge');

                        //记录鼠标移入时的锚点索引
                        if (this.graph.addingEdge == false || this.graph == false) {
                            this.graph.currSourceAnchorIndex = index
                            this.graph.sourceNode = ev.target._cfg.parent._cfg
                            // console.log('设置了起始锚点索引: '+this.graph.currSourceAnchorIndex);
                        }

                    });
                    anchor.on('mouseout', ev => {
                        // debugger
                        // ev.currentTarget.attr('fill', '#d6fffe');
                        // console.log('anchor:mouseout')
                        //记录鼠标移入时的锚点索引
                        // if (this.graph.addingEdge == false ) {
                        //     this.graph.setMode('default');
                        // }
                    });
                    //鼠标松开，
                    anchor.on('mouseup', ev => {

                        //起始节点id
                        let sourceId = this.graph.edge._cfg.sourceNode._cfg.id
                        //目标节点model
                        let model = ev.target.getParent()._cfg.item.getModel()

                        //需要判断目标锚点是否属于当前节点
                        if (sourceId==model.id) {
                            this.graph.removeItem(this.graph.edge)
                            this.graph.addingEdge = false
                            return
                        }

                        console.log('结束了画线操作，目标锚点索引: '+this.graph.currTargetAnchorIndex);
                        if(this.graph.currTargetAnchorIndex != undefined){
                            this.graph.updateItem(this.graph.edge, {
                                target: model.id,
                                targetAnchor: this.graph.currTargetAnchorIndex
                            });
                            this.graph.addingEdge = false
                        }else{
                            this.graph.removeItem(this.graph.edge);
                            this.graph.edge = null;
                            this.graph.addingEdge = false;
                        }
                        //关闭可连接锚点的激活状态
                        Anthor.setAnchorActive(this.graph,false)
                        this.graph.setMode('default');
                    })
                }
                const topAnchor = new Anchor(0)
                const rightAnchor = new Anchor(1)
                const bottomAnchor = new Anchor(2)
                const leftAnchor = new Anchor(3)
            },
            //设置状态
            setNodeState(name, value, item){
                let _this = this
                const group = item.getContainer();
                const shape = group.get('children').slice(2,6); // 顺序根据 draw 时确定
                switch (name) {
                    case 'hover':
                        if(value) {
                            for (let i = 0; i < shape.length; i++) {
                                shape[i].attr('opacity', '1')
                                shape[i].attr('strokeOpacity', '1')
                                shape[i].attr('fillOpacity', '1')
                            }
                        }else {
                            for (let i = 0; i < shape.length; i++) {
                                shape[i].attr('opacity', '0')
                                shape[i].attr('strokeOpacity', '0')
                                shape[i].attr('fillOpacity', '0')
                            }
                        }
                        break;
                    case 'selected':
                        if (value) {
                            group.get('children')[0].attr('fillOpacity', '0.5')
                        } else {
                            group.get('children')[0].attr('fillOpacity', '0.3')
                        }
                        break;
                    case 'multiSelected':
                        if (value) {
                            group.get('children')[0].attr('fill', 'red')
                        } else {
                            group.get('children')[0].attr('fill', 'green')
                        }
                        break;
                    case 'anthorActive':
                        let shapes = item._cfg.group._cfg.children
                        let anchors = shapes.filter(shape=>{
                            return shape.isKeyShape !=true && shape._cfg.type=='circle'
                        })
                        console.log('触发了anthorActive');
                        console.log(anchors);

                        if (value) {
                            anchors.forEach(anchor => {
                                anchor.attr('opacity',"1")
                                anchor.attr('r',3)
                                anchor.attr('fill','#ffffff')
                                anchor.attr('fillOpacity','1')
                                anchor.attr('stroke','#66c0fe')
                                anchor.attr('strokeOpacity','0.4')
                                anchor.attr('lineWidth',15)
                            });
                        }else {
                            console.log('恢复');

                            anchors.forEach(anchor => {
                                anchor.attr('r',4)
                                anchor.attr('lineWidth',1)
                                anchor.attr('fill','#d6fffe')
                                anchor.attr('stroke','#55aecc')
                                anchor.attr('opacity',"0")
                                anchor.attr('strokeOpacity','0')
                                anchor.attr('fillOpacity','0')
                            });
                        }
                        break;
                    default:
                        break;
                }

            },
            //当高宽改变的时候，锚点跟随改变
            changeAnthorPosition(cfg, node){
                // debugger
                node._cfg.group._cfg.children[4]._attrs.y = cfg.size[1]/2       //上右下左 [60,80]
                node._cfg.group._cfg.children[3]._attrs.x = cfg.size[0]/2
                node._cfg.group._cfg.children[2]._attrs.y = -cfg.size[1]/2
                node._cfg.group._cfg.children[5]._attrs.x = -cfg.size[0]/2
            },
        }
    }
</script>

<style scoped>

</style>

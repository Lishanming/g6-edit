<template>
    <div></div>
</template>

<script>
    export default {
        name: "Event",
        methods:{
            //事件相关
            Event(){
                //点击事件，判断目标类型
                this.graph.on('click', (ev) => {
                    let _this = this
                    //鼠标左键时去掉右键菜单
                    _this.currentMenu = ''
                    // console.log("click",ev)
                    if (ev.item == null) {
                        _this.currentType = 'graph'
                        if (this.addbegin == true) {
                            // console.log(111, _this.nodeClick.getAttribute('data-shape'))
                            switch (_this.nodeClick.getAttribute('data-shape')) {
                                case 'yuan':
                                    // 圆形
                                    this.graph.addItem('node', {
                                        x: ev.x,
                                        y: ev.y,
                                        label:'圆形',
                                        labelCfg: {
                                            position: 'center',
                                            offset:{
                                                left:1000000
                                            },
                                            style: {
                                                fill: '#666'
                                            }
                                        },
                                        id: this.Util.uniqueId(),
                                        size: this.defaultSize,
                                        shape: 'myCircle',
                                        style: {
                                            fill: '#FA8C16',
                                            stroke: '#FA8C16',
                                            fillOpacity:0.3
                                        },
                                    })
                                    break
                                case 'juxing':
                                    // 矩形
                                    this.graph.addItem('node', {
                                        x: ev.x,
                                        y: ev.y,
                                        // label:'矩形',
                                        labelCfg: {
                                            position: 'center',
                                            offset:{
                                                // right:'1000000px'
                                            },
                                            style: {
                                                fill: '#666'
                                            }
                                        },
                                        id: this.Util.uniqueId(),
                                        size: this.defaultSize,
                                        shape: 'juxing',
                                        style: {
                                            fill: '#1890FF',
                                            stroke: '#1890FF',
                                            fillOpacity:0.3
                                        },
                                    })
                                    break
                                case 'diamond':
                                    // 菱形
                                    this.graph.addItem('node', {
                                        x: ev.x,
                                        y: ev.y,
                                        // label:'菱形',
                                        labelCfg: {
                                            position: 'center',
                                            style: {
                                                fill: '#666'
                                            }
                                        },
                                        id: this.Util.uniqueId(),
                                        size: this.defaultSize,
                                        shape: 'diamond',
                                        color: 'black',
                                        style: {
                                            fill: '#13C2C2',
                                            stroke: '#13C2C2',
                                            fillOpacity:0.3
                                        },
                                    })
                                    break
                                case 'ellipse':
                                    // 椭圆
                                    this.graph.addItem('node', {
                                        x: ev.x,
                                        y: ev.y,
                                        label:'椭圆',
                                        labelCfg: {
                                            position: 'center',
                                            style: {
                                                fill: '#666'
                                            }
                                        },
                                        id: this.Util.uniqueId(),
                                        size: [90, 60],
                                        shape: 'ellipse',
                                        style: {
                                            fill: '#722ED1',
                                            stroke: '#722ED1',
                                            fillOpacity:0.3
                                        },
                                    })
                                    break
                                default:
                                    this.graph.addItem('node', {
                                        x: ev.x,
                                        y: ev.y,
                                        label:'',
                                        labelCfg: {
                                            position: 'center',
                                            style: {
                                                fill: '#666'
                                            }
                                        },
                                        id: this.Util.uniqueId(),
                                        size: [60, 60],
                                        shape: 'image',
                                        style: {
                                            fill: '#722ED1',
                                            stroke: '#722ED1',
                                            fillOpacity:0.3
                                        },
                                    })
                                    break
                            }
                            this.addbegin = false
                        }
                    } else {
                        let type = ev.item.getType()
                        switch (type) {
                            case 'node':
                                // 鼠标点击时设置当前节点类型
                                _this.currentType = 'node'
                                // 鼠标点击时获取当前节点id
                                _this.currentItemId = ev.item._cfg.id
                                break
                            case 'edge':
                                // 鼠标点击时设置当前item类型为edge
                                _this.currentType = 'edge'
                                // 鼠标点击时获取当前节点id
                                _this.currentItemId = ev.item._cfg.id
                                this.edgeId = ev.item._cfg.model.id
                                this.edgeName = ev.item._cfg.model.label
                                    ? ev.item._cfg.model.label.text
                                    : null
                                break
                            case 'group':
                                // 鼠标点击时设置当前item类型为group
                                _this.currentType = 'group'
                                // 鼠标点击时获取当前节点id
                                _this.currentItemId = ev.item._cfg.id
                                break
                            default:

                                break
                        }
                    }
                });
                //鼠标右键目标监听，显示右键菜单
                this.graph.on('contextmenu', (ev) => {
                    let _this = this
                    console.log("contextmenu",ev)
                    //保存当前的model，以供复制使用
                    if(ev.item != null){
                        this.copyModel = ev.item._cfg.model
                    }
                    //设置显示右键菜单
                    let contextmenu =document.getElementById('contextmenu')
                    if (ev.item == null) {
                        _this.currentMenu = 'graph'
                        //设置右键菜单跟随鼠标当前位置
                        contextmenu.setAttribute('style', `top:${ev.y}px;left:${ev.x}px;position: absolute;`);
                    } else {
                        let type = ev.item.getType()
                        switch (type) {
                            case 'node':
                                //currentmenu表示当前获取右键的item类型
                                _this.currentMenu = 'node'
                                //设置右键菜单跟随鼠标当前位置
                                contextmenu.setAttribute('style', `top:${ev.y}px;left:${ev.x}px;position: absolute;`);
                                // 鼠标右键时获取当前节点id
                                _this.currentItemId = ev.item._cfg.id
                                break
                            case 'edge':
                                _this.currentMenu = 'edge'
                                contextmenu.setAttribute('style', `top:${ev.y}px;left:${ev.x}px;position: absolute;`);
                                // 鼠标右键时获取当前节点id
                                _this.currentItemId = ev.item._cfg.id
                                break
                            case 'group':
                                _this.currentMenu = 'group'
                                contextmenu.setAttribute('style', `top:${ev.y}px;left:${ev.x}px;position: absolute;`);
                                // 鼠标右键时获取当前节点id
                                _this.currentItemId = ev.item._cfg.id
                                break
                            default:
                                break
                        }
                    }
                });
                //键盘事件监听
                this.graph.on('keydown', (ev) => {
                    // console.log('key',ev)
                    let keycode = ev.keyCode
                    if(keycode == 46){
                        //监听键盘delete
                        this.Delete()
                    }
                    else if(keycode == 67 && ev.ctrlKey){
                        //同时按下Ctrl + C
                        this.Copy()
                    } else if(keycode == 86 && ev.ctrlKey){
                        //同时按下Ctrl + V
                        this.Parse(ev)
                    }else if(keycode == 90 && ev.ctrlKey){
                        //同时按下Ctrl + Z,撤销
                        this.Undo()
                    } else if(keycode == 89 && ev.ctrlKey){
                        //同时按下Ctrl + Y，重做
                        this.Redo()
                    }
                });
                //结点点击
                this.graph.on('node:click', ev => {
                    console.log('node:click', ev)
                    //进入编辑状态，可拖拽
                    this.graph.setMode('edit');
                    ev.target.attr('cursor', 'move');
                    // 点击时设置为selected状态
                    const node = ev.item;
                    console.log(ev.item.getStates())
                    //获取当前节点id

                });
                // 鼠标移动到上面，移出结束
                this.graph.on('node:mouseenter', ev => {
                    const node = ev.item;
                    this.graph.setItemState(node, 'hover', true);
                    //鼠标手型
                    ev.target.attr('cursor', 'pointer');
                    // console.log(ev.item.getStates())
                });
                this.graph.on('node:mouseleave', ev => {
                    const node = ev.item;
                    this.graph.setItemState(node, 'hover', false);
                });
                //线点击
                this.graph.on('edge:click', ev => {
                    console.log('edge:click', ev);
                    let edge = ev.item
                    this.graph.setItemState(edge, 'selected', true);
                });
                //鼠标移动到线上
                this.graph.on('edge:mouseenter', ev => {
                    // console.log('edge:mouseout', ev);
                    //鼠标手型
                    ev.target.attr('cursor', 'pointer');

                    let edge = ev.item
                    this.graph.setItemState(edge, 'hover', true);
                });
                //鼠标移出线外
                this.graph.on('edge:mouseout', ev => {
                    // console.log('edge:mouseout', ev);
                    let edge = ev.item
                    this.graph.setItemState(edge, 'hover', false);
                });
            },
        }
    }
</script>

<style scoped>

</style>
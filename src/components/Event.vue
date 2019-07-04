<template>
    <div></div>
</template>

<script>
    import {_throttle, _debounce} from "@/util/throttle";

    export default {
        name: "Event",
        methods: {
            //事件相关
            Event() {
                //点击事件，判断目标类型
                this.graph.on('click', (ev) => {
                    let _this = this
                    //设置为default
                    // debugger
                    this.graph.setMode('default');
                    console.log('getCurrentMode:', this.graph.getCurrentMode())
                    //鼠标左键时去掉右键菜单
                    _this.currentMenu = ''
                    // console.log("click",ev)
                    if (ev.item == null) {
                        _this.currentType = 'graph'

                    } else {
                        let type = ev.item.getType()
                        switch (type) {
                            case 'node':
                                // 鼠标点击时设置当前节点类型
                                _this.currentType = 'node'
                                // 鼠标点击时获取当前节点id
                                _this.currentItemId = ev.item._cfg.id
                                //将当前值关联到右侧属性区域
                                this.nodeName = ev.item._cfg.model.label;
                                [this.nodeWidth, this.nodeHeight] = ev.item._cfg.model.size
                                this.nodeColor = ev.item._cfg.model.style.fill
                                // this.fontSize = ev.item.model.fontSize
                                this.shapeValue = ev.item._cfg.model.shape
                                break
                            case 'edge':
                                // 鼠标点击时设置当前item类型为edge
                                _this.currentType = 'edge'
                                // 鼠标点击时获取当前节点id
                                _this.currentItemId = ev.item._cfg.id
                                //将当前值关联到右侧属性区域
                                this.edgeId = ev.item._cfg.model.id
                                this.edgeName = ev.item._cfg.model.label
                                    ? ev.item._cfg.model.label.text
                                    : null
                                this.lineValue = ev.item._cfg.model.shape
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
                    console.log("contextmenu", ev)
                    //保存当前的model，以供复制使用
                    if (ev.item != null) {
                        this.copyModel = ev.item._cfg.model
                    }
                    //设置显示右键菜单
                    let contextmenu = document.getElementById('contextmenu')
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
                    if (keycode == 46) {
                        //监听键盘delete
                        this.Delete()
                    } else if (keycode == 67 && ev.ctrlKey) {
                        //同时按下Ctrl + C
                        this.Copy()
                    } else if (keycode == 86 && ev.ctrlKey) {
                        //同时按下Ctrl + V
                        this.Parse(ev)
                    }
                    // else if(keycode == 90 && ev.ctrlKey){
                    //     //同时按下Ctrl + Z,撤销
                    //     this.Undo()
                    // }
                    else if (keycode == 89 && ev.ctrlKey) {
                        //同时按下Ctrl + Y，重做
                        this.Redo()
                    }
                });


                //结点点击
                this.graph.on('node:click', ev => {
                    console.log('node:click', ev)
                    //鼠标手型
                    ev.target.attr('cursor', 'pointer');
                });
                // 鼠标可以在节点内拖线动
                this.graph.on('node:mousemove', ev => {
                    const graph = this.graph
                    const point = {x: ev.x, y: ev.y};
                    //线跟随
                    if (this.graph.addingEdge == true) {
                        this.graph.updateItem(this.graph.edge, {
                            target: point
                        })
                    }
                    // //使节点跟随
                    if (this.addbegin == true) {
                        if(!graph.node){return;}
                        graph.node.setCapture();
                        this.graph.updateItem(this.graph.node, {
                            ...point
                        })
                    }
                });
                this.graph.on('node:mouseup', ev => {
                    //拖出节点
                    const graph = this.graph
                    let _this = this;

                    //。。。。。不应该在这里调用
                    if (graph.node) {
                        graph.removeItem(graph.node)
                        this.realCreateNode(ev);
                        graph.node = null;
                        //点击添加图片的开关
                        this.addbegin = false
                    }
                    //转换为默认模式
                    this.graph.setMode('default');
                });
                // 鼠标移动到上面，移出结束
                this.graph.on('node:mouseenter', ev => {
                    const node = ev.item;
                    if (this.graph.addingEdge == true) {
                        this.graph.setItemState(node, 'hover', false);
                    } else {
                        this.graph.setItemState(node, 'hover', true);
                    }
                    //进入编辑状态，可拖拽
                    this.graph.setMode('edit');
                    //鼠标手型
                    ev.target.attr('cursor', 'move');
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
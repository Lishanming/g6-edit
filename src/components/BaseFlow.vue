<template>
    <div class="container" >
        <div class="topContainer">
            <div id="toolPannel" class="toolPannel">
                <i class="command iconfont icon-undo" title="撤销" @click="Undo"></i>
                <i class="command iconfont icon-redo" title="重做" @click="Redo"></i>
                <span class="separator"></span>
                <i class="command iconfont icon-toback" title="底层" @click="toback" :disabled="startSetIndex"></i>
                <i class="command iconfont icon-tofront" title="顶层" @click="tofront"  :disabled="startSetIndex"></i>
                <span class="separator"></span>
                <i class="command iconfont icon-zoom-out" title="缩小" @click="zoomOut"></i>
                <i class="command iconfont icon-zoom-in" title="放大" @click="zoomIn"></i>
                <span class="separator"></span>
                <i class="command iconfont icon-adaption" title="适应画布" @click="autoZoom"></i>
                <i class="command iconfont icon-realsize" title="实际尺寸" @click="realZoom"></i>
                <!--        <span class="separator"></span>-->
                <!--        <i class="command iconfont icon-multiSelect" title="多选" @click="MulitSelect"></i>-->
                <!--        <i class="command iconfont icon-group disable" title="组合" @click="group"></i>-->
                <!--        <i class="command iconfont icon-ungroup disable" title="解组" @click="ungroup" ></i>-->
            </div>

            <div class="data-opt">
                <a href="javascript:;" class="file">选择文件<input type="file" id="readFile" @click="readFile" /></a>
                <el-button size="mini" type="primary" @click="saveFlow">保存</el-button>
                <el-button size="mini" type="primary" @click="saveFlowToJson">导出json</el-button>
            </div>
        </div>
        <div class="content" id="content">
            <div id="itemPannel" class="itemPannel">
                <!-- <i class="item iconfont icon-circle circle" data-shape="yuan" title="起始结点" draggable="false" @mousedown="addNode"></i>
                <i class="item iconfont icon-rect rect" data-shape="juxing" title="常规结点" draggable="false" @mousedown="addNode"></i>
                <i class="item iconfont icon-rhombus diamond" data-shape="diamond" title="分叉结点" draggable="false" @mousedown="addNode"></i>
                <i class="item iconfont icon-capsule square" data-shape="ellipse" title="模型结点" draggable="false" @mousedown="addNode"></i> -->
                <left-bar @mousedown="addNode"></left-bar>
<!--                <img src="@/assets/images/111.png" alt="图片" width="70" height="60" data-shape="image" title="图片" draggable="false" @mousedown="addNode" >-->
<!--                <i class="item iconfont icon-people people" data-shape="image" title="图形结点" @click="addNode"></i>-->
            </div>
            <div class="center-pannel">
                <div id="flow" class="flowBox"></div>
                <div class="contextmenu" id="contextmenu" style="position: absolute; z-index: 2;">
                    <!--节点选中，鼠标右键-->
                    <div data-status="node-selected" v-show="currentMenu == 'node'" class="menu" >
                        <div data-command="copy" class="command " @click="Copy">
                            <span>复制</span>
                            <!-- <span>copy</span> -->
                        </div>
                        <div data-command="delete" class="command " @click="Delete">
                            <span>删除</span>
                            <!-- <span>delete</span> -->
                        </div>
                    </div>
                    <!--边选中，鼠标右键-->
                    <div data-status="edge-selected" v-show="currentMenu == 'edge'" class="menu" >
                        <div data-command="delete" class="command " @click="Delete">
                            <span>删除</span>
                            <!-- <span>delete</span> -->
                        </div>
                    </div>
                    <!--组选中，鼠标右键-->
                    <div data-status="group-selected" v-show="currentMenu == 'group'" class="menu" >
                        <div data-command="copy" class="command " @click="Copy">
                            <span>复制</span>
                            <!-- <span>copy</span> -->
                        </div>
                        <div data-command="delete" class="command " @click="Delete">
                            <span>删除</span>
                            <!-- <span>delete</span> -->
                        </div>
                        <div data-command="unGroup" class="command " @click="ungroup">
                            <span>解组</span>
                            <!-- <span>unGroup</span> -->
                        </div>
                    </div>
                    <!--画布选中，鼠标右键-->
                    <div data-status="canvas-selected" v-show="currentMenu == 'graph'" class="menu" >
                        <div data-command="undo" class="command " @click="Undo">
                            <span>撤销</span>
                            <!-- <span>undo</span> -->
                        </div>
                        <div data-command="redo" class="command " @click="Redo">
                            <span>重做</span>
                            <!-- <span>redo</span> -->
                        </div>
                        <div data-command="pasteHere" class="command " @click="Parse"  v-show="hasClickCopy" >
                            <span>粘贴</span>
                            <!-- <span>pasteHere</span> -->
                        </div>
                    </div>
                    <!--多选选中，鼠标右键-->
                    <div data-status="multi-selected"  v-show="currentMenu == 'multi'" class="menu" >
                        <div data-command="copy" class="command " @click="Copy">
                            <span>复制</span>
                            <!-- <span>copy</span> -->
                        </div>
                        <div data-command="paste" class="command " @click="Parse" >
                            <span>粘贴</span>
                            <!-- <span>paste</span> -->
                        </div>
                        <div data-command="addGroup" class="command " @click="group">
                            <span>归组</span>
                            <!--              <span>addGroup</span>-->
                        </div>
                        <div data-command="delete" class="command "  @click="Delete">
                            <span>删除</span>
                            <!-- <span>delete</span> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="rightPannel">
                <div id="detailPannel" class="detailPannel">
                    <!-- 选中节点-->
                    <div
                            data-status="node-selected"
                            class="pannel"
                            v-show="currentType == 'node'"
                    >
                        <div class="pannel-title">节点</div>
                        <div class="block-container" id="nodeAttribute">
                            <div class="p name">
                                名称：
                                <el-input size="mini" v-model="nodeName"></el-input>
                            </div>
                            <div class="p name">
                                <span style="margin-right: 18px;">类型：</span>
                                <el-select v-model="shapeValue" placeholder="请选择" size="mini" :disabled="showShapeValue">
                                    <el-option
                                            v-for="item in Shape"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="p size">
                                尺寸：
                                <el-input size="mini" v-model="nodeWidth"></el-input>
                                <el-input size="mini" v-model="nodeHeight"></el-input>
                            </div>
                            <div class="p color">
                                颜色：
                                <el-color-picker
                                        v-model="nodeColor"
                                        size="mini"
                                ></el-color-picker>
                            </div>

                        </div>
                    </div>
                    <!-- 选中边-->
                    <div
                            data-status="edge-selected"
                            class="pannel"
                            id="edge_detailpannel"
                            v-show="currentType == 'edge'"
                    >
                        <div class="pannel-title">边</div>
                        <div class="block-container">
                            <div class="p name">
                                名称：
                                <el-input size="mini" v-model="edgeName"></el-input>
                            </div>
                            <div class="p name">
                                <span style="margin-right: 18px;">线类型：</span>
                                <el-select v-model="lineValue" placeholder="请选择" size="mini">
                                    <el-option
                                            v-for="item in Line"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <!-- 选中画布-->
                    <div
                            data-status="canvas-selected"
                            class="pannel"
                            id="canvas_detailpannel"
                            v-show="currentType == 'graph'"
                    >
                        <div class="pannel-title">画布</div>
                        <div class="block-container">
                            <el-checkbox v-model="gridCheck">网格对齐</el-checkbox>
                        </div>
                    </div>
                </div>
                <div class="navigator">
                    <span class="pannel-title">导航器</span>
                    <div class="mini-map" id="minimap"></div>
                </div>
                <div class="zoom-slider">
                    <el-slider
                            v-model="zoomRatio"
                            show-input
                            input-size="mini"
                            :max="200"
                            :step="1"
                    ></el-slider>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import attributes from '@/components/attributes'
    import createNode from '@/components/createNode'
    import Event from '@/components/Event'
    import addLine from '@/components/addLine'
    import addNodeByDrag from '@/components/addNodeByDrag'
    import LeftBar from '@/components/component/leftBar'
    import ToolPannel from '@/components/component/tool-pannel'

    const G6 = require('@antv/g6')
    const Grid = require('@antv/g6/build/grid')
    const Minimap = require('@antv/g6/build/minimap')

    export default {
        name: 'BaseFlow',
        mixins: [attributes,createNode,Event,addLine,addNodeByDrag,ToolPannel],
        components: {
            LeftBar
            // ContextMenu
        },
        props: {
            data: Object, // 传入数据
            getData: Function // 获取数据
        },
        data() {
            return {
                globaldata:'',//画布的数据
                // defaultSize:[60,60],
                addbegin: false,
                nodeClick: {},
                addingEdge: false,
                currentItemId:'',   //删除时用到，当前item的id
                copyModel:'',     //复制当前节点model
                hasClickCopy:false,   //粘贴的使用和禁用
                step:0,    //用于撤销和重做，保存数据步骤
                canvasHistory:[],
                nodeWidth: null,
                nodeHeight: 60,
                showShapeValue:false,
                startSetIndex:false
            }
        },

        mounted() {
            this.initG6();
        },
        beforeUpdate(){
            this.step++
            if (this.step < this.canvasHistory.length) {
                this.canvasHistory.length = this.step; // 截断数组
            }
            this.globaldata = this.graph.save()
            this.canvasHistory.push(this.globaldata);
        },
        methods: {
            initG6() {
                //全局-边-箭头
                G6.Global.defaultEdge.style = {
                    endArrow: true
                };
                //使用G6插件。minimap
                const minimap = new Minimap({
                    container: 'minimap',
                });
                // 创建网格
                const gridPlugin = new Grid();
                // console.log(gridPlugin)
                this.Util = G6.Util
                //初始化画布
                this.graph = new G6.Graph({
                    container: 'flow',
                    width: 1522,
                    height: 900,
                    plugins: [gridPlugin,minimap],
                    modes: {
                        default: ['drag-canvas', {
                            type: 'zoom-canvas',
                            sensitivity: 5
                        }, 'click-select','drag-node'],
                        addEdge: ['click-add-edge'],
                        dragNode:['init-drag-node']
                    },
                    defaultEdge: {
                        shape: 'polyline',
                        size: 1
                    },
                    defaultNode: {
                        // shape: 'rect',
                        size: [10, 10]
                    },
                    nodeStyle: {
                        // 节点在默认状态下的样式
                        default: {
                            fill: '#096dd9',
                            stroke: '#096dd9',
                            fillOpacity:0.3
                        },
                        // 当节点在 selected 状态下的样式
                        selected: {
                            lineWidth: 2,
                            fillOpacity: 0.8
                        }
                    },
                    edgeStyle: {
                        // 默认边的样式
                        default: {
                            stroke: '#7c7f82',
                            lineWidth: 2,
                        },
                        selected: {
                            lineWidth: 2,
                            fillOpacity: 0.8,
                            stroke: '#60676e'
                        },
                        hover:{
                            stroke: '#409eff',
                            fillOpacity: 0.8,
                            lineWidth: 3,
                        }
                    },
                    shortcut: {
                        zoomIn: true, // 开启放大快捷键
                        zoomOut: true, // 开启视口缩小快捷键
                        autoZoom: true
                    },

                });
                //定义交互模式：拖拽节点
                this.dragBehavior(G6)
                //调用创建节点函数
                this.createNode();
                //调用画线行为函数
                this.addEdgeBehavior(G6);
                //调用创建线
                this.registerEdge(G6);
                //调用事件
                this.Event()
                //去掉画布区域鼠标默认右键事件
                document.getElementById("flow").oncontextmenu = function(){
                    return false;
                }
                // 流图读取数据
                this.data && this.graph.read(this.data)
                this.graph.data(this.data);
                this.graph.render();
            },
            /**
             * x,y为坐标
             * shape为类型，String
             * size为大小，数组
             * **/
            addNode(ev) {
                //点击添加图片的开关
                this.addbegin = true
                this.nodeClick = ev.target

                //设置模式为拖拽
                this.graph.setMode('dragNode');
                const graph = this.graph
                //  console.log('getCurrentMode:',  this.graph.getCurrentMode())
                this.initDragNode(ev)
            },
        },

    }
</script>

<style scoped lang="less">
    .container {
        width: 100%;
        height: 100%;
        position: relative;

        .topContainer {
            position: absolute;
            padding: 5px 20px;
            width: 100%;
            border: 1px solid #e9e9e9;
            height: 42px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            background: #ffffff;
            -webkit-box-shadow: 0px 8px 12px 0px rgba(0, 52, 107, 0.04);
            box-shadow: 0px 8px 12px 0px rgba(0, 52, 107, 0.04);
            .toolPannel {
                height: 100%;
                width: 80%;

                .command {
                    width: 27px;
                    line-height: 27px;
                    height: 27px;
                    margin: 0px 6px;
                    border-radius: 2px;
                    padding-left: 4px;
                    display: inline-block;
                    border: 1px solid rgba(2, 2, 2, 0.02);
                    cursor: pointer;
                }

                .disable {
                    color: rgba(0, 0, 0, 0.25);
                }

                .separator {
                    margin: 4px;
                    border-left: 1px solid #E9E9E9;
                }
            }
            .data-opt {
                width: 20%;
                height: 100%;
                text-align: right;

                .file {
                    position: relative;
                    display: inline-block;
                    border-radius: 4px;
                    padding: 4px 12px;
                    overflow: hidden;
                    text-decoration: none;
                    text-indent: 0;
                    line-height: 20px;
                    font-size: 12px;
                    float: left;
                    color: #FFF;
                    background-color: #409EFF;
                    border-color: #409EFF;
                }

                .file input {
                    position: absolute;
                    font-size: 100px;
                    right: 0;
                    top: 0;
                    opacity: 0;
                    cursor: pointer;
                }
            }
        }

        .content {
            padding-top: 41px;
            width: 100%;
            height: 100%;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            //background: #f7f9fb; //这一行添加背景色后，会盖住网格线
            -ms-flex-pack: distribute;
            justify-content: space-around;

            .itemPannel {
                width: 5%;
                /*min-width: 300px;*/
                height: 100%;
                padding: 20px;
                display: inline-flex;
                justify-content: center;
                flex-wrap: wrap;
                flex-direction: row;
                align-content: start;
                img{
                    cursor: pointer;
                }
                .item {
                    width: 80px;
                    height: 80px;
                    line-height: 80px;
                    font-size: 50px;
                    font-weight: lighter;
                    margin: 0px 6px;
                    border-radius: 2px;
                    padding-left: 4px;
                    display: inline-block;
                    cursor: pointer;
                }

                .circle {
                    color: #FA8C16;
                }

                .diamond {
                    color: #13C2C2;
                }

                .rect {
                    color: #1890FF;
                }

                .square {
                    color: #722ED1;
                }

                .people {
                    color: #f15454;
                }
            }

            .center-pannel {
                /*background: #ffffff;*/
                display: inline-block;
                position: relative;
                width: 80%;
                height: 100%;
                border: 1px solid #dedbe2;
                .contextmenu {
                    margin: 0px;
                    width: 150px;
                    background: white;
                    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
                    color: #000;
                    font-size: 12px;
                    /*display: none;*/

                    .command {
                        height: 12px;
                        padding: 8px;
                        box-sizing: content-box;
                        color: #000;
                    }

                    .command:hover {
                        cursor: pointer;
                        background: #e6f7ff;
                    }
                }
                .flowBox {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
            }

            .rightPannel {
                width: 15%;
                min-width: 300px;
                height: 100%;
                display: -webkit-inline-box;
                display: -ms-inline-flexbox;
                display: inline-flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -ms-flex-direction: column;
                flex-direction: column;

                .pannel-title {
                    display: block;
                    height: 32px;
                    border-top: 1px solid #dce3e8;
                    border-bottom: 1px solid #dce3e8;
                    background: #ebeef2;
                    color: #000;
                    line-height: 28px;
                    padding-left: 12px;
                }

                .detailPannel {
                    width: 100%;
                    height: 78%;
                    background: #f7f9fb;
                    border-left: 1px solid #e6e9ed;
                    font-size: 13px;

                    /*.pannel {*/
                    /*    display: none*/
                    /*}*/

                    .block-containe {
                        padding-top: 20px;
                    }

                    .input {
                        margin-left: 16px;
                    }

                    .name-input {
                        width: 120px;
                    }

                    .width-input {
                        width: 52px;
                    }

                    .height-input {
                        width: 52px;
                    }

                    .pannel-title {
                        height: 32px;
                        border-top: 1px solid #dce3e8;
                        border-bottom: 1px solid #dce3e8;
                        background: #ebeef2;
                        color: #000;
                        line-height: 28px;
                        padding-left: 12px;
                    }

                    .block-container {
                        padding: 16px 8px;
                        position: relative;

                        .p {
                            margin-bottom: 12px;
                        }

                        .p.name {
                            .el-input {
                                width: 60%;
                                padding: 0 10px;
                            }
                        }

                        .p.size {
                            .el-input {
                                width: 30%;
                                padding: 0 10px;
                            }
                        }

                        .p.color {
                            .el-color-picker {
                                vertical-align: middle;
                            }
                        }
                    }
                }

                .navigator {
                    width: 100%;
                    height: 15%;
                    -webkit-box-flex: 1;
                    -ms-flex-positive: 1;
                    flex-grow: 1;

                    .pannel-title {
                        display: block;
                        height: 32px;
                        border-top: 1px solid #dce3e8;
                        border-bottom: 1px solid #dce3e8;
                        background: #ebeef2;
                        color: #000;
                        line-height: 28px;
                        padding-left: 12px;
                    }

                    .mini-map {
                        width: 100%;
                        height: calc(100% - 34px);
                    }
                }

                .zoom-slider {
                    width: 100%;
                    height: 5%;
                    padding: 5px 10px;
                    background: #ffffff;
                }
            }
        }
    }
</style>
<style>
    .block-container .p .el-select {
        width: 150px;
    }
</style>

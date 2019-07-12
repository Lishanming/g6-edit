<template>
    <div id="editor"></div>
</template>

<script>
    export default {
        name: "attributes",
        data() {
            return {
                currentType: 'graph',
                currentMenu: '',  //右键菜单
                infoTitle: '画布',//属性标题
                lineValue: '',    //线类型
                Line: [{
                    value: 'line',
                    label: '直线'
                }, {
                    value: 'cubic',
                    label: '三阶赛贝尔曲线'
                }, {
                    value: 'quadratic',
                    label: '二阶赛贝尔曲线'
                }, {
                    value: 'flow-line',
                    label: '箭头折线'
                }],
                shapeValue: '',    //结点类型
                Shape: [{
                    value: 'myCircle',
                    label: '起始节点'
                }, {
                    value: 'image',
                    label: '图形结点'
                }, {
                    value: 'juxing',
                    label: '常规结点'
                }, {
                    value: 'diamond',
                    label: '分叉结点'
                }, {
                    value: 'ellipse',
                    label: '模型节点'
                }],
                zoomRatio: 100,
                nodeName: null,
                nodeWidth: null,
                nodeHeight: null,
                nodeColor: null,
                edgeId: null,        //线id
                edgeName: null,      //线名称
                gridCheck: true,    //是否显示网格
                pressCtrl: false,     //是否按下ctrl
                multi: [],     //按住节点保存点击了的节点的item
                initNodesData:{}    //保存初始化数据
            }
        },
        watch: {
            name(newValue){
                if (newValue === null) return
                var item = this.graph.findById(this.currentItemId)
                this.graph.update(item, {
                    label: newValue
                })
            },
            gridCheck(newValue) {
                if (newValue) {
                    document.getElementById('content').style.background = ''
                } else {
                    document.getElementById('content').style.background = '#f7f9fb'
                }
            },
            edgeName(newValue) {
                if (newValue === null) return
                var item = this.graph.findById(this.edgeId)
                this.graph.update(item, {
                    label: newValue
                })
            },
            lineValue(newValue) {
                if (newValue === null) return
                var item = this.graph.findById(this.edgeId)
                this.graph.update(item, {
                    shape: newValue
                })
                this.graph.refreshItem(item)
            },
            nodeName(newValue) {
                if (newValue === null) return
                var item = this.graph.findById(this.currentItemId)
                this.graph.update(item, {
                    label: newValue
                })
            },
            nodeWidth(newValue) {
                //设置最小高宽
                if (newValue === null) return
                // debugger
                var item = this.graph.findById(this.currentItemId)
                //当shape是myCircle时，高等于宽
                if (item._cfg.currentShape == "myCircle") {
                    this.nodeHeight = newValue
                }
                this.graph.update(item, {
                    size: [newValue, this.nodeHeight]
                })
                this.graph.refreshItem(item);
            },
            nodeHeight(newValue) {
                if (newValue === null) return
                var item = this.graph.findById(this.currentItemId)
                //当shape是myCircle时，高等于宽
                if (item._cfg.currentShape == "myCircle") {
                    this.nodeWidth = newValue
                }
                this.graph.update(item, {
                    size: [this.nodeWidth, newValue]
                })
                this.graph.refreshItem(item);
            },
            nodeColor(newValue) {
                if (newValue === null) return
                var item = this.graph.findById(this.currentItemId)
                this.graph.update(item, {
                    style: {
                        fill: newValue,
                        stroke: newValue
                    }
                })
            },
            shapeValue(newValue) {
                if (newValue === null) return
                //当shape是image时，不可用
                var item = this.graph.findById(this.currentItemId)
                if (item._cfg.currentShape == "image") {
                    this.showShapeValue = true
                }
                this.graph.update(item, {
                    shape: newValue
                })
                this.graph.refreshItem(item)
            },
            zoomRatio(newValue) {
                // debugger
                this.graph.zoomTo(newValue / 100)
            },
        },
        methods: {
            //获取配置属性，使左侧显示对应属性
            getConfig() {
                // debugger
                let _this = this
                this.$axios.postJson('/Config',{})
                    .then((res) => {
                        console.log('json', res)
                        _this.config = res.config
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            },
            //获取系统初始节点
            getInitNodes() {
                this.$axios.postJson('/initNodes',{})
                    .then((res) =>{
                        console.log("init",res)
                        this.initNodesData = res
                })
            },
            /**
             * @description: 读取文件
             */
            readFile() {
                var tmp1;//数据文件存这里
                var input = document.getElementById("readFile");
                var that = this
                input.onchange = function () {
                    var file = this.files[0];
                    if (!!file) {
                        var reader = new FileReader();
                        reader.readAsText(file, "UTF-8");//UTF-8编码
                        reader.onload = function () {
                            tmp1 = this.result;
                            that.$emit("sendJson", this.result)
                            // console.log(this.result);//打印检查
                        };
                    }
                };
            },
            /**
             * @description: 保存流图数据为json
             */
            saveFlowToJson() {
                var elementA = document.createElement('a');
                elementA.setAttribute('href', 'data:text/plain;charset=utf-8,' + JSON.stringify(this.graph.save()));
                elementA.setAttribute('download', +new Date() + ".json");
                elementA.style.display = 'none';
                document.body.appendChild(elementA);
                elementA.click();
                document.body.removeChild(elementA);
            },
            /**
             * @description: 保存流图数据
             */
            saveFlow() {
                this.globaldata = this.graph.save()
                console.log(this.graph.save())
                this.getData(this.globaldata)
                this.$message({
                    message: '数据保存成功！',
                    type: 'success'
                })
            },
            //鼠标右键删除
            Delete(ev) {
                // console.log('delete',ev)
                //找到节点id，进行删除
                const item = this.graph.findById(this.currentItemId)
                this.graph.removeItem(item)
                //点击菜单项之后隐藏鼠标右键选项
                this.currentMenu = ''
            },
            //鼠标右键复制
            Copy(ev) {
                // console.log('copy',ev)
                //没有选中任何节点，则不显示粘贴选项
                if (ev != undefined) {
                    //点击复制之后才显示粘贴
                    this.hasClickCopy = true
                }
                //点击菜单项之后隐藏鼠标右键选项
                this.currentMenu = ''
            },
            //鼠标右键粘贴
            Parse(ev) {
                // console.log('parse',ev)
                // debugger
                if (ev != undefined) {
                    //将复制到鼠标点击的位置
                    this.copyModel.x = this.copyModel.x + 20
                    this.copyModel.y = this.copyModel.y + 20
                    this.copyModel.id = this.Util.uniqueId()         //粘贴一个节点，id要改变
                    this.graph.addItem('node', this.copyModel)
                    //粘贴一次之后不能再粘贴
                    this.hasClickCopy = false
                } else {
                    return
                }
                //点击菜单项之后隐藏鼠标右键选项
                this.currentMenu = ''
            },
            //鼠标右键撤销
            Undo() {
                // console.log('cexiao')
                // debugger
                if (this.step >= 0) {
                    this.step--;
                    this.globaldata = this.canvasHistory[this.step];
                    // this.$props.data = this.globaldata
                    // this.graph.data(this.$props.data);
                    this.graph.render();
                }
                //点击菜单项之后隐藏鼠标右键选项
                this.currentMenu = ''
            },
            //鼠标右键重做
            Redo() {
                if (this.step < this.canvasHistory.length - 1) {
                    this.step++;
                    this.globaldata = this.canvasHistory[this.step];
                    // this.$props.data = this.globaldata
                    // this.graph.data(this.$props.data);
                    this.graph.render();
                }
                //点击菜单项之后隐藏鼠标右键选项
                this.currentMenu = ''
            },
            //鼠标右键组合
            group() {

            },
            //鼠标右键取消组合
            ungroup() {

            },
        }
    }
</script>

<style scoped lang="less">

</style>

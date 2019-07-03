<template>
    <div id="editor"></div>
</template>

<script>
    export default {
        name: "attributes",
        data(){
            return{
                currentType:'graph',
                currentMenu:'',
                infoTitle: '画布',//属性标题
                lineValue:'',
                Line:[{
                    value: 'line',
                    label: '直线'
                }, {
                    value: 'cubic',
                    label: '三阶赛贝尔曲线'
                },{
                    value: 'quadratic',
                    label: '二阶赛贝尔曲线'
                },{
                    value: 'flow-line',
                    label: '箭头折线'
                }],
                shapeValue: '',
                Shape:[{
                    value: 'myCircle',
                    label: '起始节点'
                }, {
                    value: 'juxing',
                    label: '常规结点'
                },{
                    value: 'diamond',
                    label: '分叉结点'
                },{
                    value: 'ellipse',
                    label: '模型节点'
                }],
                zoomRatio:100,
                nodeName:null,
                nodeWidth: null,
                nodeHeight: null,
                nodeColor:null,
                edgeId: null,
                edgeName: null,
                gridCheck: true,
            }
        },
        watch: {
            gridCheck(newValue) {
                if (newValue) {
                    document.getElementById('content').style.background =''
                } else {
                    document.getElementById('content').style.background = '#f7f9fb'
                }
            },
            edgeName(newValue) {
                if (newValue === null) return
                var item = this.graph.findById( this.edgeId)
                this.graph.update( item, {
                    label:  newValue
                })
            },
            lineValue(newValue){
                if (newValue === null) return
                var item = this.graph.findById(this.edgeId)
                this.graph.update( item, {
                    shape: newValue
                })
                this.graph.refreshItem(item)
            },
            nodeName(newValue){
                if (newValue === null) return
                var item = this.graph.findById( this.currentItemId)
                this.graph.update( item, {
                        label:  newValue
                })
            },
            nodeWidth(newValue){
                if (newValue === null) return
                // debugger
                var item = this.graph.findById( this.currentItemId)
                //当shape是myCircle时，高等于宽
                if(item._cfg.currentShape == "myCircle"){
                    this.nodeHeight = newValue
                }
                this.graph.update( item, {
                    size: [newValue,this.nodeHeight]
                })
                this.graph.refreshItem(item);
            },
            nodeHeight(newValue){
                if (newValue === null) return
                var item = this.graph.findById( this.currentItemId)
                //当shape是myCircle时，高等于宽
                if(item._cfg.currentShape == "myCircle"){
                    this.nodeWidth = newValue
                }
                this.graph.update( item, {
                    size: [this.nodeWidth,newValue]
                })
                this.graph.refreshItem(item);
            },
            nodeColor(newValue){
                if (newValue === null) return
                var item = this.graph.findById( this.currentItemId)
                this.graph.update( item, {
                    style:{
                            fill:newValue,
                            stroke:newValue
                    }
                })
            },
            shapeValue(newValue){
                if (newValue === null) return
                var item = this.graph.findById( this.currentItemId)
                this.graph.update( item, {
                        shape: newValue
                })
                this.graph.refreshItem(item)
            },
            zoomRatio(newValue){

            },
        },
        methods:{
            /**
             * @description: 读取文件
             */
            readFile() {
                var tmp1;//数据文件存这里
                var input=document.getElementById("readFile");
                var that = this
                input.onchange=function () {
                    var file = this.files[0];
                    if(!!file){
                        var reader=new FileReader();
                        reader.readAsText(file,"UTF-8");//UTF-8编码
                        reader.onload=function () {
                            tmp1=this.result;
                            that.$emit("sendJson",this.result)
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
        }
    }
</script>

<style scoped>

</style>
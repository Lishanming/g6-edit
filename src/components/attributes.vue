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
                shapeValue: '',
                Shape:[{
                    value: 'myCircle',
                    label: 'circle'
                }, {
                    value: 'juxing',
                    label: 'rect'
                },{
                    value: 'diamond',
                    label: 'diamond'
                },{
                    value: 'ellipse',
                    label: 'ellipse'
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
                var item = this.graph.findById( this.graph.edge._cfg.id)
                this.graph.update( item, {
                    label:  newValue
                })
            },
            nodeName(newValue){
                if (newValue === null) return
                var item = this.graph.findById( this.graph._cfg.nodes[0]._cfg.id)
                this.graph.update( item, {
                    label:  newValue
                })
            },
            nodeWidth(newValue){
                if (newValue === null) return
                // debugger
                var item = this.graph.findById( this.graph._cfg.nodes[0]._cfg.id)
                this.graph.update( item, {
                    size: `${newValue}*${this.nodeHeight}`
                })
            },
            nodeHeight(newValue){
                if (newValue === null) return
                var item = this.graph.findById( this.graph._cfg.nodes[0]._cfg.id)
                this.graph.update( item, {
                    size: `${this.nodeWidth}*${newValue}`
                })
            },
            nodeColor(newValue){
                if (newValue === null) return
                debugger
                var item = this.graph.findById( this.graph._cfg.nodes[0]._cfg.id)
                this.graph.update( item, {
                    styles:{
                        default:{
                            fill:newValue,
                            stroke:newValue
                        }
                    }
                    // color: newValue
                })
            },
            shapeValue(newValue){
                if (newValue === null) return
                var item = this.graph.findById( this.graph._cfg.nodes[0]._cfg.id)
                this.graph.update( item, {
                    shape: newValue
                })
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
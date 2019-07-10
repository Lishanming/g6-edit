<template>
    <div></div>
    <!--<div id="toolPannel" class="toolPannel">-->
        <!--<i class="command iconfont icon-undo" title="撤销" @click="Undo"></i>-->
        <!--<i class="command iconfont icon-redo" title="重做" @click="Redo"></i>-->
        <!--<span class="separator"></span>-->
        <!--<i class="command iconfont icon-toback" title="底层" @click="toback"></i>-->
        <!--<i class="command iconfont icon-tofront" title="顶层" @click="tofront"></i>-->
        <!--<span class="separator"></span>-->
        <!--<i class="command iconfont icon-zoom-out" title="缩小" @click="zoomOut"></i>-->
        <!--<i class="command iconfont icon-zoom-in" title="放大" @click="zoomIn"></i>-->
        <!--<span class="separator"></span>-->
        <!--<i class="command iconfont icon-adaption" title="适应画布" @click="autoZoom"></i>-->
        <!--<i class="command iconfont icon-realsize" title="实际尺寸" @click="realZoom"></i>-->
<!--&lt;!&ndash;        <span class="separator"></span>&ndash;&gt;-->
<!--&lt;!&ndash;        <i class="command iconfont icon-multiSelect" title="多选" @click="MulitSelect"></i>&ndash;&gt;-->
<!--&lt;!&ndash;        <i class="command iconfont icon-group disable" title="组合" @click="group"></i>&ndash;&gt;-->
<!--&lt;!&ndash;        <i class="command iconfont icon-ungroup disable" title="解组" @click="ungroup" ></i>&ndash;&gt;-->
    <!--</div>-->
</template>

<script>
    export default {
        name: "tool-pannel",
        data(){
            return{
            }
        },
        methods:{
            //底部
            toback(){
                console.log(this)
                //需要先点击节点，获取到currentItemId才能置顶
                this.graph.findById(this.currentItemId).toback()
                // item.toback()
            },
            //置顶
            tofront(){
                console.log(this)
                // item.toFront()
            },

            //缩小
            zoomOut(){
               console.log( this.graph.getZoom())
                // debugger
                if(this.zoomRatio <50){
                    return
                }else{
                    // let zoom = this.$parent.graph.getZoom()
                    this.zoomRatio -= 10
                    this.graph.zoom(this.zoomRatio/100,{x:750,y:450})
                }
            },
            //放大
            zoomIn(){
                console.log( this.graph.getZoom())
                // debugger
                if(this.zoomRatio >200){
                    return
                }else{
                    // let zoom = this.$parent.graph.getZoom()
                    this.zoomRatio += 10
                    this.graph.zoom(this.zoomRatio/100,{x:750,y:450})
                }

            },
            //自适应屏幕
            autoZoom(){
                this.graph.fitView(20)
            },
            //实际尺寸
            realZoom(){
                // debugger
                this.zoomRatio =100
                this.graph.zoom(this.zoomRatio/100,{x:750,y:450})
            },
            //多选
            MulitSelect(){

            },
            //组合
            group(){

            },
            //取消组合
            ungroup(){

            },

        }
    }
</script>

<style scoped lang="less">

</style>

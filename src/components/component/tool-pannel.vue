<template>
    <div id="toolPannel" class="toolPannel">
        <i class="command iconfont icon-undo" title="撤销" @click="Undo"></i>
        <i class="command iconfont icon-redo" title="重做" @click="Redo"></i>
        <span class="separator"></span>
        <i class="command iconfont icon-toback" title="底层" @click="toback"></i>
        <i class="command iconfont icon-tofront" title="顶层" @click="tofront"></i>
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
</template>

<script>
    export default {
        name: "tool-pannel",
        data(){
            return{
            }
        },
        props:{
            graph:Object
        },
        methods:{
            //撤销
            Undo(){

            },
            //返回
            Redo(){

            },
            //底部
            toback(){
                console.log(this)
                // this.graph.toback()
            },
            //置顶
            tofront(){
                console.log(this)
                // this.graph.toFront()
            },
            //缩小
            zoomOut(){
               console.log( this.$parent.graph.getZoom())
                if(this.$parent.graph.getZoom() <0.5){
                    let zoom = this.$parent.graph.getZoom()
                    zoom -= 0.1
                    this.$parent.graph.zoom(zoom)
                }
            },
            //放大
            zoomIn(){
                console.log( this.$parent.graph.getZoom())
                if(this.$parent.graph.getZoom() >2){
                    return
                }else{
                    let zoom = this.$parent.graph.getZoom()
                    zoom += 0.1
                    this.$parent.graph.zoom(zoom)
                }

            },
            //自适应屏幕
            autoZoom(){
                this.$parent.graph.fitView(20)
            },
            //实际尺寸
            realZoom(){
                this.$parent.graph.zoom(1)
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
</style>
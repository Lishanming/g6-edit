<template>
    <div class="left-bar" @mousedown="selectNode" id="leftbar">
                <img
                    draggable="false"
                    src="https://gw.alipayobjects.com/zos/rmsportal/ZnPxbVjKYADMYxkTQXRi.svg"
                    data-type="node"
                    data-shape="yuan"
                    data-size="72*72"
                    data-color="#FA8C16"
                    data-label="起止节点"
                    class="getItem" >
                <img
                    draggable="false"
                    src="https://gw.alipayobjects.com/zos/rmsportal/wHcJakkCXDrUUlNkNzSy.svg"
                    data-type="node"
                    data-shape="juxing"
                    data-size="80*48"
                    data-color="#1890FF"
                    data-label="常规节点"
                    class="getItem" >
                <img
                    draggable="false"
                    src="https://gw.alipayobjects.com/zos/rmsportal/SnWIktArriZRWdGCnGfK.svg"
                    data-type="node"
                    data-shape="diamond"
                    data-size="80*72"
                    data-color="#13C2C2"
                    data-label="分叉节点"
                    class="getItem" >
                <img
                    draggable="false"
                    src="https://gw.alipayobjects.com/zos/rmsportal/rQMUhHHSqwYsPwjXxcfP.svg"
                    data-type="node"
                    data-shape="ellipse"
                    data-size="80*48"
                    data-color="#722ED1"
                    data-label="模型节点"
                    class="getItem" >
                <img
                    v-for ='item in nodesData.nodes'
                    :key="item.id"
                    draggable="false"
                    :src="item.url"
                    :data-type="item.type"
                    :data-kind ="item.kind"
                    :data-shape="item.shape"
                     data-size="60*36"
                    :data-color="item.color"
                    :data-label="item.label"
                    class="getItem" >
            </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props:{
        nodesData:Object
    },
    methods:{
        selectNode(ev){
            // console.log(ev);
            if (ev.target.tagName == 'IMG') {
                this.$emit('mousedown',ev)
            }else {
                ev.stopPropagation()
            }
    }
    }
}
</script>
<style lang="scss" scoped>
.left-bar {
    img {
        width: 92px;
        height: 96px;
        padding: 4px;
        margin-left: 4px;
        border-radius: 2px;
        user-select: none;
        border: 1px solid rgba(0, 0, 0, 0);
        &:hover {
            cursor: move;
            border: 1px solid #ccc;
        }
    }
}
</style>



<template>
    <div class="contextmenu" id="contextmenu" style="position: absolute; z-index: 2;">
        <!--节点选中，鼠标右键-->
        <div data-status="node-selected" v-show="this.currentType == 'node'" class="menu" >
            <div data-command="copy" class="command ">
                <span>复制</span>
                <!-- <span>copy</span> -->
            </div>
            <div data-command="delete" class="command ">
                <span>删除</span>
                <!-- <span>delete</span> -->
            </div>
        </div>
        <!--边选中，鼠标右键-->
        <div data-status="edge-selected" v-show="this.currentType == 'edge'" class="menu" >
            <div data-command="delete" class="command ">
                <span>删除</span>
                <!-- <span>delete</span> -->
            </div>
        </div>
        <!--组选中，鼠标右键-->
        <div data-status="group-selected" v-show="this.currentType == 'group'" class="menu" >
            <div data-command="copy" class="command ">
                <span>复制</span>
                <!-- <span>copy</span> -->
            </div>
            <div data-command="delete" class="command ">
                <span>删除</span>
                <!-- <span>delete</span> -->
            </div>
            <div data-command="unGroup" class="command">
                <span>解组</span>
                <!-- <span>unGroup</span> -->
            </div>
        </div>
        <!--画布选中，鼠标右键-->
        <div data-status="canvas-selected" v-show="this.currentType == 'graph'" class="menu" >
            <div data-command="undo" class="command ">
                <span>撤销</span>
                <!-- <span>undo</span> -->
            </div>
            <div data-command="redo" class="command ">
                <span>重做</span>
                <!-- <span>redo</span> -->
            </div>
            <div data-command="pasteHere" class="command">
                <span>粘贴</span>
                <!-- <span>pasteHere</span> -->
            </div>
        </div>
        <!--多选选中，鼠标右键-->
        <div data-status="multi-selected"  v-show="this.currentType == 'multi'" class="menu" >
            <div data-command="copy" class="command ">
                <span>复制</span>
                <!-- <span>copy</span> -->
            </div>
            <div data-command="paste" class="command ">
                <span>粘贴</span>
                <!-- <span>paste</span> -->
            </div>
            <div data-command="addGroup" class="command ">
                <span>归组</span>
                <!--              <span>addGroup</span>-->
            </div>
            <div data-command="delete" class="command ">
                <span>删除</span>
                <!-- <span>delete</span> -->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "context-menu"
    }
</script>

<style scoped lang="less">
    .contextmenu {
        margin: 0px;
        width: 150px;
        background: white;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
        color: #000;
        font-size: 12px;
        display: none;

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

</style>
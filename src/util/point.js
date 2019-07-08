export function getAssistPoint(point,anchor,gap=10) {
    switch (anchor) {
        case 0:
            return {x:point.x,y:point.y-gap}
            break;
        case 1:
            return {x:point.x+gap,y:point.y}
            break;
        case 2:
            return {x:point.x,y:point.y+gap}
            break;
        case 3:
            return {x:point.x-gap,y:point.y}
            break;
        default:
            break;
    }
}

//获取1折线的控制点,这里有个模型，起点辅助点和终点辅助点做对角线形成的区域记作A，把A做X，Y轴的移动，如果能完全覆盖节点，则记作X淹没，Y淹没，无法淹没记作O
//比如：起始-终点-折线走向   => O-Y-Y
//接着我们再把相对位置分成4个象限，通过分析（其实就是把所有情况写了一边，尴尬。。。），会得出一个规律
//终点淹没类型不为O，则折线走向与终点淹没类型相同
//终点淹没类型为O，如果起点淹没类型有值，则折线走向与起点淹没类型互斥（x-y记作互斥）
//如果起点，终点的淹没类型都是O，则表示折线走向（X|Y）都可以，这个需要进一步判断出最优的路线
export function getOneBrokenPoint(sourcePoint,targetPoint,sourceBox,targetBox) {
    let startFloodType = getFloodType(sourcePoint,targetPoint,sourceBox)
    let targetFloodType = getFloodType(sourcePoint,targetPoint,targetBox)
    let flowLineLoads = {
        X:{
            x:sourcePoint.x,
            y:targetPoint.y
        },
        Y:{
            x:targetPoint.x,
            y:sourcePoint.y
        }
    }
    if (targetFloodType !='O') {
        return flowLineLoads[targetFloodType]
    }else {
        if (startFloodType !='O') {
            return startFloodType=='X'?flowLineLoads.Y:flowLineLoads.X
        }else {
            //此处暂时默认选择X走向，后面优化
            return flowLineLoads.X
        }
    }       
}

//获取2折线的控制点
export function getTwoBrokenPoint(sourcePoint,targetPoint,sourceBox,targetBox) {
    if (sourcePoint.x == sourceBox.centerX) {
        //Y轴走向
        let x = (sourceBox.centerX+targetBox.centerX)/2
        return [
            {x:x,y:sourcePoint.y},
            {x:x,y:targetPoint.y}
        ]
    }else {
        //X轴走向
        let y = (sourceBox.centerY+targetBox.centerY)/2
        return [
            {x:sourcePoint.x,y:y},
            {x:targetPoint.x,y:y}
        ]
    }
    // if (isBetween(sourcePoint.x,targetPoint.x,targetBox.centerX) ) {
    //     //X轴走向
    //     let y = (sourcePoint.y+targetPoint.y)/2
    //     return [
    //         {x:sourcePoint.x,y:y},
    //         {x:targetPoint.x,y:y}
    //     ]
    // }else {
    //     //Y轴走向
    //     let x = (sourcePoint.x+targetPoint.x)/2
    //     return [
    //         {x:x,y:sourcePoint.y},
    //         {x:x,y:targetPoint.y}
    //     ]
    // }
    
}
//判断数字c 是否在a,b之间
function isBetween(a,b,c) {
    if (a<c && c<b) {
        return true
    }else {
        return false
    }
}
//判断两个盒子是否在各自的延长线上相交
export function isCover(sourceBBox,targetBBox) {
    if (isBetween(sourceBBox.x,sourceBBox.x+sourceBBox.width,targetBBox.x) || isBetween(sourceBBox.y,sourceBBox.y+sourceBBox.height,targetBBox.y)) {
        return true
    }else {
        return false
    }
}

//这个算法有点问题，存在 3，6，6的情况，也就是min，max判断不准确
export function getFloodType(sourceAssistPoint,targetAssistPoint,sourceBBox) {
    let {x,y,width,height} = sourceBBox
    let startX = Math.min(sourceAssistPoint.x,targetAssistPoint.x)
    let ednX = Math.max(sourceAssistPoint.x,targetAssistPoint.x)
    let startY = Math.min(sourceAssistPoint.y,targetAssistPoint.y)
    let ednY = Math.max(sourceAssistPoint.y,targetAssistPoint.y)

    if (startX<x && x+width< ednX) {
        return 'Y'
    }
    if (startY<y && y+height< ednY) {
        return 'X'
    }
    // return {} // {}=={} false
    return 'O'
}

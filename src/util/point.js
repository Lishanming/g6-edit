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

//获取1折线的控制点
export function getOneBrokenPoint(sourcePoint,targetPoint,sourceBox,targetBox) {
    if (isBetween(sourcePoint.x,targetPoint.x,targetBox.centerX)) {
            //Y轴走向
            return {
                x:targetPoint.x,
                y:sourcePoint.y
            }
        }else {
            //X轴走向
            return {
                x:sourcePoint.x,
                y:targetPoint.y
            }
        }        
}

//获取2折线的控制点
export function getTwoBrokenPoint(sourcePoint,targetPoint,sourceBox,targetBox) {
    let sourceLeftRight = 'left'
    let targetLeftRight = 'left'
    if (sourcePoint.x < sourceBox.x) {
        sourceLeftRight = 'right'
    }
    if (sourcePoint.x < targetBox.x) {
        targetLeftRight = 'right'
    }
    if (sourceLeftRight == targetLeftRight ) {
        //Y轴走向
        let y = (sourcePoint.y+targetPoint.y)/2
        return [
            {x:sourcePoint.x,y:y},
            {x:targetPoint.x,y:y}
        ]
    }else {
        //X轴走向
        let x = (sourcePoint.x+targetPoint.x)/2
        return [
            {x:x,y:sourcePoint.y},
            {x:x,y:targetPoint.y}
        ]
    }
    
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
    return {} // {}=={} false
}

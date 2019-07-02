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
export function getBrokenPoint(source,target) {
    let x = (source.x+target.x)/2
    let y = (source.y+target.y)/2
    return [
        {x:x,y:source.y},
        {x:x,y:target.y}
    ]
}
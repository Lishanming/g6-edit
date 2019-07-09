export function setAnchorActive(graph,isActive){
    const connectibleNodes = graph.findAll('node', node => {
        return node.getModel().id != graph.sourceNode.id
    });
    connectibleNodes.forEach(node => {
        graph.setItemState(node, 'anthorActive', isActive)
    });
}
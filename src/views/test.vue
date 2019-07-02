<template>
  <div id="app">
	  <div class="left-bar">
		  <img
                    src="https://gw.alipayobjects.com/zos/rmsportal/ZnPxbVjKYADMYxkTQXRi.svg"
                    data-type="node"
                    data-shape="flow-circle"
                    data-size="72*72"
                    data-color="#FA8C16"
                    data-label="起止节点"
                    class="getItem" >
	  </div>
	  <div class="center">
      	<div id="mountNode"></div>
	  </div>
	  <div class="right-bar"></div>
	  
  </div>
</template>

<script>
const G6 = require('@antv/g6')
const Grid = require('@antv/g6/build/grid')

export default {
  name: 'app',
  data(){
      return {
          gData:{
            nodes: [{
                id: 'node1',
                shape:'rect',
                x: 100,
				y: 300,
                anchorPoints: [
                    [1, 0.5, {type: 'circle', style: {stroke: 'red', fill: 'white'}}]
                ],
            },{
                id: 'node2',
                shape:'rect',
                anchorPoints: [
                    [0, 0.5, {type: 'rect', style: {stroke: 'blue', fill: 'white'}}]
                ],
                x: 300,
                y: 199
            },
            {
                id: 'node3',
                x: 500,
                y: 200
            }
            ],
            edges: [{
                shape:'dash-line',
                source: 'node1',
                sourceAnchor:0,
                target: 'node2',
                targetAnchor:0,
                style:{
                    stroke:'red',
                    lineDash: [4, 4]
                }
            }]
		},
		graph:null
      }
  },
	components: {
	},
    mounted() {
		const gridPlugin = new Grid();
        console.log(Grid)
        // G6.Global.defaultEdge.style = {
        //     endArrow: true
        // };
      	this.graph = new G6.Graph({
			plugins: [ gridPlugin ],
			container: 'mountNode',
			width: 1500,
			height: 500,
			modes: {
				default: ['click-select','zoom-canvas','drag-canvas','drag-node'],
				drag: ['drag-node','drag-canvas']
			}
        })
        // G6.registerEdge('flow-line',{
        //      afterDraw(cfg, group) {
        //         debugger;
        //         console.log(group._cfg.item.styles ={});
        //         group._cfg.item.styles ={
        //             stroke:'red'
        //         }
        //         const shape = group.get('children')[0];
        //      }
        // },'ployline')
        // 直线, 不支持控制点
        G6.registerEdge('dash-line', {
            // 控制点不生效
            getControlPoints(cfg) {
                console.log(cfg);
                let { startPoint, endPoint } = cfg
                return [{
                    x:startPoint.x,
                    y:endPoint.y
                }];
            }
        }, 'polyline');
        G6.registerEdge('line-arrow', {
            draw(cfg, group) {
                const { startPoint, endPoint } = cfg
                let _d  = 0
                if (startPoint.y > endPoint.y) {
                    _d=-5
                }else {
                    _d=5
                }
                
                const keyShape = group.addShape('path', {
                attrs: {
                    path: [
                        [ 'M', startPoint.x, startPoint.y ],
                        [ 'L', endPoint.x, endPoint.y ]
                    ],
                    stroke: '#AAB7C4',
                    lineWidth: 1,
                    // startArrow: {
                    //     path: 'M 10,0 L -10,-10 L -10,10 Z',
                    //     d: 10
                    // },
                    endArrow: {
                       path:'M 5,0 L -5,-5 L -5,5 Z',
                       d:_d
                   }
                }
                });
                return keyShape
            }
        })
        // G6.registerEdge('line-arrow', {
        //     draw(cfg, group) {
        //         const { startPoint, endPoint } = cfg
        //         const keyShape = group.addShape('path', {
        //         attrs: {
        //             path: [
        //             [ 'M', startPoint.x, startPoint.y ],
        //             [ 'L', endPoint.x, endPoint.y ]
        //             ],
        //             stroke: '#00F',
        //             lineWidth: 1,
        //             // startArrow: {
        //             //     path: 'M 10,0 L -10,-10 L -10,10 Z',
        //             // d: -10
        //             // },
        //             endArrow: {
        //                 path: 'M 10,0 L -10,-10 L -10,10 Z',
        //             d: -10
        //             }
        //         }
        //         });
        //         return keyShape
        //     }
        // })
		this.graph.data(this.gData)
		this.graph.render()
  }
}
</script>

<style lang="scss" scoped>
#app {
	position: relative;
	height: 100%;
	.left-bar {
		position: absolute;
		top: 0px;
		bottom: 0px;
		left: 0px;
		width: 200px;
		border-right: 1px solid #dddddd;
	}
	.center {
		height: 100%;
		margin-left: 200px;
		margin-right: 200px;
	}
	.right-bar {
		position: absolute;
		top: 0px;
		bottom: 0px;
		right: 0px;
		width: 200px;
		border-left: 1px solid #dddddd;
	}
}
</style>

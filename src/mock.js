//引入mockjs
import Mock from 'mockjs';
//使用mockjs模拟数据
//
Mock.mock('/api/Config', 'post', () => {
    return {
        code: 1,
        nodesInfo: {
            rect: [
                {"nodeId": "123"},
                {"label": "名称", "type": "select"},
                {"label": "边宽", "type": "input"}
            ],
            myCircle: [
                {"nodeId": "234"},
                {"label": "名称", "type": "input"},
                {"label": "边宽", "type": "input"}
            ]
        },

    }

});
Mock.mock('/api/initNodes', 'post', () => {
    return {
        code: 1,
        nodes: [
            {
                id: 12323,
                url: 'http://img5.imgtn.bdimg.com/it/u=2218987731,82806086&fm=15&gp=0.jpg',
                type: 'node',
                shape: 'image',
                color: '#fffff',
                label: '123'
            },
            {
                id: 1233,
                url: 'http://img3.imgtn.bdimg.com/it/u=575311241,2568233008&fm=15&gp=0.jpg',
                type: 'node',
                shape: 'image',
                color: '#fffff',
                label: '234'
            }  ,
            {
                id: 56456,
                url: 'http://n1.itc.cn/img8/wb/recom/2016/11/27/148026039490846603.PNG',
                type: 'node',
                shape: 'image',
                color: '#fffff',
                label: '234'
            }
        ]
    }
});

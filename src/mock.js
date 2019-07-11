//引入mockjs
import Mock from 'mockjs';
//使用mockjs模拟数据
//
Mock.mock('/api/Config', 'post', () => {
    return {
        code:1,
        node1:[
            {"nodeId":"123"},
            {"label":"名称","type":"input"},
            {"label":"边宽","type":"input"}
        ],
        node2:[
            {"nodeId":"234"},
            {"label":"名称","type":"input"},
            {"label":"边宽","type":"input"}
        ]
    }
});
Mock.mock('/api/initNodes', 'post', () => {
    return {
        code:1,

    }
});

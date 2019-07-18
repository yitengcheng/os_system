<template>
  <div class>
    <v-chart :options="option" />
  </div>
</template>

<script>
export default {
    components: {},
    data () {
        return {
            option: {
                title: {
                    text: '职员', // 标题
                    x: 'center',
                    textStyle: {
                        fontSize: 18
                    }
                },
                backgroundColor: '#fff',
                series: [
                    {
                        name: '职员', // 数据提示窗标题
                        type: 'wordCloud',
                        sizeRange: [20, 66], // 画布范围，如果设置太大会出现少词（溢出屏幕）
                        rotationRange: [-45, 90], // 数据翻转范围
                        textPadding: 0,
                        autoSize: {
                            enable: true,
                            minSize: 6
                        },
                        textStyle: {
                            normal: {
                                color: function () {
                                    return (
                                        'rgb(' +
                    [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                    ].join(',') +
                    ')'
                                    );
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        data: [
                            {
                                name: '蒋六桃',
                                value: 400
                            },
                            {
                                name: '龚飞',
                                value: 400
                            },
                            {
                                name: '洪春宝',
                                value: 400
                            },
                            {
                                name: '田东玉',
                                value: 380
                            },
                            {
                                name: '胡海涛',
                                value: 350
                            },
                            {
                                name: '丁雪',
                                value: 350
                            },
                            {
                                name: '陈敏',
                                value: 340
                            },
                            {
                                name: '丁兰',
                                value: 340
                            },
                            {
                                name: '杨海峰',
                                value: 330
                            },
                            {
                                name: '孙光洪',
                                value: 330
                            },
                            {
                                name: '曹永胜',
                                value: 330
                            },
                            {
                                name: '赵紫方',
                                value: 330
                            },
                            {
                                name: '刘万平',
                                value: 330
                            },
                            {
                                name: '涂强',
                                value: 330
                            },
                            {
                                name: '游宇',
                                value: 330
                            },
                            {
                                name: '张翔',
                                value: 330
                            },
                            {
                                name: '胡宝聚',
                                value: 330
                            },
                            {
                                name: '邓平亮',
                                value: 330
                            },
                            {
                                name: '罗文雯',
                                value: 330
                            },
                            {
                                name: '李兴龙',
                                value: 330
                            },
                            {
                                name: '陈瑞南',
                                value: 330
                            },
                            {
                                name: '李宏辉',
                                value: 330
                            },
                            {
                                name: '范泽华',
                                value: 330
                            },
                            {
                                name: '张著松',
                                value: 330
                            },
                            {
                                name: '王进',
                                value: 330
                            },
                            {
                                name: '洪智鑫',
                                value: 330
                            },
                            {
                                name: '陈德沁',
                                value: 330
                            },
                            {
                                name: '田锦霜',
                                value: 330
                            },
                            {
                                name: '汤玉喜',
                                value: 330
                            },
                            {
                                name: '林桂兰',
                                value: 330
                            },
                            {
                                name: '罗云',
                                value: 330
                            },
                            {
                                name: '何其粤',
                                value: 330
                            },
                            {
                                name: '陈昌林',
                                value: 330
                            }
                        ]
                    }
                ]
            }
        };
    },
    computed: {},
    methods: {}
};
</script>
<style lang='scss' scoped>
</style>

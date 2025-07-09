document.addEventListener('DOMContentLoaded', function() {
    // 共享样式配置
    const legendStyle = {
        textStyle: {
            color: '#fff',
            fontSize: 14,
            fontWeight: 'bold'
        },
        backgroundColor: 'rgba(30, 35, 50, 0.8)',
        padding: [8, 15],
        borderRadius: 8,
        borderWidth: 0,
        itemGap: 15
    };
    
    const axisLabelStyle = {
        textStyle: {
            color: '#e2e8f0',
            fontSize: 12
        }
    };
    
    const axisNameStyle = {
        nameTextStyle: {
            color: '#a0aec0',
            fontSize: 14
        }
    };
    
    const gridStyle = {
        top: 60,
        bottom: 60,
        left: 70,
        right: 70,
        containLabel: true
    };
    
    const tooltipStyle = {
        backgroundColor: 'rgba(30, 35, 50, 0.9)',
        borderColor: '#4e54c8',
        textStyle: {
            color: '#fff',
            fontSize: 14
        }
    };

    // 分区分析图表
    const partitionChart = echarts.init(document.getElementById('partition-chart'));
    partitionChart.setOption({
        title: { 
            text: "视频分区分布分析",
            textStyle: {
                color: '#fff',
                fontSize: 18
            }
        },
        tooltip: tooltipStyle,
        legend: {
            ...legendStyle,
            data: ["视频数量", "平均播放量(万)", "平均时长(分钟)"],
            top: 30
        },
        grid: gridStyle,
        xAxis: {
            type: "category",
            data: ["GMV", "MAD·AMV", "三农", "人文历史", "仿妆cos", "出行", "动物二创", "单机游戏", "同人·手书", "喵星人", "国产原创相关", "家居房产", "小剧场", "影视剪辑", "手工", "手机游戏", "搞笑", "数码", "日常", "极客DIY", "汽车生活", "电子竞技", "短片", "社科·法律·心理", "科学科普", "穿搭", "绘画", "综合", "综艺", "网络游戏", "美食侦探", "美食制作", "美食记录", "音乐综合", "鬼畜剧场", "鬼畜调教"],
            axisLabel: { 
                rotate: 45,
                ...axisLabelStyle
            },
            axisLine: {
                lineStyle: {
                    color: '#4a5568'
                }
            }
        },
        yAxis: [
            { 
                type: "value", 
                name: "数量",
                ...axisNameStyle,
                axisLabel: axisLabelStyle,
                splitLine: {
                    lineStyle: {
                        color: 'rgba(74, 85, 104, 0.5)'
                    }
                }
            },
            { 
                type: "value", 
                name: "播放量/时长",
                max: 6030284.399999999,
                ...axisNameStyle,
                axisLabel: axisLabelStyle,
                splitLine: {
                    show: false
                }
            }
        ],
        series: [
            { 
                name: "视频数量", 
                type: "bar", 
                barWidth: 20,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#4e54c8' },
                        { offset: 1, color: '#8f94fb' }
                    ])
                },
                data: [2, 1, 1, 3, 2, 1, 1, 4, 12, 2, 2, 2, 2, 1, 1, 14, 10, 1, 5, 2, 1, 1, 1, 1, 3, 1, 1, 1, 1, 7, 4, 3, 2, 1, 1, 2] 
            },
            { 
                name: "平均播放量(万)", 
                type: "line", 
                yAxisIndex: 1,
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: {
                    width: 3,
                    color: '#48bb78'
                },
                itemStyle: {
                    color: '#48bb78',
                    borderColor: '#fff',
                    borderWidth: 2
                },
                data: [64.9, 194.6, 135.9, 158.0, 111.7, 81.8, 502.5, 145.8, 166.8, 269.1, 220.4, 294.6, 279.2, 159.0, 98.7, 168.5, 240.2, 298.5, 182.1, 238.5, 149.7, 111.4, 113.3, 129.1, 86.3, 131.6, 63.7, 78.6, 121.0, 143.2, 163.7, 245.6, 140.8, 54.8, 242.8, 228.4] 
            },
            { 
                name: "平均时长(分钟)", 
                type: "line", 
                yAxisIndex: 1,
                symbol: 'diamond',
                symbolSize: 10,
                lineStyle: {
                    width: 3,
                    color: '#f56565',
                    type: 'dashed'
                },
                itemStyle: {
                    color: '#f56565',
                    borderColor: '#fff',
                    borderWidth: 2
                },
                data: [2.6, 22.1, 2.9, 15.3, 3.3, 13.7, 4.1, 28.9, 23.2, 4.7, 10.3, 5.0, 4.6, 24.5, 13.0, 9.2, 3.0, 3.8, 4.6, 16.1, 15.8, 46.6, 4.4, 18.6, 10.9, 0.3, 0.3, 4.5, 42.4, 4.5, 7.0, 8.0, 2.3, 0.8, 1.8, 2.3] 
            }
        ]
    });
    
    // 时长互动图表
    const durationChart = echarts.init(document.getElementById('duration-chart'));
    durationChart.setOption({
        title: { 
            text: "视频时长与互动关系",
            textStyle: {
                color: '#fff',
                fontSize: 18
            }
        },
        tooltip: tooltipStyle,
        legend: {
            ...legendStyle,
            data: ["平均播放量", "平均点赞", "平均弹幕", "平均分享"],
            bottom: 10
        },
        grid: gridStyle,
        xAxis: {
            type: "category",
            data: ["<1", "1-3", "3-5", "5-10", "10-20", "20-60", ">60"],
            name: "视频时长(分钟)",
            ...axisNameStyle,
            axisLabel: axisLabelStyle,
            axisLine: {
                lineStyle: {
                    color: '#4a5568'
                }
            }
        },
        yAxis: { 
            type: "value", 
            name: "互动量",
            ...axisNameStyle,
            axisLabel: axisLabelStyle,
            splitLine: {
                lineStyle: {
                    color: 'rgba(74, 85, 104, 0.5)'
                }
            }
        },
        series: [
            { 
                name: "平均播放量", 
                type: "line", 
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: {
                    width: 3,
                    color: '#4e54c8'
                },
                itemStyle: {
                    color: '#4e54c8',
                    borderColor: '#fff',
                    borderWidth: 2
                },
                data: [161.0, 192.1, 171.8, 161.2, 189.9, 171.1, 238.7] 
            },
            { 
                name: "平均点赞", 
                type: "line", 
                smooth: true,
                symbol: 'rect',
                symbolSize: 8,
                lineStyle: {
                    width: 3,
                    color: '#48bb78'
                },
                itemStyle: {
                    color: '#48bb78',
                    borderColor: '#fff',
                    borderWidth: 2
                },
                data: [187.6, 169.1, 92.9, 106.4, 132.0, 63.3, 40.3] 
            },
            { 
                name: "平均弹幕", 
                type: "line", 
                smooth: true,
                symbol: 'triangle',
                symbolSize: 8,
                lineStyle: {
                    width: 3,
                    color: '#f56565'
                },
                itemStyle: {
                    color: '#f56565',
                    borderColor: '#fff',
                    borderWidth: 2
                },
                data: [5836.888888888889, 7490.0526315789475, 3405.964285714286, 3246.75, 18589.428571428572, 13485.272727272728, 2788.0] 
            },
            { 
                name: "平均分享", 
                type: "line", 
                smooth: true,
                symbol: 'diamond',
                symbolSize: 8,
                lineStyle: {
                    width: 3,
                    color: '#f6e05e',
                    type: 'dashed'
                },
                itemStyle: {
                    color: '#f6e05e',
                    borderColor: '#fff',
                    borderWidth: 2
                },
                data: [6757.666666666667, 14163.368421052632, 4895.892857142857, 5250.375, 13388.0, 2446.5454545454545, 1403.3333333333333] 
            }
        ]
    });
    
    // UP主分析图表
    const upownersChart = echarts.init(document.getElementById('upowners-chart'));
    upownersChart.setOption({
        title: { 
            text: "头部UP主影响力分析",
            subtext: "注：每个UP主仅有一个视频上榜，视频数量均为1",
            left: 'center',
            textStyle: {
                color: '#fff',
                fontSize: 18
            },
            subtextStyle: {
                color: '#a0aec0',
                fontSize: 14
            }
        },
        tooltip: tooltipStyle,
        legend: {
            ...legendStyle,
            data: ["总播放量(百万)", "影响力指数"],
            bottom: 10
        },
        grid: gridStyle,
        xAxis: {
            type: "category",
            data: ["崩坏星穹铁道", "饭爷看世界", "张小伙玩配音", "亮亮也是酿酿", "小狮日记", "侯绿萝", "红豆稀饭中", "小馒头的面食面艺", "slava_fox", "小泷动漫"],
            axisLabel: { 
                rotate: 45,
                interval: 0,
                ...axisLabelStyle
            },
            axisLine: {
                lineStyle: {
                    color: '#4a5568'
                }
            }
        },
        yAxis: [
            { 
                type: "value", 
                name: "播放量(百万)",
                ...axisNameStyle,
                min: 0,
                max: 6.5,
                axisLabel: axisLabelStyle,
                splitLine: {
                    lineStyle: {
                        color: 'rgba(74, 85, 104, 0.5)'
                    }
                }
            },
            { 
                type: "value", 
                name: "影响力指数",
                ...axisNameStyle,
                min: 0,
                max: 3,
                axisLabel: axisLabelStyle,
                splitLine: {
                    show: false
                }
            }
        ],
        series: [
            { 
                name: "总播放量(百万)", 
                type: "line", 
                symbol: 'circle',
                symbolSize: 10,
                lineStyle: {
                    width: 4,
                    color: '#8f94fb'
                },
                itemStyle: {
                    color: '#8f94fb',
                    borderColor: '#fff',
                    borderWidth: 2
                },
                data: [5.94, 5.03, 4.68, 4.43, 4.73, 4.22, 3.52, 3.5, 3.53, 3.09] 
            },
            { 
                name: "影响力指数", 
                type: "line", 
                yAxisIndex: 1,
                symbol: 'diamond',
                symbolSize: 12,
                lineStyle: {
                    width: 4,
                    color: '#48bb78',
                    type: 'dashed'
                },
                itemStyle: {
                    color: '#48bb78',
                    borderColor: '#fff',
                    borderWidth: 2
                },
                data: [2.53, 2.03, 1.96, 1.93, 1.91, 1.8, 1.56, 1.51, 1.5, 1.24] 
            }
        ]
    });
    
    // 发布时间分析图表
    const publishChart = echarts.init(document.getElementById('publish-chart'));
    publishChart.setOption({
        title: { 
            text: "视频发布时间分析",
            left: 'center',
            textStyle: {
                color: '#fff',
                fontSize: 18
            }
        },
        tooltip: tooltipStyle,
        grid: [
            { left: "10%", top: "12%", width: "45%", height: "35%" },
            { left: "55%", top: "12%", width: "45%", height: "35%" },
            { left: "10%", top: "57%", width: "45%", height: "35%" },
            { left: "55%", top: "57%", width: "45%", height: "35%" }
        ],
        legend: {
            ...legendStyle,
            data: ["每小时发布量", "每周发布量", "每小时平均播放量", "每周平均播放量"],
            top: 40
        },
        xAxis: [
            { 
                gridIndex: 0, 
                type: "category", 
                data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,15,16,18,22,23], 
                name: "发布时间(小时)",
                ...axisNameStyle,
                axisLabel: axisLabelStyle
            },
            { 
                gridIndex: 1, 
                type: "category", 
                data: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], 
                name: "星期",
                ...axisNameStyle,
                axisLabel: {
                    rotate: 45,
                    ...axisLabelStyle
                }
            },
            { 
                gridIndex: 2, 
                type: "category", 
                data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,15,16,18,22,23], 
                name: "发布时间(小时)",
                ...axisNameStyle,
                axisLabel: axisLabelStyle
            },
            { 
                gridIndex: 3, 
                type: "category", 
                data: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], 
                name: "星期",
                ...axisNameStyle,
                axisLabel: {
                    rotate: 45,
                    ...axisLabelStyle
                }
            }
        ],
        yAxis: [
            { 
                gridIndex: 0, 
                type: "value", 
                name: "视频数量",
                ...axisNameStyle,
                axisLabel: axisLabelStyle
            },
            { 
                gridIndex: 1, 
                type: "value", 
                name: "视频数量",
                ...axisNameStyle,
                axisLabel: axisLabelStyle
            },
            { 
                gridIndex: 2, 
                type: "value", 
                name: "平均播放量(万)",
                ...axisNameStyle,
                axisLabel: axisLabelStyle
            },
            { 
                gridIndex: 3, 
                type: "value", 
                name: "平均播放量(万)",
                ...axisNameStyle,
                axisLabel: axisLabelStyle
            }
        ],
        series: [
            { 
                name: "每小时发布量", 
                type: "bar", 
                xAxisIndex: 0, 
                yAxisIndex: 0,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#4e54c8' },
                        { offset: 1, color: '#8f94fb' }
                    ])
                },
                data: [4,2,4,8,9,6,2,1,5,25,13,9,5,2,1,1,1,1,1] 
            },
            { 
                name: "每周发布量", 
                type: "bar", 
                xAxisIndex: 1, 
                yAxisIndex: 1,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#48bb78' },
                        { offset: 1, color: '#9ae6b4' }
                    ])
                },
                data: [2.0,13.0,45.0,25.0,15.0,NaN,NaN] 
            },
            { 
                name: "每小时平均播放量", 
                type: "line", 
                xAxisIndex: 2, 
                yAxisIndex: 2, 
                smooth: true,
                symbol: 'circle',
                symbolSize: 6,
                lineStyle: {
                    width: 3,
                    color: '#f56565'
                },
                itemStyle: {
                    color: '#f56565',
                    borderColor: '#fff',
                    borderWidth: 2
                },
                data: [159.5,163.9,162.4,174.0,175.6,226.5,367.2,105.4,174.1,189.1,189.8,128.9,147.7,143.7,112.7,272.6,104.4,128.1,90.8] 
            },
            { 
                name: "每周平均播放量", 
                type: "line", 
                xAxisIndex: 3, 
                yAxisIndex: 3, 
                smooth: true,
                symbol: 'diamond',
                symbolSize: 8,
                lineStyle: {
                    width: 3,
                    color: '#f6e05e'
                },
                itemStyle: {
                    color: '#f6e05e',
                    borderColor: '#fff',
                    borderWidth: 2
                },
                data: [397.6,257.4,171.2,155.3,134.3,NaN,NaN] 
            }
        ]
    });
    
    // 互动相关性图表
    const correlationChart = echarts.init(document.getElementById('correlation-chart'));
    correlationChart.setOption({
        title: { 
            text: "视频互动指标相关性分析",
            textStyle: {
                color: '#fff',
                fontSize: 18
            }
        },
        tooltip: { 
            position: "top",
            ...tooltipStyle
        },
        grid: {
            height: "75%",
            top: "15%",
            bottom: "15%"
        },
        xAxis: {
            type: "category",
            data: ["播放量", "点赞", "弹幕", "收藏", "投币", "分享"],
            splitArea: { show: true },
            axisLabel: axisLabelStyle
        },
        yAxis: {
            type: "category",
            data: ["播放量", "点赞", "弹幕", "收藏", "投币", "分享"],
            splitArea: { show: true },
            axisLabel: axisLabelStyle
        },
        visualMap: {
            min: -1,
            max: 1,
            calculable: true,
            orient: "horizontal",
            left: "center",
            bottom: "5%",
            textStyle: {
                color: '#fff'
            },
            inRange: {
                color: ['#2c5282', '#4e54c8', '#8f94fb', '#f6e05e', '#f56565']
            }
        },
        series: [{
            name: "相关性",
            type: "heatmap",
            data: [
                [0,0,1.0], [1,0,0.45], [2,0,0.3], [3,0,0.36], [4,0,0.22], [5,0,0.37],
                [0,1,0.45], [1,1,1.0], [2,1,0.46], [3,1,0.09], [4,1,0.54], [5,1,0.61],
                [0,2,0.3], [1,2,0.46], [2,2,1.0], [3,2,0.31], [4,2,0.65], [5,2,0.56],
                [0,3,0.36], [1,3,0.09], [2,3,0.31], [3,3,1.0], [4,3,0.42], [5,3,0.39],
                [0,4,0.22], [1,4,0.54], [2,4,0.65], [3,4,0.42], [4,4,1.0], [5,4,0.55],
                [0,5,0.37], [1,5,0.61], [2,5,0.56], [3,5,0.39], [4,5,0.55], [5,5,1.0]
            ],
            label: { 
                show: true,
                color: '#fff',
                fontSize: 12,
                fontWeight: 'bold'
            },
            emphasis: { 
                itemStyle: { 
                    shadowBlur: 10, 
                    shadowColor: "rgba(0, 0, 0, 0.5)" 
                } 
            },
            itemStyle: { 
                borderRadius: 5 
            }
        }]
    });

    // 响应窗口大小变化
    window.addEventListener('resize', function() {
        partitionChart.resize();
        durationChart.resize();
        upownersChart.resize();
        publishChart.resize();
        correlationChart.resize();
    });

    // 导航栏点击效果
    const navItems = document.querySelectorAll('.nav-items li');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

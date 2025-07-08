// 异步加载 JSON 数据
fetch('bili_analysis_results.json')
  .then(response => response.json())
  .then(data => {
    // 初始化 ECharts 图表
    initPartitionChart(data.partition_analysis);
    initDurationChart(data.duration_interaction);
    initTopUpChart(data.top_up_owners);
    initPublishChart(data.publish_time_analysis);
    initCorrelationChart(data.interaction_correlation);
  })
  .catch(error => console.error('Error loading JSON data:', error));

// 初始化视频分区分布分析图表
function initPartitionChart(option) {
  const chart = echarts.init(document.getElementById('partition_chart'));
  chart.setOption(option);
}

// 初始化视频时长与互动关系图表
function initDurationChart(option) {
  const chart = echarts.init(document.getElementById('duration_chart'));
  chart.setOption(option);
}

// 初始化头部UP主影响力分析图表
function initTopUpChart(option) {
  const chart = echarts.init(document.getElementById('top_up_chart'));
  chart.setOption(option);
}

// 初始化视频发布时间分析图表
function initPublishChart(option) {
  const chart = echarts.init(document.getElementById('publish_chart'));
  chart.setOption(option);
}

// 初始化视频互动指标相关性分析图表
function initCorrelationChart(option) {
  const chart = echarts.init(document.getElementById('correlation_chart'));
  chart.setOption(option);
}

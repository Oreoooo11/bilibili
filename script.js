// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
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
      
      // 图表加载完成后显示内容
      document.querySelectorAll('.section').forEach(section => {
        section.classList.add('visible');
      });
    })
    .catch(error => console.error('Error loading JSON data:', error));

  // 导航菜单切换
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  
  // 点击导航链接后关闭菜单
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // 滚动效果
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');
    
    // 导航栏滚动效果
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
      backToTop.classList.add('visible');
    } else {
      navbar.classList.remove('scrolled');
      backToTop.classList.remove('visible');
    }
    
    // 滚动时显示元素
    document.querySelectorAll('.section').forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
        section.classList.add('visible');
      }
    });
    
    // 更新当前激活的导航链接
    document.querySelectorAll('section[id]').forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // 返回顶部按钮
  const backToTopButton = document.getElementById('backToTop');
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 初始化时触发一次滚动事件
  window.dispatchEvent(new Event('scroll'));
});

// 初始化视频分区分布分析图表
function initPartitionChart(option) {
  const chart = echarts.init(document.getElementById('partition_chart'));
  
  // 添加图表加载动画
  chart.showLoading({
    text: '加载中...',
    color: '#2563eb',
    textColor: '#333',
    maskColor: 'rgba(255, 255, 255, 0.7)',
    zlevel: 0
  });
  
  // 模拟加载延迟
  setTimeout(() => {
    chart.hideLoading();
    // 合并默认配置和数据
    const defaultOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#ddd',
        borderWidth: 1,
        textStyle: { color: '#333' },
        padding: 10,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
      },
      legend: {
        orient: 'vertical',
        left: 10,
        data: option.legend.data || [],
        textStyle: { color: '#64748b' },
        formatter: function(name) {
          return name.length > 6 ? name.substring(0, 6) + '...' : name;
        }
      },
      series: [
        {
          name: '分区',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 6,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true,
            length: 10,
            length2: 10
          },
          data: option.series[0].data || []
        }
      ],
      color: [
        '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', 
        '#bfdbfe', '#dbeafe', '#eff6ff', '#1d4ed8',
        '#1e40af', '#1e3a8a', '#0f172a'
      ]
    };
    
    chart.setOption({...defaultOption, ...option});
    
    // 添加图表点击事件
    chart.on('click', function(params) {
      console.log('分区点击:', params);
      // 可以在这里添加点击交互逻辑
    });
    
    // 响应窗口大小变化
    window.addEventListener('resize', function() {
      chart.resize();
    });
  }, 600);
}

// 初始化视频时长与互动关系图表
function initDurationChart(option) {
  const chart = echarts.init(document.getElementById('duration_chart'));
  
  chart.showLoading({
    text: '加载中...',
    color: '#2563eb',
    textColor: '#333'
  });
  
  setTimeout(() => {
    chart.hideLoading();
    const defaultOption = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#ddd',
        borderWidth: 1,
        textStyle: { color: '#333' }
      },
      legend: {
        data: ['点赞数', '评论数', '收藏数'],
        top: 0,
        textStyle: { color: '#64748b' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: option.xAxis.data || [],
        axisLine: { lineStyle: { color: '#ddd' } },
        axisLabel: { color: '#64748b' },
        splitLine: { show: false }
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisLabel: { color: '#64748b' },
        splitLine: { lineStyle: { color: '#f1f5f9' } }
      },
      series: option.series || [],
      color: ['#2563eb', '#f97316', '#10b981'],
      animationDuration: 1500
    };
    
    chart.setOption({...defaultOption, ...option});
    
    window.addEventListener('resize', function() {
      chart.resize();
    });
  }, 800);
}

// 初始化头部UP主影响力分析图表
function initTopUpChart(option) {
  const chart = echarts.init(document.getElementById('top_up_chart'));
  
  chart.showLoading({
    text: '加载中...',
    color: '#2563eb',
    textColor: '#333'
  });
  
  setTimeout(() => {
    chart.hideLoading();
    const defaultOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#ddd',
        borderWidth: 1,
        textStyle: { color: '#333' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: '#ddd' } },
        axisLabel: { color: '#64748b' },
        splitLine: { lineStyle: { color: '#f1f5f9' } }
      },
      yAxis: {
        type: 'category',
        data: option.yAxis.data || [],
        axisLine: { show: false },
        axisLabel: { color: '#64748b' },
        splitLine: { show: false }
      },
      series: [
        {
          name: '播放量',
          type: 'bar',
          data: option.series[0].data || [],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#3b82f6' },
              { offset: 1, color: '#2563eb' }
            ])
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#60a5fa' },
                { offset: 1, color: '#1d4ed8' }
              ])
            }
          },
          barWidth: '60%'
        }
      ],
      animationDuration: 1500
    };
    
    chart.setOption({...defaultOption, ...option});
    
    window.addEventListener('resize', function() {
      chart.resize();
    });
  }, 1000);
}

// 初始化视频发布时间分析图表
function initPublishChart(option) {
  const chart = echarts.init(document.getElementById('publish_chart'));
  
  chart.showLoading({
    text: '加载中...',
    color: '#2563eb',
    textColor: '#333'
  });
  
  setTimeout(() => {
    chart.hideLoading();
    const defaultOption = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#ddd',
        borderWidth: 1,
        textStyle: { color: '#333' }
      },
      legend: {
        data: ['发布量', '观看量'],
        top: 0,
        textStyle: { color: '#64748b' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: option.xAxis.data || [],
        axisLine: { lineStyle: { color: '#ddd' } },
        axisLabel: { color: '#64748b' },
        splitLine: { show: false }
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisLabel: { color: '#64748b' },
        splitLine: { lineStyle: { color: '#f1f5f9' } }
      },
      series: [
        {
          name: '发布量',
          type: 'line',
          stack: 'Total',
          data: option.series[0].data || [],
          smooth: true,
          lineStyle: { width: 3, color: '#2563eb' },
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: { color: '#2563eb' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(37, 99, 235, 0.3)' },
              { offset: 1, color: 'rgba(37, 99, 235, 0)' }
            ])
          }
        },
        {
          name: '观看量',
          type: 'line',
          stack: 'Total',
          data: option.series[1].data || [],
          smooth: true,
          lineStyle: { width: 3, color: '#f97316' },
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: { color: '#f97316' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(249, 115, 22, 0.3)' },
              { offset: 1, color: 'rgba(249, 115, 22, 0)' }
            ])
          }
        }
      ],
      animationDuration: 1500
    };
    
    chart.setOption({...defaultOption, ...option});
    
    window.addEventListener('resize', function() {
      chart.resize();
    });
  }, 1200);
}

// 初始化视频互动指标相关性分析图表
function initCorrelationChart(option) {
  const chart = echarts.init(document.getElementById('correlation_chart'));
  
  chart.showLoading({
    text: '加载中...',
    color: '#2563eb',
    textColor: '#333'
  });
  
  setTimeout(() => {
    chart.hideLoading();
    const defaultOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} 与 {c}: {d}',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#ddd',
        borderWidth: 1,
        textStyle: { color: '#333' }
      },
      legend: {
        data: option.legend.data || [],
        bottom: 0,
        textStyle: { color: '#64748b' }
      },
      series: [
        {
          name: '相关性',
          type: 'graph',
          layout: 'circular',
          circular: {
            rotateLabel: true
          },
          roam: false,
          label: {
            show: true,
            position: 'right',
            formatter: '{b}',
            color: '#333'
          },
          lineStyle: {
            color: 'source',
            curveness: 0.3
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 5
            }
          },
          data: option.series[0].data || [],
          links: option.series[0].links || [],
          categories: option.series[0].categories || [],
          color: ['#2563eb', '#f97316', '#10b981', '#8b5cf6']
        }
      ],
      animationDuration: 2000,
      animationEasingUpdate: 'quinticInOut'
    };
    
    chart.setOption({...defaultOption, ...option});
    
    window.addEventListener('resize', function() {
      chart.resize();
    });
  }, 1400);
}

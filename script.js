document.addEventListener('DOMContentLoaded', () => {
  // 修复图表不显示：增加容器存在性检查+错误提示
  function initChart(chartId, chartData) {
    const chartDom = document.getElementById(chartId);
    // 检查容器是否存在
    if (!chartDom) {
      console.error(`图表容器 ${chartId} 不存在`);
      return;
    }
    // 检查容器尺寸（ECharts需要明确尺寸）
    if (chartDom.offsetWidth === 0 || chartDom.offsetHeight === 0) {
      console.error(`图表容器 ${chartId} 尺寸为0，请检查CSS`);
      // 强制设置尺寸
      chartDom.style.width = '100%';
      chartDom.style.height = '500px';
    }
    const chart = echarts.init(chartDom);
    
    // 显示加载动画
    chart.showLoading({
      text: '加载图表中...',
      color: '#FF69B4',
      textColor: '#333',
      maskColor: 'rgba(255, 255, 255, 0.7)'
    });

    // 模拟数据加载（防止因数据问题导致图表不显示）
    setTimeout(() => {
      try {
        // 检查数据是否有效
        if (!chartData || !chartData.series) {
          throw new Error('图表数据格式错误');
        }
        // 合并基础配置（确保图表基础样式正常）
        const baseOption = {
          tooltip: { trigger: 'axis' },
          grid: { left: '5%', right: '5%', bottom: '10%', containLabel: true },
          xAxis: { type: 'category' },
          yAxis: { type: 'value' }
        };
        chart.setOption({ ...baseOption, ...chartData });
        chart.hideLoading();
      } catch (err) {
        console.error(`图表 ${chartId} 初始化失败:`, err);
        chart.hideLoading();
        // 显示错误提示
        chartDom.innerHTML = `<div style="text-align:center;padding:20px;color:#f00">图表加载失败</div>`;
      }
    }, 800);

    // 窗口 resize 时重绘图表
    window.addEventListener('resize', () => chart.resize());
  }

  // 加载数据并初始化图表（增加错误处理）
  try {
    fetch('bili_analysis_results.json')
      .then(res => {
        if (!res.ok) throw new Error('数据文件未找到');
        return res.json();
      })
      .then(data => {
        // 逐个初始化图表（确保每个图表都被正确调用）
        initChart('partition_chart', data.partition_analysis);
        initChart('duration_chart', data.duration_interaction);
        initChart('top_up_chart', data.top_up_owners);
        initChart('publish_chart', data.publish_time_analysis);
        initChart('correlation_chart', data.interaction_correlation);
      })
      .catch(err => {
        console.error('数据加载失败:', err);
        // 显示全局错误提示
        document.querySelectorAll('.chart-box').forEach(box => {
          box.innerHTML = `<div style="text-align:center;padding:20px;color:#f00">数据加载失败，请检查bili_analysis_results.json文件</div>`;
        });
      });
  } catch (err) {
    console.error('初始化失败:', err);
  }

  // 2. 导航联动：滚动高亮
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  function updateNav() {
    const scrollPos = window.scrollY;
    sections.forEach((sec, index) => {
      const offsetTop = sec.offsetTop - 100; // 提前触发
      if (scrollPos >= offsetTop && scrollPos < offsetTop + sec.offsetHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        navLinks[index].classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    updateNav();
    // 控制返回顶部按钮
    const backToTop = document.getElementById('backToTop');
    backToTop.classList.toggle('visible', window.scrollY > 500);
  });

  // 3. 返回顶部
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 4. 平滑滚动（导航跳转）
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60, // 避开导航栏
          behavior: 'smooth'
        });
      }
    });
  });

  // 5. ECharts初始化（加载动画+响应式）
  function initChart(id, option) {
    const chartDom = document.getElementById(id);
    const chart = echarts.init(chartDom);
    chart.showLoading({
      text: '数据加载中...',
      color: var(--pink-dark),
      textColor: '#fff',
      maskColor: 'rgba(255,255,255,0.2)'
    });
    setTimeout(() => {
      chart.hideLoading();
      chart.setOption(option);
      // 窗口变化时重绘
      window.addEventListener('resize', () => chart.resize());
    }, 1000);
  }
});

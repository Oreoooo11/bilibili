document.addEventListener('DOMContentLoaded', () => {
  // 1. 加载JSON数据，初始化图表
  fetch('bili_analysis_results.json')
    .then(res => res.json())
    .then(data => {
      initChart('partition_chart', data.partition_analysis);
      initChart('duration_chart', data.duration_interaction);
      initChart('top_up_chart', data.top_up_owners);
      initChart('publish_chart', data.publish_time_analysis);
      initChart('correlation_chart', data.interaction_correlation);
      
      // 标记所有模块为“可见”（触发渐显动画）
      document.querySelectorAll('.section').forEach(sec => sec.classList.add('visible'));
    })
    .catch(err => console.error('数据加载失败:', err));

  // 2. 导航联动：滚动时高亮当前模块
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  function updateNav() {
    const scrollPos = window.scrollY;
    sections.forEach((sec, index) => {
      const offsetTop = sec.offsetTop - 100; // 提前100px触发高亮
      const height = sec.offsetHeight;
      if (scrollPos >= offsetTop && scrollPos < offsetTop + height) {
        navLinks.forEach(link => link.classList.remove('active'));
        navLinks[index].classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    updateNav();
    // 控制返回顶部按钮
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  // 3. 返回顶部功能
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 4. 平滑滚动（导航跳转）
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        const offset = 60; // 导航栏高度
        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: 'smooth'
        });
      }
    });
  });

  // 5. ECharts初始化（带加载动画）
  function initChart(id, option) {
    const chartDom = document.getElementById(id);
    const chart = echarts.init(chartDom);
    chart.showLoading({ text: '加载中...' }); // 加载提示
    setTimeout(() => {
      chart.hideLoading();
      chart.setOption(option);
      // 响应式：窗口变化时重绘
      window.addEventListener('resize', () => chart.resize());
    }, 800);
  }
});

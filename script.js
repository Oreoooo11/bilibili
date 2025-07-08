document.addEventListener('DOMContentLoaded', () => {
  // 1. 加载JSON数据，初始化ECharts（带科技感加载动画）
  fetch('bili_analysis_results.json')
    .then(res => res.json())
    .then(data => {
      initChart('partition_chart', data.partition_analysis);
      initChart('duration_chart', data.duration_interaction);
      initChart('top_up_chart', data.top_up_owners);
      initChart('publish_chart', data.publish_time_analysis);
      initChart('correlation_chart', data.interaction_correlation);
      
      // 标记模块可见（触发渐显动画）
      document.querySelectorAll('.section').forEach(sec => sec.classList.add('visible'));
    })
    .catch(err => console.error('数据加载失败:', err));

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

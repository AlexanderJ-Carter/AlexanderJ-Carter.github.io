document.addEventListener('DOMContentLoaded', function() {
  // 初始化代码高亮
  hljs.highlightAll();
  
  // 暂停轮播当鼠标悬停在代码上
  const codeCarousel = document.getElementById('codeCarousel');
  const carousel = new bootstrap.Carousel(codeCarousel, {
    interval: 5000
  });

  codeCarousel.addEventListener('mouseenter', () => {
    carousel.pause();
  });

  codeCarousel.addEventListener('mouseleave', () => {
    carousel.cycle();
  });
});
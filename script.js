// 添加一些基本的交互功能

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 设置当前年份
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // CTA按钮点击事件
    const primaryButton = document.querySelector('.cta-button.primary');
    if (primaryButton) {
        primaryButton.addEventListener('click', function() {
            // 滚动到分类区域
            const categoriesSection = document.querySelector('.categories-section');
            if (categoriesSection) {
                categoriesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 平滑滚动效果
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 这里可以添加平滑滚动到相应部分的功能
        });
    });
});

// 简单的响应式导航菜单切换（适用于更小的屏幕）
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}
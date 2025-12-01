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

    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 平滑滚动效果
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 这里可以添加平滑滚动到相应部分的功能
        });
    });

    // 添加视差效果
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });
    
    // 分类占位区域悬停效果
    const categoriesPlaceholder = document.querySelector('.categories-placeholder');
    if (categoriesPlaceholder) {
        categoriesPlaceholder.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        categoriesPlaceholder.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
    
    // 回到顶部按钮
    const backToTopButton = document.getElementById('backToTop');
    
    // 监听滚动事件，控制按钮显示/隐藏
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // 点击回到顶部
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 工具卡片悬停效果增强
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 工具详情项悬停效果
    const detailItems = document.querySelectorAll('.detail-item');
    detailItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.color = '#2e7d32';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.color = '#4a5568';
        });
    });
    
    // 3D方块旋转功能 - 无惯性版
    const minecraftBlock = document.querySelector('.minecraft-block');
    if (minecraftBlock) {
        // 状态变量
        const state = {
            isDragging: false,
            rotateX: -25,
            rotateY: -25,
            startX: 0,
            startY: 0,
            lastTime: 0
        };
        
        let autoRotateInterval, resetTimeout;
        
        // 停止CSS动画，启用JS控制
        minecraftBlock.style.animation = 'none';
        updateBlockRotation();
        
        // 事件处理函数
        const handlers = {
            startDrag(e) {
                e.preventDefault();
                state.isDragging = true;
                state.startX = e.clientX;
                state.startY = e.clientY;
                state.lastTime = Date.now();
                
                // 停止自动旋转和回正
                utils.stopAutoRotate();
                utils.clearResetTimeout();
            },
            
            drag(e) {
                if (!state.isDragging) return;
                
                const currentTime = Date.now();
                const deltaTime = currentTime - state.lastTime;
                
                const deltaX = e.clientX - state.startX;
                const deltaY = e.clientY - state.startY;
                
                // 根据当前X轴旋转角度调整旋转方向
                const rotationFactor = Math.cos(state.rotateX * Math.PI / 180);
                state.rotateY += deltaX * 0.3 * rotationFactor;
                state.rotateX -= deltaY * 0.3;
                
                updateBlockRotation();
                
                state.startX = e.clientX;
                state.startY = e.clientY;
                state.lastTime = currentTime;
            },
            
            endDrag() {
                if (!state.isDragging) return;
                state.isDragging = false;
                
                // 3秒后回正
                utils.scheduleReset();
            },
            
            touchStart(e) {
                if (e.touches.length > 1) return; // 只处理单指触摸
                state.isDragging = true;
                state.startX = e.touches[0].clientX;
                state.startY = e.touches[0].clientY;
                state.lastTime = Date.now();
                
                // 停止自动旋转和回正
                utils.stopAutoRotate();
                utils.clearResetTimeout();
                
                e.preventDefault();
            },
            
            touchMove(e) {
                if (!state.isDragging || e.touches.length > 1) return;
                
                const currentTime = Date.now();
                const deltaTime = currentTime - state.lastTime;
                
                const deltaX = e.touches[0].clientX - state.startX;
                const deltaY = e.touches[0].clientY - state.startY;
                
                // 根据当前X轴旋转角度调整旋转方向
                const rotationFactor = Math.cos(state.rotateX * Math.PI / 180);
                state.rotateY += deltaX * 0.3 * rotationFactor;
                state.rotateX -= deltaY * 0.3;
                
                updateBlockRotation();
                
                state.startX = e.touches[0].clientX;
                state.startY = e.touches[0].clientY;
                state.lastTime = currentTime;
                
                e.preventDefault();
            },
            
            touchEnd() {
                if (!state.isDragging) return;
                state.isDragging = false;
                
                // 3秒后回正
                utils.scheduleReset();
            }
        };
        
        // 工具函数
        const utils = {
            stopAutoRotate() {
                if (autoRotateInterval) {
                    clearInterval(autoRotateInterval);
                    autoRotateInterval = null;
                }
            },
            
            clearResetTimeout() {
                if (resetTimeout) {
                    clearTimeout(resetTimeout);
                    resetTimeout = null;
                }
            },
            
            scheduleReset() {
                utils.clearResetTimeout();
                resetTimeout = setTimeout(resetAndStartAutoRotate, 3000);
            }
        };
        
        // 更新方块旋转
        function updateBlockRotation() {
            // 不再限制X轴旋转角度，让其自由旋转避免回弹
            minecraftBlock.style.transform = `rotateX(${state.rotateX}deg) rotateY(${state.rotateY}deg)`;
        }
        
        // 回正并开始自动旋转
        function resetAndStartAutoRotate() {
            // 只回正X轴到默认角度
            const startRotateX = state.rotateX;
            const targetRotateX = -25;
            
            const startTime = performance.now();
            const duration = 800;
            
            function animate(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // 使用缓动函数
                const easeProgress = 1 - Math.pow(1 - progress, 2);
                
                state.rotateX = startRotateX + (targetRotateX - startRotateX) * easeProgress;
                
                updateBlockRotation();
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    // 回正完成后开始自动旋转
                    startAutoRotate();
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        // 启动自动旋转
        function startAutoRotate() {
            utils.stopAutoRotate();
            
            // 重置X轴到默认角度
            state.rotateX = -25;
            updateBlockRotation();
            
            autoRotateInterval = setInterval(function() {
                state.rotateY += 1;
                updateBlockRotation();
            }, 50);
        }
        
        // 绑定事件
        minecraftBlock.addEventListener('mousedown', handlers.startDrag);
        document.addEventListener('mousemove', handlers.drag);
        document.addEventListener('mouseup', handlers.endDrag);
        
        minecraftBlock.addEventListener('touchstart', handlers.touchStart);
        document.addEventListener('touchmove', handlers.touchMove);
        document.addEventListener('touchend', handlers.touchEnd);
        
        // 启动自动旋转
        startAutoRotate();
    }
});

// 简单的响应式导航菜单切换（适用于更小的屏幕）
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// 添加淡入动画效果
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有需要动画的元素
    const animatedElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons, .hero-image');
    
    // 创建交叉观察器
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // 观察所有动画元素
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});
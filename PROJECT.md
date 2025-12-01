# MC工具箱项目文档

## 项目概述

MC工具箱是一个专为Minecraft玩家设计的工具导航网站，旨在汇集各类优质Minecraft工具，帮助玩家提升游戏体验。网站采用现代化的前端技术构建，具有响应式设计，可在各种设备上良好展示。

## 技术架构

### 前端技术栈
- HTML5
- CSS3（含动画和3D变换）
- JavaScript（ES6+）
- Font Awesome 图标库

### 第三方库和资源
- [canvas-nest.js](https://github.com/hustcc/canvas-nest.js) - 动态三角形背景效果
- [Font Awesome](https://fontawesome.com/) - 图标资源

## 核心功能

### 1. 响应式设计
网站采用响应式布局，适配各种屏幕尺寸：
- 桌面端（>992px）
- 平板端（768px-992px）
- 移动端（<768px）

### 2. 3D交互方块
主页上的Minecraft方块具有以下交互特性：
- 鼠标拖拽旋转（支持X轴和Y轴）
- 触摸设备手势支持
- 释放后3秒自动回正
- 回正后持续自动旋转
- 无惯性效果，操作直接响应

### 3. 动态背景效果
使用canvas-nest.js实现动态三角形背景：
- 鼠标悬停时三角形向鼠标位置聚集
- 可自定义颜色、透明度、密度等参数
- 背景与主要内容分离，不影响页面性能

### 4. 导航和用户体验
- 固定顶部导航栏，滚动时自动调整样式
- 平滑滚动到页面各区域
- 回到顶部按钮（页面向下滚动300px后显示）
- 悬停动画效果

## 文件结构

```
├── index.html              # 主页
├── styles.css              # 主样式文件
├── js/
│   ├── script.js           # 主要JavaScript逻辑
│   └── canvas-nest.js      # 背景效果库
└── assets/                 # 静态资源文件夹（如有）
```

## 关键技术实现

### 3D方块交互实现

使用CSS 3D变换实现立方体效果：
- `transform-style: preserve-3d` 保持3D空间
- 六个面分别定位形成立方体
- JavaScript控制旋转角度

核心交互逻辑：
1. 鼠标按下时开始跟踪拖拽
2. 鼠标移动时计算角度变化
3. 鼠标释放后设置3秒定时器
4. 定时器触发后执行回正动画
5. 回正完成后启动自动旋转

### 响应式设计实现

通过CSS媒体查询实现不同屏幕适配：
- 桌面端：两列网格布局（文字+3D方块）
- 移动端：单列布局，元素居中对齐
- 导航栏在小屏幕上自动折叠

### 动画效果

使用CSS动画和JavaScript requestAnimationFrame实现流畅动画：
- 页面元素入场动画（淡入、上移等）
- 方块回正使用缓动函数保证平滑过渡
- 悬停效果使用CSS transition

## 自定义配置

### 背景效果配置
可以在[index.html](file:///C:/Users/wuhao/Documents/GitHub/3281221832.github.io/index.html)中调整canvas-nest.js参数：
```html
<script src="js/canvas-nest.js"
        color="46, 204, 113" 
        opacity='0.7' 
        zIndex="-1" 
        count="200">
</script>
```

参数说明：
- `color`: 线条颜色 (R,G,B格式)
- `opacity`: 线条透明度 (0-1)
- `zIndex`: 背景层级
- `count`: 线条总数

## 部署说明

项目为静态网站，可直接部署到任何支持静态文件托管的服务：
- GitHub Pages
- Netlify
- Vercel
- 传统Web服务器

只需将所有文件上传至服务器即可运行。

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 性能优化

- 所有CSS和JavaScript均为本地文件，减少外部依赖
- 使用CSS硬件加速提升动画性能
- 图片资源使用内联SVG减少HTTP请求
- 合理使用requestAnimationFrame优化动画性能

## 未来扩展方向

1. 工具分类系统完善
2. 用户个性化功能（收藏、历史记录）
3. 工具搜索功能
4. 多语言支持
5. 深色模式
6. 社区功能（评论、评分等）

## 维护信息

- 项目地址：https://github.com/YUN-SAN3/YUN-SAN3.github.io
- 联系方式：https://github.com/YUN-SAN3/YUN-SAN3.github.io/issues
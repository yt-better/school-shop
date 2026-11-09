// 校园电商平台 JavaScript

// 商品数据
const products = [
    { id: 1, name: "统一老坛酸菜牛肉面 5 连包", price: 12.9, originalPrice: 18.9, image: "snacks.png", category: "snacks", sales: 2000, shop: "校园超市", tag: "秒杀" },
    { id: 2, name: "农夫山泉茶π 蜜桃乌龙茶 500ml*4", price: 15.9, originalPrice: 20.0, image: "beverages.png", category: "beverages", sales: 1500, shop: "校园超市", tag: "热卖" },
    { id: 3, name: "红富士苹果 3 斤装 新鲜水果", price: 9.9, originalPrice: 14.9, image: "fruits.png", category: "fruits", sales: 800, shop: "鲜果直达" },
    { id: 4, name: "晨光中性笔 0.5mm 黑色 12 支装", price: 8.9, originalPrice: 12.0, image: "digital.png", category: "stationery", sales: 3000, shop: "文具店", tag: "新品" },
    { id: 5, name: "小米蓝牙耳机 Redmi Buds 4 青春版", price: 79, originalPrice: 159, image: "digital.png", category: "digital", sales: 500, shop: "数码店", tag: "5折" },
    { id: 6, name: "舒肤佳沐浴露 720ml 纯白清香", price: 19.9, originalPrice: 29.9, image: "dorm.png", category: "dorm", sales: 1200, shop: "校园超市" },
    { id: 7, name: "奥利奥夹心饼干 原味 388g", price: 11.9, originalPrice: 15.9, image: "snacks.png", category: "snacks", sales: 1800, shop: "校园超市", tag: "热卖" },
    { id: 8, name: "手机支架 桌面懒人支架 可调节", price: 6.9, originalPrice: 12.9, image: "digital.png", category: "digital", sales: 2500, shop: "数码店" },
    { id: 9, name: "蒙牛纯牛奶 250ml*12 盒装", price: 29.9, originalPrice: 42.0, image: "beverages.png", category: "beverages", sales: 900, shop: "校园超市", tag: "秒杀" },
    { id: 10, name: "宿舍收纳箱 塑料整理箱 大号", price: 16.9, originalPrice: 25.9, image: "dorm.png", category: "dorm", sales: 600, shop: "生活用品" },
    { id: 11, name: "雀巢咖啡 速溶 1+2 原味 30 条装", price: 25.9, originalPrice: 35.9, image: "beverages.png", category: "beverages", sales: 1100, shop: "校园超市" },
    { id: 12, name: "心相印抽纸 3 层 100 抽*6 包", price: 13.9, originalPrice: 19.9, image: "dorm.png", category: "dorm", sales: 2200, shop: "校园超市" },
    { id: 13, name: "公牛插座 4 位 1.8 米 宿舍专用", price: 22.9, originalPrice: 32.9, image: "digital.png", category: "digital", sales: 700, shop: "数码店" },
    { id: 14, name: "德芙巧克力 丝滑牛奶 252g", price: 19.9, originalPrice: 26.9, image: "snacks.png", category: "snacks", sales: 950, shop: "校园超市", tag: "热卖" },
    { id: 15, name: "LED 台灯 护眼学习 可充电", price: 15.9, originalPrice: 24.9, image: "dorm.png", category: "dorm", sales: 1300, shop: "生活用品" },
];

// 购物车数据
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// 当前页面路径
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    updateCartBadge();
    initCarousel();
    initNavigation();
});

// 初始化导航栏
function initNavigation() {
    // 高亮当前页面
    document.querySelectorAll('.category-item').forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// 更新购物车角标
function updateCartBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    badges.forEach(badge => {
        badge.textContent = total;
        badge.style.display = total > 0 ? 'flex' : 'none';
    });
}

// 添加到购物车
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    showToast('已添加到购物车');
}

// 显示提示
function showToast(message) {
    const oldToast = document.querySelector('.toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--accent);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// 搜索功能
function searchProducts(keyword) {
    if (!keyword.trim()) return products;
    return products.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()));
}

// 按分类筛选
function filterByCategory(category) {
    if (category === 'all') return products;
    return products.filter(p => p.category === category);
}

// 按价格排序
function sortByPrice(products, ascending = true) {
    return [...products].sort((a, b) => ascending ? a.price - b.price : b.price - a.price);
}

// 按销量排序
function sortBySales(products) {
    return [...products].sort((a, b) => b.sales - a.sales);
}

// 渲染商品卡片
function renderProducts(products, container) {
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 60px; color: var(--text-muted);">暂无商品</div>';
        return;
    }

    container.innerHTML = products.map(p => `
        <div class="product-card" onclick="goToProduct(${p.id})">
            <div class="product-image">
                <img src="${p.image}" alt="${p.name}">
                ${p.tag ? `<span class="product-tag ${p.tag === '秒杀' || p.tag === '5折' ? 'discount' : ''}">${p.tag}</span>` : ''}
            </div>
            <div class="product-info">
                <div class="product-name">${p.name}</div>
                <div class="product-price-row">
                    <span class="product-price">¥${p.price}</span>
                    <span class="product-price-original">¥${p.originalPrice}</span>
                </div>
                <div class="product-meta">
                    <span class="product-sales">月售 ${p.sales}+</span>
                    <span class="product-shop">${p.shop}</span>
                </div>
            </div>
            <button class="add-to-cart" data-id="${p.id}" onclick="event.stopPropagation(); addToCart(${p.id})">加入购物车</button>
        </div>
    `).join('');
}

// 跳转到商品详情
function goToProduct(id) {
    showToast('商品详情页开发中');
}

// 返回首页
function goHome() {
    window.location.href = 'index.html';
}

// 返回上一页
function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        goHome();
    }
}

// 轮播图功能
let currentSlide = 0;
let slideInterval;

function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');

    if (slides.length === 0) return;

    startAutoPlay();

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    const prevBtn = carousel.querySelector('.carousel-arrow.prev');
    const nextBtn = carousel.querySelector('.carousel-arrow.next');

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
}

function goToSlide(index) {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const slidesContainer = carousel.querySelector('.carousel-slides');

    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    currentSlide = index;

    if (slidesContainer) {
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

function startAutoPlay() {
    stopAutoPlay();
    slideInterval = setInterval(nextSlide, 5000);
}

function stopAutoPlay() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

// ECharts 图表初始化
function initCharts() {
    const salesChartEl = document.getElementById('sales-chart');
    if (salesChartEl && typeof echarts !== 'undefined') {
        const salesChart = echarts.init(salesChartEl);
        const salesOption = {
            backgroundColor: 'transparent',
            title: { text: '本周销售趋势', textStyle: { color: '#efe9de', fontSize: 14 } },
            tooltip: { trigger: 'axis', backgroundColor: '#1c1a18', borderColor: 'rgba(239, 233, 222, 0.08)', textStyle: { color: '#efe9de' } },
            grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
            xAxis: {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                axisLine: { lineStyle: { color: 'rgba(239, 233, 222, 0.08)' } },
                axisLabel: { color: '#aaa398' }
            },
            yAxis: {
                type: 'value',
                axisLine: { lineStyle: { color: 'rgba(239, 233, 222, 0.08)' } },
                axisLabel: { color: '#aaa398' },
                splitLine: { lineStyle: { color: 'rgba(239, 233, 222, 0.05)' } }
            },
            series: [{
                name: '销售额',
                type: 'line',
                data: [1200, 1800, 1500, 2200, 3200, 2800, 2400],
                itemStyle: { color: '#ea580c' },
                lineStyle: { width: 3 },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(234, 88, 12, 0.3)' },
                            { offset: 1, color: 'rgba(234, 88, 12, 0)' }
                        ]
                    }
                },
                smooth: true
            }]
        };
        salesChart.setOption(salesOption);
    }

    const categoryChartEl = document.getElementById('category-chart');
    if (categoryChartEl && typeof echarts !== 'undefined') {
        const categoryChart = echarts.init(categoryChartEl);
        const categoryOption = {
            backgroundColor: 'transparent',
            title: { text: '商品分类销量', textStyle: { color: '#efe9de', fontSize: 14 } },
            tooltip: { trigger: 'axis', backgroundColor: '#1c1a18', borderColor: 'rgba(239, 233, 222, 0.08)', textStyle: { color: '#efe9de' } },
            grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
            xAxis: {
                type: 'value',
                axisLine: { lineStyle: { color: 'rgba(239, 233, 222, 0.08)' } },
                axisLabel: { color: '#aaa398' },
                splitLine: { lineStyle: { color: 'rgba(239, 233, 222, 0.05)' } }
            },
            yAxis: {
                type: 'category',
                data: ['生活用品', '数码配件', '文具办公', '生鲜水果', '饮料冲调', '零食速食'],
                axisLine: { lineStyle: { color: 'rgba(239, 233, 222, 0.08)' } },
                axisLabel: { color: '#aaa398' }
            },
            series: [{
                name: '销量',
                type: 'bar',
                data: [3200, 1800, 1500, 2200, 2800, 3500],
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 1, y2: 0,
                        colorStops: [
                            { offset: 0, color: '#ea580c' },
                            { offset: 1, color: '#f97316' }
                        ]
                    },
                    borderRadius: [0, 4, 4, 0]
                },
                barWidth: 20
            }]
        };
        categoryChart.setOption(categoryOption);
    }

    window.addEventListener('resize', function() {
        if (typeof echarts !== 'undefined') {
            document.querySelectorAll('.chart-container').forEach(el => {
                const chart = echarts.getInstanceByDom(el);
                if (chart) chart.resize();
            });
        }
    });
}

// 动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateX(-50%) translateY(10px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(10px); }
    }
    .add-to-cart {
        width: 100%;
        height: 36px;
        background: var(--accent);
        color: white;
        border: none;
        font-size: 13px;
        cursor: pointer;
        transition: background 0.2s;
    }
    .add-to-cart:hover {
        background: var(--accent-hover);
    }
`;
document.head.appendChild(style);

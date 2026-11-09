# 校易购 - 校园生活一站式服务平台

一个专为大学生设计的校园电商平台，提供商品购买、二手交易、校园服务等功能。

## 功能特性

- **商品购物**：零食、饮料、水果、文具、数码配件、生活用品等
- **二手市场**：教材、数码产品、生活用品闲置交易
- **校园服务**：快递代取、校园跑腿、兼职信息
- **购物车**：添加、删除、修改数量
- **用户系统**：登录、注册
- **轮播图**：首页自动轮播 Banner
- **数据图表**：ECharts 展示销售趋势和分类销量

## 页面结构

| 页面 | 文件 | 说明 |
|------|------|------|
| 首页 | `index.html` | 轮播图、商品推荐、数据图表、服务展示 |
| 商品分类 | `category.html` | 按分类浏览商品，支持筛选排序 |
| 购物车 | `cart.html` | 购物车管理 |
| 登录 | `login.html` | 用户登录 |
| 注册 | `register.html` | 新用户注册 |
| 二手市场 | `second-hand.html` | 闲置物品交易 |
| 校园服务 | `services.html` | 快递代取、跑腿等服务 |

## 技术栈

- 纯前端实现，无需后端
- HTML5 + CSS3 + JavaScript
- ECharts 数据可视化
- LocalStorage 存储购物车数据
- 响应式设计，适配移动端

## 快速开始

1. 克隆项目到本地
2. 直接用浏览器打开 `index.html`
3. 或使用任意静态服务器

```bash
# 使用 Python 启动本地服务器
python -m http.server 8000

# 或使用 Node.js
npx serve .
```

## 部署到 GitHub Pages

1. 将项目推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 `main` 分支作为源

## 目录结构

```
campus-shop/
├── index.html          # 首页（轮播图 + ECharts）
├── category.html       # 商品分类
├── cart.html           # 购物车
├── login.html          # 登录
├── register.html       # 注册
├── second-hand.html    # 二手市场
├── services.html       # 校园服务
├── style.css           # 全局样式
├── app.js              # 核心 JavaScript
├── *.png               # 图片资源（根目录）
└── README.md           # 项目说明
```

## License

MIT License

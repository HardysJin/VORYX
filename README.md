# VORYX - Beyond Reach

电影级探险品牌官方网站，采用 Next.js 构建的高端静态网站。

## 🌟 特性

- **电影级视觉体验** - 深色主题、电影级动画效果
- **响应式设计** - 适配所有设备尺寸
- **静态网站生成** - 快速加载、SEO 友好
- **现代技术栈** - Next.js 14 + TypeScript + Tailwind CSS + Framer Motion
- **奢华品牌感** - 高端旅行杂志风格设计

## 🚀 快速开始

### 方式一：一键部署（推荐）

```bash
chmod +x deploy.sh
./deploy.sh
```

### 方式二：手动部署

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 导出静态文件
npm run export
```

## 📁 项目结构

```
voryx-website/
├── app/                    # Next.js 13+ App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   ├── about/             # 关于页面
│   ├── routes/            # 路线页面
│   ├── articles/          # 文章页面
│   ├── join/              # 加入页面
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── Navigation.tsx     # 导航组件
│   ├── HeroSection.tsx    # 首页英雄区域
│   └── ExploreSection.tsx # 探索区域
└── public/               # 静态资源
```

## 🎨 设计特色

### 视觉风格
- **深色主题** (#0a0a0a, #1a1a1a)
- **最小化排版** - 大量留白、优雅间距
- **电影级动画** - Framer Motion 驱动的平滑过渡
- **胶片质感** - 颗粒纹理、电影级叠加效果

### 排版系统
- **标题字体** - Georgia 衬线字体
- **正文字体** - Inter 无衬线字体
- **跟踪间距** - 宽松的字母间距营造奢华感

### 动画效果
- **滚差视觉** - 背景元素视差滚动
- **渐入动画** - 内容区域优雅显现
- **悬停效果** - 精致的交互反馈

## 🛠 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **构建**: 静态导出 (SSG)

## 📱 页面结构

### ✅ 已完成
- **🎬 首页** - 电影级英雄区域 + 探索项目展示
- **📖 关于页面** - 完整品牌故事与团队愿景

### 🚧 待完善
- **🗺️ 路线页面** - 探险项目详细介绍
- **📰 文章页面** - 编辑风格内容平台  
- **📝 加入页面** - 申请表单系统

## 🌍 部署选项

### 静态托管服务
- **Vercel** (推荐): `npx vercel --prod`
- **Netlify**: 拖拽 `out/` 目录到 netlify.com/drop
- **GitHub Pages**: 推送代码并启用 Pages
- **AWS S3**: 上传 `out/` 目录到 S3 桶

### 本地预览
```bash
npx serve out
```

## 🎯 品牌定位

VORYX 定位为高端探险品牌，目标客户是追求极致体验的探索者。网站设计体现：

- **Beyond Reach** - 超越寻常的探索理念
- **电影级品质** - 视觉呈现追求电影级标准
- **科学贡献** - 探索与科研相结合
- **文化传承** - 记录消失的文明与景观

## 🔧 自定义指南

### 修改品牌色彩
编辑 `tailwind.config.js` 中的 colors 配置

### 添加新页面
1. 在 `app/` 下创建新目录
2. 添加 `page.tsx` 文件
3. 更新 `components/Navigation.tsx` 添加导航链接

### 修改动画效果
编辑各组件中的 Framer Motion 配置参数

## 📄 许可证

本项目仅供学习和参考使用。

---

**VORYX - 探索无人涉足的边界 🏔️**
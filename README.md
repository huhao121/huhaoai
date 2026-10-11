# 胡昊的极简个人主页 (Hu Hao's Personal Portfolio)

> 记录我如何用 AI、开源工具和自动化，把一个模糊想法做成能运行、能复用的产品。

这是一个遵循 **苹果/Notion** 极简美学设计的个人主页。零繁琐打包依赖、纯原生现代技术栈、极速秒开、支持自适应深色/浅色模式切换。

- **正式线上网址**：[https://huhaoai.com](https://huhaoai.com)（备用节点：[https://huhaoai.pages.dev](https://huhaoai.pages.dev)）
- **建站总成本**：19.41 元人民币（Spaceship 优惠码 `COMPROS` + 支付宝付款）
- **托管方案**：Cloudflare Pages 免费托管 + 免费全球 CDN + 全自动免费 SSL/TLS 证书

---

## 📖 13,000 字全量保姆级建站手册（92 张全避坑图）

本项目是从零用自然语言在 15 分钟内搭建、部署并上线到独立顶级域名 `huhaoai.com` 的完整开源范例。
完整教程包含 92 张真实实操原图与所有踩坑排雷细节（环境配置、苹果系统弹窗、域名购买、Cloudflare Nameservers 托管、DNS CNAME 自动解析等）：

👉 **[点击阅读：《不会写代码，也能做出个人网站：你说人话，AGY 负责干活》（保姆级全量实操手册）](docs/图文教程.md)**

## 📂 项目结构

```text
├── index.html        # 网页主结构与内容（修改文字/项目都在这里）
├── style.css         # 极简设计系统与样式（支持暗黑/浅色主题）
├── script.js         # 主题切换记忆、邮箱一键复制交互
├── favicon.svg       # 矢量网站图标
├── .gitignore        # Git 忽略配置
└── README.md         # 维护与部署指南（当前文件）
```

---

## 🛠️ 本地预览与调试

你可以使用任意方式在本地预览网站：

### 方式 1：使用 Wrangler（推荐，与线上 Cloudflare 完全一致）
在终端项目根目录下运行：
```bash
npx wrangler pages dev .
```
访问终端输出的本地链接（通常为 `http://localhost:8788`）。

### 方式 2：使用 Node.js 轻量服务器
```bash
npx serve .
```

---

## ✏️ 快速个性化定制指南

### 1. 更换为个人真实照片头像
1. 将你的个人照片放入当前项目目录，命名为 `avatar.jpg`。
2. 打开 `index.html`，找到 `<!-- 默认极简字母头像占位符 -->` 注释：
   ```html
   <!-- 解开这一行的注释并保存： -->
   <img src="avatar.jpg" alt="胡昊的个人照片" class="avatar-image">
   
   <!-- 并把下面的 avatar-placeholder 注释掉或删除 -->
   ```

### 2. 更新精选项目内容
打开 `index.html`，搜索 `<article class="project-card">`，直接修改：
- 项目标题（`project-title`）
- 状态标签（`badge`）
- 简介文案（`project-description`）
- 技术栈标签（`tag`）
- 外部链接地址（`href`）

### 3. 更新社交与联系方式
在 `index.html` 底部搜索 `huhao121121@gmail.com` 或社交平台名称，替换为你自己的信息即可。同时如修改了邮箱，记得在 `script.js` 中同步修改 `emailToCopy` 变量。

---

## 🚀 部署上线到 Cloudflare Pages

因为你在上一步已经完成了 `wrangler login` 授权，你可以随时通过一条命令将这个网站全球上线：

```bash
npx wrangler pages deploy . --project-name huhao-site
```

按照提示确认后，几秒内 Cloudflare 就会分配一个全球加速的 `.pages.dev` 免费专属域名！

---

## 📦 关联 GitHub 代码仓库

你可以通过以下命令在 GitHub 创建同名远程仓库并推送代码：

```bash
# 1. 在 GitHub 创建远程仓库并关联
gh repo create huhaoai --public --source=. --remote=origin --push

# 2. 之后日常修改代码只需：
git add .
git commit -m "更新网站内容"
git push
```

# 无敌电火机 · 个人主页

线上地址：<https://musheng245-png.github.io/>

一张极简的个人名片：浅灰绿坐标纸、墨绿字、工程橙做记号。首屏是放大的 **IL**，下面一行小字 **Invincible Electric Lighter**，再下面是两行「普天之下 / 通天之人」，页脚做成一块图纸标题栏。

按你的要求，页面**没有作品列表、没有外链、没有联系方式**，只有名字、大字、英文小字、口号和页脚。唯一的功能是右上角的深浅色切换——切换时会从按钮位置像墨水一样铺开。

## 文件

```
index.html    页面结构与全部文字
styles.css    配色、排版、响应式、深浅主题
app.js        主题切换、年份
favicon.svg   站点图标（IL 标记）
.nojekyll     跳过 GitHub Pages 的 Jekyll 处理
README.md     这份说明
```

没有构建步骤，没有框架。双击 `index.html` 就能预览。

## 改内容

- **中文名**：`index.html` 里搜「无敌电火机」，资料栏、`<title>`、meta、页脚「绘制」、版权各有一处。
- **首屏大字**：`<h1 class="display">` 里的 `IL`。换成长名字时，调 `styles.css` 里 `.display` 的 `font-size`；那行负的 `margin-left` 是让大字和下方文字视觉对齐用的，不要删。
- **口号**：`.manifesto`，两行之间用 `<br />`。
- **页脚**：`.title-block` 六格，按需改图名、日期、比例等。
- **想加联系方式**：目前页面刻意没有。需要的话加一个区块，放邮箱或 GitHub 链接即可。

## 更新已发布的页面

改完文件后：

```bash
git add .
git commit -m "更新内容"
git push
```

GitHub Pages 会自动重新发布，通常一到两分钟。

## 首次发布步骤（备用）

1. 新建公开仓库 `<用户名>.github.io`。
2. 把页面文件传到仓库根目录（`main` 分支）。
3. Settings → Pages → Source 选 `Deploy from a branch`，Branch 选 `main`、目录 `/ (root)`，保存。
4. 等一到两分钟，访问 `https://<用户名>.github.io`。

## 字体与主题

- 标题用 Archivo（可变字重 / 字宽），小字用 IBM Plex Mono，从 jsDelivr 加载。
- 字体加载失败时自动回退到系统字体（苹方 / 微软雅黑 / 系统等宽），版式不会塌。
- 深浅色首次跟随系统，手动切换后会记住选择（localStorage）。
- 主题切换用 View Transitions 做圆形揭幕；浏览器不支持，或系统开启「减少动态效果」时，直接切换。
- 键盘焦点清晰；系统开启「减少动态效果」时，入场动画也会关闭。

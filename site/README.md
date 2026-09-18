# AI 记忆机制 · 研究看板

完整的中文交互看板源码。纯 HTML、CSS、JavaScript，无安装依赖、无构建步骤、无 API Key，也不依赖原来的托管平台。

## 内容与交互

- 八个研究板块：总览、概念、架构、工作流、更新、记忆演进、开源案例、机制对照。
- 四张 SVG 示意图，点击节点显示解析。
- 工作流播放、暂停、逐步查看与重置。
- 七种新旧记忆更新案例与前后对比。
- 上下文预算滑杆与三种加载策略比较。
- 十个开源案例，支持分类切换、五维解析、逐步流程播放和来源链接。
- Claude Code 专项看板新增“三个闭环”切换图、双轨注入动画、记忆生命周期播放器与六类机制时间尺度矩阵。
- 响应式布局；遵循系统减少动态效果偏好。

## 文件说明

| 路径 | 用途 |
| --- | --- |
| `site/index.html` | 页面入口与基础结构 |
| `site/claude.html` | Claude Code 六模块记忆架构专项看板 |
| `site/style.css` | 配色、排版、响应式布局与动效 |
| `site/app.js` | 页面内容、图解与交互逻辑 |
| `site/research-data.js` | 十个开源案例的分析与来源 |
| `research-notes.md` | 可直接阅读的中文案例研究笔记 |
| `.github/workflows/deploy-pages.yml` | GitHub Pages 自动部署配置 |

## 本地查看

直接用浏览器打开 `site/index.html`，即可查看全部内容和交互。也可在项目目录运行 `python3 -m http.server 8000`，访问 `http://localhost:8000/site/`。页面无需后端，不会调用真实记忆服务；演示数据仅用于解释机制。

## 方法一：GitHub Actions 自动部署

1. 在 GitHub 新建仓库，例如 `ai-memory-atlas`，默认分支使用 `main`。
2. 将本文件所在目录的全部内容提交到仓库根目录，包括 `site` 与 `.github`。不要只上传 ZIP，也不要在仓库根目录再套一层 `ai-memory-atlas` 文件夹。
3. 在仓库 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。
4. 进入 **Actions → Deploy AI Memory Atlas to GitHub Pages → Run workflow**，选择 `main` 并运行。后续推送到 `main` 会自动部署。
5. 工作流成功后，在 **Settings → Pages** 或部署任务中获取实际网址。通常项目站点形式为 `https://你的用户名.github.io/仓库名/`。

如果首次推送发生在 Pages 设置之前，首次运行可能失败，完成第 3 步后重新运行即可。若分支叫 `master`，请同步修改工作流的 `branches: [main]`。

`.github` 是隐藏目录。macOS Finder 可按 Command + Shift + . 显示隐藏文件；也可以通过 GitHub Desktop 或 Git 提交完整目录。仓库里确认能看到 `.github/workflows/deploy-pages.yml`。

GitHub Pages 的可用性取决于账号方案及仓库可见性。页面不自带登录和访问控制，不继承原看板的仅本人可访问设置。

## 方法二：不使用 Actions，手动上传四个文件

如果只想通过网页上传：

1. 只将 `site` 文件夹里的 `index.html`、`style.css`、`app.js`、`research-data.js` 四个文件上传到新仓库根目录。
2. 此方法不要上传 `.github/workflows/deploy-pages.yml`。
3. Settings → Pages → Source 选择 **Deploy from a branch**。
4. Branch 选择 `main`，Folder 选择 `/(root)`，保存。
5. 部署完成后，从 Pages 设置页打开网址。

以上两种方法任选其一。

## 修改内容

- 文案、表格和流程：编辑 `site/app.js` 的各页面函数。
- 图解节点与连线：编辑 `diagrams` 对象；节点说明在 `detail`。
- 更新场景：编辑 `scenarios`。
- 开源案例：编辑 `site/research-data.js` 中的 `researchCases`。
- 颜色、间距和移动端样式：编辑 `site/style.css`。
- 名称与页面描述：编辑 `site/index.html`。

文件使用相对路径，导航使用 URL hash，适合部署到 GitHub Pages 的仓库子路径。若采用方法二，直接修改仓库根目录中的对应文件即可。

## 已做检查与边界

JavaScript 语法、八个页面内容生成、图解节点与连线引用已检查。未完成真实浏览器中的全面显示验收，也尚未在你的 GitHub 仓库执行部署工作流。

所有动画、预算数字、更新案例都是教学示意，不能当作框架性能测评。具体开源版本和托管产品可能变化，选型时应核对官方资料。此源码包不含原平台的凭据、Git 历史或项目绑定配置。

## GitHub 官方部署参考

- [使用 GitHub Pages 自定义工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [配置 GitHub Pages 发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## 方案研究版更新

已暂移除产品能力与验证风险章节，保留基础机制与图解；新增 Qwen-Agent、Kimi Code CLI、OpenViking、ReMe、MemoryOS、MemOS。各案例明确官方归属、公开证据范围和消费端产品推断边界。

如果覆盖旧版本，务必同时上传新增的 `research-data.js` 和更新后的 `index.html`，避免脚本缺失。

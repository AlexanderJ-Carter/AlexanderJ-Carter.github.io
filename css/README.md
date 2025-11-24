# CSS 目录结构

本目录根据用途对样式进行拆分，便于维护与复用：

- **base/**：全局基础样式与跨页面的通用调整。
  - `style.default.css` – 全站核心基础样式。
  - `custom.css` – 自定义补充样式与布局细节。
  - `enhanced.css` – 渐进增强和辅助特性样式。
  - ~~`display.css`~~ – 已合并到 `enhanced.css`
- **components/**：可复用组件、导航、页脚以及功能模块样式。
- **pages/**：单独页面或语言版本专属的样式文件。
- **themes/**：节日或专题活动主题样式（例如新年、诗歌主题）。
- **vendor/**：第三方库和外部依赖样式，目前包含 `glightbox`。

> 📁 **css-legacy-backup/** 保留了重构前的原始样式文件，可在需要时对照或回滚。

## 如何回滚到旧版结构？

如果在测试中发现问题，可以执行仓库根目录下的脚本快速恢复：

```bash
./scripts/restore-legacy-css.sh
```

执行后脚本会自动：

1. 将当前的 `css/` 目录重命名为 `css-refactored-时间戳/` 以便追踪；
2. 将 `css-legacy-backup/` 目录中的旧样式复制回 `css/`。

如需手动回滚，可直接用备份目录覆盖 `css/`。

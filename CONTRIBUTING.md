# 🤝 贡献指南 / Contributing Guide

[中文](#中文) | [English](#english)

---

## 中文

感谢你对本项目感兴趣！我们欢迎并感谢所有形式的贡献。

### 📋 目录

- [行为准则](#行为准则)
- [我能做什么贡献](#我能做什么贡献)
- [开发环境设置](#开发环境设置)
- [提交指南](#提交指南)
- [Pull Request 流程](#pull-request-流程)
- [代码规范](#代码规范)
- [测试指南](#测试指南)
- [文档贡献](#文档贡献)

### 行为准则

本项目采用以下行为准则：

- **尊重**: 尊重所有贡献者，无论其经验水平
- **建设性**: 提供建设性的反馈和建议
- **包容**: 欢迎来自不同背景的贡献者
- **专业**: 保持专业和友善的态度

### 我能做什么贡献

#### 🐛 报告 Bug

发现 bug？请帮助我们改进！

**提交 Bug 报告前**：
1. 搜索[现有 Issues](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/issues)，避免重复
2. 确认 bug 在最新版本中仍然存在
3. 收集相关信息（浏览器版本、截图、错误信息等）

**Bug 报告应包含**：
- 清晰简洁的标题
- 详细的问题描述
- 复现步骤（步骤越详细越好）
- 预期行为 vs 实际行为
- 截图或视频（如适用）
- 环境信息：
  - 浏览器和版本
  - 操作系统
  - Node.js 版本（如果是构建问题）

**模板示例**：
```markdown
### Bug 描述
[简短描述问题]

### 复现步骤
1. 访问 '...'
2. 点击 '...'
3. 滚动到 '...'
4. 看到错误

### 预期行为
[描述应该发生什么]

### 实际行为
[描述实际发生了什么]

### 截图
[如果适用，添加截图]

### 环境
- 浏览器: [如 Chrome 120]
- 操作系统: [如 macOS 14.0]
```

#### 💡 提出新功能

有好想法？我们很乐意听！

**功能请求应包含**：
- 清晰的功能描述
- 为什么需要这个功能（使用场景）
- 可能的实现方案（如果有想法）
- 是否愿意自己实现

#### 📝 改进文档

文档永远可以做得更好！你可以：
- 修正错别字
- 改进措辞
- 添加示例
- 翻译文档
- 补充缺失的信息

#### 🎨 改进设计

如果你是设计师，可以：
- 改进 UI/UX
- 提供设计建议
- 创建新图标或插图
- 优化颜色方案

### 开发环境设置

#### 前置要求

- Node.js >= 18.14.1
- Git
- 代码编辑器（推荐 VS Code）

#### 安装步骤

1. **Fork 仓库**
   
   点击 GitHub 页面右上角的 "Fork" 按钮

2. **克隆你的 Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/AlexanderJ-Carter.github.io.git
   cd AlexanderJ-Carter.github.io
   ```

3. **添加上游仓库**
   ```bash
   git remote add upstream https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io.git
   ```

4. **安装依赖**
   ```bash
   npm install
   ```

5. **启动开发服务器**
   ```bash
   npm run dev
   ```
   
   访问 http://localhost:4321

#### 推荐的 VS Code 扩展

创建 `.vscode/extensions.json`：
```json
{
  "recommendations": [
    "astro-build.astro-vscode",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint"
  ]
}
```

### 提交指南

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

#### 提交信息格式

```
<类型>(<范围>): <描述>

[可选的正文]

[可选的脚注]
```

#### 类型说明

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档变更
- `style`: 代码格式（不影响代码运行的变动）
- `refactor`: 重构（既不是新增功能，也不是修改 bug）
- `perf`: 性能优化
- `test`: 添加测试
- `chore`: 构建过程或辅助工具的变动
- `ci`: CI 配置文件和脚本的变动
- `revert`: 回退之前的提交

#### 提交示例

```bash
# 新功能
git commit -m "feat(gallery): add image zoom functionality"

# Bug 修复
git commit -m "fix(header): resolve mobile menu not closing"

# 文档更新
git commit -m "docs(readme): add deployment instructions"

# 样式调整
git commit -m "style(button): adjust padding and colors"

# 重构
git commit -m "refactor(i18n): simplify translation loading logic"

# 性能优化
git commit -m "perf(images): implement lazy loading"
```

#### 提交最佳实践

- ✅ 使用现在时态："add feature" 不是 "added feature"
- ✅ 使用祈使语气："move cursor to..." 不是 "moves cursor to..."
- ✅ 第一行不超过 72 个字符
- ✅ 每个提交只做一件事
- ✅ 提交前先运行测试
- ❌ 不要提交生成的文件（`dist/`, `node_modules/`）
- ❌ 不要提交个人配置文件

### Pull Request 流程

#### 1. 创建分支

从 `main` 创建新分支：
```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/bug-description
```

分支命名规范：
- `feature/` - 新功能
- `fix/` - Bug 修复
- `docs/` - 文档更新
- `refactor/` - 代码重构
- `style/` - 样式调整

#### 2. 进行开发

```bash
# 编写代码
# 测试功能
npm run dev

# 构建检查
npm run build

# 格式化代码
npx prettier --write .
```

#### 3. 提交变更

```bash
git add .
git commit -m "feat: your commit message"
```

#### 4. 保持同步

定期从上游同步：
```bash
git fetch upstream
git rebase upstream/main
```

#### 5. 推送到 GitHub

```bash
git push origin feature/your-feature-name
```

#### 6. 创建 Pull Request

1. 访问你的 GitHub Fork
2. 点击 "New Pull Request"
3. 填写 PR 描述（使用下面的模板）
4. 等待 Review

#### Pull Request 模板

```markdown
## 描述
[清晰描述你的改动]

## 改动类型
- [ ] Bug 修复
- [ ] 新功能
- [ ] 重构
- [ ] 文档更新
- [ ] 样式调整
- [ ] 性能优化

## 相关 Issue
Closes #[issue编号]

## 测试
- [ ] 本地测试通过
- [ ] 已在多个浏览器测试
- [ ] 已测试响应式布局

## 截图
[如果有 UI 变动，添加前后对比截图]

## 检查清单
- [ ] 代码遵循项目规范
- [ ] 已更新相关文档
- [ ] 提交信息遵循规范
- [ ] 无 TypeScript 错误
- [ ] 代码已格式化
```

#### Review 过程

- 至少一位维护者会 review 你的代码
- 可能会要求修改
- 保持沟通，及时回复反馈
- 所有讨论解决后才能合并

### 代码规范

#### TypeScript

```typescript
// ✅ 好的示例
interface UserProps {
  name: string;
  age: number;
  email?: string;
}

function greetUser(user: UserProps): string {
  return `Hello, ${user.name}!`;
}

// ❌ 避免
function greetUser(user: any) {
  return 'Hello, ' + user.name;
}
```

#### Astro 组件

```astro
---
// ✅ Props 类型定义
interface Props {
  title: string;
  description?: string;
}

const { title, description = '默认描述' } = Astro.props;
---

<div>
  <h1>{title}</h1>
  {description && <p>{description}</p>}
</div>

<style>
  /* 组件样式 */
  div {
    padding: 1rem;
  }
</style>
```

#### Tailwind CSS

```html
<!-- ✅ 使用 Tailwind 工具类 -->
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  按钮
</button>

<!-- ❌ 避免内联样式 -->
<button style="padding: 8px 16px; background: blue;">
  按钮
</button>
```

#### 命名规范

- 组件文件：`PascalCase.astro` (如 `MusicPlayer.astro`)
- 工具函数：`camelCase.ts` (如 `formatDate.ts`)
- 常量：`UPPER_SNAKE_CASE` (如 `MAX_SIZE`)
- 类型/接口：`PascalCase` (如 `UserData`)

### 测试指南

#### 手动测试

1. **浏览器兼容性**
   - Chrome（最新版）
   - Firefox（最新版）
   - Safari（最新版）
   - Edge（最新版）

2. **响应式测试**
   - 移动设备（320px - 768px）
   - 平板设备（768px - 1024px）
   - 桌面设备（1024px+）

3. **功能测试**
   - 导航是否正常
   - 主题切换是否工作
   - 语言切换是否正确
   - 表单提交是否成功
   - 链接是否有效

#### 性能测试

使用 Lighthouse 检查：
```bash
npm run build
npm run preview
# 在 Chrome DevTools 中运行 Lighthouse
```

目标分数：
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

### 文档贡献

#### 文档类型

- **README.md**: 项目概览和快速开始
- **CONTRIBUTING.md**: 贡献指南（本文件）
- **CHANGELOG.md**: 版本更新日志
- **组件文档**: 各组件的使用说明

#### 文档规范

- 使用清晰的标题层级
- 提供代码示例
- 包含截图（如适用）
- 保持简洁明了
- 中英文都应准确

#### 文档检查

```bash
# Markdown 格式检查
npx markdownlint "**/*.md"
```

---

## English

Thank you for your interest in contributing! We welcome and appreciate all forms of contributions.

### 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

### Code of Conduct

This project adheres to the following code of conduct:

- **Respect**: Respect all contributors regardless of their experience level
- **Constructive**: Provide constructive feedback and suggestions
- **Inclusive**: Welcome contributors from diverse backgrounds
- **Professional**: Maintain a professional and friendly attitude

### How Can I Contribute

#### 🐛 Reporting Bugs

Found a bug? Help us improve!

**Before submitting a bug report**:
1. Search [existing issues](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/issues) to avoid duplicates
2. Verify the bug exists in the latest version
3. Collect relevant information (browser version, screenshots, error messages, etc.)

**A good bug report includes**:
- Clear and concise title
- Detailed problem description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots or videos (if applicable)
- Environment information:
  - Browser and version
  - Operating system
  - Node.js version (for build issues)

#### 💡 Suggesting Features

Have a great idea? We'd love to hear it!

**Feature requests should include**:
- Clear feature description
- Why this feature is needed (use cases)
- Possible implementation approach (if you have ideas)
- Whether you're willing to implement it

#### 📝 Improving Documentation

Documentation can always be better! You can:
- Fix typos
- Improve wording
- Add examples
- Translate documentation
- Fill in missing information

### Development Setup

#### Prerequisites

- Node.js >= 18.14.1
- Git
- Code editor (VS Code recommended)

#### Installation Steps

1. **Fork the repository**
   
   Click the "Fork" button at the top right of the GitHub page

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/AlexanderJ-Carter.github.io.git
   cd AlexanderJ-Carter.github.io
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```
   
   Visit http://localhost:4321

### Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/) specification.

#### Commit Message Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

#### Type Values

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting (doesn't affect code execution)
- `refactor`: Code refactoring (neither fixes a bug nor adds a feature)
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Build process or auxiliary tool changes
- `ci`: CI configuration file and script changes
- `revert`: Revert previous commit

#### Commit Examples

```bash
# New feature
git commit -m "feat(gallery): add image zoom functionality"

# Bug fix
git commit -m "fix(header): resolve mobile menu not closing"

# Documentation
git commit -m "docs(readme): add deployment instructions"

# Style
git commit -m "style(button): adjust padding and colors"

# Refactor
git commit -m "refactor(i18n): simplify translation loading logic"

# Performance
git commit -m "perf(images): implement lazy loading"
```

### Pull Request Process

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Format code with Prettier
5. Commit with conventional commits
6. Push to your fork
7. Create Pull Request
8. Wait for review

### Code Style

- Use TypeScript for type safety
- Follow Prettier configuration
- Use Tailwind CSS utility classes
- Write clear component documentation
- Keep components focused and reusable

### Testing Guidelines

- Test on multiple browsers
- Test responsive layouts
- Check accessibility
- Run Lighthouse audits
- Verify all links work

---

## 💖 感谢 / Thank You

感谢你为改进这个项目所做的贡献！

Thank you for contributing to improve this project!

---

Made with ❤️ by the community

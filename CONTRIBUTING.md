# Contributing to Alexander Carter's Personal Website

首先，感谢你对这个项目的关注！♥️

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Development Setup

1. **Fork and Clone the Repository**

```bash
git clone https://github.com/your-username/AlexanderJ-Carter.github.io.git
cd AlexanderJ-Carter.github.io
```

2. **Install Dependencies**

```bash
npm install
```

3. **Start Development Server**

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

## Development Workflow

### Making Changes

1. Create a new branch for your changes:

```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and test them locally:

```bash
npm run build      # Build the site
npx astro check    # Type checking
npx prettier --write .  # Format code
```

3. Ensure all checks pass:

```bash
npm audit          # Security audit
npx astro check    # Type safety
npx prettier --check .  # Code formatting
```

4. Commit your changes with a clear message:

```bash
git commit -m "feat: describe your changes"
```

Use conventional commit prefixes:

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation
- `style:` formatting
- `refactor:` code restructuring
- `perf:` performance improvements
- `chore:` maintenance tasks
- `security:` security improvements

### Submitting a Pull Request

1. Push your branch to your fork
2. Open a Pull Request against the `main` branch
3. Fill out the PR template with details about your changes
4. Wait for feedback and address any review comments

## Code Standards

### TypeScript

- Use strict type checking (`astro/tsconfigs/strict`)
- Define `Props` interface for all Astro components
- Use proper typing for function parameters and returns

### CSS & Styling

- Use Tailwind CSS utility classes
- Follow the dark mode pattern with `dark:` prefix
- Organize styles in `src/styles/global.css`

### Component Structure

Components should follow this pattern:

```astro
---
// Imports
import SomeComponent from '../components/SomeComponent.astro';

// Types
interface Props {
  lang: string;
  title?: string;
}

// Variables
const { lang, title } = Astro.props;
---

<!-- HTML -->
<div class="container">
  <!-- Component content -->
</div>
```

### i18n (Internationalization)

Use the template pattern for i18n:

```astro
---
import SomeTemplate from '../components/templates/SomeTemplate.astro';
---

<SomeTemplate lang="zh-CN" />
```

Update translations in `src/i18n/ui.ts`.

## Testing

While this project doesn't have automated tests, you should:

1. Test locally with `npm run dev`
2. Verify the build succeeds: `npm run build`
3. Test across different languages if making content changes
4. Check in both light and dark modes

## Reporting Issues

If you find a bug or have a suggestion:

1. **Security Issues**: Please refer to [SECURITY.md](./.github/SECURITY.md) - **do not** open a public issue for security vulnerabilities.

2. **Regular Issues**: Use the [GitHub Issues](https://github.com/AlexanderJ-Carter/AlexanderJ-Carter.github.io/issues) page.

3. **Feature Requests**: Use the Feature Request issue template.

## Project Structure

```
├── .github/
│   ├── workflows/      # GitHub Actions CI/CD
│   ├── SECURITY.md     # Security policy
│   └── CODEOWNERS      # Code ownership
├── public/             # Static assets
│   ├── .well-known/
│   ├── img/
│   ├── music/
│   └── security/
├── src/
│   ├── components/     # Reusable components
│   ├── layouts/
│   ├── pages/          # Page routes
│   ├── i18n/           # Translations
│   ├── scripts/        # Client-side JS
│   └── styles/         # Global styles
├── docs/               # Documentation
├── LICENSE             # BSD 3-Clause (source code)
├── NOTICE              # Content license (CC BY-NC-ND 4.0)
└── CHANGELOG.md        # Version history
```

## Available Scripts

```bash
npm run dev            # Start development server
npm run build          # Build the project
npm run preview        # Preview built site
npm run generate-music # Generate music manifest
npm audit              # Check for vulnerabilities
npx prettier --write . # Format all files
npx astro check        # Run TypeScript check
```

## Performance Considerations

- The site uses Astro Islands for zero-client-JS by default
- Only hydrate interactive components with `client:` directives
- Use static generation as much as possible
- Optimize images with appropriate formats

## Accessibility

When making changes:

- Ensure headings have proper hierarchy (h1 → h2 → h3)
- Add alt text to all images
- Use semantic HTML (button, nav, main, etc.)
- Test keyboard navigation
- Verify color contrast ratios

## License

- **Source Code**: BSD 3-Clause License (see [LICENSE](./LICENSE))
- **Content**: CC BY-NC-ND 4.0 (see [NOTICE](./NOTICE))

By contributing, you agree that your contributions will be licensed under the same terms.

## Questions?

Feel free to:

- Open a discussion
- Check existing issues for similar questions
- Review the project documentation

---

Happy coding! 🚀

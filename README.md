# MarkDown Help Center - A Markdown-Based Knowledge Base

A modern, fast, and customizable help center built with Next.js shadcn and TypeScript. Create beautiful documentation and knowledge bases using simple Markdown files.

## Features

- 📝 **Markdown-Based Content** - Write articles in simple Markdown format
- 🎨 **Beautiful UI** - Clean, responsive design with dark/light mode support
- 🔍 **Smart Search** - Fast client-side search across all articles
- 📁 **Category Organization** - Organize content into categories with custom ordering
- ⚡ **Fast Performance** - Built with Next.js for optimal speed and SEO
- 🎯 **Easy Customization** - Configure branding, colors, and layout through config files
- 📱 **Mobile Responsive** - Works perfectly on all devices

## Purpose

This help center is designed for teams who want to:

- Create customer support documentation
- Build internal knowledge bases
- Provide self-service support options
- Reduce support ticket volume
- Maintain easily editable documentation

## Getting Started

### 1. Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd help-center

# Install dependencies
npm install
# or
yarn install
```

### 2. Add Your Content

Create Markdown files in the `content` directory organized by category:

```
content/
├── getting-started/
│   ├── why-knowledge-base.md
│   └── setup-guide.md
├── customization/
│   ├── branding.md
│   └── themes.md
└── general-info/
    └── faq.md
```

Each Markdown file should include frontmatter:

```markdown
---
title: Your Article Title
description: Brief description of the article
category: Getting Started
slug: your-article-slug
order: 1
---

# Your Article Content

Write your content here using standard Markdown syntax.
```

**Frontmatter Fields:**

- `title`: The article title (required)
- `description`: Brief description shown in search results and category pages (required)
- `category`: Category name that matches your folder structure (required)
- `slug`: URL-friendly identifier for the article (required)
- `order`: Number to control the display order within the category (lower numbers appear first)

### 3. Configure Your Help Center

Edit `lib/config.ts` to customize:

- Site name and branding
- Category ordering
- Primary colors
- Logo and styling

### 4. Theming

For theming, visit [shadcn/ui themes](https://ui.shadcn.com/themes) and copy the code, replacing only the `:root` and `.dark` parts of the `globals.css` file. Make sure to add back the custom variables for the hero search gradient to the `:root` section:

```css
:root {
  /* Your shadcn theme variables here */

  /* Custom hero search gradient variables */
  --gradient-from: #f43f5e;
  --gradient-via: #e11d48;
  --gradient-to: #be185d;
}
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see your help center.

### 6. Customize and Deploy

- Modify the design in the components directory
- Update branding and colors in the config
- Deploy to Vercel, Netlify, or your preferred hosting platform

## Content Management

### Adding New Articles

1. Create a new `.md` file in the appropriate category folder
2. Add the required frontmatter (title, description, category, slug)
3. Write your content in Markdown
4. The article will automatically appear in your help center

### Creating New Categories

1. Create a new folder in the `content` directory
2. Add the category to `lib/config.ts` with desired ordering
3. Add articles to the new category folder

### Supported Markdown Features

- Headers, lists, and basic formatting
- Code blocks with syntax highlighting
- Tables and links
- Images and media
- GitHub Flavored Markdown (GFM)

## Customization

The help center is highly customizable:

- **Branding**: Update logo, colors, and site name in config
- **Categories**: Define custom category order and descriptions
- **Styling**: Modify Tailwind CSS classes and components
- **Layout**: Customize the overall layout and navigation

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Remark/Rehype** - Markdown processing
- **Lucide Icons** - Beautiful icon set

## Deploy on Vercel

The easiest way to deploy your help center:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE)

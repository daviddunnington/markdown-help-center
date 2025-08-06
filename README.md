# MarkDown Help Center - A Markdown-Based Knowledge Base

A modern, fast, and customizable help center built with Next.js shadcn and TypeScript. Create beautiful documentation and knowledge bases using simple Markdown files.

## 🌐 Demo

Check out the live demo: **[https://markdown-help-center.vercel.app/](https://markdown-help-center.vercel.app/)**

![Markdown Help Center Screenshot](/public/images/markdown-help-center.png)

## Features

- 📝 **Markdown-Based Content** - Write articles in simple Markdown format
- 🎨 **Beautiful UI** - Clean, responsive design with dark/light mode support
- 🔍 **Smart Search** - Fast client-side search across all articles
- 📁 **Category Organization** - Organize content into categories with custom ordering and emoji icons
- 🏷️ **Article Tags** - Group related articles with tags for better organization
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
tag: "beginner"
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
- `tag`: Optional tag to group related articles together (e.g., "beginner", "advanced", "feature")

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
2. Create a `_category.md` file in the folder with the following frontmatter:
   ```markdown
   ---
   title: Category Display Title
   name: Category Name
   description: A brief description of this category
   order: 1
   emoji: 🚀
   ---
   ```
3. Add articles to the new category folder

**Required Category Fields:**

- **title**: Display title for the category
- **name**: Internal name for navigation
- **description**: Brief description for the category card
- **order**: Numeric order for sorting (lower numbers first)
- **emoji**: Emoji icon displayed on the category card

**Example Category Structure:**

```
content/
├── getting-started/
│   ├── _category.md          # Category configuration
│   ├── setup-guide.md
│   └── first-steps.md
├── advanced-features/
│   ├── _category.md          # Category configuration
│   ├── api-integration.md
│   └── customization.md
```

## Article Tags

Tags provide an additional way to group and organize related articles within categories. When articles have tags, they are automatically grouped together in the UI for better organization.

![Article Tags Example](/images/tags.png)

### How Tags Work

- Add a `tag` field to any article's frontmatter
- Articles with the same tag are automatically grouped together
- Tagged articles appear under their tag heading
- Untagged articles appear separately at the bottom
- Tags are displayed as badges on article cards for easy identification

### Adding Tags to Articles

Simply add a `tag` field to your article's frontmatter:

```markdown
---
title: Getting Started Guide
description: Learn how to set up your help center
category: Getting Started
slug: setup-guide
order: 1
tag: "installation"
---

# Your article content here
```

### Tag Examples

Common tag patterns include:

- **Difficulty levels**: `"beginner"`, `"intermediate"`, `"advanced"`
- **Content types**: `"tutorial"`, `"reference"`, `"troubleshooting"`
- **Features**: `"search"`, `"customization"`, `"api"`
- **Audience**: `"developers"`, `"administrators"`, `"end-users"`

### Tag Display

When articles in a category have tags:

1. **Grouped Display**: Articles are grouped under their respective tag headings
2. **Badge Display**: Each article shows its tag as a colored badge
3. **Alphabetical Sorting**: Tag groups are sorted alphabetically
4. **Article Sorting**: Within each tag group, articles are sorted by their `order` field, then alphabetically

### Best Practices

- Use consistent tag naming (lowercase, descriptive)
- Keep tag names short and meaningful
- Use tags sparingly - not every article needs a tag
- Consider your audience when choosing tag names

### Supported Markdown Features

- Headers, lists, and basic formatting
- Code blocks with syntax highlighting
- Tables and links
- Images and media
- GitHub Flavored Markdown (GFM)

## Customization

The help center is highly customizable:

- **Branding**: Update logo, colors, and site name in config
- **Categories**: Configure categories using `_category.md` frontmatter files in each category folder
- **Styling**: Modify Tailwind CSS classes and components
- **Layout**: Customize the overall layout and navigation

## Authentication (Optional)

The help center supports optional authentication via Clerk. When enabled, you can control access to content and the editor.

### Setup Authentication

1. **Install Clerk** (already included in dependencies)

2. **Get Clerk Keys**: Sign up at [Clerk.dev](https://clerk.dev) and get your API keys from the dashboard

3. **Environment Variables**: Copy `.env.example` to `.env.local` and add your Clerk keys:

   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

4. **Configure Authentication**: Update `lib/config.ts`:
   ```typescript
   export const siteConfig: SiteConfig = {
     // ...existing config
     auth: {
       enabled: true, // Set to true to enable auth
       protect: {
         content: false, // true = all content requires login
         editor: true, // true = editor requires login
       },
       // Clerk keys are loaded from environment variables
     },
   };
   ```

### Authentication Features

- **Configurable Protection**: Choose what requires authentication (content, editor, or both)
- **Graceful Fallback**: Works perfectly with auth disabled
- **User Management**: Built-in user profiles and session management
- **Sign-in Page**: Automatic redirect to `/sign-in` for protected content
- **User Button**: Shows user avatar and logout option when authenticated

### Usage Examples

```typescript
// Protect content conditionally
if (siteConfig.auth.enabled && siteConfig.auth.protect.content) {
  // Show sign-in form
} else {
  // Show public content
}
```

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **shadcn/ui** - Accessible and customizable React component library built with Tailwind CSS
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

---
title: Complete Setup Guide
description: Step-by-step guide to set up and configure your help center from scratch
category: Getting Started
slug: setup-guide
order: 3
tag: "installation"
---

# Complete Setup Guide

This comprehensive guide will walk you through setting up your help center from initial installation to deployment.

## Prerequisites

Before you begin, make sure you have:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- A code editor (VS Code recommended)

## Step 1: Installation

### Clone the Repository

```bash
# Clone the repository
git clone <your-repo-url>
cd help-center

# Install dependencies
npm install
# or if you prefer yarn
yarn install
```

### Verify Installation

Run the development server to ensure everything is working:

```bash
npm run dev
```

Visit `http://localhost:3000` to see your help center running locally.

## Step 2: Basic Configuration

### Update Site Information

1. Open `lib/config.ts`
2. Update the basic site configuration:

```typescript
export const siteConfig: SiteConfig = {
  siteName: "Your Company Help Center",
  siteDescription: "Get help and support for our products",
  logo: {
    icon: "HelpCircle", // Choose from Lucide icons
    alt: "Your Company Logo",
  },
  links: {
    website: "https://your-company.com",
    changelog: "/changelog",
    twitter: "https://twitter.com/yourcompany",
    github: "https://github.com/yourcompany/repo",
  },
};
```

### Configure Categories

Update the category ordering to match your content structure:

```typescript
export const CategoryOrder: Record<string, number> = {
  "Getting Started": 1,
  "Product Guides": 2,
  Troubleshooting: 3,
  "API Documentation": 4,
  "General Info": 5,
};
```

## Step 3: Content Creation

### Understanding the Content Structure

Your content is organized in the `content/` directory:

```
content/
├── getting-started/
│   ├── setup-guide.md
│   └── why-knowledge-base.md
├── customization/
│   ├── branding.md
│   └── themes.md
└── general-info/
    └── search-functionality.md
```

### Creating Your First Article

1. Create a new Markdown file in the appropriate category folder
2. Add the required frontmatter:

```markdown
---
title: Your Article Title
description: Brief description for SEO and search
category: Getting Started
slug: your-url-slug
order: 1
---

# Your Article Title

Write your content here using Markdown syntax.
```

### Frontmatter Fields

- **title**: The display title of your article
- **description**: Used for SEO meta tags and search results
- **category**: Must match a category in your `CategoryOrder`
- **slug**: The URL path for the article (should be URL-friendly)
- **order**: (Optional) Numeric value to control the display order within a category (lower numbers appear first)

## Step 4: Customization

### Branding Your Help Center

Follow the detailed [Branding Guide](branding) to:

- Set up your logo and company information
- Configure external links
- Customize site metadata

### Applying Themes

Follow the [Theming Guide](theming-your-site) to:

- Choose and apply shadcn/ui themes
- Customize colors and gradients
- Set up dark mode support

### Custom Favicon

Replace `app/favicon.ico` with your company's favicon.

## Step 5: Content Organization

### Best Practices for Articles

1. **Use descriptive titles** - Make them searchable and clear
2. **Write good descriptions** - These appear in search results
3. **Organize logically** - Group related articles in the same category
4. **Use consistent slugs** - Keep URLs clean and predictable
5. **Set logical order** - Use the order field to control display sequence within categories

### Category Management

1. **Plan your structure** - Think about user journeys
2. **Use logical ordering** - Most important categories first
3. **Keep it simple** - Don't create too many categories initially
4. **Be consistent** - Use the same category names in frontmatter

### Writing Effective Content

- Use clear, simple language
- Include code examples where relevant
- Add screenshots and images for visual guides
- Break up long content with headers
- Include links to related articles

## Step 6: Testing and Validation

### Local Testing

1. **Run the development server**:

   ```bash
   npm run dev
   ```

2. **Test all functionality**:

   - Navigation between articles
   - Search functionality
   - Dark/light mode toggle
   - Mobile responsiveness

3. **Validate content**:
   - Check all links work
   - Verify images load correctly
   - Test search with various keywords

### Content Validation

- Ensure all articles have proper frontmatter
- Check category names match your configuration
- Verify slugs are unique and URL-friendly
- Test internal links between articles

## Step 7: Production Build

### Build for Production

```bash
# Create production build
npm run build

# Test production build locally
npm start
```

### Pre-deployment Checklist

- [ ] All content reviewed and proofread
- [ ] Site configuration updated with correct URLs
- [ ] Favicon replaced with company logo
- [ ] External links tested and working
- [ ] SEO metadata complete
- [ ] Performance tested with production build

## Step 8: Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:

   ```bash
   git add .
   git commit -m "Initial help center setup"
   git push origin main
   ```

2. **Connect to Vercel**:

   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy with default settings

3. **Configure custom domain** (optional):
   - Add your domain in Vercel dashboard
   - Update DNS settings as instructed

### Alternative Deployment Options

- **Netlify**: Similar process to Vercel
- **GitHub Pages**: For public repositories
- **Your own server**: Build and serve the `out` directory

## Step 9: Ongoing Maintenance

### Adding New Content

1. Create new Markdown files in appropriate categories
2. Update `CategoryOrder` if adding new categories
3. Test locally before deploying
4. Push changes to trigger automatic deployment

### Content Updates

- Keep articles current and accurate
- Regular review of external links
- Update screenshots and examples
- Monitor search analytics if available

### Performance Monitoring

- Check Core Web Vitals
- Monitor page load speeds
- Review user feedback
- Optimize images and content as needed

## Troubleshooting

### Common Issues

**Build Errors**:

- Check frontmatter syntax in all Markdown files
- Verify category names match configuration
- Ensure all required fields are present

**Content Not Appearing**:

- Verify file is in correct directory
- Check frontmatter format
- Ensure category exists in `CategoryOrder`

**Search Not Working**:

- Check content is being generated correctly
- Verify search component is properly imported
- Test with different search terms

**Styling Issues**:

- Verify theme variables are correctly applied
- Check custom CSS doesn't conflict
- Test in different browsers

## Next Steps

Now that your help center is set up:

1. **Create comprehensive content** - Add articles for common user questions
2. **Gather feedback** - Share with team members and users
3. **Iterate and improve** - Regularly update based on user needs
4. **Monitor usage** - Consider adding analytics to understand user behavior

## Getting Help

If you encounter issues:

1. Check the existing articles in this help center
2. Review the [troubleshooting section](#troubleshooting)
3. Check the GitHub repository for issues and discussions
4. Consider the community forums or support channels

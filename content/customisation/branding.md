---
title: Branding Your Help Center
description: Learn how to customize your help center's branding, logo, and site information
category: Customisation
slug: branding
order: 1
---

# Branding Your Help Center

Customize your help center's branding to match your company's identity and provide a consistent user experience.

## Site Configuration

All branding settings are managed in the `lib/config.ts` file. Here's what you can customize:

### Site Name and Description

```typescript
export const siteConfig: SiteConfig = {
  siteName: "Your Company Help Center",
  siteDescription: "Get help and support for our products",
  // ... other settings
};
```

- **siteName**: Appears in the header and browser title
- **siteDescription**: Used for SEO and meta descriptions

### Logo Configuration

You can use either a Lucide icon or a custom image for your logo:

#### Using a Lucide Icon

```typescript
logo: {
  icon: "HelpCircle", // Any Lucide icon name
  alt: "Help Center Logo",
}
```

Popular icon options:

- `HelpCircle` - Help/support themed
- `BookOpen` - Documentation themed
- `Zap` - Modern/tech themed
- `Shield` - Security/trust themed

#### Using a Custom Image

```typescript
logo: {
  icon: "/images/your-logo.png", // Path to your image
  alt: "Your Company Logo",
}
```

Make sure to:

1. Place your logo file in the `public/images/` directory
2. Use appropriate dimensions (recommended: 32x32px or 40x40px)
3. Provide descriptive alt text for accessibility

## External Links

Configure links to your main website and social profiles:

```typescript
links: {
  website: "https://your-company.com",
  changelog: "/changelog",
  twitter: "https://twitter.com/yourcompany",
  github: "https://github.com/yourcompany/repo",
}
```

These links appear in the header and footer of your help center.

## Best Practices

### Logo Guidelines

- Keep logos simple and recognizable at small sizes
- Use SVG format for crisp display on all devices
- Ensure good contrast with both light and dark themes

### Naming Conventions

- Use clear, descriptive site names
- Keep descriptions concise but informative
- Maintain consistency with your main brand

### Brand Consistency

- Match your main website's color scheme using themes
- Use consistent terminology and voice
- Align with your existing brand guidelines

## Examples

### Tech Startup

```typescript
export const siteConfig: SiteConfig = {
  siteName: "TechCorp Support",
  siteDescription: "Technical documentation and support for TechCorp products",
  logo: {
    icon: "Zap",
    alt: "TechCorp Logo",
  },
  links: {
    website: "https://techcorp.com",
    github: "https://github.com/techcorp",
  },
};
```

### SaaS Company

```typescript
export const siteConfig: SiteConfig = {
  siteName: "CloudApp Help Center",
  siteDescription: "Get the most out of CloudApp with our comprehensive guides",
  logo: {
    icon: "/images/cloudapp-logo.svg",
    alt: "CloudApp Logo",
  },
  links: {
    website: "https://cloudapp.com",
    changelog: "/changelog",
    twitter: "https://twitter.com/cloudapp",
  },
};
```

## Next Steps

After updating your branding configuration:

1. **Test your changes** - Run the development server to see your updates
2. **Add custom themes** - See the [Theming Guide](theming-your-site) for color customization
3. **Create a favicon** - Replace `app/favicon.ico` with your company favicon
4. **Update meta tags** - Consider adding Open Graph images for social sharing

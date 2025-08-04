---
title: Theming Your Help Center
description: Customize colors, fonts, and visual styling using shadcn/ui themes
category: Customisation
slug: themes
order: 2
---

# Theming Your Help Center

Customize the visual appearance of your help center using shadcn/ui themes and CSS variables.

## Table of Contents

- [Using shadcn/ui Themes](#using-shadcnui-themes)
- [Custom Gradient Variables](#custom-gradient-variables)
- [Popular Theme Examples](#popular-theme-examples)
- [Advanced Customization](#advanced-customization)
- [Dark Mode Support](#dark-mode-support)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Next Steps](#next-steps)

## Using shadcn/ui Themes

The easiest way to theme your help center is by using pre-built themes from shadcn/ui.

### Step 1: Choose a Theme

1. Visit [shadcn/ui themes](https://ui.shadcn.com/themes)
2. Browse the available themes and find one that matches your brand
3. Click on your preferred theme to view its CSS variables

### Step 2: Apply the Theme

1. Copy the CSS variables from the theme page
2. Open `app/globals.css` in your help center
3. Replace **only** the `:root` and `.dark` sections with the new theme variables
4. **Important**: Add back the custom gradient variables for the hero search

```css
:root {
  /* shadcn theme variables */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... other theme variables ... */

  /* Custom hero search gradient variables - ADD THESE BACK */
  --gradient-from: #f43f5e;
  --gradient-via: #e11d48;
  --gradient-to: #be185d;
}

.dark {
  /* Dark mode theme variables */
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... other dark theme variables ... */
}
```

## Custom Gradient Variables

The hero search section uses custom gradient variables that create the beautiful search bar background. These must be preserved when applying new themes:

```css
--gradient-from: #f43f5e; /* Rose 500 */
--gradient-via: #e11d48; /* Rose 600 */
--gradient-to: #be185d; /* Rose 700 */
```

### Customizing the Gradient

You can modify these values to match your brand colors:

```css
/* Blue gradient example */
--gradient-from: #3b82f6; /* Blue 500 */
--gradient-via: #2563eb; /* Blue 600 */
--gradient-to: #1d4ed8; /* Blue 700 */

/* Purple gradient example */
--gradient-from: #8b5cf6; /* Violet 500 */
--gradient-via: #7c3aed; /* Violet 600 */
--gradient-to: #6d28d9; /* Violet 700 */

/* Green gradient example */
--gradient-from: #10b981; /* Emerald 500 */
--gradient-via: #059669; /* Emerald 600 */
--gradient-to: #047857; /* Emerald 700 */
```

## Popular Theme Examples

### Default Theme (Zinc)

Clean and professional with neutral grays.

### Blue Theme

Great for tech companies and professional services.

### Rose Theme

Perfect for creative agencies and modern brands.

### Green Theme

Ideal for environmental, health, or growth-focused companies.

### Violet Theme

Excellent for innovative or creative technology companies.

## Advanced Customization

### Custom CSS Variables

You can add your own CSS variables for consistent styling:

```css
:root {
  /* Your theme variables */

  /* Custom brand variables */
  --brand-primary: #your-color;
  --brand-secondary: #your-color;
  --brand-accent: #your-color;
}
```

### Component Styling

Individual components can be customized by modifying their CSS classes:

```css
/* Custom header styling */
.header-custom {
  background: var(--brand-primary);
}

/* Custom card styling */
.card-custom {
  border: 1px solid var(--brand-accent);
}
```

### Typography

Customize fonts by updating the Tailwind CSS configuration in `tailwind.config.ts`:

```typescript
export default {
  // ... other config
  theme: {
    extend: {
      fontFamily: {
        sans: ["Your Font", "sans-serif"],
        mono: ["Your Mono Font", "monospace"],
      },
    },
  },
};
```

## Dark Mode Support

All shadcn/ui themes include automatic dark mode support. The theme will automatically switch based on user preference or system settings.

### Testing Dark Mode

1. Use your browser's developer tools
2. Toggle the color scheme preference
3. Or use the system dark mode toggle

## Best Practices

### Color Accessibility

- Ensure sufficient contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Test with color blindness simulators
- Verify readability in both light and dark modes

### Brand Consistency

- Choose colors that align with your existing brand palette
- Use consistent color ratios across theme variables
- Test the theme across different pages and components

### Performance

- CSS variables are efficient and fast
- Avoid inline styles when possible
- Keep custom CSS minimal

## Troubleshooting

### Theme Not Applying

- Make sure you replaced the correct sections in `globals.css`
- Check for CSS syntax errors
- Verify the file is saved and the dev server restarted

### Missing Gradient

- Ensure you added back the custom gradient variables
- Check the variable names match exactly
- Verify the values are valid CSS colors

### Dark Mode Issues

- Confirm both `:root` and `.dark` sections are updated
- Test with system dark mode enabled
- Check for missing dark mode variable definitions

## Next Steps

After applying your theme:

1. **Test thoroughly** - Check all pages and components
2. **Customize branding** - Update logo and site information in [Branding](branding)
3. **Add custom elements** - Consider custom CSS for unique brand elements
4. **Get feedback** - Test with users and iterate on the design

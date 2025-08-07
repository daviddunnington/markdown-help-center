---
title: "Content Editor"
description: "Create and edit articles with our built-in markdown editor"
category: Features
tag: "Live"
order: 1
---

# Content Editor Feature

## Overview

The **Content Editor** is a powerful, built-in markdown editor that allows you to create and edit articles directly within your help center. No need for external editors or complex setup - everything you need is right at your fingertips.

![Content Editor Interface](/images/content-editor.png)

---

## Accessing the Editor

Navigate to `/editor` to access the content creation interface. The editor provides a comprehensive workflow for creating both individual articles and entire categories.

---

## Key Features

### 📝 **Rich Markdown Editor**

- Live markdown preview as you type
- Syntax highlighting for better readability
- Support for all standard markdown elements
- Code blocks with language-specific highlighting

### 🏷️ **Article Metadata Management**

- **Title**: Set your article's display title
- **Description**: Add SEO-friendly descriptions
- **Category**: Organize articles into logical groups
- **Tags**: Add searchable tags for better discovery
- **Order**: Control the display order within categories

### 📁 **Category Management**

- Create new categories on-the-fly
- Set category metadata (title, description, emoji, order)
- Automatic category configuration file generation
- Visual category organization

### 🎨 **User-Friendly Interface**

- Clean, distraction-free writing environment
- Responsive design works on all devices
- Intuitive form controls and validation
- Real-time preview updates

---

## How to Use

### Creating a New Article

1. **Navigate to Editor**: Go to `/editor` in your help center
2. **Fill Article Details**:

   - Enter a descriptive title
   - Add a brief description for SEO
   - Select or create a category
   - Add relevant tags
   - Set display order (optional)

3. **Write Content**: Use the markdown editor to create your content
4. **Preview**: Check the live preview to see how it will look
5. **Save/Export**: Download the file or commit directly to GitHub

### Creating a New Category

1. **Enable Category Creation**: Toggle "Create new category" option
2. **Set Category Details**:
   - Category title and description
   - Choose an emoji icon
   - Set category display order
3. **Create Article**: Complete your first article in the new category
4. **Generate Files**: The system creates both `_category.md` and your article file

---

## Markdown Support

The editor supports full markdown syntax including:

### Text Formatting

- **Bold** and _italic_ text
- ~~Strikethrough~~
- `Inline code`
- > Blockquotes

### Lists and Structure

- Numbered lists
- Bulleted lists
- Nested lists
- Horizontal rules (`---`)

### Code Blocks

```javascript
// Syntax highlighting for multiple languages
function example() {
  console.log("Hello, world!");
}
```

### Links and Images

- [External links](https://example.com)
- Internal navigation links
- Image embedding support

### Tables

| Feature  | Status  | Notes            |
| -------- | ------- | ---------------- |
| Markdown | ✅ Live | Full support     |
| Preview  | ✅ Live | Real-time        |
| Export   | ✅ Live | Multiple formats |

---

## Export Options

### 📥 **Download Files**

- Download individual article files
- Download category configuration files
- Get properly formatted frontmatter

### 🚀 **GitHub Integration**

- Commit articles directly to your repository
- Automatic file organization
- Version control integration
- Team collaboration support

---

## Validation and Error Handling

The editor includes comprehensive validation:

- **Required Fields**: Ensures all necessary metadata is present
- **Format Validation**: Checks markdown syntax and structure
- **Category Validation**: Prevents duplicate or invalid categories
- **Real-time Feedback**: Immediate error highlighting and suggestions

---

## Benefits

### For Content Creators

- 🎯 **Focused Writing**: Distraction-free environment
- 👀 **Live Preview**: See results immediately
- 📋 **Structured Input**: Guided forms prevent errors
- 🔄 **Flexible Workflow**: Edit, preview, and publish seamlessly

### For Site Administrators

- 🏗️ **Consistent Structure**: Enforced metadata standards
- 📊 **Organized Content**: Automatic categorization
- 🔧 **Easy Management**: Simple content organization
- 🚀 **Quick Publishing**: Streamlined content deployment

---

## Tips and Best Practices

### Writing Effective Content

- Use clear, descriptive titles
- Write concise but comprehensive descriptions
- Organize content with proper headings
- Include relevant examples and code snippets

### Category Organization

- Keep categories focused and specific
- Use descriptive category names
- Set logical order values for better navigation
- Add appropriate emojis for visual appeal

### SEO Optimization

- Write descriptive meta descriptions
- Use relevant tags for searchability
- Structure content with proper headings
- Include internal links where appropriate

---

## Keyboard Shortcuts

- `Ctrl/Cmd + B` - Bold text
- `Ctrl/Cmd + I` - Italic text
- `Ctrl/Cmd + K` - Insert link
- `Tab` - Indent (in lists)
- `Shift + Tab` - Outdent (in lists)

---

## Future Enhancements

The content editor is continuously being improved with planned features:

- 🖼️ **Image Upload**: Direct image hosting and embedding
- 📎 **File Attachments**: Support for downloadable resources
- 🔍 **Advanced Search**: Content search within the editor
- 👥 **Collaborative Editing**: Real-time multi-user editing
- 📱 **Mobile Optimization**: Enhanced mobile editing experience

---

> The Content Editor transforms content creation from a technical task into an intuitive, enjoyable experience. Whether you're creating a single article or building an entire knowledge base, the editor provides all the tools you need in one integrated interface.

---
title: Complete Markdown Test
description: A comprehensive test of all markdown features
category: Getting Started
slug: complete-markdown-test
order: 4
tag: "advanced"
---

# Complete Markdown Feature Test

This article demonstrates all supported markdown features in your help center.

## Headings

# H1 Heading

## H2 Heading

### H3 Heading

#### H4 Heading

##### H5 Heading

###### H6 Heading

## Text Formatting

This is **bold text** and this is _italic text_.

You can also use **bold** and _italic_ with underscores.

**_This text is both bold and italic._**

~~This text is strikethrough.~~

## Lists

### Unordered Lists

- Item 1
- Item 2
  - Nested item A
  - Nested item B
    - Double nested item
- Item 3

### Ordered Lists

1. First item
2. Second item
   1. Nested numbered item
   2. Another nested item
3. Third item

### Task Lists

- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task
- [ ] Another incomplete task

## Links and Images

Here's a [link to example.com](https://example.com).

Here's an image (replace with actual image URL):
![Sample Image](/images/superman.jpg)

## Video Embeds

### YouTube Video (Option 1: Direct iframe)

<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### YouTube Video (Option 2: With wrapper for better responsive design)

<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

### Vimeo Video

<iframe src="https://player.vimeo.com/video/449787858" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>

**How to get YouTube embed URLs:**

1. Go to your YouTube video
2. Click "Share"
3. Click "Embed"
4. Copy the iframe code or just the URL from `src="..."`
5. Replace `watch?v=` with `embed/` if using direct URL

## Code

### Inline Code

Use `npm install` to install packages. The `console.log()` function prints to console.

### Code Blocks

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
  return `Welcome, ${name}`;
}

greet("World");
```

```python
def calculate_sum(a, b):
    """Calculate the sum of two numbers."""
    result = a + b
    print(f"The sum of {a} and {b} is {result}")
    return result

calculate_sum(5, 3)
```

## Blockquotes

> This is a simple blockquote.
> It can span multiple lines.

> This is a blockquote with **bold text** and _italic text_.
>
> It can also contain multiple paragraphs.

## Tables

| Feature     | Supported | Notes                 |
| ----------- | --------- | --------------------- |
| Headers     | ✅        | All heading levels    |
| Bold/Italic | ✅        | Multiple syntaxes     |
| Lists       | ✅        | Nested and task lists |
| Tables      | ✅        | With alignment        |
| Code        | ✅        | Inline and blocks     |

### Table with Alignment

| Left Aligned | Center Aligned | Right Aligned |
| :----------- | :------------: | ------------: |
| Left text    |  Center text   |    Right text |
| More left    |  More center   |    More right |

## Horizontal Rules

Text above the rule.

---

Text below the rule.

---

Another rule style.

---

And another rule style.

## Escaping Characters

You can escape special characters with backslashes:

\*This text has literal asterisks\*

\# This is not a heading

\[This is not a link\]

## Mixed Content Example

Here's a complex example combining multiple features:

### Recipe: Markdown Soup 🍲

**Ingredients:**

- _2 cups_ of **heading tags**
- ~~1 tablespoon~~ 2 tablespoons of `emphasis`
- A pinch of [links](https://example.com)
- Fresh **lists** (ordered or unordered)

**Instructions:**

1. First, prepare your headings:

   ```markdown
   # Main Heading

   ## Subheading
   ```

2. Mix in some emphasis:

   - **Bold** for important points
   - _Italic_ for subtle emphasis
   - ~~Strikethrough~~ for corrections

3. Add tables for organization:

   | Step | Action | Result    |
   | ---- | ------ | --------- |
   | 1    | Mix    | Combined  |
   | 2    | Serve  | Delicious |

4. Finish with a blockquote:

   > "The best markdown is well-structured markdown."
   > — Anonymous Developer

**Notes:**

- [ ] Test all features
- [x] Verify rendering
- [ ] Update documentation

---

_This concludes our comprehensive markdown test!_

interface ArticleForm {
  title: string;
  description: string;
  category: string;
  tag?: string;
  order: number;
  content: string;
}

interface CategoryForm {
  title: string;
  description: string;
  emoji: string;
  order: number;
}

export const generateArticleFrontmatter = (
  form: ArticleForm,
  categoryTitle: string
): string => {
  const frontmatter = [
    "---",
    `title: "${form.title}"`,
    `description: "${form.description}"`,
    `category: ${categoryTitle}`,
    form.tag ? `tag: "${form.tag}"` : null,
    `order: ${form.order}`,
    "---",
    "",
    form.content,
  ]
    .filter(Boolean)
    .join("\n");

  return frontmatter;
};

export const generateCategoryFrontmatter = (
  categoryForm: CategoryForm,
  fallbackTitle: string
): string => {
  const categoryTitle = categoryForm.title || fallbackTitle;

  return [
    "---",
    `title: ${categoryTitle}`,
    `description: ${
      categoryForm.description || "Description for " + categoryTitle
    }`,
    `order: ${categoryForm.order}`,
    categoryForm.emoji ? `emoji: ${categoryForm.emoji}` : null,
    "---",
    "",
  ]
    .filter(Boolean)
    .join("\n");
};

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  content: string;
  order: number;
}

export interface CategoryConfig {
  title: string;
  name: string;
  description: string;
  order: number;
  emoji?: string;
}

const contentDirectory = path.join(process.cwd(), "content");

// Cache for category configurations
let categoryConfigCache: Map<string, CategoryConfig> | null = null;

export function getCategoryConfigs(): Map<string, CategoryConfig> {
  if (categoryConfigCache) {
    return categoryConfigCache;
  }

  const configs = new Map<string, CategoryConfig>();

  // Read all category directories
  const categoryDirs = fs
    .readdirSync(contentDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const categoryDir of categoryDirs) {
    const categoryPath = path.join(contentDirectory, categoryDir);
    const configPath = path.join(categoryPath, "_category.md");

    if (fs.existsSync(configPath)) {
      const fileContents = fs.readFileSync(configPath, "utf8");
      const { data } = matter(fileContents);

      configs.set(categoryDir, {
        title: data.title,
        name: data.name,
        description: data.description,
        order: data.order,
        emoji: data.emoji,
      });
    }
  }

  categoryConfigCache = configs;
  return configs;
}

export async function getAllArticles(): Promise<Article[]> {
  const articles: Article[] = [];

  function readDirectory(dir: string, category?: string) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Use directory name as category
        readDirectory(fullPath, item);
      } else if (item.endsWith(".md") && !item.startsWith("_")) {
        // Skip files that start with underscore (like _category.md)
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        const processedContent = remark()
          .use(remarkGfm)
          .use(remarkRehype, { allowDangerousHtml: true })
          .use(rehypeRaw)
          .use(rehypeSlug)
          .use(rehypeStringify)
          .processSync(content);

        articles.push({
          slug: data.slug || path.basename(item, ".md"),
          title: data.title || "Untitled",
          description: data.description || "",
          category: data.category || category || "General",
          content: processedContent.toString(),
          order: data.order || 999, // Default high number for undefined order
        });
      }
    }
  }

  readDirectory(contentDirectory);
  return articles;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getAllArticles();
  return articles.find((article) => article.slug === slug) || null;
}

export function getCategories(articles: Article[]) {
  const categoryConfigs = getCategoryConfigs();
  const categoryMap = new Map<
    string,
    {
      name: string;
      title: string;
      slug: string;
      description: string;
      count: number;
      articles: Array<{ slug: string; title: string; order: number }>;
      order: number;
      emoji?: string;
    }
  >();

  articles.forEach((article) => {
    if (!categoryMap.has(article.category)) {
      const catConfig =
        categoryConfigs.get(
          article.category.toLowerCase().replace(/\s+/g, "-")
        ) || categoryConfigs.get(article.category);

      if (catConfig) {
        categoryMap.set(article.category, {
          name: catConfig.name,
          title: catConfig.title,
          slug: article.category.toLowerCase().replace(/\s+/g, "-"),
          description: catConfig.description,
          count: 0,
          articles: [],
          order: catConfig.order,
          emoji: catConfig.emoji,
        });
      }
    }

    const category = categoryMap.get(article.category);
    if (category) {
      category.count++;
      category.articles.push({
        slug: article.slug,
        title: article.title,
        order: article.order,
      });
    }
  });

  // Sort categories by order, then by name
  const sortedCategories = Array.from(categoryMap.values()).sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order;
    }
    return a.name.localeCompare(b.name);
  });

  // Sort articles within each category by order, then by title
  sortedCategories.forEach((category) => {
    category.articles.sort((a, b) => {
      if (a.order !== b.order) {
        return a.order - b.order;
      }
      return a.title.localeCompare(b.title);
    });
  });

  return sortedCategories;
}

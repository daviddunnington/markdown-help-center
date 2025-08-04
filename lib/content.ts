import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import { CategoryOrder } from "./config";

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  content: string;
  order: number;
}

const contentDirectory = path.join(process.cwd(), "content");

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
      } else if (item.endsWith(".md")) {
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        const processedContent = remark()
          .use(remarkGfm)
          .use(remarkRehype, { allowDangerousHtml: true })
          .use(rehypeRaw)
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
  const categoryMap = new Map<
    string,
    {
      name: string;
      slug: string;
      description: string;
      count: number;
      articles: Array<{ slug: string; title: string; order: number }>;
      order: number;
    }
  >();

  articles.forEach((article) => {
    if (!categoryMap.has(article.category)) {
      categoryMap.set(article.category, {
        name: article.category,
        slug: article.category.toLowerCase().replace(/\s+/g, "-"),
        description: `Learn more about ${article.category.toLowerCase()}`,
        count: 0,
        articles: [],
        order: CategoryOrder[article.category] || 999, // Default high number for undefined categories
      });
    }

    const category = categoryMap.get(article.category)!;
    category.count++;
    category.articles.push({
      slug: article.slug,
      title: article.title,
      order: article.order,
    });
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

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
  order: number;
  content: string;
  tag?: string; // Changed from tags?: string[] to tag?: string
}

export interface Category {
  name: string;
  title: string;
  slug: string;
  description: string;
  count: number;
  articles: Array<{ slug: string; title: string }>;
  emoji?: string;
}

export interface TagGroup {
  tag: string;
  articles: Article[];
}

export async function getAllArticles(): Promise<Article[]> {
  const contentDir = path.join(process.cwd(), "content");
  const articles: Article[] = [];

  function readDirectory(dir: string, category: string = "") {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        readDirectory(filePath, file);
      } else if (file.endsWith(".md") && !file.startsWith("_")) {
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContent);

        const processedContent = remark()
          .use(remarkGfm)
          .use(remarkRehype, { allowDangerousHtml: true })
          .use(rehypeRaw)
          .use(rehypeSlug)
          .use(rehypeStringify)
          .processSync(content);

        articles.push({
          slug: file.replace(".md", ""),
          title: data.title || "Untitled",
          description: data.description || "",
          category: category || "uncategorized",
          order: data.order || 999,
          content: processedContent.toString(),
          tag: data.tag, // Changed from tags to tag
        });
      }
    }
  }

  readDirectory(contentDir);
  return articles;
}

export async function getArticleBySlug(
  category: string,
  slug: string
): Promise<Article | null> {
  const articles = await getAllArticles();
  return (
    articles.find(
      (article) =>
        article.category.toLowerCase().replace(/\s+/g, "-") === category &&
        article.slug === slug
    ) || null
  );
}

export function getCategories(articles: Article[]): Category[] {
  const categoryMap = new Map<
    string,
    {
      count: number;
      title: string;
      description: string;
      emoji?: string;
      articles: Array<{ slug: string; title: string }>;
    }
  >();
  const contentDir = path.join(process.cwd(), "content");

  // Read category metadata from _category.md files
  const categoryMetadata: Record<
    string,
    { title: string; description: string; emoji?: string }
  > = {};

  try {
    const dirs = fs.readdirSync(contentDir);
    for (const dir of dirs) {
      const dirPath = path.join(contentDir, dir);
      if (fs.statSync(dirPath).isDirectory()) {
        const categoryFile = path.join(dirPath, "_category.md");
        if (fs.existsSync(categoryFile)) {
          const fileContent = fs.readFileSync(categoryFile, "utf8");
          const { data } = matter(fileContent);
          categoryMetadata[dir] = {
            title: data.title || "",
            description: data.description || "",
            emoji: data.emoji,
          };
        }
      }
    }
  } catch (error) {
    console.error("Error reading category metadata:", error);
  }

  articles.forEach((article) => {
    const category = article.category;
    const current = categoryMap.get(category) || {
      count: 0,
      title: "",
      description: "",
      emoji: undefined,
      articles: [],
    };
    const metadata = categoryMetadata[category] || {
      title: "",
      description: "",
      emoji: undefined,
    };

    categoryMap.set(category, {
      count: current.count + 1,
      title: metadata.title,
      description: metadata.description,
      emoji: metadata.emoji,
      articles: [
        ...current.articles,
        { slug: article.slug, title: article.title },
      ],
    });
  });

  return Array.from(categoryMap.entries()).map(
    ([slug, { count, title, description, emoji, articles }]) => ({
      name: slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      title,
      slug,
      description: description,
      count,
      articles,
      emoji,
    })
  );
}

export function groupArticlesByTags(articles: Article[]): TagGroup[] {
  const tagGroups: { [key: string]: Article[] } = {};

  articles.forEach((article) => {
    if (article.tag) {
      if (!tagGroups[article.tag]) {
        tagGroups[article.tag] = [];
      }
      tagGroups[article.tag].push(article);
    }
  });

  return Object.entries(tagGroups)
    .map(([tag, articles]) => ({
      tag,
      articles: articles.sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) {
          return a.order - b.order;
        }
        if (a.order !== undefined) return -1;
        if (b.order !== undefined) return 1;
        return a.title.localeCompare(b.title);
      }),
    }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

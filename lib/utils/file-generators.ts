import JSZip from "jszip";
import {
  generateSlug,
  generateCategorySlug,
  formatCategoryTitle,
} from "../utils";
import {
  generateArticleFrontmatter,
  generateCategoryFrontmatter,
} from "./frontmatter-generator";

export interface ArticleForm {
  title: string;
  description: string;
  category: string;
  tag?: string;
  order: number;
  content: string;
}

export interface CategoryForm {
  title: string;
  description: string;
  emoji: string;
  order: number;
}

export interface GitHubFile {
  path: string;
  content: string;
}

export class FileGenerator {
  constructor(
    private form: ArticleForm,
    private categoryForm: CategoryForm,
    private isCustomCategory: boolean,
    private existingCategories: string[]
  ) {}

  private getCategoryTitle(): string {
    return this.isCustomCategory
      ? this.categoryForm.title || formatCategoryTitle(this.form.category)
      : this.existingCategories.includes(this.form.category)
      ? formatCategoryTitle(this.form.category)
      : this.form.category;
  }

  generateArticleContent(): string {
    const categoryTitle = this.getCategoryTitle();
    return generateArticleFrontmatter(this.form, categoryTitle);
  }

  generateCategoryContent(): string {
    const fallbackTitle = formatCategoryTitle(this.form.category);
    return generateCategoryFrontmatter(this.categoryForm, fallbackTitle);
  }

  getArticlePath(): string {
    if (!this.form.title || !this.form.category) return "";

    const categorySlug = generateCategorySlug(this.form.category);
    const articleSlug = generateSlug(this.form.title);

    return `content/${categorySlug}/${articleSlug}.md`;
  }

  getCategoryFiles(): GitHubFile[] | null {
    if (!this.form.title || !this.form.category || !this.categoryForm.title) {
      return null;
    }

    const categorySlug = generateCategorySlug(this.form.category);
    const articleSlug = generateSlug(this.form.title);

    return [
      {
        path: `content/${categorySlug}/_category.md`,
        content: this.generateCategoryContent(),
      },
      {
        path: `content/${categorySlug}/${articleSlug}.md`,
        content: this.generateArticleContent(),
      },
    ];
  }

  async generateCategoryZip(): Promise<Blob> {
    const zip = new JSZip();
    const categorySlug = generateCategorySlug(this.form.category);
    const articleSlug = generateSlug(this.form.title);

    const categoryFolder = zip.folder(categorySlug);
    if (!categoryFolder) {
      throw new Error("Failed to create category folder");
    }

    // Add category metadata file
    categoryFolder.file("_category.md", this.generateCategoryContent());

    // Add article file
    categoryFolder.file(`${articleSlug}.md`, this.generateArticleContent());

    return zip.generateAsync({ type: "blob" });
  }
}

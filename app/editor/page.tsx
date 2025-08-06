"use client";

import { useState, useEffect } from "react";
import JSZip from "jszip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BreadcrumbSetter } from "@/components/breadcrumb-setter";
import { ArticleMetadataForm } from "@/components/article-metadata-form";
import { ContentEditor } from "@/components/content-editor";
import { UsageInstructions } from "@/components/usage-instructions";

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

export default function ArticleEditor() {
  const [form, setForm] = useState<ArticleForm>({
    title: "",
    description: "",
    category: "",
    tag: "",
    order: 1,
    content:
      "# Your Article Title\n\nStart writing your content here...\n\n## Section 1\n\nAdd your content.\n\n## Section 2\n\nMore content here.",
  });

  const [existingCategories, setExistingCategories] = useState<string[]>([]);
  const [existingTags, setExistingTags] = useState<string[]>([]);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [isCustomTag, setIsCustomTag] = useState(false);
  const [categoryForm, setCategoryForm] = useState<CategoryForm>({
    title: "",
    description: "",
    emoji: "",
    order: 1,
  });

  // Breadcrumb items for the editor
  const breadcrumbItems = [
    { label: "All Categories", href: "/" },
    { label: "Editor", href: "/editor" },
  ];

  // Fetch existing categories and tags
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesRes = await fetch("/api/categories");
        if (categoriesRes.ok) {
          const categories = await categoriesRes.json();
          setExistingCategories(categories);
        }

        // Fetch tags
        const tagsRes = await fetch("/api/tags");
        if (tagsRes.ok) {
          const tags = await tagsRes.json();
          setExistingTags(tags);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback to hardcoded values
        setExistingCategories([
          "getting-started",
          "general-info",
          "customisation",
        ]);
        setExistingTags([
          "beginner",
          "advanced",
          "tutorial",
          "guide",
          "reference",
          "troubleshooting",
        ]);
      }
    };

    fetchData();
  }, []);

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/--+/g, "-")
      .replace(/^-|-$/g, "");
  };

  // Generate frontmatter + content
  const generateFrontmatter = () => {
    const categoryTitle = isCustomCategory
      ? categoryForm.title ||
        form.category
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : existingCategories.includes(form.category)
      ? form.category
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : form.category;

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

  // Download markdown file
  const downloadMarkdown = () => {
    if (!form.title || !form.category) {
      alert("Please fill in the title and category fields");
      return;
    }

    const fullContent = generateFrontmatter();
    const slug = generateSlug(form.title);
    const filename = `${slug}.md`;

    const blob = new Blob([fullContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Generate category metadata file
  const generateCategoryFile = () => {
    const categoryTitle =
      categoryForm.title ||
      form.category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

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

  // Download category folder as ZIP
  const downloadCategoryZip = async () => {
    if (!form.title || !form.category) {
      alert("Please fill in the title and category fields");
      return;
    }

    const zip = new JSZip();
    const categorySlug = form.category
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    const articleSlug = generateSlug(form.title);

    // Create category folder
    const categoryFolder = zip.folder(categorySlug);
    if (!categoryFolder) return;

    // Add category metadata file
    const categoryFileContent = generateCategoryFile();
    categoryFolder.file("_category.md", categoryFileContent);

    // Add article file
    const articleContent = generateFrontmatter();
    categoryFolder.file(`${articleSlug}.md`, articleContent);

    // Generate and download ZIP
    try {
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${categorySlug}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error creating ZIP:", error);
      alert("Error creating ZIP file");
    }
  };

  return (
    <>
      <BreadcrumbSetter items={breadcrumbItems} />

      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="bg-card rounded-lg shadow-sm border border-border p-4 md:p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Article Editor</h1>
            <p className="text-muted-foreground">
              Create a new help center article. Fill in the details and write
              your content, then download the markdown file.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-y-6">
            {/* Form Section */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Article Details</CardTitle>
                  <CardDescription>
                    Configure your article metadata
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ArticleMetadataForm
                    form={form}
                    onFormChange={setForm}
                    categoryForm={categoryForm}
                    onCategoryFormChange={setCategoryForm}
                    existingCategories={existingCategories}
                    existingTags={existingTags}
                    isCustomCategory={isCustomCategory}
                    onCustomCategoryChange={setIsCustomCategory}
                    isCustomTag={isCustomTag}
                    onCustomTagChange={setIsCustomTag}
                    generateSlug={generateSlug}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Editor Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Content Editor</CardTitle>
                  <CardDescription>
                    Write your article content in Markdown
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContentEditor
                    content={form.content}
                    onContentChange={(content) => setForm({ ...form, content })}
                    onDownloadMarkdown={downloadMarkdown}
                    onDownloadCategoryZip={downloadCategoryZip}
                    canDownload={
                      !!(form.title && form.category && form.description)
                    }
                    canDownloadZip={
                      !!(
                        form.title &&
                        form.category &&
                        form.description &&
                        categoryForm.title &&
                        categoryForm.description
                      )
                    }
                    isCustomCategory={isCustomCategory}
                    showZipOption={isCustomCategory}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          <UsageInstructions />
        </div>
      </main>
    </>
  );
}

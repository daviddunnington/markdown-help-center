"use client";

import { useState } from "react";
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
import { FileGenerator, type ArticleForm, type CategoryForm } from "@/lib/utils/file-generators";
import { downloadMarkdownFile, downloadZipFile } from "@/lib/utils/download-helpers";
import { useEditorData } from "@/hooks/useEditorData";
import { useFormValidation } from "@/hooks/useFormValidation";
import { generateSlug } from "@/lib/utils";

const INITIAL_ARTICLE_FORM: ArticleForm = {
  title: "",
  description: "",
  category: "",
  tag: "",
  order: 1,
  content: "# Your Article Title\n\nStart writing your content here...\n\n## Section 1\n\nAdd your content.\n\n## Section 2\n\nMore content here.",
};

const INITIAL_CATEGORY_FORM: CategoryForm = {
  title: "",
  description: "",
  emoji: "",
  order: 1,
};

export default function ArticleEditor() {
  const [form, setForm] = useState<ArticleForm>(INITIAL_ARTICLE_FORM);
  const [categoryForm, setCategoryForm] = useState<CategoryForm>(INITIAL_CATEGORY_FORM);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [isCustomTag, setIsCustomTag] = useState(false);

  const { existingCategories, existingTags, isLoading } = useEditorData();
  const validation = useFormValidation(form, categoryForm, isCustomCategory);

  // Create file generator instance
  const fileGenerator = new FileGenerator(
    form,
    categoryForm,
    isCustomCategory,
    existingCategories
  );

  const breadcrumbItems = [
    { label: "All Categories", href: "/" },
    { label: "Editor", href: "/editor" },
  ];

  const handleDownloadMarkdown = () => {
    if (!validation.canDownload) {
      alert("Please fill in the title and category fields");
      return;
    }

    const content = fileGenerator.generateArticleContent();
    downloadMarkdownFile(content, form.title);
  };

  const handleDownloadCategoryZip = async () => {
    if (!validation.canDownloadZip) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const zipBlob = await fileGenerator.generateCategoryZip();
      await downloadZipFile(zipBlob, form.category);
    } catch (error) {
      console.error("Error creating ZIP:", error);
      alert("Error creating ZIP file");
    }
  };

  const handleContentChange = (content: string) => {
    setForm({ ...form, content });
  };

  // GitHub integration functions
  const getMarkdownContent = () => fileGenerator.generateArticleContent();
  const getCategoryFiles = () => fileGenerator.getCategoryFiles();
  const getArticlePath = () => fileGenerator.getArticlePath();

  if (isLoading) {
    return (
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="bg-card rounded-lg shadow-sm border border-border p-4 md:p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

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
                    onContentChange={handleContentChange}
                    onDownloadMarkdown={handleDownloadMarkdown}
                    onDownloadCategoryZip={handleDownloadCategoryZip}
                    canDownload={validation.canDownload}
                    canDownloadZip={validation.canDownloadZip}
                    isCustomCategory={isCustomCategory}
                    showZipOption={isCustomCategory}
                    getMarkdownContent={getMarkdownContent}
                    getCategoryFiles={getCategoryFiles}
                    articlePath={getArticlePath()}
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

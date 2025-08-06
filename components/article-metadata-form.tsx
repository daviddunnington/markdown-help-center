"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CategoryForm } from "@/components/category-form";

interface ArticleFormData {
  title: string;
  description: string;
  category: string;
  tag?: string;
  order: number;
  content: string;
}

interface CategoryFormData {
  title: string;
  description: string;
  emoji: string;
  order: number;
}

interface ArticleMetadataFormProps {
  form: ArticleFormData;
  onFormChange: (form: ArticleFormData) => void;
  categoryForm: CategoryFormData;
  onCategoryFormChange: (form: CategoryFormData) => void;
  existingCategories: string[];
  existingTags: string[];
  isCustomCategory: boolean;
  onCustomCategoryChange: (isCustom: boolean) => void;
  isCustomTag: boolean;
  onCustomTagChange: (isCustom: boolean) => void;
  generateSlug: (title: string) => string;
}

export function ArticleMetadataForm({
  form,
  onFormChange,
  categoryForm,
  onCategoryFormChange,
  existingCategories,
  existingTags,
  isCustomCategory,
  onCustomCategoryChange,
  isCustomTag,
  onCustomTagChange,
  generateSlug,
}: ArticleMetadataFormProps) {
  const suggestedTags =
    existingTags.length > 0
      ? existingTags
      : [
          "beginner",
          "advanced",
          "tutorial",
          "guide",
          "reference",
          "troubleshooting",
        ];

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="title" className="text-sm font-medium mb-2 block">
          Title *
        </label>
        <Input
          id="title"
          type="text"
          placeholder="How to get started"
          value={form.title}
          onChange={(e) => onFormChange({ ...form, title: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="description" className="text-sm font-medium mb-2 block">
          Description *
        </label>
        <Input
          id="description"
          type="text"
          placeholder="A brief description of your article"
          value={form.description}
          onChange={(e) =>
            onFormChange({ ...form, description: e.target.value })
          }
        />
      </div>

      <div>
        <label htmlFor="category" className="text-sm font-medium mb-2 block">
          Category *
        </label>
        {isCustomCategory ? (
          <CategoryForm
            categoryForm={categoryForm}
            onCategoryFormChange={onCategoryFormChange}
            onBack={() => {
              onCustomCategoryChange(false);
              onFormChange({ ...form, category: "" });
              onCategoryFormChange({
                title: "",
                description: "",
                emoji: "",
                order: 1,
              });
            }}
            categorySlug={form.category}
            onCategorySlugChange={(slug) =>
              onFormChange({ ...form, category: slug })
            }
          />
        ) : (
          <Select
            value={form.category}
            onValueChange={(value) => {
              if (value === "new-category") {
                onCustomCategoryChange(true);
                onFormChange({ ...form, category: "" });
              } else {
                onFormChange({ ...form, category: value });
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {existingCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </SelectItem>
              ))}
              <SelectItem value="new-category">+ Add new category</SelectItem>
            </SelectContent>
          </Select>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          Use kebab-case (e.g., getting-started)
        </p>
      </div>

      <div>
        <label htmlFor="tag" className="text-sm font-medium mb-2 block">
          Tag
        </label>
        {isCustomTag ? (
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="new tag name"
              value={form.tag || ""}
              onChange={(e) => onFormChange({ ...form, tag: e.target.value })}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onCustomTagChange(false);
                onFormChange({ ...form, tag: "" });
              }}
            >
              ← Back to existing tags
            </Button>
            <p className="text-xs text-muted-foreground">
              Use lowercase, kebab-case for consistency (e.g., advanced-guide)
            </p>
          </div>
        ) : (
          <Select
            value={form.tag || ""}
            onValueChange={(value) => {
              if (value === "new-tag") {
                onCustomTagChange(true);
                onFormChange({ ...form, tag: "" });
              } else {
                onFormChange({
                  ...form,
                  tag: value === "none" ? "" : value,
                });
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a tag (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No tag</SelectItem>
              {suggestedTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </SelectItem>
              ))}
              <SelectItem value="new-tag">+ Add new tag</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      <div>
        <label htmlFor="order" className="text-sm font-medium mb-2 block">
          Order
        </label>
        <Input
          id="order"
          type="number"
          placeholder="1"
          value={form.order}
          onChange={(e) =>
            onFormChange({
              ...form,
              order: parseInt(e.target.value) || 1,
            })
          }
        />
        <p className="text-xs text-muted-foreground mt-1">
          Lower numbers appear first
        </p>
      </div>

      {form.title && (
        <div>
          <label className="text-sm font-medium mb-2 block">
            Generated Filename
          </label>
          <div className="text-sm bg-muted p-2 rounded font-mono">
            {generateSlug(form.title)}.md
          </div>
        </div>
      )}

      {form.category && form.title && (
        <div>
          <label className="text-sm font-medium mb-2 block">File Path</label>
          <div className="text-xs bg-muted p-2 rounded font-mono">
            content/{form.category}/{generateSlug(form.title)}.md
          </div>
        </div>
      )}
    </div>
  );
}

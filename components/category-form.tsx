"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmojiPicker } from "@/components/emoji-picker";

interface CategoryFormData {
  title: string;
  description: string;
  emoji: string;
  order: number;
}

interface CategoryFormProps {
  categoryForm: CategoryFormData;
  onCategoryFormChange: (form: CategoryFormData) => void;
  onBack: () => void;
  categorySlug: string;
  onCategorySlugChange: (slug: string) => void;
}

export function CategoryForm({
  categoryForm,
  onCategoryFormChange,
  onBack,
  categorySlug,
  onCategorySlugChange,
}: CategoryFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium mb-1 block">
          Category Slug *
        </label>
        <Input
          type="text"
          placeholder="new-category-name"
          value={categorySlug}
          onChange={(e) => onCategorySlugChange(e.target.value)}
        />
        <p className="text-xs text-muted-foreground mt-1">
          Folder name (kebab-case)
        </p>
      </div>

      <div>
        <label className="text-xs font-medium mb-1 block">
          Category Title *
        </label>
        <Input
          type="text"
          placeholder="New Category"
          value={categoryForm.title}
          onChange={(e) =>
            onCategoryFormChange({
              ...categoryForm,
              title: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label className="text-xs font-medium mb-1 block">
          Category Description *
        </label>
        <Input
          type="text"
          placeholder="Description for this category"
          value={categoryForm.description}
          onChange={(e) =>
            onCategoryFormChange({
              ...categoryForm,
              description: e.target.value,
            })
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs font-medium mb-1 block">Emoji</label>
          <EmojiPicker
            value={categoryForm.emoji}
            onChange={(emoji) =>
              onCategoryFormChange({
                ...categoryForm,
                emoji,
              })
            }
            placeholder="Click to pick emoji"
          />
        </div>
        <div>
          <label className="text-xs font-medium mb-1 block">Order</label>
          <Input
            type="number"
            placeholder="1"
            value={categoryForm.order}
            onChange={(e) =>
              onCategoryFormChange({
                ...categoryForm,
                order: parseInt(e.target.value) || 1,
              })
            }
          />
        </div>
      </div>

      <Button variant="outline" size="sm" onClick={onBack}>
        ← Back to existing categories
      </Button>
    </div>
  );
}

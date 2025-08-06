"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

// Import markdown editor with no SSR to avoid hydration issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface ContentEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  onDownloadMarkdown: () => void;
  onDownloadCategoryZip?: () => void;
  canDownload: boolean;
  canDownloadZip?: boolean;
  isCustomCategory: boolean;
  showZipOption: boolean;
}

export function ContentEditor({
  content,
  onContentChange,
  onDownloadMarkdown,
  onDownloadCategoryZip,
  canDownload,
  canDownloadZip = false,
  isCustomCategory,
  showZipOption,
}: ContentEditorProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  return (
    <div>
      <div data-color-mode="light">
        <MDEditor
          value={content}
          onChange={(val) => onContentChange(val || "")}
          height={500}
          preview={isPreviewMode ? "preview" : "edit"}
          hideToolbar={false}
          textareaProps={{
            placeholder: "Start writing your article content here...",
            style: { fontSize: "14px", lineHeight: 1.5 },
          }}
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-center mt-4 gap-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
          >
            {isPreviewMode ? "Edit Mode" : "Preview Mode"}
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={onDownloadMarkdown}
            disabled={!canDownload}
            variant="outline"
          >
            📄 Download Article Only
          </Button>
        </div>
        <div className="flex gap-2">
          {isCustomCategory && showZipOption && onDownloadCategoryZip && (
            <Button
              onClick={onDownloadCategoryZip}
              disabled={!canDownloadZip}
              className="bg-blue-600 hover:bg-blue-700"
            >
              📁 Download Category Folder (ZIP)
            </Button>
          )}

          {!isCustomCategory && (
            <Button
              onClick={onDownloadMarkdown}
              disabled={!canDownload}
              className="bg-blue-600 hover:bg-blue-700"
            >
              📄 Download Markdown File
            </Button>
          )}
        </div>
      </div>

      {!canDownload && (
        <p className="text-sm text-muted-foreground mt-2">
          Please fill in all required fields (*) to download
          {isCustomCategory && " (including category details)"}
        </p>
      )}
    </div>
  );
}

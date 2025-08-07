"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { GitHubCommitDialog } from "@/components/github-commit-dialog";
import { siteConfig } from "@/lib/config";
import { Github } from "lucide-react";

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
  // New props for GitHub commit
  getMarkdownContent?: () => string;
  getCategoryFiles?: () => { path: string; content: string }[] | null;
  articlePath?: string;
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
  getMarkdownContent,
  getCategoryFiles,
  articlePath,
}: ContentEditorProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showGitHubDialog, setShowGitHubDialog] = useState(false);
  const [commitFiles, setCommitFiles] = useState<
    { path: string; content: string }[]
  >([]);

  const handleGitHubCommit = () => {
    let files: { path: string; content: string }[] = [];

    if (isCustomCategory && getCategoryFiles) {
      // For custom categories, commit both category metadata and article
      const categoryFiles = getCategoryFiles();
      if (categoryFiles) {
        files = categoryFiles;
      }
    } else if (getMarkdownContent && articlePath) {
      // For existing categories, just commit the article
      const content = getMarkdownContent();
      files = [{ path: articlePath, content }];
    }

    if (files.length > 0) {
      setCommitFiles(files);
      setShowGitHubDialog(true);
    }
  };

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

        <div className="flex flex-col md:flex-row gap-2">
          {/* Download buttons */}
          <div className="flex gap-2">
            <Button
              onClick={onDownloadMarkdown}
              disabled={!canDownload}
              variant="outline"
            >
              📄 Download Article Only
            </Button>
            {isCustomCategory && showZipOption && onDownloadCategoryZip && (
              <Button
                onClick={onDownloadCategoryZip}
                disabled={!canDownloadZip}
                variant="outline"
              >
                📁 Download Category Folder (ZIP)
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-2">
        {/* GitHub commit buttons */}
        {siteConfig.github?.enabled && (
          <div className="flex gap-2">
            <Button
              onClick={handleGitHubCommit}
              disabled={isCustomCategory ? !canDownloadZip : !canDownload}
              className="bg-gray-900 hover:bg-gray-800 text-white"
            >
              <Github className="h-4 w-4" />
              Commit to GitHub
            </Button>
          </div>
        )}
      </div>

      {!canDownload && (
        <p className="text-sm text-muted-foreground mt-2">
          Please fill in all required fields (*) to download or commit
          {isCustomCategory && " (including category details)"}
        </p>
      )}

      {/* GitHub Commit Dialog */}
      <GitHubCommitDialog
        open={showGitHubDialog}
        onOpenChange={setShowGitHubDialog}
        files={commitFiles}
      />
    </div>
  );
}

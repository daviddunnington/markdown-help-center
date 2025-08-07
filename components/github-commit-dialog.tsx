"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GitBranch, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CommitResult {
  path: string;
  success: boolean;
  url?: string;
  error?: string;
}

interface GitHubCommitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  files: { path: string; content: string }[];
}

export function GitHubCommitDialog({
  open,
  onOpenChange,
  files,
}: GitHubCommitDialogProps) {
  const [commitMessage, setCommitMessage] = useState("");
  const [isCommitting, setIsCommitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCommit = async () => {
    if (!commitMessage.trim()) {
      setError("Please enter a commit message");
      return;
    }

    setIsCommitting(true);
    setError(null);
    try {
      const response = await fetch("/api/github/commit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          files,
          commitMessage: commitMessage.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to commit files");
      }

      const data: { results: CommitResult[] } = await response.json();
      const successful = data.results.filter((r) => r.success);
      const failed = data.results.filter((r) => !r.success);

      if (successful.length > 0) {
        toast.success(
          `Successfully committed ${successful.length} file(s) to GitHub`
        );
        onOpenChange(false);
        setCommitMessage("");
      }

      if (failed.length > 0) {
        console.error("Failed commits:", failed);
        toast.error(`Failed to commit ${failed.length} file(s)`);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to commit to GitHub";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Commit error:", error);
    } finally {
      setIsCommitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Commit to GitHub
          </DialogTitle>
          <DialogDescription>
            {files.length === 1
              ? `Commit your article directly to your GitHub repository.`
              : `Commit your new category (including article and metadata) directly to your GitHub repository.`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="commit-message">Commit Message</Label>
            <Textarea
              id="commit-message"
              placeholder={
                files.length === 1
                  ? "Add new article: [article title]"
                  : "Add new category: [category name] with initial article"
              }
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <div>
            <Label>Files to commit:</Label>
            <div className="mt-1 space-y-1">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded"
                >
                  {file.path}
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCommit} disabled={isCommitting}>
            {isCommitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Commit to GitHub
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

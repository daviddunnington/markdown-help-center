import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { GitHubService } from "@/lib/github";
import { siteConfig } from "@/lib/config";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId && siteConfig.auth.enabled && siteConfig.auth.protect.editor) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if GitHub integration is enabled
    if (!siteConfig.github?.enabled) {
      return NextResponse.json(
        { error: "GitHub integration not enabled" },
        { status: 400 }
      );
    }

    const { files, commitMessage } = await request.json();

    // Get GitHub token from environment
    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
      return NextResponse.json(
        { error: "GitHub token not configured" },
        { status: 500 }
      );
    }

    const github = new GitHubService(githubToken, siteConfig.github);
    const results = [];

    // Commit each file
    for (const file of files) {
      try {
        // Check if file exists to get SHA for updates
        const existingFile = await github.getFile(file.path);

        const result = await github.commitFile({
          path: file.path,
          content: file.content,
          message: commitMessage || `Update ${file.path}`,
          sha: existingFile?.sha,
        });

        results.push({
          path: file.path,
          success: true,
          url: result.content.html_url,
        });
      } catch (error) {
        results.push({
          path: file.path,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("GitHub commit error:", error);
    return NextResponse.json(
      { error: "Failed to commit files" },
      { status: 500 }
    );
  }
}

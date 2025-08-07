---
title: "Github Integration"
description: "Push you md files direct to github"
category: Getting Started
tag: "Feature"
order: 4
---
# GitHub Integration Feature

## Overview

The **GitHub Integration** feature allows content creators to commit articles and categories directly to your GitHub repository from the built-in editor, eliminating the need to manually download files and upload them to your repository.

---

## How It Works

When creating content in the editor (`/editor`), you'll see new GitHub commit buttons alongside the existing download options:

- 🚀 **Commit Article to GitHub** – Commits a single article to your repository  
- 🚀 **Commit Category to GitHub** – Commits both the category configuration and article files

---

## Prerequisites

### 1. Authentication Required

- Users must be signed in to access the GitHub commit functionality  
- Only authenticated users can commit files to protect your repository

### 2. GitHub Personal Access Token

You'll need a **GitHub Personal Access Token** with repository write permissions:

1. Go to **GitHub Settings > Developer Settings > Personal Access Tokens**
2. Click **"Generate new token (classic)"**
3. Select the **`repo`** scope (full repository access)
4. Copy the generated token
5. Replace `your_github_personal_access_token` in your `.env.local` file

### 3. Repository Configuration

Update your `.env.local` file with your repository details:

```env
# GitHub Integration
GITHUB_TOKEN=ghp_your_actual_token_here
NEXT_PUBLIC_GITHUB_ENABLED=true
GITHUB_OWNER=your-github-username
GITHUB_REPO=your-repository-name
GITHUB_BRANCH=main
```

---

## Using the Feature

### Committing a Single Article

1. **Create Your Article**: Fill in the article details form (title, description, category, etc.)  
2. **Write Content**: Use the markdown editor to create your article content  
3. **Commit**: Click **"🚀 Commit Article to GitHub"**  
4. **Add Commit Message**: Enter a descriptive commit message (e.g., _"Add getting started guide"_)  
5. **Confirm**: The article will be committed to:  
   ```
   content/[category]/[slug].md
   ```

### Committing a Full Category

1. **Create Category**: Fill in both category and article details  
2. **Write Content**: Complete your article content  
3. **Commit Category**: Click **"🚀 Commit Category to GitHub"**  
4. **Add Commit Message**: Enter a commit message for the entire category  
5. **Confirm**: Both `_category.md` and the article file will be committed

---

## File Structure

Files are automatically organised in your repository:

```
content/
├── getting-started/
│   ├── _category.md          # Category configuration
│   └── setup-guide.md        # Your article
├── advanced-features/
│   ├── _category.md
│   └── api-integration.md
```

---

## Success Notifications

The system provides real-time feedback:

- ✅ **Success**: "Successfully committed 1 file(s) to GitHub"  
- ❌ **Error**: Detailed error messages if something goes wrong  
- 📊 **Batch Results**: Status for each file when committing multiple files

---

## Security Features

- 🔒 **Authentication Protected** – Only signed-in users can commit  
- 🔐 **Token Validation** – GitHub API validates your access token  
- 🛡️ **Path Sanitisation** – File paths are validated to prevent security issues  
- ⚠️ **Error Handling** – Graceful failure handling with user feedback  

---

## Troubleshooting

### Common Issues

#### ❗ "GitHub token not configured"

- Ensure your `GITHUB_TOKEN` is set in `.env.local`  
- Verify the token has `repo` scope permissions  

#### ❗ "GitHub integration not enabled"

- Check that `NEXT_PUBLIC_GITHUB_ENABLED=true` in your environment  

#### ❗ "Unauthorized"

- Make sure you're signed in to your account  
- Verify `AUTH_PROTECT_EDITOR=true` is set correctly  

#### ❗ "Failed to commit files"

- Check your GitHub token permissions  
- Verify the repository name and owner are correct  
- Ensure the target branch exists  

### API Rate Limits

GitHub API has rate limits:

- 5,000 requests per hour for authenticated requests  
- The system handles rate limiting gracefully with error messages  

---

## Benefits

### For Content Creators

- ⚡ **Streamlined Workflow** – No more downloading and manually uploading files  
- 🚀 **Instant Publishing** – Content goes live immediately after commit  
- 🕓 **Version Control** – Full Git history of all content changes  
- 👥 **Collaboration** – Multiple team members can contribute directly  

### For Developers

- 🔁 **Automated Deployment** – Commits trigger your deployment pipeline  
- 📝 **Change Tracking** – Complete audit trail of content modifications  
- 💾 **Backup** – All content automatically backed up in Git  
- 🌱 **Branching** – Support for different branches (development, staging, production)  

---

## Advanced Usage

### Custom Commit Messages

Use descriptive commit messages for better project management:

- _Add troubleshooting guide for API integration_  
- _Update installation instructions for v2.0_  
- _Create advanced features category with 3 articles_

### Workflow Integration

This feature works seamlessly with:

- **GitHub Actions** – Trigger builds on content commits  
- **Vercel / Netlify** – Automatic deployments on repository updates  
- **Content Review** – Use pull requests for content approval workflows  
- **Team Collaboration** – Multiple contributors can use the same editor  

---

> The GitHub integration transforms your help center into a **collaborative, version-controlled content management system** while maintaining the simplicity of the markdown editor interface.
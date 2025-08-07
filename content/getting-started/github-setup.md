---
title: "GitHub Integration Setup"
description: "Configure GitHub integration to commit content directly from the editor"
category: getting-started
tag: "Setup"
order: 4
---

# GitHub Integration Setup

## Overview

The GitHub integration allows you to commit articles and categories directly to your GitHub repository from the built-in editor. This eliminates the need to manually download files and upload them to your repository.

---

## Quick Setup

### Step 1: Create a GitHub Personal Access Token

1. Go to **GitHub.com** and sign in
2. Navigate to **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. Click **"Generate new token (classic)"**
4. Configure your token:
   - **Note**: "Help Center Content Management"
   - **Expiration**: Choose your preferred duration
   - **Scopes**: Select **`repo`** (Full control of private repositories)
5. Click **"Generate token"**
6. **Copy the token immediately** (you won't see it again!)

### Step 1.1: Required Token Permissions

For the GitHub integration to work properly, your token needs specific permissions:

#### ✅ **Required Scopes**

| Scope      | Purpose                              | Required   |
| ---------- | ------------------------------------ | ---------- |
| **`repo`** | Full control of private repositories | ✅ **Yes** |

#### 📋 **What `repo` scope provides:**

**Contents (Read & Write)**

- Repository contents, commits, branches, downloads, releases, and merges
- This allows the integration to:
  - Read existing files to check for duplicates
  - Create new markdown files for articles and categories
  - Commit changes with custom commit messages
  - Update existing articles when modified

**Metadata (Read Only)**

- Search repositories, list collaborators, and access repository metadata
- This allows the integration to:
  - Verify repository exists and is accessible
  - Check branch information
  - Validate repository structure

#### 🔒 **Permission Explanation**

The **`repo` scope** is required because the integration needs these specific permissions:

**Contents (Read & Write)** - Essential for:

- **Reading repository contents** - To check if files already exist before creating
- **Creating new files** - To add new articles (`article-slug.md`) and categories (`_category.md`)
- **Updating existing files** - To modify articles when content is edited
- **Committing changes** - To save content with descriptive commit messages
- **Managing branches** - To work with your specified target branch

**Metadata (Read Only)** - Required for:

- **Repository verification** - To confirm the repository exists and is accessible
- **Branch validation** - To ensure the target branch exists before committing
- **Access validation** - To verify the token has proper permissions

These permissions ensure the integration can safely manage your help center content while maintaining proper version control.

#### ⚠️ **Security Note**

The `repo` scope provides full repository access. For maximum security:

- Use a **dedicated GitHub account** for content management
- **Regularly rotate tokens** (every 6-12 months)
- **Monitor repository activity** for unauthorized changes
- **Revoke tokens** when no longer needed

### Step 2: Configure Environment Variables

Add the following to your `.env.local` file:

```env
# GitHub Integration
GITHUB_TOKEN=ghp_your_actual_token_here
NEXT_PUBLIC_GITHUB_ENABLED=true
GITHUB_OWNER=your-github-username
GITHUB_REPO=your-repository-name
GITHUB_BRANCH=main
```

### Step 3: Verify Your Repository Structure

Your repository should have this structure:

```
your-repo/
├── content/
│   ├── getting-started/
│   ├── features/
│   └── ... other categories
└── ... other project files
```

The integration will create/update files in the `content/` folder.

---

## Configuration Options

### Required Environment Variables

| Variable        | Description                       | Example                |
| --------------- | --------------------------------- | ---------------------- |
| `GITHUB_TOKEN`  | Your personal access token        | `ghp_abc123...`        |
| `GITHUB_OWNER`  | Your GitHub username/organization | `daviddunnington`      |
| `GITHUB_REPO`   | Repository name                   | `markdown-help-center` |
| `GITHUB_BRANCH` | Target branch for commits         | `main`                 |

### Optional Settings

| Variable                     | Description                          | Default |
| ---------------------------- | ------------------------------------ | ------- |
| `NEXT_PUBLIC_GITHUB_ENABLED` | Enable/disable GitHub features in UI | `true`  |

---

## Testing Your Setup

### 1. Start Development Server

```bash
npm run dev
```

### 2. Access the Editor

- Navigate to `/editor`
- Sign in (authentication required for GitHub features)

### 3. Test GitHub Integration

1. **Create a test article** with some content
2. **Look for GitHub buttons**:
   - 🚀 **Commit Article to GitHub**
   - 🚀 **Commit Category to GitHub** (if creating new category)
3. **Click a commit button**
4. **Add a commit message** (e.g., "Test article creation")
5. **Submit** - you should see success notification
6. **Check your GitHub repository** - files should appear in the `content/` folder

---

## How It Works

### File Structure

When you commit content, files are organized as:

```
content/
├── category-name/
│   ├── _category.md          # Category configuration
│   └── article-slug.md       # Your article
```

### Commit Types

**Single Article Commit:**

- Creates: `content/[category]/[article-slug].md`
- Updates existing article if it already exists

**Category Commit:**

- Creates: `content/[category]/_category.md`
- Creates: `content/[category]/[article-slug].md`
- Commits both files together

### Authentication Requirements

- **User must be signed in** to access GitHub features
- **GitHub token** must be valid and have repo permissions
- **Repository must exist** and be accessible

---

## Troubleshooting

### ❗ "GitHub integration not enabled"

**Problem**: GitHub features don't appear in the editor

**Solution**:

```env
# Enable GitHub integration
NEXT_PUBLIC_GITHUB_ENABLED=true
```

### ❗ "GitHub token not configured"

**Problem**: Token is missing or invalid

**Solution**:

1. Check your token in `.env.local`
2. Ensure token has `repo` scope
3. Verify token hasn't expired

### ❗ "Repository not found"

**Problem**: Can't access the specified repository

**Solution**:

```env
# Verify these match your actual repository
GITHUB_OWNER=your-actual-username
GITHUB_REPO=your-actual-repo-name
```

### ❗ "Branch not found"

**Problem**: Target branch doesn't exist

**Solution**:

```env
# Use an existing branch (usually 'main' or 'master')
GITHUB_BRANCH=main
```

### ❗ "Unauthorized" errors

**Problem**: Token permissions insufficient

**Solution**:

1. Regenerate token with `repo` scope
2. For organization repos, ensure token has org access
3. Check repository visibility settings

### ❗ "API rate limit exceeded"

**Problem**: Too many requests to GitHub API

**Solution**:

- Wait for rate limit reset (1 hour)
- GitHub allows 5,000 requests/hour for authenticated users
- Consider spacing out commits

---

## Security Considerations

### 🔒 **Token Security**

- **Never commit** your `.env.local` file
- **Use specific scopes** - only `repo` is needed
- **Rotate tokens regularly** (every 6-12 months)
- **Revoke unused tokens** in GitHub settings

### 🛡️ **Repository Access**

- **Private repos recommended** for internal content
- **Public repos** work but content is visible to everyone
- **Organization repos** require proper team permissions

### 👤 **User Access Control**

- **Authentication required** - users must sign in to commit

---

## Production Deployment

### Environment Variables

Add these to your hosting platform (Vercel, Netlify, etc.):

```env
GITHUB_TOKEN=ghp_your_production_token_here
NEXT_PUBLIC_GITHUB_ENABLED=true
GITHUB_OWNER=your-github-username
GITHUB_REPO=your-repository-name
GITHUB_BRANCH=main
```

### Token Management

- **Use separate tokens** for development and production
- **Set appropriate expiration dates**
- **Document token purpose** for team members

---

## Benefits

### For Content Teams

- ✅ **No technical setup** required for content creators
- ✅ **Instant publishing** - commits trigger deployments
- ✅ **Version control** - full history of all changes
- ✅ **Collaboration** - multiple team members can contribute

### For Developers

- ✅ **Automated workflow** - no manual file management
- ✅ **Git integration** - leverages existing development workflow
- ✅ **Audit trail** - track all content changes
- ✅ **Backup protection** - content automatically backed up

---

## Example Workflow

1. **Content creator** opens `/editor`
2. **Creates new article** with title, description, content
3. **Reviews preview** to ensure formatting is correct
4. **Clicks "Commit to GitHub"** with descriptive message
5. **GitHub receives commit** and triggers deployment
6. **Content goes live** automatically

---

> **Quick Start**: Get your GitHub token, add it to `.env.local` with your repo details, set `NEXT_PUBLIC_GITHUB_ENABLED=true`, and start committing content directly from the editor!

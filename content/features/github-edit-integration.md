---
title: "Edit Existing Markdown Files"
description: "A built-in editor that allows you to open, edit, and commit existing Markdown files directly to Git—no external tools required."
category: Features
tag: "Upcoming"
order: 1
---

# Edit and Commit Existing Markdown Files from the Editor

## Overview

One of our upcoming features aims to make content management even more seamless: the ability to **open, edit, and commit existing Markdown files directly to your Git repository**all from within the built-in editor.

This eliminates the need for external tools, manual file handling, or switching between your local IDE and version control system. It’s designed to streamline the workflow for content creators, technical writers, and developers alike.

---

## Why This Feature Matters

Currently, most markdown-based content systems are geared toward creating new files. However, editing existing content usually involves:

- Cloning the repo locally
- Editing in an IDE or text editor
- Staging and committing changes via the CLI or Git GUI
- Pushing updates back to the remote repository

This is not ideal for teams that rely on a centralised editor or want to keep their workflow browser-based. With this new feature, the entire process is handled in-app.

---

## Key Features

- 🔍 **Browse and select existing Markdown files**  
  Navigate your repository structure and select any existing Markdown file within the `content/` directory.

- ✏️ **Edit in the Markdown editor**  
  Once selected, the file opens in the editor with full markdown support, preview, and formatting tools.

- 💾 **Commit changes directly to Git**  
  After making your changes, simply enter a commit message and click "Commit Changes" to push updates to your repository.

- 📂 **Preserve file structure**  
  The feature ensures that existing directory structures and file paths remain unchanged.

---

## Use Cases

- **Update outdated documentation** directly in the editor without downloading or uploading files.
- **Fix typos or formatting issues** spotted during content review.
- **Edit and refine** based on internal feedback before final publishing.
- **Collaborate across teams** where not all contributors have GitHub or terminal access.

---

## User Flow (Draft)

1. Navigate to the **Edit Existing Content** section of the editor.
2. Browse your repository or search for a specific file.
3. Click to open the file in the markdown editor.
4. Make your edits using the familiar editor interface.
5. Enter a commit message and click **Commit Changes**.
6. Receive instant feedback on the success or failure of the operation.

---

## Security and Permissions

To maintain security and version control integrity:

- Only authenticated users with write access can edit and commit files.
- All changes require a commit message for proper Git history tracking.
- Token validation and path sanitisation ensure safe operations within the repo.

---

> By bringing Git-powered editing directly into the browser, we’re making content management more efficient, collaborative, and accessible without sacrificing the benefits of version control.

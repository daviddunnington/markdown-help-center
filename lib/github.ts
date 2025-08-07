export interface GitHubConfig {
  enabled: boolean;
  owner: string; // GitHub username or organization
  repo: string; // Repository name
  branch: string; // Target branch (usually 'main' or 'master')
}

export interface CommitFileParams {
  path: string;
  content: string;
  message: string;
  sha?: string; // Required for updates, not for new files
}

export class GitHubService {
  private token: string;
  private config: GitHubConfig;

  constructor(token: string, config: GitHubConfig) {
    this.token = token;
    this.config = config;
  }

  async commitFile({ path, content, message, sha }: CommitFileParams) {
    const url = `https://api.github.com/repos/${this.config.owner}/${this.config.repo}/contents/${path}`;

    const body: {
      message: string;
      content: string;
      branch: string;
      sha?: string;
    } = {
      message,
      content: Buffer.from(content).toString("base64"),
      branch: this.config.branch,
    };

    if (sha) {
      body.sha = sha; // Required for updates
    }

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `token ${this.token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`GitHub API error: ${response.statusText} - ${error}`);
    }

    return response.json();
  }

  async getFile(path: string) {
    const url = `https://api.github.com/repos/${this.config.owner}/${this.config.repo}/contents/${path}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `token ${this.token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (response.status === 404) {
      return null; // File doesn't exist
    }

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    return response.json();
  }
}

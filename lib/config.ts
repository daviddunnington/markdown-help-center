export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  logo: {
    icon: string; // Lucide icon name or path to image
    alt: string;
  };
  links: {
    website?: string;
    changelog?: string;
    twitter?: string;
    github?: string;
  };
}

// Site configuration
export const siteConfig: SiteConfig = {
  siteName: "MarkDown",
  siteDescription: "Help Center",
  logo: {
    icon: "Hash", // Lucide icon name
    alt: "Help Center Logo",
  },
  links: {
    website: "https://your-website.com",
    changelog: "/changelog",
    twitter: "https://twitter.com/yourhandle",
    github: "https://github.com/yourusername/your-repo",
  },
};

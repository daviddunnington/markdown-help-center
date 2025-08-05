export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  logo: {
    icon?: string; // Lucide icon name or path to image
    image?: string; // Path to image
    alt: string;
  };
  links: {
    website?: string;
    changelog?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

// Site configuration
export const siteConfig: SiteConfig = {
  siteName: "MarkDown",
  siteDescription: "Help Center",
  logo: {
    icon: "Hash",
    //image: "/images/logo.svg",
    alt: "Help Center Logo",
  },
  links: {
    //website: "https://your-website.com",
    //changelog: "/changelog",
    linkedin: "https://www.linkedin.com/in/david-j-dunnington/",
    github: "https://github.com/daviddunnington/",
  },
};

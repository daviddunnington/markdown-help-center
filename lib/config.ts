export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  logo: {
    icon?: string;
    image?: string;
    alt: string;
  };
  links: {
    website?: string;
    changelog?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  auth: {
    enabled: boolean;
    protect: {
      content: boolean;
      editor: boolean;
    };
    clerk: {
      publishableKey: string | undefined;
      secretKey: string | undefined;
    };
  };
}

// Site configuration
export const siteConfig: SiteConfig = {
  siteName: "MarkDown",
  siteDescription: "Help Center",
  logo: {
    icon: "Hash",
    alt: "Help Center Logo",
  },
  links: {
    linkedin: "https://www.linkedin.com/in/david-j-dunnington/",
    github: "https://github.com/daviddunnington/",
  },
  auth: {
    // Only NEXT_PUBLIC_AUTH_ENABLED is exposed to browser (for UI logic)
    enabled: process.env.NEXT_PUBLIC_AUTH_ENABLED === "true",
    protect: {
      // These are server-only - not exposed to browser
      content: process.env.AUTH_PROTECT_CONTENT === "true",
      editor: process.env.AUTH_PROTECT_EDITOR === "true",
    },
    clerk: {
      publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, // Safe to be public
      secretKey: process.env.CLERK_SECRET_KEY, // Already server-only
    },
  },
};

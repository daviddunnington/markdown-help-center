import { siteConfig } from "@/lib/config";
import { Github, ExternalLink, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Left side - Site info */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-foreground">
              {siteConfig.siteName}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {siteConfig.siteDescription}
            </p>
          </div>

          {/* Right side - Links and social */}
          <div className="flex flex-col items-center md:items-end space-y-2">
            {/* Social links */}
            <div className="flex items-center space-x-4">
              {siteConfig.links.website && (
                <a
                  href={siteConfig.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Visit our website"
                >
                  <ExternalLink size={20} />
                </a>
              )}
              {siteConfig.links.github && (
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Visit our GitHub"
                >
                  <Github size={20} />
                </a>
              )}
              {siteConfig.links.linkedin && (
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Visit our LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              )}
            </div>

            {/* Copyright */}
            <p className="text-sm text-muted-foreground/80">
              © {currentYear} {siteConfig.siteName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { siteConfig } from "@/lib/config";
import { Github, Twitter, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-primary/5">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Left side - Site info */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-gray-900">
              {siteConfig.siteName}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
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
                  className="text-gray-600 hover:text-gray-900 transition-colors"
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
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Visit our GitHub"
                >
                  <Github size={20} />
                </a>
              )}
              {siteConfig.links.twitter && (
                <a
                  href={siteConfig.links.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Visit our Twitter"
                >
                  <Twitter size={20} />
                </a>
              )}
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-500">
              © {currentYear} {siteConfig.siteName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

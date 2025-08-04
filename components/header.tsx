import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import * as LucideIcons from "lucide-react";

export function Header() {
  // Get the icon component dynamically
  const IconComponent =
    (LucideIcons as any)[siteConfig.logo.icon] || LucideIcons.Hash;

  return (
    <header className="border-b border-white/30">
      <div className="container max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <IconComponent className="text-white font-bold text-sm" />
            </div>
            <div className="text-white">
              <span className="font-semibold">{siteConfig.siteName}</span>
              <span className="text-white/80 ml-2">
                {siteConfig.siteDescription}
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            {siteConfig.links.website && (
              <Button
                variant="ghost"
                size="sm"
                className="text-white/80 hover:text-white hover:bg-white/20"
                asChild
              >
                <a
                  href={siteConfig.links.website}
                  className="flex items-center gap-1"
                >
                  Our Website <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
            {siteConfig.links.changelog && (
              <Button
                variant="ghost"
                size="sm"
                className="text-white/80 hover:text-white hover:bg-white/20"
                asChild
              >
                <a href={siteConfig.links.changelog}>Changelog</a>
              </Button>
            )}
            {siteConfig.links.twitter && (
              <Button
                variant="ghost"
                size="sm"
                className="text-white/80 hover:text-white hover:bg-white/20"
                asChild
              >
                <a href={siteConfig.links.twitter}>Twitter</a>
              </Button>
            )}
            {siteConfig.links.github && (
              <Button
                variant="ghost"
                size="sm"
                className="text-white/80 hover:text-white hover:bg-white/20"
                asChild
              >
                <a
                  href={siteConfig.links.github}
                  className="flex items-center gap-1"
                >
                  <Github className="w-4 h-4" />
                </a>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

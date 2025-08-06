import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Hash, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/config";
import * as LucideIcons from "lucide-react";
import { type LucideIcon } from "lucide-react";

export function Header() {
  // Get the icon component dynamically with proper type safety
  const getIconComponent = (iconName?: string): LucideIcon => {
    if (!iconName) return Hash;
    const icon = (LucideIcons as unknown as Record<string, LucideIcon>)[
      iconName
    ];
    return typeof icon === "function" ? icon : Hash;
  };

  const IconComponent = getIconComponent(siteConfig.logo.icon);

  return (
    <header className="border-b border-white/30">
      <div className="container max-w-4xl mx-auto px-4 py-4 md:px-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            {siteConfig.logo.image ? (
              <div className="w-40 rounded-lg flex items-center justify-center">
                <Image
                  src={siteConfig.logo.image}
                  alt={siteConfig.logo.alt}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            ) : (
              <IconComponent className="text-white font-bold text-sm" />
            )}

            <div className="text-white">
              {siteConfig.logo.image ? (
                <span className="text-white/80">|</span>
              ) : (
                <span className="font-semibold">{siteConfig.siteName}</span>
              )}
              <span className="text-white/80 ml-2">
                {siteConfig.siteDescription}
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/80 hover:text-white hover:bg-white/20"
              asChild
            >
              <Link href="/editor" className="flex items-center gap-1">
                ✏️ Editor
              </Link>
            </Button>
            <ThemeToggle />
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
            {siteConfig.links.linkedin && (
              <Button
                variant="ghost"
                size="sm"
                className="text-white/80 hover:text-white hover:bg-white/20"
                asChild
              >
                <a href={siteConfig.links.linkedin}>LinkedIn</a>
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

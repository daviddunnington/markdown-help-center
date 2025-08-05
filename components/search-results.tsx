"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import Fuse from "fuse.js";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/lib/content";

interface SearchResultsProps {
  articles: Article[];
  searchQuery: string;
  onSelect?: () => void;
}

export function SearchResults({
  articles,
  searchQuery,
  onSelect,
}: SearchResultsProps) {
  if (!searchQuery) return null;

  const fuse = new Fuse(articles, {
    keys: ["title", "description", "content", "category"],
    threshold: 0.3,
    includeScore: true,
  });

  const searchResults = fuse.search(searchQuery).map((result) => result.item);

  return (
    <Card className="shadow-xl max-h-96 overflow-y-auto">
      {searchResults.length > 0 ? (
        <CardContent className="flex flex-col px-6 gap-4">
          {searchResults.map((article) => {
            const categorySlug = article.category
              .toLowerCase()
              .replace(/\s+/g, "-");
            return (
              <Link
                key={article.slug}
                href={`/${categorySlug}/${article.slug}`}
                onClick={onSelect}
              >
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors cursor-pointer">
                  <FileText className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {article.description}
                    </p>
                    <Badge variant="default" className="mt-2 text-xs">
                      {article.category}
                    </Badge>
                  </div>
                </div>
              </Link>
            );
          })}
        </CardContent>
      ) : (
        <CardContent className="p-6 text-center text-muted-foreground">
          <FileText className="w-8 h-8 mx-auto mb-2 text-muted-foreground/60" />
          <p>{`No articles found for "${searchQuery}"`}</p>
        </CardContent>
      )}
    </Card>
  );
}

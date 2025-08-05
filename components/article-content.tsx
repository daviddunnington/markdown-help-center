"use client";
import { Calendar, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Article } from "@/lib/content";

interface ArticleContentProps {
  article: Article;
}

export function ArticleContent({ article }: ArticleContentProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          {article.description}
        </p>

        <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Last updated on March 18, 2024</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 h-auto p-0 hover:bg-transparent"
            onClick={() => window.print()}
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </Button>
        </div>
      </div>

      <Separator className="mb-8" />

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
}

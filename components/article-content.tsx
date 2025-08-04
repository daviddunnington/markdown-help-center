"use client";
import { Calendar, Printer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>
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

        <Card className="mb-8 gap-2">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-300 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-gray-600">=</span>
              </div>
              <CardTitle className="text-sm uppercase tracking-wide text-gray-700">
                Table of Contents
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2 text-sm">
              <Button
                variant="link"
                className="h-auto p-0 text-gray-600 hover:text-primary justify-start"
                asChild
              >
                <a href="#why-choose">Why choose MarkDown Help Center?</a>
              </Button>
              <Button
                variant="link"
                className="h-auto p-0 text-gray-600 hover:text-primary justify-start ml-4"
                asChild
              >
                <a href="#need-help">{`Need More Help? I'm Here for You`}</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="mb-8" />

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
}

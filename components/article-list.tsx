import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Article } from "@/lib/content";

interface ArticleListProps {
  articles: Article[];
  categorySlug: string;
}

export function ArticleList({ articles, categorySlug }: ArticleListProps) {
  return (
    <div className="flex flex-col gap-4">
      {articles.map((article) => (
        <Link key={article.slug} href={`/${categorySlug}/${article.slug}`}>
          <Card className="gap-2 border-l-4 border-l-primary hover:shadow-md transition-all duration-200 group cursor-pointer">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                {article.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-gray-600 leading-relaxed">
                {article.description}
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Article } from "@/lib/content";
import { groupArticlesByTags } from "@/lib/content";

interface ArticleListProps {
  articles: Article[];
  categorySlug: string;
}

function ArticleCard({
  article,
  categorySlug,
}: {
  article: Article;
  categorySlug: string;
}) {
  return (
    <Link key={article.slug} href={`/${categorySlug}/${article.slug}`}>
      <Card className="gap-2 border-l-4 border-l-primary hover:shadow-md transition-all duration-200 group cursor-pointer">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {article.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="text-gray-600 leading-relaxed mb-3">
            {article.description}
          </CardDescription>
          {article.tag && (
            <div className="flex flex-wrap gap-2">
              <Badge variant="default" className="text-xs capitalize">
                {article.tag}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

export function ArticleList({ articles, categorySlug }: ArticleListProps) {
  // Check if any articles have tags
  const hasTaggedArticles = articles.some((article) => article.tag);
  const shouldGroupByTags = hasTaggedArticles;

  if (!shouldGroupByTags) {
    // Regular display without tag grouping
    return (
      <div className="flex flex-col gap-4">
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            article={article}
            categorySlug={categorySlug}
          />
        ))}
      </div>
    );
  }

  // Group articles by tags
  const tagGroups = groupArticlesByTags(articles);
  const untaggedArticles = articles.filter((article) => !article.tag);

  return (
    <div className="flex flex-col gap-6">
      {/* Tagged articles grouped by tag */}
      {tagGroups.map((group) => (
        <div key={group.tag} className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="px-3 py-1 text-sm font-medium capitalize"
            >
              {group.tag}
            </Badge>
            <Separator className="flex-1" />
          </div>
          <div className="flex flex-col gap-4">
            {group.articles.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                categorySlug={categorySlug}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Untagged articles */}
      {untaggedArticles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="px-3 py-1 text-sm font-medium text-muted-foreground"
            >
              Other Articles
            </Badge>
            <Separator className="flex-1" />
          </div>
          <div className="flex flex-col gap-4">
            {untaggedArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                categorySlug={categorySlug}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

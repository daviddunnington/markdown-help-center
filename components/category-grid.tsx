import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CategoryGridProps {
  categories: Array<{
    name: string;
    title: string;
    slug: string;
    description: string;
    count: number;
    articles: Array<{ slug: string; title: string }>;
    emoji?: string;
  }>;
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map((category) => {
        return (
          <Link key={category.name} href={`/${category.slug}`}>
            <Card className="h-full gap-2 hover:shadow-md transition-all duration-200 group cursor-pointer">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <span className="text-2xl">{category.emoji}</span>
                  </div>
                  <div className="flex-1 self-end pb-2">
                    <CardTitle className="group-hover:text-primary transition-colors text-xl">
                      {category.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="leading-relaxed mb-4">
                  {category.description}
                </CardDescription>
                <Badge variant="default" className="text-xs">
                  {category.count} Article{category.count !== 1 ? "s" : ""}
                </Badge>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

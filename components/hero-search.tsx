import { Article } from "@/lib/content";
import { Header } from "./header";
import { SearchBar } from "./search-bar";
import { Breadcrumbs } from "./breadcrumbs";

interface HeroSearchProps {
  articles: Article[];
  breadcrumbItems?: { label: string; href: string }[];
}

export function HeroSearch({ articles, breadcrumbItems }: HeroSearchProps) {
  return (
    <div
      className="bg-gradient-to-br pb-20 -mb-28"
      style={{
        backgroundImage: `linear-gradient(to bottom right, var(--gradient-from), var(--gradient-via), var(--gradient-to))`,
      }}
    >
      <Header />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-6">
            How can we help? 👋
          </h1>
          <SearchBar articles={articles} />
        </div>
        <Breadcrumbs items={breadcrumbItems ?? []} />
      </div>
    </div>
  );
}

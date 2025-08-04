import { getAllArticles, getCategories } from "@/lib/content";
import { CategoryGrid } from "@/components/category-grid";
import { HeroSearch } from "@/components/hero-search";

export default async function HomePage() {
  const articles = await getAllArticles();
  const categories = getCategories(articles);

  return (
    <div className="min-h-screen bg-gray-100">
      <HeroSearch articles={articles} />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-600 mb-4">
            All Categories
          </h2>
        </div>
        <CategoryGrid categories={categories} />
      </main>
    </div>
  );
}

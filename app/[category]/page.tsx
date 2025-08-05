import { getAllArticles, getCategories } from "@/lib/content";
import { ArticleList } from "@/components/article-list";
import { notFound } from "next/navigation";
import { HeroSearch } from "@/components/hero-search";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  const categories = getCategories(articles);

  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categoryParam } = await params;
  const articles = await getAllArticles();
  const categories = getCategories(articles);
  const category = categories.find((cat) => cat.slug === categoryParam);

  if (!category) {
    notFound();
  }

  const categoryArticles = articles.filter(
    (article) =>
      article.category.toLowerCase().replace(/\s+/g, "-") === categoryParam
  );

  const breadcrumbItems = [
    { label: "All Categories", href: "/" },
    { label: category.name, href: `/${categoryParam}` },
  ];

  return (
    <>
      <HeroSearch articles={articles} breadcrumbItems={breadcrumbItems} />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {category.name}
            </h2>
            <p className="text-gray-600">{category.description}</p>
          </div>
          <ArticleList
            articles={categoryArticles}
            categorySlug={categoryParam}
          />
        </div>
      </main>
    </>
  );
}

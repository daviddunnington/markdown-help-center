import { getArticleBySlug, getAllArticles, getCategories } from "@/lib/content";
import { ArticleContent } from "@/components/article-content";
import { notFound } from "next/navigation";
import { BreadcrumbSetter } from "@/components/breadcrumb-setter";

interface ArticlePageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  const categories = getCategories(articles);

  const params: { category: string; slug: string }[] = [];

  for (const category of categories) {
    const categoryArticles = articles.filter(
      (article) =>
        article.category.toLowerCase().replace(/\s+/g, "-") === category.slug
    );

    for (const article of categoryArticles) {
      params.push({
        category: category.slug,
        slug: article.slug,
      });
    }
  }

  return params;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category: categoryParam, slug } = await params;
  const article = await getArticleBySlug(slug);
  const allArticles = await getAllArticles();
  const categories = getCategories(allArticles);

  if (!article) {
    notFound();
  }

  // Verify the article belongs to the correct category
  const articleCategorySlug = article.category
    .toLowerCase()
    .replace(/\s+/g, "-");
  if (articleCategorySlug !== categoryParam) {
    notFound();
  }

  const category = categories.find((cat) => cat.slug === categoryParam);

  if (!category) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "All Categories", href: "/" },
    { label: article.category, href: `/${categoryParam}` },
    { label: article.title, href: `/${categoryParam}/${slug}` },
  ];

  return (
    <>
      <BreadcrumbSetter items={breadcrumbItems} />

      <main className="container mx-auto max-w-4xl px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
          <ArticleContent article={article} />
        </div>
      </main>
    </>
  );
}

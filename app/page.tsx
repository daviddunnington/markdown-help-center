import { getAllArticles, getCategories } from "@/lib/content";
import { CategoryGrid } from "@/components/category-grid";
import { BreadcrumbSetter } from "@/components/breadcrumb-setter";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${siteConfig.siteName} - ${siteConfig.siteDescription}`,
  description: `Browse our comprehensive help center with guides, tutorials, and FAQs. Find answers to your questions and learn how to make the most of ${siteConfig.siteName}.`,
  keywords: [
    "help center",
    "documentation",
    "guides",
    "tutorials",
    "FAQ",
    "support",
  ],
  authors: [{ name: siteConfig.siteName }],
  creator: siteConfig.siteName,
  publisher: siteConfig.siteName,
  openGraph: {
    title: `${siteConfig.siteName} - ${siteConfig.siteDescription}`,
    description: `Browse our comprehensive help center with guides, tutorials, and FAQs. Find answers to your questions and learn how to make the most of ${siteConfig.siteName}.`,
    url: siteConfig.links.website,
    siteName: siteConfig.siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.siteName} - ${siteConfig.siteDescription}`,
    description: `Browse our comprehensive help center with guides, tutorials, and FAQs. Find answers to your questions and learn how to make the most of ${siteConfig.siteName}.`,
    creator: siteConfig.links.twitter
      ? siteConfig.links.twitter.replace("https://twitter.com/", "@")
      : undefined,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: undefined, // Add your Google Search Console verification code here
  },
};

export default async function HomePage() {
  const articles = await getAllArticles();
  const categories = getCategories(articles);

  return (
    <>
      <BreadcrumbSetter items={[{ label: "All Categories", href: "/" }]} />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <CategoryGrid categories={categories} />
      </main>
    </>
  );
}

"use client";

import { Article } from "@/lib/content";
import { HeroSearch } from "./hero-search";
import { useBreadcrumbs } from "@/lib/breadcrumb-context";

interface ClientHeroSearchProps {
  articles: Article[];
}

export function ClientHeroSearch({ articles }: ClientHeroSearchProps) {
  const { breadcrumbItems } = useBreadcrumbs();

  return <HeroSearch articles={articles} breadcrumbItems={breadcrumbItems} />;
}

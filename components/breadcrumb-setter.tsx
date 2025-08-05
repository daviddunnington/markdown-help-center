"use client";

import { useEffect } from "react";
import { useBreadcrumbs } from "@/lib/breadcrumb-context";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbSetterProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSetter({ items }: BreadcrumbSetterProps) {
  const { setBreadcrumbItems } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbItems(items);

    // Cleanup - reset breadcrumbs when component unmounts
    return () => {
      setBreadcrumbItems([]);
    };
  }, [items, setBreadcrumbItems]);

  return null; // This component doesn't render anything
}

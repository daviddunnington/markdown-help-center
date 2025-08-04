import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <Breadcrumb className="mt-6">
      <BreadcrumbList className="text-sm">
        {items.map((item, index) => (
          <div key={item.href} className="flex items-center">
            {index === items.length - 1 ? (
              <BreadcrumbPage className="text-white font-medium">
                {item.label}
              </BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link
                  href={item.href}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              </BreadcrumbLink>
            )}
            {index < items.length - 1 && (
              <BreadcrumbSeparator>
                <ChevronRight className="w-4 h-4 text-white/80" />
              </BreadcrumbSeparator>
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

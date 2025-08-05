"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SearchResults } from "./search-results";
import type { Article } from "@/lib/content";

interface SearchBarProps {
  articles: Article[];
}

export function SearchBar({ articles }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const isSearching = searchQuery.length > 0;

  const handleSearchResultSelect = () => {
    setSearchQuery("");
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        clearSearch();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        clearSearch();
      }
    };

    if (isSearching) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isSearching]);

  return (
    <div ref={searchRef} className="relative max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
        <Input
          type="text"
          placeholder="Search for articles"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex flex-1 h-14 flex-col rounded-lg p-3 border-2 border-white/30 bg-white/10 text-white pl-10 placeholder:text-white/80 focus-visible:!border-2 focus-visible:!border-white/80 transition-all duration-400"
        />
      </div>

      {isSearching && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <SearchResults
            articles={articles}
            searchQuery={searchQuery}
            onSelect={handleSearchResultSelect}
          />
        </div>
      )}
    </div>
  );
}

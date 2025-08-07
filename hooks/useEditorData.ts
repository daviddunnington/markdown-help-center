import { useState, useEffect } from "react";

export const useEditorData = () => {
  const [existingCategories, setExistingCategories] = useState<string[]>([]);
  const [existingTags, setExistingTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [categoriesRes, tagsRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/tags"),
        ]);

        if (categoriesRes.ok) {
          const categories = await categoriesRes.json();
          setExistingCategories(categories);
        }

        if (tagsRes.ok) {
          const tags = await tagsRes.json();
          setExistingTags(tags);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback to hardcoded values
        setExistingCategories([
          "getting-started",
          "general-info",
          "customisation",
        ]);
        setExistingTags([
          "beginner",
          "advanced",
          "tutorial",
          "guide",
          "reference",
          "troubleshooting",
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    existingCategories,
    existingTags,
    isLoading,
  };
};

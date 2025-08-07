import { generateSlug } from "../utils";

export const downloadFile = (
  content: string,
  filename: string,
  type = "text/markdown"
) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const downloadMarkdownFile = (content: string, title: string) => {
  const slug = generateSlug(title);
  const filename = `${slug}.md`;
  downloadFile(content, filename);
};

export const downloadZipFile = async (zipBlob: Blob, categoryName: string) => {
  const categorySlug = generateSlug(categoryName);
  const url = URL.createObjectURL(zipBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${categorySlug}.zip`;
  a.click();
  URL.revokeObjectURL(url);
};

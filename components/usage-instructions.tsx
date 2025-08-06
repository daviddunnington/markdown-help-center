import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UsageInstructions() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>📝 How to Use</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Fill in the article details in the left panel</li>
          <li>
            <strong>For existing categories:</strong> Select from the dropdown
          </li>
          <li>
            <strong>For new categories:</strong> Click &quot;+ Add new
            category&quot; and fill in all category details
          </li>
          <li>
            <strong>For tags:</strong> Select existing ones or click &quot;+ Add
            new tag&quot; to create custom tags
          </li>
          <li>Write your content using Markdown in the editor</li>
          <li>Use the preview mode to see how it will look</li>
          <li>
            <strong>Existing category:</strong> Click &quot;Download Markdown
            File&quot; and save to{" "}
            <code className="bg-muted px-1 rounded">
              content/[category]/[filename].md
            </code>
          </li>
          <li>
            <strong>New category:</strong> Click &quot;Download Category Folder
            (ZIP)&quot; to get both the category metadata and article files
          </li>
          <li>
            Extract the ZIP and copy the folder to your{" "}
            <code className="bg-muted px-1 rounded">content/</code> directory
          </li>
          <li>Commit and push to see your article live!</li>
        </ol>

        <div className="mt-4 p-3 bg-muted rounded-md">
          <p className="text-sm font-medium mb-2">
            📁 New Category ZIP Contains:
          </p>
          <ul className="text-xs space-y-1 ml-4">
            <li>
              <code>[category-name]/</code>
            </li>
            <li className="ml-4">
              <code>_category.md</code> - Category metadata
            </li>
            <li className="ml-4">
              <code>[article-name].md</code> - Your article
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

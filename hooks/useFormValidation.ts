export interface FormValidation {
  canDownload: boolean;
  canDownloadZip: boolean;
  canCommit: boolean;
  canCommitCategory: boolean;
}

export const useFormValidation = (
  form: { title: string; category: string; description: string },
  categoryForm: { title: string; description: string },
  isCustomCategory: boolean
): FormValidation => {
  const canDownload = !!(form.title && form.category && form.description);

  const canDownloadZip = !!(
    form.title &&
    form.category &&
    form.description &&
    categoryForm.title &&
    categoryForm.description
  );

  const canCommit = canDownload;

  const canCommitCategory = canDownloadZip && isCustomCategory;

  return {
    canDownload,
    canDownloadZip,
    canCommit,
    canCommitCategory,
  };
};

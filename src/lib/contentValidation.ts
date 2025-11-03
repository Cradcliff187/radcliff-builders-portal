/**
 * Content Validation Utilities
 * Detects corrupted/placeholder text and validates content quality
 */

export const isValidContent = (text: string | null | undefined): boolean => {
  if (!text) return false;
  
  // Check for placeholder patterns
  const placeholderPatterns = [
    /^[a-z]{20,}$/i,  // Long strings of repeated characters
    /^(test|placeholder|lorem|ipsum)/i,
    /^[dsf]{10,}/i,   // Pattern matching corrupted data
    /fff{5,}/i,       // Repeated 'f' characters
    /^(.)\1{10,}/,    // Any character repeated 10+ times
  ];
  
  if (placeholderPatterns.some(pattern => pattern.test(text))) {
    return false;
  }
  
  // Minimum content length (50 characters for meaningful text)
  if (text.trim().length < 50) return false;
  
  return true;
};

export const getValidatedContent = (text: string | null | undefined): string | null => {
  return isValidContent(text) ? text! : null;
};

export const isValidArray = (arr: any[] | null | undefined): boolean => {
  return Array.isArray(arr) && arr.length > 0;
};

/**
 * Image utility functions for graceful error handling and fallbacks
 */

// Default placeholder for project images
export const PROJECT_PLACEHOLDER = "/placeholder.svg";

/**
 * Generic image error handler - replaces broken image with fallback
 * Prevents infinite loop by nullifying onerror after first call
 */
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement>,
  fallbackSrc: string = PROJECT_PLACEHOLDER
) => {
  e.currentTarget.src = fallbackSrc;
  e.currentTarget.onerror = null;
};

/**
 * Generate UI Avatars fallback URL for team member headshots
 * Uses RCG brand colors: Navy background (#1B2B43), Orange text (#CF791D)
 */
export const getTeamMemberFallback = (name: string) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=500&background=1B2B43&color=CF791D&bold=true`;
};

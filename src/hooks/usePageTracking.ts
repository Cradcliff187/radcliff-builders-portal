/**
 * usePageTracking Hook
 *
 * Automatically tracks page views when the route changes.
 * Extracts page metadata and sends to GA4.
 */

import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/analytics';

/**
 * Determines page type from pathname
 */
function getPageType(pathname: string): 'home' | 'about' | 'service' | 'project' | 'contact' | 'blog' | 'admin' | undefined {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/about')) return 'about';
  if (pathname.startsWith('/team')) return 'about';
  if (pathname.startsWith('/services')) return 'service';
  if (pathname.startsWith('/industries')) return 'service';
  if (pathname.startsWith('/projects')) return 'project';
  if (pathname.startsWith('/contact')) return 'contact';
  if (pathname.startsWith('/insights')) return 'blog';
  if (pathname.startsWith('/admin')) return 'admin';
  return undefined;
}

/**
 * Determines page category from pathname
 */
function getPageCategory(pathname: string): string | undefined {
  if (pathname.startsWith('/projects/')) return 'project_detail';
  if (pathname === '/projects') return 'project_listing';
  if (pathname.startsWith('/admin/')) {
    const adminPath = pathname.replace('/admin/', '');
    return `admin_${adminPath}`;
  }
  return undefined;
}

/**
 * Custom hook to track page views on route changes
 */
export function usePageTracking() {
  const location = useLocation();
  const previousPath = useRef<string>('');

  useEffect(() => {
    // Get current page title (will be updated by SEO component)
    const pageTitle = document.title;
    const pagePath = location.pathname;

    // Avoid tracking the same page twice
    if (previousPath.current === pagePath) {
      return;
    }

    // Update previous path
    previousPath.current = pagePath;

    // Determine page metadata
    const pageType = getPageType(pagePath);
    const pageCategory = getPageCategory(pagePath);

    // Extract industry from query params if present
    const searchParams = new URLSearchParams(location.search);
    const pageIndustry = searchParams.get('industry') || undefined;

    // Track page view
    trackPageView({
      pageTitle,
      pagePath,
      pageType,
      pageCategory,
      pageIndustry,
    });
  }, [location]);
}

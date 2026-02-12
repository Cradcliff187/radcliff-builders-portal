/**
 * Google Analytics 4 Event Tracking Utilities
 *
 * Centralized module for tracking GA4 events throughout the application.
 * All event tracking should go through these functions for consistency.
 */

import type {
  GAEvent,
  ContactFormSubmitEvent,
  ContactFormSuccessEvent,
  ContactFormErrorEvent,
  CTAClickEvent,
  ClickToCallEvent,
  ClickToEmailEvent,
  ProjectViewEvent,
  ProjectFilterEvent,
  FeaturedProjectClickEvent,
  GalleryOpenEvent,
  GalleryNavigateEvent,
  GalleryCloseEvent,
  NavClickEvent,
  MobileMenuToggleEvent,
  SocialLinkClickEvent,
  ExternalLinkClickEvent,
  EnhancedPageViewEvent,
  ScrollDepthEvent,
} from '@/types/analytics';

/**
 * Core function to push events to Google Analytics dataLayer
 */
function pushEvent(event: GAEvent): void {
  if (typeof window === 'undefined') return;

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);

    // Log events in development for debugging
    if (import.meta.env.DEV) {
      console.log('[GA4 Event]', event.event, event);
    }
  } catch (error) {
    console.error('[GA4 Error] Failed to track event:', error);
  }
}

// ============================================================================
// FORM TRACKING
// ============================================================================

/**
 * Track contact form submission attempt
 */
export function trackContactFormSubmit(data: {
  industry?: string;
  preferredContact?: string;
  projectTimeline?: string;
  referralSource?: string;
  hasMessage: boolean;
  fieldsCompleted: number;
}): void {
  const event: ContactFormSubmitEvent = {
    event: 'contact_form_submit',
    form_name: 'contact_request',
    industry: data.industry,
    preferred_contact: data.preferredContact,
    project_timeline: data.projectTimeline,
    referral_source: data.referralSource,
    has_message: data.hasMessage,
    fields_completed: data.fieldsCompleted,
  };

  pushEvent(event);
}

/**
 * Track successful contact form submission
 */
export function trackContactFormSuccess(data: { industry?: string }): void {
  const event: ContactFormSuccessEvent = {
    event: 'contact_form_success',
    form_name: 'contact_request',
    industry: data.industry,
    value: 1, // Assign value for conversion tracking
    currency: 'USD',
  };

  pushEvent(event);
}

/**
 * Track contact form submission error
 */
export function trackContactFormError(errorType: string, errorMessage?: string): void {
  const event: ContactFormErrorEvent = {
    event: 'contact_form_error',
    form_name: 'contact_request',
    error_type: errorType,
    error_message: errorMessage,
  };

  pushEvent(event);
}

// ============================================================================
// CTA TRACKING
// ============================================================================

/**
 * Track CTA button clicks
 */
export function trackCTAClick(data: {
  ctaType: string;
  ctaText: string;
  ctaLocation: string;
  destinationUrl?: string;
}): void {
  const event: CTAClickEvent = {
    event: 'cta_click',
    cta_type: data.ctaType,
    cta_text: data.ctaText,
    cta_location: data.ctaLocation,
    destination_url: data.destinationUrl,
  };

  pushEvent(event);
}

// ============================================================================
// CONTACT INTERACTION TRACKING
// ============================================================================

/**
 * Track phone number clicks (click-to-call)
 */
export function trackClickToCall(phoneNumber: string, location: string): void {
  const event: ClickToCallEvent = {
    event: 'click_to_call',
    phone_number: phoneNumber,
    click_location: location,
  };

  pushEvent(event);
}

/**
 * Track email address clicks (click-to-email)
 */
export function trackClickToEmail(emailAddress: string, location: string): void {
  const event: ClickToEmailEvent = {
    event: 'click_to_email',
    email_address: emailAddress,
    click_location: location,
  };

  pushEvent(event);
}

// ============================================================================
// PROJECT TRACKING
// ============================================================================

/**
 * Track project detail page views
 */
export function trackProjectView(data: {
  projectId: string;
  projectTitle: string;
  projectIndustry: string;
  projectSlug: string;
  projectLocation?: string;
  squareFootage?: string;
}): void {
  const event: ProjectViewEvent = {
    event: 'project_view',
    project_id: data.projectId,
    project_title: data.projectTitle,
    project_industry: data.projectIndustry,
    project_slug: data.projectSlug,
    project_location: data.projectLocation,
    square_footage: data.squareFootage,
  };

  pushEvent(event);
}

/**
 * Track project filter changes
 */
export function trackProjectFilter(selectedIndustry: string, previousIndustry?: string): void {
  const event: ProjectFilterEvent = {
    event: 'project_filter_changed',
    filter_type: 'industry',
    selected_value: selectedIndustry,
    previous_value: previousIndustry,
  };

  pushEvent(event);
}

/**
 * Track featured project card clicks
 */
export function trackFeaturedProjectClick(data: {
  projectId: string;
  projectTitle: string;
  projectIndustry: string;
  clickPosition: number;
}): void {
  const event: FeaturedProjectClickEvent = {
    event: 'featured_project_click',
    project_id: data.projectId,
    project_title: data.projectTitle,
    project_industry: data.projectIndustry,
    click_position: data.clickPosition,
  };

  pushEvent(event);
}

// ============================================================================
// GALLERY TRACKING
// ============================================================================

/**
 * Track image gallery/lightbox opening
 */
export function trackGalleryOpen(data: {
  initialImageIndex: number;
  totalImages: number;
  projectTitle?: string;
}): void {
  const event: GalleryOpenEvent = {
    event: 'gallery_open',
    gallery_type: 'project_images',
    initial_image_index: data.initialImageIndex,
    total_images: data.totalImages,
    project_title: data.projectTitle,
  };

  pushEvent(event);
}

/**
 * Track gallery image navigation
 */
export function trackGalleryNavigate(
  direction: 'next' | 'previous',
  currentIndex: number,
  totalImages: number
): void {
  const event: GalleryNavigateEvent = {
    event: 'gallery_navigate',
    navigation_direction: direction,
    current_index: currentIndex,
    total_images: totalImages,
  };

  pushEvent(event);
}

/**
 * Track gallery closing
 */
export function trackGalleryClose(data: {
  finalImageIndex: number;
  imagesViewed: number;
  timeSpentSeconds?: number;
}): void {
  const event: GalleryCloseEvent = {
    event: 'gallery_close',
    final_image_index: data.finalImageIndex,
    images_viewed: data.imagesViewed,
    time_spent_seconds: data.timeSpentSeconds,
  };

  pushEvent(event);
}

// ============================================================================
// NAVIGATION TRACKING
// ============================================================================

/**
 * Track navigation link clicks
 */
export function trackNavClick(
  navItem: string,
  navLocation: 'header' | 'footer' | 'mobile_menu',
  destinationUrl: string
): void {
  const event: NavClickEvent = {
    event: 'nav_click',
    nav_item: navItem,
    nav_location: navLocation,
    destination_url: destinationUrl,
  };

  pushEvent(event);
}

/**
 * Track mobile menu toggle
 */
export function trackMobileMenuToggle(menuState: 'open' | 'close'): void {
  const event: MobileMenuToggleEvent = {
    event: 'mobile_menu_toggle',
    menu_state: menuState,
  };

  pushEvent(event);
}

// ============================================================================
// SOCIAL & EXTERNAL LINK TRACKING
// ============================================================================

/**
 * Track social media link clicks
 */
export function trackSocialLinkClick(
  platform: string,
  location: string,
  destinationUrl: string
): void {
  const event: SocialLinkClickEvent = {
    event: 'social_link_click',
    platform,
    click_location: location,
    destination_url: destinationUrl,
  };

  pushEvent(event);
}

/**
 * Track external link clicks
 */
export function trackExternalLinkClick(
  linkText: string,
  linkUrl: string,
  location: string
): void {
  const event: ExternalLinkClickEvent = {
    event: 'external_link_click',
    link_text: linkText,
    link_url: linkUrl,
    link_location: location,
  };

  pushEvent(event);
}

// ============================================================================
// PAGE VIEW TRACKING
// ============================================================================

/**
 * Track enhanced page views with custom properties
 */
export function trackPageView(data: {
  pageTitle: string;
  pagePath: string;
  pageCategory?: string;
  pageIndustry?: string;
  pageType?: 'home' | 'about' | 'service' | 'project' | 'contact' | 'blog' | 'admin';
}): void {
  const event: EnhancedPageViewEvent = {
    event: 'page_view',
    page_title: data.pageTitle,
    page_path: data.pagePath,
    page_category: data.pageCategory,
    page_industry: data.pageIndustry,
    page_type: data.pageType,
  };

  pushEvent(event);
}

// ============================================================================
// ENGAGEMENT TRACKING
// ============================================================================

/**
 * Track scroll depth milestones
 */
export function trackScrollDepth(
  depthPercent: 25 | 50 | 75 | 100,
  pagePath: string,
  pageTitle: string
): void {
  const event: ScrollDepthEvent = {
    event: 'scroll_depth',
    depth_percent: depthPercent,
    page_path: pagePath,
    page_title: pageTitle,
  };

  pushEvent(event);
}

// ============================================================================
// CONVERSION TRACKING
// ============================================================================

/**
 * Track conversions (wrapper for form success events)
 * This can be expanded to track other conversion types
 */
export function trackConversion(conversionType: string, value: number = 1): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: 'G-KVK4QDLM3S', // Your GA4 Measurement ID
      value: value,
      currency: 'USD',
      conversion_type: conversionType,
    });
  }
}

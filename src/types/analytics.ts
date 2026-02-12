/**
 * Google Analytics 4 Event Tracking Types
 *
 * Defines TypeScript interfaces for all GA4 custom events
 * tracked throughout the application.
 */

// Base event structure
export interface BaseGAEvent {
  event: string;
  [key: string]: string | number | boolean | undefined;
}

// Form Events
export interface ContactFormSubmitEvent extends BaseGAEvent {
  event: 'contact_form_submit';
  form_name: 'contact_request';
  industry?: string;
  preferred_contact?: string;
  project_timeline?: string;
  referral_source?: string;
  has_message: boolean;
  fields_completed: number;
}

export interface ContactFormSuccessEvent extends BaseGAEvent {
  event: 'contact_form_success';
  form_name: 'contact_request';
  industry?: string;
  value: number;
  currency: 'USD';
}

export interface ContactFormErrorEvent extends BaseGAEvent {
  event: 'contact_form_error';
  form_name: 'contact_request';
  error_type: string;
  error_message?: string;
}

// CTA Events
export interface CTAClickEvent extends BaseGAEvent {
  event: 'cta_click';
  cta_type: string;
  cta_text: string;
  cta_location: string;
  destination_url?: string;
}

// Contact Events
export interface ClickToCallEvent extends BaseGAEvent {
  event: 'click_to_call';
  phone_number: string;
  click_location: string;
}

export interface ClickToEmailEvent extends BaseGAEvent {
  event: 'click_to_email';
  email_address: string;
  click_location: string;
}

// Project Events
export interface ProjectViewEvent extends BaseGAEvent {
  event: 'project_view';
  project_id: string;
  project_title: string;
  project_industry: string;
  project_slug: string;
  project_location?: string;
  square_footage?: string;
}

export interface ProjectFilterEvent extends BaseGAEvent {
  event: 'project_filter_changed';
  filter_type: 'industry';
  selected_value: string;
  previous_value?: string;
}

export interface FeaturedProjectClickEvent extends BaseGAEvent {
  event: 'featured_project_click';
  project_id: string;
  project_title: string;
  project_industry: string;
  click_position: number;
}

// Gallery Events
export interface GalleryOpenEvent extends BaseGAEvent {
  event: 'gallery_open';
  gallery_type: 'project_images';
  initial_image_index: number;
  total_images: number;
  project_title?: string;
}

export interface GalleryNavigateEvent extends BaseGAEvent {
  event: 'gallery_navigate';
  navigation_direction: 'next' | 'previous';
  current_index: number;
  total_images: number;
}

export interface GalleryCloseEvent extends BaseGAEvent {
  event: 'gallery_close';
  final_image_index: number;
  images_viewed: number;
  time_spent_seconds?: number;
}

// Navigation Events
export interface NavClickEvent extends BaseGAEvent {
  event: 'nav_click';
  nav_item: string;
  nav_location: 'header' | 'footer' | 'mobile_menu';
  destination_url: string;
}

export interface MobileMenuToggleEvent extends BaseGAEvent {
  event: 'mobile_menu_toggle';
  menu_state: 'open' | 'close';
}

// Social & External Links
export interface SocialLinkClickEvent extends BaseGAEvent {
  event: 'social_link_click';
  platform: string;
  click_location: string;
  destination_url: string;
}

export interface ExternalLinkClickEvent extends BaseGAEvent {
  event: 'external_link_click';
  link_text: string;
  link_url: string;
  link_location: string;
}

// Page View Enhancement
export interface EnhancedPageViewEvent extends BaseGAEvent {
  event: 'page_view';
  page_title: string;
  page_path: string;
  page_category?: string;
  page_industry?: string;
  page_type?: 'home' | 'about' | 'service' | 'project' | 'contact' | 'blog' | 'admin';
}

// Engagement Events
export interface ScrollDepthEvent extends BaseGAEvent {
  event: 'scroll_depth';
  depth_percent: 25 | 50 | 75 | 100;
  page_path: string;
  page_title: string;
}

// Union type of all possible events
export type GAEvent =
  | ContactFormSubmitEvent
  | ContactFormSuccessEvent
  | ContactFormErrorEvent
  | CTAClickEvent
  | ClickToCallEvent
  | ClickToEmailEvent
  | ProjectViewEvent
  | ProjectFilterEvent
  | FeaturedProjectClickEvent
  | GalleryOpenEvent
  | GalleryNavigateEvent
  | GalleryCloseEvent
  | NavClickEvent
  | MobileMenuToggleEvent
  | SocialLinkClickEvent
  | ExternalLinkClickEvent
  | EnhancedPageViewEvent
  | ScrollDepthEvent;

// Window interface extension for dataLayer
declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

# GA4 Event Tracking Implementation Guide

**Date**: February 11, 2026
**Status**: Phase 2A Complete - Core Infrastructure + Contact Form Tracking
**GA4 Measurement ID**: G-KVK4QDLM3S

---

## Table of Contents

1. [Overview](#overview)
2. [What's Been Implemented](#whats-been-implemented)
3. [Architecture](#architecture)
4. [Testing Your Events](#testing-your-events)
5. [Implementation Roadmap](#implementation-roadmap)
6. [Event Catalog](#event-catalog)
7. [Conversion Tracking Setup](#conversion-tracking-setup)
8. [Troubleshooting](#troubleshooting)

---

## Overview

Your website now has a **comprehensive GA4 event tracking infrastructure** that allows you to measure every important user interaction. This goes far beyond basic page view tracking to give you detailed insights into:

- **Conversions**: Contact form submissions, phone calls, email clicks
- **User Engagement**: Project views, gallery interactions, navigation clicks
- **Content Performance**: Which CTAs work best, which projects get views
- **User Journey**: Complete funnel from landing to conversion

### Current Status

✅ **IMPLEMENTED** (Phase 2A):
- Core analytics infrastructure
- TypeScript type safety for all events
- Contact form tracking (submit, success, error)
- Phone/email click tracking (Contact page)
- Page view tracking hook (ready to activate)

⏳ **PENDING** (Phase 2B - Optional):
- CTA button tracking across all components
- Project detail view tracking
- Gallery/lightbox interaction tracking
- Navigation and filter tracking
- Social media link tracking

---

## What's Been Implemented

###  1. **Core Analytics Infrastructure**

#### `/src/types/analytics.ts`
- **Purpose**: TypeScript definitions for all GA4 events
- **Benefits**:
  - Type safety prevents tracking errors
  - Auto-complete in your IDE
  - Self-documenting event structure
- **Events Defined**: 15+ custom event types

#### `/src/lib/analytics.ts`
- **Purpose**: Centralized tracking functions
- **Key Functions**:
  - `trackContactFormSubmit()` - Track form submission attempts
  - `trackContactFormSuccess()` - Track successful submissions
  - `trackContactFormError()` - Track form errors
  - `trackClickToCall()` - Track phone number clicks
  - `trackClickToEmail()` - Track email clicks
  - `trackCTAClick()` - Track CTA button clicks
  - `trackProjectView()` - Track project detail views
  - `trackPageView()` - Track enhanced page views
  - ...and 10+ more tracking functions

#### `/src/hooks/usePageTracking.ts`
- **Purpose**: Automatic page view tracking on route changes
- **Features**:
  - Detects page type (home, project, contact, etc.)
  - Extracts industry from query params
  - Prevents duplicate tracking
  - Integrates with React Router

### 2. **Contact Form Tracking** ✅ COMPLETE

**File**: `/src/pages/Contact.tsx`

**Events Tracked**:

| Event | Trigger | Data Captured |
|-------|---------|---------------|
| `contact_form_submit` | User clicks Submit | Industry, timeline, referral source, fields completed |
| `contact_form_success` | Submission succeeds | Industry, conversion value ($1) |
| `contact_form_error` | Submission fails | Error type, error message |
| `click_to_call` | User clicks phone number | Phone number, location (contact_page_card) |
| `click_to_email` | User clicks email | Email address, location (contact_page_card) |

**Example Event Data**:
```javascript
// When user submits contact form
{
  event: 'contact_form_submit',
  form_name: 'contact_request',
  industry: 'Healthcare',
  preferred_contact: 'Phone Call',
  project_timeline: '1-3 months',
  referral_source: 'Google Search',
  has_message: true,
  fields_completed: 9
}

// When submission succeeds
{
  event: 'contact_form_success',
  form_name: 'contact_request',
  industry: 'Healthcare',
  value: 1,
  currency: 'USD'
}
```

**Business Value**:
- Know exactly how many leads you get
- See which industries generate most inquiries
- Track conversion rate from visitors to leads
- Identify drop-off points in form

---

## Architecture

### Data Flow

```
User Action
    ↓
React Component (onClick handler)
    ↓
Analytics Function (src/lib/analytics.ts)
    ↓
dataLayer.push()
    ↓
Google Analytics 4
    ↓
GA4 Reports & Dashboards
```

### Example Implementation

**Before** (no tracking):
```tsx
<Button onClick={handleSubmit}>
  Submit
</Button>
```

**After** (with tracking):
```tsx
import { trackContactFormSubmit } from '@/lib/analytics';

<Button onClick={() => {
  trackContactFormSubmit({
    industry: data.industry,
    preferredContact: data.preferred_contact,
    // ...more data
  });
  handleSubmit();
}}>
  Submit
</Button>
```

### Type Safety

All tracking functions are fully typed:
```typescript
// TypeScript ensures you pass correct data
trackContactFormSubmit({
  industry: 'Healthcare',        // ✅ Valid
  preferredContact: 'Email',     // ✅ Valid
  hasMessage: true,              // ✅ Valid
  randomField: 'test'            // ❌ TypeScript error!
});
```

---

## Testing Your Events

### Local Development Testing

Events are automatically logged to console in development:

1. **Start Dev Server**:
   ```bash
   npm run dev
   ```

2. **Open Browser Console** (F12)

3. **Trigger an Event** (e.g., submit contact form)

4. **Look for**:
   ```
   [GA4 Event] contact_form_submit {
     event: "contact_form_submit",
     form_name: "contact_request",
     industry: "Healthcare",
     ...
   }
   ```

### Production Testing

#### Option 1: GA4 DebugView (Recommended)

1. **Enable Debug Mode**:
   - Install [Google Analytics Debugger Chrome Extension](https://chrome.google.com/webstore/detail/google-analytics-debugger)
   - Or add `?debug_mode=true` to your URL

2. **Open GA4 DebugView**:
   - Go to: https://analytics.google.com/analytics/web/#/a0p0/
   - Navigate to: Configure → DebugView
   - Select your property

3. **Trigger Events**:
   - Submit contact form
   - Click phone number
   - Click email link

4. **Watch Events Appear** in real-time!

#### Option 2: Realtime Reports

1. Go to GA4 → Reports → Realtime
2. Trigger events on your site
3. See events appear within 30 seconds

#### Option 3: Browser Network Tab

1. Open DevTools → Network tab
2. Filter for "collect"
3. Trigger event
4. See POST request to `https://www.google-analytics.com/g/collect`
5. Click request → Payload → Form Data
6. See event data sent to GA4

---

## Implementation Roadmap

### Phase 2A: COMPLETE ✅

**What's Done**:
- ✅ Core analytics infrastructure
- ✅ TypeScript types for all events
- ✅ Contact form tracking (critical conversion event)
- ✅ Phone/email click tracking (Contact page)
- ✅ Page view tracking hook (infrastructure ready)

**Time Invested**: ~4 hours
**Business Impact**: Can now track conversions!

---

### Phase 2B: Optional Enhancements (Recommended)

**Effort**: 4-6 hours
**When to Do**: After deploying Phase 2A and confirming events work

#### 1. Activate Page View Tracking (15 minutes)

**File**: `/src/App.tsx`

**Add to top of App component**:
```tsx
import { usePageTracking } from '@/hooks/usePageTracking';

function App() {
  // Activate automatic page view tracking
  usePageTracking();

  return (
    // ... rest of component
  );
}
```

**Benefit**: Track every page view with enhanced metadata (page type, category, industry)

---

#### 2. Add CTA Button Tracking (2-3 hours)

**Priority**: HIGH - Measure effectiveness of calls-to-action

**Components to Update**:

**A. Hero Button** (`src/components/Hero.tsx`, line 68-71)
```tsx
import { trackCTAClick } from '@/lib/analytics';

<Link to="/contact">
  <Button
    variant="hero"
    size="lg"
    onClick={() => trackCTAClick({
      ctaType: 'hero_conversation',
      ctaText: 'Start a Conversation',
      ctaLocation: 'hero_section',
      destinationUrl: '/contact'
    })}
  >
    Start a Conversation
  </Button>
</Link>
```

**B. CTASection Component** (`src/components/CTASection.tsx`)
- Primary button (line 20-22)
- Phone button (line 23-33)
- Email link (line 37-41)

**C. Industries Component** (`src/components/Industries.tsx`)
- 4 industry cards (lines 50-72, 77-102)
- Banner button (lines 114-119)

**D. Header** (`src/components/Header.tsx`)
- "Request Consultation" button (lines 97-99, 148-152)

**Expected Events**: 20-30 CTA click events per day

---

#### 3. Add Project Tracking (1-2 hours)

**Priority**: MEDIUM - Understand which projects drive engagement

**A. Project Detail Views** (`src/pages/ProjectDetail.tsx`)

Add after line 37:
```tsx
import { trackProjectView } from '@/lib/analytics';
import { useEffect } from 'react';

useEffect(() => {
  if (project) {
    trackProjectView({
      projectId: project.id,
      projectTitle: project.title,
      projectIndustry: project.industry,
      projectSlug: slug!,
      projectLocation: project.location,
      squareFootage: project.square_footage,
    });
  }
}, [project, slug]);
```

**B. Project Filter Changes** (`src/pages/Projects.tsx`)

Modify filter button click handlers (around line 50-58):
```tsx
import { trackProjectFilter } from '@/lib/analytics';

onClick={() => {
  trackProjectFilter(industry, selectedIndustry); // Track before changing
  setSelectedIndustry(industry);
}}
```

**C. Featured Project Clicks** (`src/components/FeaturedProjects.tsx`)

Add to project card link (line 34):
```tsx
import { trackFeaturedProjectClick } from '@/lib/analytics';

<Link
  to={`/projects/${project.slug}`}
  onClick={() => trackFeaturedProjectClick({
    projectId: project.id,
    projectTitle: project.title,
    projectIndustry: project.industry,
    clickPosition: index
  })}
>
```

**Expected Events**: 50-100 project interactions per day

---

#### 4. Add Gallery Tracking (1 hour)

**Priority**: LOW - Nice to have engagement metric

**File**: `src/components/ProjectImageGallery.tsx`

**A. Gallery Open** (modify line 31-33):
```tsx
import { trackGalleryOpen } from '@/lib/analytics';

const openLightbox = (index: number) => {
  trackGalleryOpen({
    initialImageIndex: index,
    totalImages: allImages.length,
    projectTitle: project?.title
  });

  setCurrentIndex(index);
  setLightboxOpen(true);
};
```

**B. Image Navigation** (modify lines 36-42):
```tsx
import { trackGalleryNavigate } from '@/lib/analytics';

const nextImage = () => {
  const newIndex = (currentIndex + 1) % allImages.length;
  trackGalleryNavigate('next', newIndex, allImages.length);
  setCurrentIndex(newIndex);
};

const previousImage = () => {
  const newIndex = (currentIndex - 1 + allImages.length) % allImages.length;
  trackGalleryNavigate('previous', newIndex, allImages.length);
  setCurrentIndex(newIndex);
};
```

**Expected Events**: 10-20 gallery interactions per day

---

#### 5. Add Navigation Tracking (1 hour)

**Priority**: LOW - Understand user navigation patterns

**Files**:
- `src/components/Header.tsx` (header nav, mobile menu)
- `src/components/Footer.tsx` (footer links, social links)

**Example for Header Nav Links**:
```tsx
import { trackNavClick } from '@/lib/analytics';

<Link
  to="/about"
  onClick={() => trackNavClick('About', 'header', '/about')}
>
  About
</Link>
```

**Expected Events**: 100-200 nav clicks per day

---

## Event Catalog

### Currently Tracked Events

| Event Name | Purpose | Where Used | Data Captured |
|------------|---------|------------|---------------|
| `contact_form_submit` | Track form submissions | Contact.tsx | Industry, timeline, referral, fields count |
| `contact_form_success` | Track successful leads | Contact.tsx | Industry, conversion value |
| `contact_form_error` | Track form failures | Contact.tsx | Error type, message |
| `click_to_call` | Track phone clicks | Contact.tsx | Phone number, location |
| `click_to_email` | Track email clicks | Contact.tsx | Email address, location |

### Available But Not Yet Implemented

| Event Name | Purpose | Estimated Implementation Time |
|------------|---------|-------------------------------|
| `cta_click` | Track all CTA buttons | 2-3 hours |
| `project_view` | Track project detail views | 30 minutes |
| `project_filter_changed` | Track filter usage | 15 minutes |
| `featured_project_click` | Track featured project clicks | 15 minutes |
| `gallery_open` | Track image gallery opens | 15 minutes |
| `gallery_navigate` | Track image navigation | 15 minutes |
| `gallery_close` | Track gallery closes | 15 minutes |
| `nav_click` | Track navigation | 1 hour |
| `mobile_menu_toggle` | Track mobile menu | 10 minutes |
| `social_link_click` | Track social clicks | 30 minutes |
| `external_link_click` | Track external links | 30 minutes |
| `scroll_depth` | Track scroll engagement | 1 hour (requires new hook) |

---

## Conversion Tracking Setup

### Step 1: Mark Conversions in GA4

1. Go to: https://analytics.google.com/analytics/web
2. Navigate to: Configure → Events
3. Find event: `contact_form_success`
4. Toggle: "Mark as conversion" → ON ✅

**Why**: This tells GA4 that form submissions are conversions you care about.

### Step 2: Set Conversion Value

Already done! ✅ We send `value: 1` and `currency: 'USD'` with every successful form submission.

**To customize value**:
Edit `/src/lib/analytics.ts` line ~95:
```typescript
value: 1,  // Change to your estimated lead value (e.g., 100 for $100)
```

### Step 3: Create Conversion Funnel

In GA4, create an Exploration report:
1. Reports → Explore → Funnel exploration
2. Add steps:
   - Step 1: `page_view` (page_path = '/contact')
   - Step 2: `contact_form_submit`
   - Step 3: `contact_form_success`
3. See drop-off rates at each step!

---

## Key Metrics to Track

### Conversion Metrics (Most Important)

Track these in GA4 to measure ROI:

| Metric | How to Find | Target |
|--------|-------------|--------|
| **Form Submissions** | Events → contact_form_success | 5-10/week initially |
| **Conversion Rate** | (form_success / page_views) × 100 | 2-5% |
| **Phone Clicks** | Events → click_to_call | 10-20/week |
| **Email Clicks** | Events → click_to_email | 5-10/week |
| **Cost Per Lead** | Ad Spend / Form Submissions | Varies by channel |

### Engagement Metrics

| Metric | Purpose | How to Find |
|--------|---------|-------------|
| **Project Views** | Popular projects | Events → project_view |
| **CTA Click Rate** | CTA effectiveness | Events → cta_click |
| **Industry Interest** | Which industries convert | Event parameter: industry |
| **Referral Sources** | Where leads come from | Event parameter: referral_source |
| **Scroll Depth** | Content engagement | Events → scroll_depth (when implemented) |

---

## GA4 Custom Reports to Create

### 1. Lead Generation Dashboard

**Metrics to Include**:
- Total form submissions (contact_form_success)
- Conversion rate
- Top industries (group by industry parameter)
- Top referral sources (group by referral_source)
- Phone vs Email preference

**How to Create**:
1. GA4 → Explore → Blank
2. Add Metrics: contact_form_success (count)
3. Add Dimensions: industry, referral_source, preferred_contact
4. Create visualization

### 2. Content Engagement Report

**Metrics to Include**:
- Project views by industry
- Most clicked CTAs
- Gallery interactions
- Time on site by page type

### 3. User Journey Report

**Path Exploration**:
1. Reports → Explore → Path exploration
2. Starting point: Landing page
3. Ending point: contact_form_success
4. See common paths to conversion

---

## Troubleshooting

### Events Not Showing in GA4

**Problem**: You triggered an event but don't see it in GA4.

**Solutions**:

1. **Check Console** (Development):
   - Open browser console
   - Look for `[GA4 Event]` logs
   - If you see them, events ARE being sent

2. **Wait 24-48 Hours** (Production):
   - GA4 can take up to 48 hours to process events
   - Use DebugView for real-time testing

3. **Verify GA4 ID**:
   - Check `/index.html` line 34
   - Ensure ID is `G-KVK4QDLM3S`
   - Verify in GA4 admin → Data Streams

4. **Check Ad Blockers**:
   - Ad blockers can prevent GA4
   - Test in incognito mode
   - Or disable ad blockers

### Events Showing Wrong Data

**Problem**: Event data is incorrect or missing parameters.

**Solution**:
1. Check TypeScript types in `/src/types/analytics.ts`
2. Verify function call matches type definition
3. Use DebugView to see exact data sent

### Duplicate Events

**Problem**: Same event tracked twice.

**Causes**:
- Multiple onClick handlers
- React re-renders triggering useEffect
- Component mounting twice (React Strict Mode in dev)

**Solution**:
- Check for duplicate tracking calls
- Use `useRef` to prevent duplicate tracking in useEffect
- Verify events only tracked once in production

---

## Next Steps

### Immediate (This Week)

1. **Deploy Phase 2A** ✅
   - Push current changes to production
   - Verify events work in DebugView

2. **Mark Conversions** in GA4
   - Configure `contact_form_success` as conversion
   - Set up conversion reporting

3. **Monitor for 1 Week**
   - Track form submissions
   - Verify phone/email clicks
   - Check for any tracking errors

### Short-term (Next 2 Weeks)

4. **Implement Phase 2B** (Optional)
   - Add page view tracking (15 min)
   - Add CTA tracking (2-3 hours)
   - Add project tracking (1-2 hours)

5. **Create Custom Reports**
   - Lead generation dashboard
   - Content engagement report
   - User journey visualization

### Long-term (Month 2+)

6. **Optimize Based on Data**
   - Identify top-performing CTAs
   - See which industries convert best
   - Optimize low-converting pages

7. **Advanced Tracking**
   - Scroll depth tracking
   - Video tracking (if you add videos)
   - Chat widget tracking (if you add chat)

---

## File Reference

### New Files Created

| File | Purpose | Lines |
|------|---------|-------|
| `/src/types/analytics.ts` | TypeScript event definitions | 200+ |
| `/src/lib/analytics.ts` | Tracking functions | 400+ |
| `/src/hooks/usePageTracking.ts` | Page view tracking hook | 60+ |

### Modified Files

| File | Changes | Lines Modified |
|------|---------|----------------|
| `/src/pages/Contact.tsx` | Added form & click tracking | ~15 |

---

## Success Criteria

### Week 1
- ✅ Events appear in GA4 DebugView
- ✅ At least 1 contact form submission tracked
- ✅ Phone/email clicks registering

### Month 1
- ✅ 20+ form submissions tracked
- ✅ Conversion rate calculated
- ✅ Top industries identified
- ✅ Custom dashboard created

### Month 3
- ✅ 100+ form submissions
- ✅ Clear ROI from SEO traffic
- ✅ Data-driven optimizations made
- ✅ Consistent lead generation

---

## Support & Resources

### Documentation
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [dataLayer Reference](https://developers.google.com/tag-platform/tag-manager/datalayer)
- [Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4)

### Tools
- [GA4 DebugView](https://support.google.com/analytics/answer/7201382)
- [Google Analytics Debugger Extension](https://chrome.google.com/webstore/detail/google-analytics-debugger)
- [Tag Assistant](https://tagassistant.google.com/)

### Your GA4 Property
- **Measurement ID**: G-KVK4QDLM3S
- **Property Access**: https://analytics.google.com/analytics/web/#/a0p0/

---

**Implementation Date**: February 11, 2026
**Version**: 2.0
**Status**: Phase 2A Complete ✅
**Phase 2B**: Optional enhancements available

**Your conversion tracking is now live! 🎉**
Deploy and start measuring your ROI from day one.

# RCG Construction Website - Cursor AI Agent Deep Evaluation & Implementation Guide

## Project Overview

**Client:** Radcliff Construction Group (RCG)  
**Website:** teamradcliff.com (React/TypeScript/Vite/Tailwind)  
**Target Audience:** B2B facility managers, property directors, project owners  
**Project Scope:** $25K-$500K healthcare, commercial, retail, and office renovations  
**Service Region:** Cincinnati, Dayton, Lexington, Northern Kentucky

---

## Brand Guidelines Summary

### Colors (CRITICAL - Use exact values)
| Name | HEX | RGB | Usage |
|------|-----|-----|-------|
| Primary Navy | `#1B2B43` | 27, 43, 67 | Headers, nav, backgrounds, primary buttons |
| Accent Orange | `#CF791D` | 207, 121, 29 | CTAs, highlights, hover states, accents |
| Dark Charcoal | `#4B4B4B` | 75, 75, 75 | Body text, outlines |
| Light Grey | `#F2F2F2` | 242, 242, 242 | Card backgrounds, whitespace |
| True Black | `#000000` | 0, 0, 0 | Hero/footer backgrounds |
| White | `#FFFFFF` | 255, 255, 255 | Text on dark backgrounds |

### Typography
- **Headings:** Montserrat Bold/SemiBold - ALWAYS uppercase with `tracking-wider`
- **Body:** Open Sans Regular
- **Fallback:** Arial, Helvetica, sans-serif

### Design Principles
- **Sharp corners:** `rounded-none` everywhere (no border-radius)
- **Ample whitespace:** Section padding `py-24` (96px)
- **Container:** `max-w-[1440px] mx-auto px-6 lg:px-20`
- **Hover effects:** `hover:scale-105` or `hover:scale-110` with `transition-all duration-300`
- **Shadows:** `shadow-md` default, `hover:shadow-xl` on interaction

---

## Tech Stack

- React 18.3.1 with TypeScript 5.8.3
- Vite 5.4.19 (build tool)
- Tailwind CSS 3.4.17 (styling - no custom CSS except design tokens)
- shadcn/ui + Radix UI (component library)
- react-router-dom 6.30.1 (routing)
- Supabase (connected, used for contact form and admin)
- sonner 1.7.4 (toast notifications)
- Lucide React (icons)

---

## File Structure

```
src/
├── components/
│   ├── ui/                    # shadcn components (DO NOT EDIT)
│   ├── Header.tsx             # Navigation
│   ├── Footer.tsx             # Footer with certifications list
│   ├── Hero.tsx               # Homepage hero
│   ├── TrustBadges.tsx        # Slim trust bar below hero
│   ├── Certifications.tsx     # Visual certification badges section
│   ├── FourPillars.tsx        # Value propositions
│   ├── FeaturedProjects.tsx   # Project cards
│   ├── Industries.tsx         # Industry grid
│   ├── Testimonials.tsx       # Auto-rotating slider
│   ├── CTASection.tsx         # Call-to-action
│   └── SEO.tsx                # Meta tags component
├── pages/
│   ├── Home.tsx               # Landing page
│   ├── About.tsx              # Company story
│   ├── Services.tsx           # Services with inline certifications
│   ├── Projects.tsx           # Portfolio with filtering
│   ├── IndustriesPage.tsx     # Industry details
│   ├── Contact.tsx            # Contact form
│   └── NotFound.tsx           # 404 page
├── assets/                    # Images
├── lib/
│   ├── utils.ts               # cn() utility
│   └── imageUtils.ts          # Image error handling
├── hooks/                     # Custom hooks
└── integrations/supabase/     # DO NOT EDIT - auto-generated
```

---

## TASK 1: Verify BBB Badge Implementation

Lovable recently implemented the BBB Accredited Business badge. Verify and fix if needed.

### Expected Implementation Locations:

#### 1.1 Certifications Component (`src/components/Certifications.tsx`)

**Expected State:**
- BBB seal added to certifications array between ICRA and Licensed
- Array structure supports `link` property for external URLs
- Rendering conditionally wraps images in anchor tags when `link` exists
- BBB image uses external URL: `https://seal-cincinnati.bbb.org/seals/blue-seal-280-80-bbb-90053745.png`
- Link URL: `https://www.bbb.org/us/ky/erlanger/profile/construction/radcliff-construction-group-llc-0292-90053745/#sealclick`
- Anchor has: `target="_blank" rel="nofollow noopener"`
- Aria-label indicates new tab behavior
- Hover effect: `hover:scale-110 transition-transform duration-300`
- Label text: "BBB Accredited" (white, uppercase, tracking-wider)

**Verify:**
- [ ] BBB seal renders correctly
- [ ] Link opens BBB profile in new tab
- [ ] Hover scale effect works
- [ ] Styling matches other badges
- [ ] Mobile responsive (flex-wrap works)

#### 1.2 Services Page (`src/pages/Services.tsx`)

**Expected State:**
- BBB badge added to the inline "Certifications Highlight" section
- Matches exact styling of OSHA and ICRA badges in that section
- Same link and accessibility attributes as Certifications component

**Verify:**
- [ ] BBB badge present in Services page certification section
- [ ] Consistent styling with OSHA/ICRA badges
- [ ] Link works correctly

#### 1.3 Footer (`src/components/Footer.tsx`)

**Expected State:**
- "BBB Accredited (A-)" added to certifications text list
- Text is a link to BBB profile
- Has hover state: `hover:text-secondary transition-colors`
- Proper accessibility attributes

**Verify:**
- [ ] BBB text link present in footer certifications list
- [ ] Link styling matches footer design
- [ ] Opens in new tab

### Fix if Needed:

If any implementation is missing or incorrect, implement according to these specifications:

```typescript
// Certifications array structure
const certifications = [
  { image: "/assets/certifications/osha-logo-new.png", label: "OSHA 30 Certified" },
  { image: "/assets/certifications/icra-logo.png", label: "ICRA Certified" },
  { 
    image: "https://seal-cincinnati.bbb.org/seals/blue-seal-280-80-bbb-90053745.png", 
    label: "BBB Accredited",
    link: "https://www.bbb.org/us/ky/erlanger/profile/construction/radcliff-construction-group-llc-0292-90053745/#sealclick",
    alt: "Radcliff Construction Group, LLC BBB Business Review"
  },
  { icon: FileCheck, label: "Licensed" },
];
```

---

## TASK 2: Trust Signal Audit & Enhancements

### 2.1 Review Current Trust Signals

Audit all trust signals across the site and ensure consistency:

| Signal | Locations | Status |
|--------|-----------|--------|
| OSHA 30 Certified | Certifications, Services, Footer, TrustBadges, About | Verify all |
| ICRA Certified | Certifications, Services, Footer, TrustBadges, About | Verify all |
| BBB Accredited | Certifications, Services, Footer | NEW - Verify |
| Licensed | Certifications, Services, Footer | Verify all |
| Years Experience | StatsBar, About | Verify consistency |
| Projects Completed | StatsBar, About | Verify consistency |
| Client Satisfaction | StatsBar, About | Verify consistency |

### 2.2 Recommended Enhancements

**A. Add Google Business Profile Link (if not present)**
- Footer contact section could link to Google Business Profile
- Helps with local SEO and trust

**B. Verify All External Links**
- Check all certification/trust badge links work
- Ensure proper `rel="noopener"` on all external links
- Verify `target="_blank"` behavior

**C. Schema.org Structured Data**
- Verify LocalBusiness schema exists in SEO component
- Should include: name, address, phone, ratings, certifications
- Check for proper JSON-LD implementation

---

## TASK 3: Code Quality & Consistency Audit

### 3.1 Component Patterns

Check for consistent patterns across all components:

**Heading Pattern:**
```tsx
<h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold uppercase tracking-wide mb-6">
  {/* Always uppercase, tracking-wide */}
</h2>
```

**Section Pattern:**
```tsx
<section className="py-24 bg-{color}">
  <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
    {/* Content */}
  </div>
</section>
```

**Card Pattern:**
```tsx
<div className="bg-white rounded-none shadow-md hover:shadow-xl transition-all duration-300">
  {/* Content */}
</div>
```

**Button Pattern:**
```tsx
<Button variant="secondary" size="lg" className="uppercase tracking-wider">
  {/* CTA Text */}
</Button>
```

### 3.2 Check for Inconsistencies

- [ ] All headings use Montserrat (font-heading)
- [ ] All headings are uppercase with tracking-wide/tracking-wider
- [ ] No rounded corners anywhere (should be rounded-none)
- [ ] Consistent section padding (py-24)
- [ ] Consistent container widths (max-w-[1440px])
- [ ] All hover states use transition-all or transition-colors
- [ ] No hardcoded colors outside brand palette

### 3.3 TypeScript Improvements

- [ ] Add proper interfaces for data structures (projects, testimonials, etc.)
- [ ] Ensure no `any` types
- [ ] Verify all props are properly typed

---

## TASK 4: Accessibility Audit

### 4.1 Critical Checks

- [ ] All images have descriptive alt text (not generic like "image")
- [ ] All icon-only buttons have aria-labels
- [ ] Focus states visible on all interactive elements (`focus-visible:ring-2`)
- [ ] Heading hierarchy correct (h1 → h2 → h3, no skipping)
- [ ] Form inputs have associated labels
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Skip link present for keyboard navigation

### 4.2 External Links

All external links should have:
```tsx
<a 
  href="..."
  target="_blank"
  rel="noopener noreferrer"  // or "nofollow noopener" for BBB
  aria-label="Description (opens in new tab)"
>
```

### 4.3 Images

All images should have:
```tsx
<img 
  src="..."
  alt="Descriptive text about the image"
  loading="lazy"  // for below-fold images
  className="..."
/>
```

---

## TASK 5: Performance Audit

### 5.1 Image Optimization

- [ ] All images should be WebP format
- [ ] Target size: <200KB per image
- [ ] Add `loading="lazy"` to below-fold images
- [ ] Consider adding srcset for responsive images

### 5.2 Code Splitting

- [ ] Verify React.lazy() used for route-level code splitting if not already
- [ ] Check for unnecessarily large bundle imports

### 5.3 Render Performance

- [ ] No unnecessary re-renders (check for missing memo/useCallback)
- [ ] No layout shifts (images should have dimensions)

---

## TASK 6: SEO Verification

### 6.1 Meta Tags (src/components/SEO.tsx)

Verify each page has unique, optimized:
- [ ] Title tag (50-60 characters, includes primary keyword)
- [ ] Meta description (150-160 characters, compelling CTA)
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Twitter Card tags
- [ ] Canonical URL

### 6.2 Structured Data

Verify JSON-LD schema includes:
- [ ] LocalBusiness type
- [ ] Organization info
- [ ] Service areas
- [ ] Contact info
- [ ] Aggregate rating (if testimonials exist)

### 6.3 Technical SEO

- [ ] All pages have unique H1
- [ ] Internal links use React Router `<Link>` (not `<a>`)
- [ ] No broken links
- [ ] sitemap.xml references correct domain (teamradcliff.com)
- [ ] robots.txt allows crawling

---

## TASK 7: Mobile Responsiveness Verification

Test all pages at these breakpoints:
- 320px (small mobile)
- 375px (iPhone)
- 768px (tablet)
- 1024px (desktop)
- 1440px (wide desktop)

### Check for:
- [ ] No horizontal scroll at any breakpoint
- [ ] Touch targets at least 44x44px on mobile
- [ ] Text readable without zooming (min 16px body)
- [ ] Navigation hamburger menu works on mobile
- [ ] Forms usable on mobile (input sizes, keyboard types)
- [ ] Images don't overflow containers
- [ ] Flex/grid layouts wrap properly

---

## TASK 8: Final Cleanup

### 8.1 Console Errors
- [ ] No console errors in development
- [ ] No console warnings (except expected React dev warnings)

### 8.2 Dead Code
- [ ] Remove any unused imports
- [ ] Remove commented-out code blocks
- [ ] Remove unused CSS classes

### 8.3 Consistency
- [ ] All files use consistent formatting
- [ ] All components follow same structure pattern
- [ ] All pages import components in same order

---

## Files to NOT Modify

- `src/integrations/supabase/client.ts` (auto-generated)
- `src/integrations/supabase/types.ts` (auto-generated)
- `src/components/ui/*` (shadcn components)
- `.env` files

---

## Testing Checklist

After all changes, verify:

### Functionality
- [ ] All pages load without errors
- [ ] All navigation links work
- [ ] Contact form submits correctly
- [ ] All external links open in new tabs
- [ ] BBB badge links to correct profile

### Visual
- [ ] Brand colors consistent throughout
- [ ] Typography correct (Montserrat headings, Open Sans body)
- [ ] Sharp corners everywhere (no rounded)
- [ ] Hover effects work on all interactive elements
- [ ] Mobile layout correct

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Focus indicators visible

### Performance
- [ ] No console errors
- [ ] Pages load quickly
- [ ] Images optimized

---

## Deliverables

After completing evaluation and fixes, provide:

1. **Summary Report** - What was found and fixed
2. **Files Modified** - List of all files changed
3. **Issues Found** - Any problems that need human decision
4. **Recommendations** - Future improvements to consider

---

## Priority Order

1. **Critical:** BBB badge verification (Task 1)
2. **High:** Accessibility issues (Task 4)
3. **High:** Mobile responsiveness (Task 7)
4. **Medium:** Code consistency (Task 3)
5. **Medium:** SEO verification (Task 6)
6. **Low:** Performance optimization (Task 5)
7. **Low:** Final cleanup (Task 8)

---

## Notes

- Always maintain brand consistency
- Never introduce rounded corners
- Preserve existing functionality while improving
- Document any significant changes
- Ask for clarification on design decisions if uncertain

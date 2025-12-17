# RCG Website Polish Implementation Guide

> **Purpose**: This document contains definitive implementation specifications for 10 polish enhancements to elevate the RCG Construction website to enterprise-level quality.
> 
> **Target**: B2B construction clients (facility managers, healthcare administrators) making multi-million dollar decisions. Every interaction must feel refined, professional, and trustworthy.

---

## Pre-Implementation Setup

### Install Required Dependency

```bash
npm install framer-motion
```

### Add Utility Class to src/index.css

Add this at the end of the file, after all existing styles:

```css
/* Scrollbar hide utility for thumbnail strip */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

---

## Enhancement 1: Lightbox Crossfade Transitions

**File**: `src/components/ProjectImageGallery.tsx`

**What**: Replace instant image swap with smooth crossfade animation when navigating between photos in the lightbox.

**Implementation**:

1. Add import at top of file:
```tsx
import { motion, AnimatePresence } from "framer-motion";
```

2. Find the main lightbox image element inside the Dialog (the one that displays `allImages[currentIndex]`). It looks like this:
```tsx
<div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 md:p-8 lg:p-12">
  <img
    src={allImages[currentIndex].image_url}
    alt={allImages[currentIndex].caption || `Project image ${currentIndex + 1}`}
    className="w-auto h-auto max-w-full max-h-full object-contain"
  />
</div>
```

3. Replace with:
```tsx
<div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 md:p-8 lg:p-12">
  <AnimatePresence mode="wait">
    <motion.img
      key={currentIndex}
      src={allImages[currentIndex].image_url}
      alt={allImages[currentIndex].caption || `Project image ${currentIndex + 1}`}
      className="w-auto h-auto max-w-full max-h-full object-contain"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    />
  </AnimatePresence>
</div>
```

---

## Enhancement 2: Lightbox Thumbnail Strip

**File**: `src/components/ProjectImageGallery.tsx`

**What**: Add horizontal thumbnail navigation at bottom of lightbox for quick image selection.

**Implementation**:

Inside the Dialog's main container div (the one with `className="relative w-full h-full..."`), add this new element. Place it AFTER the Next button and BEFORE the Caption section:

```tsx
{/* Thumbnail Strip */}
<div className="absolute bottom-20 left-0 right-0 z-40 bg-navy/80 backdrop-blur-sm py-3 px-4">
  <div className="flex gap-2 overflow-x-auto scrollbar-hide justify-center max-w-full">
    {allImages.map((image, index) => (
      <button
        key={image.id}
        onClick={() => setCurrentIndex(index)}
        className={`flex-shrink-0 w-16 h-12 md:w-20 md:h-14 overflow-hidden transition-all duration-200 rounded-none ${
          index === currentIndex 
            ? "border-2 border-secondary brightness-100" 
            : "border-2 border-transparent brightness-75 hover:brightness-90"
        }`}
      >
        <img
          src={image.image_url}
          alt={`Thumbnail ${index + 1}`}
          className="w-full h-full object-cover"
        />
      </button>
    ))}
  </div>
</div>
```

Then update the caption positioning. Find the caption div (starts with `{allImages[currentIndex].caption && (`). Change its positioning class from `bottom-12` to `bottom-36` to sit above the thumbnail strip:

```tsx
{allImages[currentIndex].caption && (
  <div className="absolute bottom-36 left-2 right-2 sm:bottom-36 sm:left-4 sm:right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 bg-navy/95 text-white px-3 py-2 sm:px-4 md:px-6 md:py-3 rounded-none max-w-full md:max-w-3xl backdrop-blur-sm z-50">
    <p className="text-center text-xs leading-tight sm:text-sm md:text-base md:leading-relaxed line-clamp-3 md:line-clamp-2">
      {allImages[currentIndex].caption}
    </p>
  </div>
)}
```

---

## Enhancement 3: Gallery Hover Expand Icon

**File**: `src/components/ProjectImageGallery.tsx`

**What**: Add centered expand icon that appears on thumbnail hover to indicate images are clickable.

**Implementation**:

1. Add import at top (if not already present):
```tsx
import { Expand } from "lucide-react";
```

2. Find the thumbnail grid section (the `<div className="grid grid-cols-2 md:grid-cols-3 gap-4">` with the map). Update each thumbnail div to include the expand icon:

```tsx
<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  {allImages.map((image, index) => (
    <div
      key={image.id}
      className="relative aspect-video overflow-hidden rounded-none cursor-pointer group"
      onClick={() => openLightbox(index)}
    >
      <img
        src={image.image_url}
        alt={image.caption || `Project image ${index + 1}`}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-all duration-300" />
      
      {/* Expand Icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
        <div className="w-12 h-12 bg-white flex items-center justify-center shadow-lg">
          <Expand className="w-6 h-6 text-secondary" />
        </div>
      </div>
      
      {image.caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-navy/80 text-white p-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          {image.caption}
        </div>
      )}
    </div>
  ))}
</div>
```

---

## Enhancement 4: Navigation Underline Animation

**File**: `src/components/Header.tsx`

**What**: Add animated underline that slides in from left on nav link hover.

**Implementation**:

Find the desktop navigation section (inside `<nav className="hidden md:flex items-center gap-8">`). Update the Link component className:

**Current**:
```tsx
<Link
  key={link.to}
  to={link.to}
  className={`text-sm font-heading font-semibold uppercase tracking-wider transition-colors ${
    location.pathname === link.to
      ? "text-secondary"
      : "text-white hover:text-secondary"
  }`}
>
  {link.label}
</Link>
```

**Replace with**:
```tsx
<Link
  key={link.to}
  to={link.to}
  className={`relative text-sm font-heading font-semibold uppercase tracking-wider transition-colors
    after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-secondary 
    after:transition-transform after:duration-200 after:ease-out after:origin-left
    ${location.pathname === link.to
      ? "text-secondary after:w-full after:scale-x-100"
      : "text-white hover:text-secondary after:w-full after:scale-x-0 hover:after:scale-x-100"
    }`}
>
  {link.label}
</Link>
```

---

## Enhancement 5: Mobile Menu Slide Animation

**File**: `src/components/Header.tsx`

**What**: Smooth slide-down animation for mobile menu with staggered link reveals.

**Implementation**:

1. Add import at top of file:
```tsx
import { motion, AnimatePresence } from "framer-motion";
```

2. Find the mobile navigation section (starts with `{isMobileMenuOpen && (`). Replace the entire block:

**Current**:
```tsx
{isMobileMenuOpen && (
  <nav className="md:hidden py-6 bg-primary border-t border-white/10">
    {navLinks.map((link) => (
      <Link
        key={link.to}
        to={link.to}
        className={`block py-3 text-sm font-heading font-semibold uppercase tracking-wider transition-colors ${
          location.pathname === link.to
            ? "text-secondary"
            : "text-white hover:text-secondary"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {link.label}
      </Link>
    ))}
    <Button variant="secondary" size="sm" className="mt-4 w-full" asChild>
      <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
        Request Consultation
      </Link>
    </Button>
  </nav>
)}
```

**Replace with**:
```tsx
<AnimatePresence>
  {isMobileMenuOpen && (
    <motion.nav
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="md:hidden overflow-hidden bg-primary border-t border-white/10"
    >
      <div className="py-6">
        {navLinks.map((link, index) => (
          <motion.div
            key={link.to}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <Link
              to={link.to}
              className={`block py-3 text-sm font-heading font-semibold uppercase tracking-wider transition-colors ${
                location.pathname === link.to
                  ? "text-secondary"
                  : "text-white hover:text-secondary"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
        >
          <Button variant="secondary" size="sm" className="mt-4 w-full" asChild>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              Request Consultation
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.nav>
  )}
</AnimatePresence>
```

---

## Enhancement 6: Project Card Hover Lift

**Files**: `src/pages/Projects.tsx` AND `src/components/FeaturedProjects.tsx`

**What**: Cards lift slightly on hover for tactile depth feedback.

**Implementation**:

In BOTH files, find the Card component inside the project map. Update the className:

**Current**:
```tsx
className="overflow-hidden group hover:shadow-xl transition-all duration-300"
```

**Replace with**:
```tsx
className="overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
```

---

## Enhancement 7: Button Press Feedback

**File**: `src/components/ui/button.tsx`

**What**: Subtle scale-down on button click for tactile feedback.

**Implementation**:

Find the `buttonVariants` cva definition. Add `active:scale-[0.98]` to the base string.

**Current base string** (first argument to cva):
```tsx
"inline-flex items-center justify-center gap-2 whitespace-nowrap font-heading font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
```

**Replace with**:
```tsx
"inline-flex items-center justify-center gap-2 whitespace-nowrap font-heading font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
```

---

## Enhancement 8: Form Input Focus Animation

**Files**: `src/components/ui/input.tsx` AND `src/components/ui/textarea.tsx`

**What**: Animated orange border on focus instead of default ring.

**Implementation for input.tsx**:

Find the Input component's className. Update it:

**Current**:
```tsx
className={cn(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  className,
)}
```

**Replace with**:
```tsx
className={cn(
  "flex h-10 w-full rounded-none border-2 border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:border-secondary transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  className,
)}
```

**Implementation for textarea.tsx**:

Find the Textarea component's className. Update it similarly:

**Current**:
```tsx
className={cn(
  "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  className,
)}
```

**Replace with**:
```tsx
className={cn(
  "flex min-h-[80px] w-full rounded-none border-2 border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:border-secondary transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  className,
)}
```

---

## Enhancement 9: Hero Text Entrance Animation

**File**: `src/components/Hero.tsx`

**What**: Staggered fade-in animation for hero content on page load.

**Implementation**:

1. Add import at top of file:
```tsx
import { motion } from "framer-motion";
```

2. Add animation variants before the component return statement:
```tsx
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};
```

3. Find the content div (starts with `<div className="relative z-10 max-w-[1440px]..."`). Replace it and its children:

**Current**:
```tsx
<div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 text-center">
  <h1 className="text-white mb-6 uppercase leading-tight">
    Renovations and Buildouts Delivered<br />
    with Precision, Safety, and Trust.
  </h1>
  <p className="text-white/90 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
    Your trusted partner for compliant, efficient renovations in active healthcare, professional, and commercial environments.
  </p>
  <Button variant="hero" size="lg" asChild>
    <Link to="/contact">Start a Conversation</Link>
  </Button>
</div>
```

**Replace with**:
```tsx
<motion.div 
  variants={containerVariants}
  initial="hidden"
  animate="visible"
  className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 text-center"
>
  <motion.h1 variants={itemVariants} className="text-white mb-6 uppercase leading-tight">
    Renovations and Buildouts Delivered<br />
    with Precision, Safety, and Trust.
  </motion.h1>
  <motion.p variants={itemVariants} className="text-white/90 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
    Your trusted partner for compliant, efficient renovations in active healthcare, professional, and commercial environments.
  </motion.p>
  <motion.div variants={itemVariants}>
    <Button variant="hero" size="lg" asChild>
      <Link to="/contact">Start a Conversation</Link>
    </Button>
  </motion.div>
</motion.div>
```

---

## Enhancement 10: Loading Skeleton Shimmer

**Files**: `src/components/ui/skeleton.tsx` AND `tailwind.config.ts`

**What**: Animated shimmer effect on loading skeletons to indicate activity.

**Implementation for skeleton.tsx**:

**Current**:
```tsx
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
```

**Replace with**:
```tsx
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-none bg-muted",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        "before:animate-shimmer",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
```

**Implementation for tailwind.config.ts**:

Find the `keyframes` object inside `theme.extend` and add the shimmer keyframe. Then add to the `animation` object:

```ts
keyframes: {
  "accordion-down": {
    from: { height: "0" },
    to: { height: "var(--radix-accordion-content-height)" },
  },
  "accordion-up": {
    from: { height: "var(--radix-accordion-content-height)" },
    to: { height: "0" },
  },
  "shimmer": {
    "0%": { transform: "translateX(-100%)" },
    "100%": { transform: "translateX(100%)" },
  },
},
animation: {
  "accordion-down": "accordion-down 0.2s ease-out",
  "accordion-up": "accordion-up 0.2s ease-out",
  "shimmer": "shimmer 1.5s infinite",
},
```

---

## Files Modified Summary

| File | Enhancements |
|------|--------------|
| `src/components/ProjectImageGallery.tsx` | 1, 2, 3 |
| `src/components/Header.tsx` | 4, 5 |
| `src/pages/Projects.tsx` | 6 |
| `src/components/FeaturedProjects.tsx` | 6 |
| `src/components/ui/button.tsx` | 7 |
| `src/components/ui/input.tsx` | 8 |
| `src/components/ui/textarea.tsx` | 8 |
| `src/components/Hero.tsx` | 9 |
| `src/components/ui/skeleton.tsx` | 10 |
| `tailwind.config.ts` | 10 |
| `src/index.css` | scrollbar utility |

---

## Brand Compliance Checklist

- ✅ Orange accent color: `#CF791D` (referenced as `secondary` in Tailwind)
- ✅ Navy primary: `#1B2B43` (referenced as `navy` or `primary`)
- ✅ Sharp corners: `rounded-none` on all new elements
- ✅ Animation durations: 200-300ms for micro-interactions, 500-600ms for entrances
- ✅ Montserrat headings maintained
- ✅ No layout shifts caused by animations

---

## Testing Checklist

After implementation, verify:

- [ ] Lightbox transitions smoothly between images
- [ ] Thumbnail strip scrolls horizontally on mobile
- [ ] Thumbnail clicking changes main image with transition
- [ ] Expand icon appears on gallery thumbnail hover
- [ ] Nav links show animated underline on hover
- [ ] Active nav link has persistent underline
- [ ] Mobile menu slides open/closed smoothly
- [ ] Mobile menu links stagger in
- [ ] Project cards lift on hover
- [ ] Buttons scale down on click/tap
- [ ] Form inputs show orange border on focus
- [ ] Hero text animates in on page load
- [ ] Loading skeletons have shimmer effect
- [ ] All animations work on mobile devices
- [ ] No console errors related to framer-motion

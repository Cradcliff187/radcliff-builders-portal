# Social Media Share Image Guide

## Overview
Your website currently uses a small favicon for social media sharing, which results in poor-quality previews when links are shared on Facebook, Twitter, LinkedIn, etc.

## Required Image Specifications

### Dimensions
- **Optimal Size**: 1200px × 630px (1.91:1 aspect ratio)
- **Minimum Size**: 600px × 314px
- **File Format**: JPG or PNG (JPG recommended for smaller file size)
- **File Size**: Under 1MB (ideally under 300KB)

### Design Requirements

Your social share image should include:

1. **Brand Logo**: RCG logo prominently displayed
2. **Company Name**: "Radcliff Construction Group" or "RCG"
3. **Tagline/Value Prop**:
   - "ICRA-Certified Healthcare & Commercial Renovations"
   - Or: "Your Portfolio-Wide Construction Partner"
4. **Background**:
   - Professional construction project photo
   - Or: Brand colors (#1B2B43 navy blue with contrasting elements)
5. **Contact Info** (optional): Phone number or website
6. **Geographic Focus** (optional): "Serving Greater Cincinnati, Dayton & Lexington"

### Design Tips

- **Text Size**: Large enough to be readable on mobile (minimum 60px for main text)
- **Contrast**: Ensure text is clearly readable against background
- **Safe Zone**: Keep important content within 1200×600px center area (some platforms crop edges)
- **Simplicity**: Don't overcrowd - focus on 1-2 key messages
- **Professionalism**: Match your brand identity

## Example Layout

```
┌────────────────────────────────────────────────────┐
│                                                    │
│  [Background: Professional construction photo]     │
│                                                    │
│     ┌──────────────────────────────────┐          │
│     │  [RCG LOGO]                      │          │
│     │                                  │          │
│     │  Radcliff Construction Group     │          │
│     │                                  │          │
│     │  ICRA-Certified Healthcare &     │          │
│     │  Commercial Renovations          │          │
│     │                                  │          │
│     │  Serving Greater Cincinnati      │          │
│     └──────────────────────────────────┘          │
│                                                    │
└────────────────────────────────────────────────────┘
      1200px × 630px
```

## Design Tools (Free Options)

1. **Canva** (https://canva.com)
   - Template: Search "Open Graph" or "Social Media Post"
   - Pre-sized templates available
   - Drag-and-drop interface

2. **Figma** (https://figma.com)
   - Professional design tool
   - Free tier available
   - Create custom frame: 1200×630px

3. **Adobe Express** (https://express.adobe.com)
   - Free web-based tool
   - Social media templates

4. **Photopea** (https://photopea.com)
   - Free online Photoshop alternative
   - Create new image: 1200×630px

## Quick DIY Steps (Using Canva)

1. Go to Canva.com (create free account)
2. Click "Create a design" → "Custom size" → 1200 × 630 px
3. Choose background:
   - Upload a professional project photo
   - Or use brand color (#1B2B43)
4. Add text overlay box with semi-transparent background
5. Add RCG logo (upload your logo file)
6. Add headline text: "Radcliff Construction Group"
7. Add subtext: "ICRA-Certified Healthcare & Commercial Renovations"
8. Download as JPG (high quality)

## Implementation Steps

### 1. Create the Image
- Follow design specifications above
- Save as `og-image.jpg` or `social-share.jpg`

### 2. Add to Your Website
- Place image in `/public/` folder
- Recommended path: `/public/og-image.jpg`

### 3. Update Meta Tags
Edit `/index.html` lines 43 and 47:

**Current:**
```html
<meta property="og:image" content="https://teamradcliff.com/favicon-rcg.png">
<meta name="twitter:image" content="https://teamradcliff.com/favicon-rcg.png">
```

**Updated:**
```html
<meta property="og:image" content="https://teamradcliff.com/og-image.jpg">
<meta name="twitter:image" content="https://teamradcliff.com/og-image.jpg">
```

### 4. Also Update SEO Component
Edit `/src/components/SEO.tsx` line 14:

**Current:**
```typescript
const defaultImage = "https://teamradcliff.com/favicon-rcg.png";
```

**Updated:**
```typescript
const defaultImage = "https://teamradcliff.com/og-image.jpg";
```

### 5. Test Your Image

**Facebook Sharing Debugger:**
https://developers.facebook.com/tools/debug/
- Enter URL: https://teamradcliff.com
- Click "Scrape Again" to refresh cached image

**Twitter Card Validator:**
https://cards-dev.twitter.com/validator
- Enter URL: https://teamradcliff.com
- Preview how card appears

**LinkedIn Post Inspector:**
https://www.linkedin.com/post-inspector/
- Enter URL: https://teamradcliff.com
- Inspect preview

## Example Social Share Images (Inspiration)

Look at these construction company sites for inspiration:
- Turner Construction
- McCarthy Building Companies
- Skanska USA
- Local Cincinnati contractors

## File Naming Best Practices

Recommended filenames:
- `og-image.jpg` (Open Graph standard)
- `social-share.jpg`
- `rcg-social-card.jpg`

Avoid:
- Spaces in filename
- Special characters
- Generic names like "image1.jpg"

## Additional Enhancements (Optional)

### Page-Specific Images
Create unique images for key pages:
- `/public/og-images/homepage.jpg`
- `/public/og-images/services.jpg`
- `/public/og-images/projects.jpg`

Then pass custom image to SEO component:
```tsx
<SEO
  title="Services"
  description="..."
  image="https://teamradcliff.com/og-images/services.jpg"
/>
```

### Project-Specific Images
For individual projects, use the project's main image:
```tsx
<SEO
  title={project.title}
  description={project.description}
  image={project.image_url}
/>
```

## Checklist

Before deploying your social image:

- [ ] Image is exactly 1200×630px
- [ ] File size under 1MB
- [ ] Text is readable at small sizes
- [ ] Logo is clear and visible
- [ ] Important content in safe zone
- [ ] Background is professional
- [ ] Brand colors used correctly
- [ ] Tested on mobile preview
- [ ] Uploaded to `/public/` folder
- [ ] Meta tags updated in code
- [ ] Tested with Facebook Debugger
- [ ] Tested with Twitter Card Validator
- [ ] Cleared old cache on social platforms

## Need Help?

If you need professional design services:
- Fiverr: Search "Open Graph image design" ($10-50)
- Upwork: Hire a graphic designer ($50-200)
- 99designs: Run a contest ($299+)

Or ask Claude Code to help you create a basic design using code/SVG!

---

**Status**: Not yet implemented
**Priority**: HIGH - Quick win for social sharing
**Time to Complete**: 30-60 minutes
**Technical Difficulty**: Low (mostly design work)

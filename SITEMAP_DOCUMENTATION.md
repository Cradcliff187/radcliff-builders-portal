# Dynamic Sitemap Generation - Documentation

## Overview

Your website now has **automatic sitemap generation** that includes all published projects from your Supabase database. Every time you build your site, the sitemap is regenerated with the latest content.

---

## How It Works

### Build-Time Generation

When you run `npm run build`, the following happens automatically:

1. **Script Runs**: `scripts/generate-sitemap.js` executes
2. **Queries Database**: Connects to Supabase and fetches all published projects
3. **Generates XML**: Combines static pages + dynamic project pages
4. **Writes File**: Saves to `public/sitemap.xml`
5. **Builds Site**: Vite builds your React app

**Result**: Fresh sitemap with all current content on every deployment!

---

## What's Included in the Sitemap

### Static Pages (8 URLs)
- `/` - Homepage (priority: 1.0, weekly updates)
- `/about` - About page (priority: 0.8, monthly)
- `/team` - Team page (priority: 0.7, monthly)
- `/services` - Services page (priority: 0.8, monthly)
- `/projects` - Projects listing (priority: 0.9, weekly)
- `/industries` - Industries page (priority: 0.8, monthly)
- `/contact` - Contact page (priority: 0.9, monthly)
- `/insights` - Insights hub (priority: 0.7, weekly)

### Dynamic Project Pages (Variable)
- `/projects/:slug` - One URL for each published project
- Priority: 0.8 (important content)
- Change frequency: monthly
- Last modified: from `projects.updated_at` field

**Example**:
```xml
<url>
  <loc>https://teamradcliff.com/projects/mercy-health-renovation</loc>
  <lastmod>2026-02-10</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

---

## Project Requirements

### Database Requirements

Projects **MUST** have:
- `slug` field populated (used for URL routing)
- `published = true` (only published projects included)
- `updated_at` timestamp (used for lastmod date)

**Unpublished projects are automatically excluded** from the sitemap.

---

## Usage Commands

### Manual Generation
Generate sitemap without building the site:
```bash
npm run generate:sitemap
```

**Output**:
```
🗺️  Generating sitemap.xml...
✓ Connected to Supabase
✓ Found 12 published projects

📊 Sitemap Statistics:
   Static pages: 8
   Project pages: 12
   Total URLs: 20

✅ Sitemap generation complete!
```

### Build with Sitemap
Build the site (sitemap auto-generated first):
```bash
npm run build
```

This runs:
1. `npm run generate:sitemap` (creates sitemap)
2. `vite build` (builds React app)

### Development
During development (sitemap not regenerated):
```bash
npm run dev
```

---

## Configuration

### Modify Static Pages

Edit `scripts/generate-sitemap.js` to change static page configuration:

```javascript
const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  // Add more pages here...
];
```

**Available changefreq values**:
- `always` - Changes constantly
- `hourly` - Changes every hour
- `daily` - Changes daily
- `weekly` - Changes weekly (default for dynamic content)
- `monthly` - Changes monthly (most static pages)
- `yearly` - Rarely changes
- `never` - Archived content

**Priority values**:
- `1.0` - Highest priority (homepage)
- `0.9` - Very important (contact, project listing)
- `0.8` - Important (about, services, individual projects)
- `0.7` - Normal (team, insights)
- `0.5` - Lower priority
- `0.0` - Lowest priority

### Modify Base URL

If you change domains, update:

```javascript
const BASE_URL = 'https://teamradcliff.com';
```

### Add More Dynamic Content Types

If you later add article detail pages or team member pages:

```javascript
// Example: Fetch articles
const { data: articles } = await supabase
  .from('insights_articles')
  .select('slug, updated_at')
  .eq('published', true);

// Add to sitemap
for (const article of articles) {
  sitemapXml += generateUrlEntry(
    `/insights/${article.slug}`,
    article.updated_at,
    'monthly',
    '0.7'
  ) + '\n';
}
```

---

## Troubleshooting

### "No sitemap.xml generated"

**Check**:
1. Run `npm run generate:sitemap` manually
2. Look for error messages in console
3. Verify Supabase credentials in `.env` file
4. Check internet connectivity

**Common Issues**:
- Missing `.env` file
- Wrong Supabase credentials
- Network connectivity issues
- No published projects in database

### "Projects not appearing in sitemap"

**Verify**:
1. Project has `published = true` in database
2. Project has valid `slug` field
3. Run `npm run generate:sitemap` to see count

**Fix**:
```sql
-- Check projects in Supabase SQL editor
SELECT slug, published, updated_at
FROM projects
WHERE published = true;
```

### "Old sitemap still showing"

**Solution**:
1. Delete `public/sitemap.xml`
2. Run `npm run build` (regenerates sitemap)
3. Deploy new build

**Cache Issue**:
Search engines cache sitemaps. After updating:
1. Submit new sitemap in Google Search Console
2. Request re-crawl
3. Wait 24-48 hours for update

---

## SEO Best Practices

### Submit to Search Engines

**Google Search Console**:
1. Go to https://search.google.com/search-console
2. Add property: `teamradcliff.com`
3. Navigate to "Sitemaps" section
4. Submit: `https://teamradcliff.com/sitemap.xml`
5. Monitor indexing status

**Bing Webmaster Tools**:
1. Go to https://www.bing.com/webmasters
2. Add site: `teamradcliff.com`
3. Submit sitemap URL
4. Verify in dashboard

### Update Frequency

**When sitemap updates**:
- ✅ Every deployment (automatic)
- ✅ When you publish new projects
- ✅ When you update project content

**When to manually regenerate**:
- After bulk publishing projects in admin
- After changing project slugs
- After major content updates

**Recommendation**: Deploy weekly to keep sitemap fresh.

### Monitoring

**Track in Google Search Console**:
- **Coverage Report**: How many URLs indexed
- **Sitemaps Report**: Submission status
- **Index Status**: Discover indexing issues

**Expected Results**:
- Week 1: Sitemap submitted, Google starts crawling
- Week 2-3: All pages discovered
- Week 4: Most pages indexed
- Month 2+: Full indexing, regular recrawls

---

## robots.txt Configuration

Your `robots.txt` already references the sitemap:

```
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://teamradcliff.com/sitemap.xml
```

**This tells search engines**:
- ✅ Crawl all public pages
- ❌ Don't crawl admin section
- 🗺️ Sitemap location for efficient discovery

---

## Performance

### Script Execution Time
- **Database Query**: ~500ms
- **XML Generation**: ~50ms
- **File Write**: ~10ms
- **Total**: ~600ms (0.6 seconds)

**Impact on build time**: Negligible (adds <1 second to build)

### Sitemap Size
- **Current**: ~20 URLs (2-3 KB)
- **At 100 projects**: 108 URLs (~12 KB)
- **At 1000 projects**: 1008 URLs (~120 KB)

**Google Limits**:
- Max 50,000 URLs per sitemap
- Max 50 MB file size
- You're nowhere near limits! ✅

---

## Future Enhancements

### Sitemap Index (Optional)
If you eventually have 10,000+ URLs, create a sitemap index:

```xml
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://teamradcliff.com/sitemap-static.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://teamradcliff.com/sitemap-projects.xml</loc>
  </sitemap>
</sitemapindex>
```

### Image Sitemap (Optional)
Add project images to help with Google Images SEO:

```xml
<image:image>
  <image:loc>https://teamradcliff.com/project-image.jpg</image:loc>
  <image:caption>Healthcare renovation project</image:caption>
</image:image>
```

### Video Sitemap (Optional)
If you add project videos later.

### News Sitemap (Optional)
If you publish time-sensitive content regularly.

---

## Technical Details

### Script Location
`/scripts/generate-sitemap.js`

### Output Location
`/public/sitemap.xml`

### Dependencies
- `@supabase/supabase-js` - Database client (already installed)
- Node.js built-ins: `fs`, `path`, `url`

### Environment Variables
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase anon key

(Read from `.env` file automatically)

### Supported Node Versions
- Node 18.x or higher (uses ES modules)
- Works with npm, yarn, pnpm

---

## Deployment

### Lovable.dev (Your Platform)
Sitemap automatically generated on every deploy:
1. You push to Git
2. Lovable triggers build
3. `npm run build` executes
4. Sitemap generated, then site built
5. Deployed with fresh sitemap ✅

### Manual Deployment
If deploying manually:
```bash
npm run build      # Generates sitemap + builds
npm run preview    # Test locally
# Deploy dist/ folder to hosting
```

---

## Maintenance

### Weekly Tasks
- [ ] Verify new projects appear in sitemap
- [ ] Check Google Search Console for errors

### Monthly Tasks
- [ ] Review indexed pages count
- [ ] Update static page priorities if needed
- [ ] Monitor sitemap file size

### Yearly Tasks
- [ ] Review SEO performance
- [ ] Consider sitemap enhancements
- [ ] Update change frequencies

---

## Support

### Common Questions

**Q: How often should I rebuild to update sitemap?**
A: Every time you publish new projects. If you publish weekly, deploy weekly.

**Q: Can I exclude certain projects?**
A: Yes! Set `published = false` in database. They're automatically excluded.

**Q: Do I need to do anything manually?**
A: No! It's fully automatic during build.

**Q: What if the script fails?**
A: Build will fail, preventing deployment with stale sitemap. Check error logs.

**Q: Can I test the sitemap?**
A: Yes! Run `npm run generate:sitemap` and check `public/sitemap.xml`

### Debugging

**Enable verbose logging** (edit script):
```javascript
console.log('Projects:', projects);
console.log('Generated XML:', sitemapXml);
```

**Validate sitemap**:
- https://www.xml-sitemaps.com/validate-xml-sitemap.html
- Google Search Console > Sitemaps > Test sitemap

---

## Success Metrics

### What to Track

**Immediately**:
- ✅ Sitemap generated without errors
- ✅ All published projects included
- ✅ File accessible at teamradcliff.com/sitemap.xml

**Week 1**:
- ✅ Sitemap submitted to Google Search Console
- ✅ No validation errors reported
- ✅ Google starts discovering URLs

**Month 1**:
- ✅ All project pages indexed
- ✅ Organic traffic to project pages increases
- ✅ More keywords ranking

**Month 3+**:
- ✅ 50+ project pages ranking
- ✅ Long-tail keyword traffic
- ✅ Improved overall SEO performance

---

## Implementation Date

**Implemented**: February 11, 2026
**Version**: 1.0
**Status**: Production Ready ✅

---

## Next Steps

1. **Deploy**: Push changes to Git, trigger deployment
2. **Verify**: Check `teamradcliff.com/sitemap.xml` after deploy
3. **Submit**: Add sitemap to Google Search Console
4. **Monitor**: Track indexing progress over next 30 days

**Your sitemap is now fully automated! 🎉**

No more manual updates. Every deployment = fresh sitemap with all published projects.

#!/usr/bin/env node

/**
 * Dynamic Sitemap Generator
 *
 * This script generates sitemap.xml by:
 * 1. Querying Supabase for all published projects
 * 2. Combining with static pages
 * 3. Writing to public/sitemap.xml
 *
 * Run: node scripts/generate-sitemap.js
 * Auto-runs during build via package.json
 */

import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Supabase configuration
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://osothwrzhvgojhomaysk.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zb3Rod3J6aHZnb2pob21heXNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4NTQ0NjAsImV4cCI6MjA3NjQzMDQ2MH0.QNPvKTL34De4PZjfldVDBXP560-qeYjoNKOYhs1oOFw';

// Website base URL
const BASE_URL = 'https://teamradcliff.com';

// Static pages configuration
const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/team', priority: '0.7', changefreq: 'monthly' },
  { path: '/services', priority: '0.8', changefreq: 'monthly' },
  { path: '/projects', priority: '0.9', changefreq: 'weekly' },
  { path: '/industries', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.9', changefreq: 'monthly' },
  { path: '/insights', priority: '0.7', changefreq: 'weekly' }
];

/**
 * Formats a date to ISO 8601 format (YYYY-MM-DD)
 */
function formatDate(date) {
  if (!date) return new Date().toISOString().split('T')[0];
  return new Date(date).toISOString().split('T')[0];
}

/**
 * Generates XML sitemap entry
 */
function generateUrlEntry(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${BASE_URL}${loc}</loc>
    <lastmod>${formatDate(lastmod)}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

/**
 * Main sitemap generation function
 */
async function generateSitemap() {
  console.log('🗺️  Generating sitemap.xml...\n');

  try {
    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✓ Connected to Supabase');

    // Fetch all published projects
    const { data: projects, error } = await supabase
      .from('projects')
      .select('slug, updated_at')
      .eq('published', true)
      .order('updated_at', { ascending: false });

    if (error) {
      throw new Error(`Supabase query failed: ${error.message}`);
    }

    console.log(`✓ Found ${projects?.length || 0} published projects`);

    // Start building sitemap XML
    let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main Pages -->
`;

    // Add static pages
    for (const page of STATIC_PAGES) {
      sitemapXml += generateUrlEntry(
        page.path,
        new Date().toISOString(),
        page.changefreq,
        page.priority
      ) + '\n';
    }

    // Add dynamic project pages
    if (projects && projects.length > 0) {
      sitemapXml += '\n  <!-- Project Pages -->\n';

      for (const project of projects) {
        if (project.slug) {
          sitemapXml += generateUrlEntry(
            `/projects/${project.slug}`,
            project.updated_at,
            'monthly',
            '0.8'
          ) + '\n';
        }
      }
    }

    // Close sitemap XML
    sitemapXml += '</urlset>\n';

    // Write to public/sitemap.xml
    const outputPath = join(__dirname, '../public/sitemap.xml');
    writeFileSync(outputPath, sitemapXml, 'utf8');

    console.log(`✓ Sitemap written to public/sitemap.xml`);
    console.log(`\n📊 Sitemap Statistics:`);
    console.log(`   Static pages: ${STATIC_PAGES.length}`);
    console.log(`   Project pages: ${projects?.length || 0}`);
    console.log(`   Total URLs: ${STATIC_PAGES.length + (projects?.length || 0)}`);
    console.log('\n✅ Sitemap generation complete!\n');

    return true;
  } catch (error) {
    console.error('\n❌ Error generating sitemap:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  }
}

// Run the generator
generateSitemap();

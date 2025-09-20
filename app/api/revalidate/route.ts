import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { CACHE_TAGS, isValidCacheTag, getAllCacheTags } from '@/lib/cacheTags';

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

/**
 * POST /api/revalidate
 * Revalidates cache tags based on Strapi webhook events
 * 
 * Body: 
 * - secret: REVALIDATE_SECRET (required)
 * - tag: single tag to revalidate (optional)
 * - tags: comma-separated tags to revalidate (optional)
 * - all: if true, revalidates all tags (optional)
 * 
 * Examples:
 * - POST /api/revalidate { "secret": "...", "tag": "home" }
 * - POST /api/revalidate { "secret": "...", "tags": "home,hashtags" }
 * - POST /api/revalidate { "secret": "...", "all": true }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, tag, tags, all } = body;

    // Validate secret
    if (!REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: 'REVALIDATE_SECRET not configured' },
        { status: 500 }
      );
    }

    // Temporarily log webhook data for debugging
    console.log('🔍 Webhook received:', { secret, tag, tags, all, body });
    
    if (!secret || secret !== REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: 'Invalid or missing secret', receivedData: { secret, tag, tags, all } },
        { status: 401 }
      );
    }

    const revalidatedTags: string[] = [];

    if (all) {
      // Revalidate all tags
      const allTags = getAllCacheTags();
      for (const cacheTag of allTags) {
        revalidateTag(cacheTag);
        revalidatedTags.push(cacheTag);
      }
    } else if (tags) {
      // Revalidate multiple tags (comma-separated)
      const tagList = tags.split(',').map((t: string) => t.trim());
      for (const tagName of tagList) {
        if (isValidCacheTag(tagName)) {
          revalidateTag(tagName);
          revalidatedTags.push(tagName);
        } else {
          console.warn(`Invalid cache tag: ${tagName}`);
        }
      }
    } else if (tag) {
      // Revalidate single tag
      if (isValidCacheTag(tag)) {
        revalidateTag(tag);
        revalidatedTags.push(tag);
      } else {
        return NextResponse.json(
          { error: `Invalid cache tag: ${tag}` },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Missing tag, tags, or all parameter' },
        { status: 400 }
      );
    }

    console.log(`✅ Cache revalidated for tags: ${revalidatedTags.join(', ')}`);

    return NextResponse.json({
      revalidated: true,
      tags: revalidatedTags,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Revalidation error:', error);
    return NextResponse.json(
      { error: 'Failed to revalidate cache' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/revalidate
 * Simple health check endpoint for testing
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const tag = searchParams.get('tag');

  // Basic secret validation for GET requests
  if (!REVALIDATE_SECRET) {
    return NextResponse.json(
      { error: 'REVALIDATE_SECRET not configured' },
      { status: 500 }
    );
  }

  if (!secret || secret !== REVALIDATE_SECRET) {
    return NextResponse.json(
      { 
        error: 'Invalid or missing secret',
        usage: 'GET /api/revalidate?secret=YOUR_SECRET&tag=CACHE_TAG'
      },
      { status: 401 }
    );
  }

  if (tag) {
    if (isValidCacheTag(tag)) {
      revalidateTag(tag);
      console.log(`✅ Cache revalidated for tag: ${tag}`);
      return NextResponse.json({
        revalidated: true,
        tag,
        timestamp: new Date().toISOString(),
      });
    } else {
      return NextResponse.json(
        { 
          error: `Invalid cache tag: ${tag}`,
          validTags: Object.values(CACHE_TAGS)
        },
        { status: 400 }
      );
    }
  }

  return NextResponse.json({
    message: 'Revalidate API is ready',
    availableTags: Object.values(CACHE_TAGS),
    usage: {
      post: 'POST /api/revalidate with { secret, tag|tags|all }',
      get: 'GET /api/revalidate?secret=SECRET&tag=TAG'
    }
  });
}

// app/api/instagram/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';      // server runtime
export const revalidate = 3600;       // 1 saat cache

type IgItem = {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  timestamp?: string;
};

function pickImageUrl(item: IgItem) {
  if (item.media_type === 'VIDEO') return item.thumbnail_url || null;
  return item.media_url || item.thumbnail_url || null;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(12, Math.max(1, Number(searchParams.get('limit') || '6')));

  const USER_ID = process.env.IG_USER_ID;          // ör: 1784..........
  const ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN; // Long-lived token

  if (!USER_ID || !ACCESS_TOKEN) {
    return NextResponse.json({ error: 'MISSING_ENV' }, { status: 500 });
  }

  const url = `https://graph.instagram.com/${USER_ID}/media` +
    `?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp` +
    `&access_token=${ACCESS_TOKEN}&limit=${limit * 2}`;

  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) {
      const txt = await res.text();
      return NextResponse.json({ error: 'IG_FETCH_ERROR', details: txt }, { status: 500 });
    }
    const data = await res.json();

    const posts = (data?.data as IgItem[] || [])
      .map(i => ({ ...i, image: pickImageUrl(i) }))
      .filter(i => Boolean(i.image))
      .slice(0, limit)
      .map(i => ({
        id: i.id,
        image: i.image,
        permalink: i.permalink,
        caption: i.caption || '',
        timestamp: i.timestamp,
      }));

    return NextResponse.json({ posts });
  } catch (e: any) {
    return NextResponse.json({ error: 'SERVER_ERROR', details: e?.message }, { status: 500 });
  }
}

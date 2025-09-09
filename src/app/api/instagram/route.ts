import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const revalidate = 3600;

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
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? Math.max(1, Number(limitParam)) : undefined;
  const tag = searchParams.get('tag') || '';

  const IG_GRAPH_USER_ID = process.env.IG_GRAPH_USER_ID;
  const IG_PAGE_TOKEN = process.env.IG_PAGE_TOKEN;

  if (!IG_GRAPH_USER_ID || !IG_PAGE_TOKEN) {
    return NextResponse.json({ error: 'MISSING_ENV' }, { status: 500 });
  }

// Şimdilik API’den daha fazla (örn. 50) post çekelim
let url =
  `https://graph.facebook.com/v23.0/${IG_GRAPH_USER_ID}/media` +
  `?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,children{media_type,media_url,thumbnail_url}` +
  `&access_token=${IG_PAGE_TOKEN}&limit=50`; // Burada sabit yüksek bir değer


  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) {
      const txt = await res.text();
      return NextResponse.json(
        { error: 'IG_FETCH_ERROR', details: txt },
        { status: 500 }
      );
    }

    const data = await res.json();

    let posts = ((data?.data as IgItem[]) || [])
      .map((i) => ({ ...i, image: pickImageUrl(i) }))
      .filter((i) => Boolean(i.image));

    // Tag birebir aranıyor (case-sensitive)
if (tag) {
  posts = posts.filter((i) => (i.caption || '').includes(tag));
}

// En son kullanıcıya gönderilecek sayıyı limit ile sınırla
if (limit) {
  posts = posts.slice(0, limit);
}

    posts = posts.map((i) => ({
      id: i.id,
      image: i.image,
      permalink: i.permalink,
      caption: i.caption || '',
      timestamp: i.timestamp,
      media_type: i.media_type,
    }));

    return NextResponse.json({ posts });
  } catch (e: any) {
    return NextResponse.json(
      { error: 'SERVER_ERROR', details: e?.message },
      { status: 500 }
    );
  }
}

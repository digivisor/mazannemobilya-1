// app/api/reviews/route.ts
import { NextResponse, NextRequest } from "next/server";

// Bu route kesinlikle dinamik olsun ve cache kullanmasın
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    const PLACE_ID = process.env.GOOGLE_PLACE_ID;

    if (!API_KEY || !PLACE_ID) {
      return NextResponse.json(
        { error: "MISSING_ENV", details: "GOOGLE_MAPS_API_KEY veya GOOGLE_PLACE_ID yok" },
        { status: 400 }
      );
    }

    // query: ?limit=6
    const sp = req.nextUrl.searchParams;
    const limitRaw = sp.get("limit") || "6";
    const limit = Math.min(Math.max(parseInt(limitRaw, 10) || 6, 1), 10);

    const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    url.searchParams.set("place_id", PLACE_ID);
    url.searchParams.set("fields", "name,rating,user_ratings_total,reviews");
    url.searchParams.set("reviews_no_translations", "true");
    url.searchParams.set("key", API_KEY);

    const res = await fetch(url.toString(), { cache: "no-store" });
    const data = await res.json();

    if (data.status !== "OK") {
      console.error("Google API Error:", data);
      return NextResponse.json({ error: "GOOGLE_ERROR", details: data }, { status: 502 });
    }

    const reviews = (data.result?.reviews || [])
      .slice(0, limit)
      .map((rv: any) => ({
        author: rv.author_name,
        profile_photo_url: rv.profile_photo_url,
        rating: rv.rating,
        text: rv.text,
        time: rv.relative_time_description,
      }));

    return NextResponse.json({ reviews });
  } catch (e: any) {
    console.error("Server Error:", e);
    return NextResponse.json({ error: "SERVER_ERROR", details: e?.message }, { status: 500 });
  }
}

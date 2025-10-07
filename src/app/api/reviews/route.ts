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

    // limit paramını artık kullanmıyoruz (tüm yorumları döneceğiz)
    // const sp = req.nextUrl.searchParams;
    // const limitRaw = sp.get("limit") || "6";
    // const limit = Math.min(Math.max(parseInt(limitRaw, 10) || 6, 1), 10);

    // ENV yoksa: local statik fallback kullan
    if (!API_KEY || !PLACE_ID) {
      try {
        // local data dosyasını oku
        const res = await fetch(new URL("../../../data/reviews.json", import.meta.url));
        const all = await res.json();
        const reviews = (Array.isArray(all) ? all : []);
        return NextResponse.json({ reviews, source: "local" });
      } catch (e: any) {
        return NextResponse.json(
          { error: "MISSING_ENV", details: "GOOGLE_MAPS_API_KEY/GOOGLE_PLACE_ID yok ve local reviews okunamadı:", message: e?.message },
          { status: 400 }
        );
      }
    }

    const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    url.searchParams.set("place_id", PLACE_ID);
    // İstenen review alt alanlarını açıkça talep et (profil fotoğrafı dahil)
    url.searchParams.set(
      "fields",
      [
        "name",
        "rating",
        "user_ratings_total",
        "reviews"
      ].join(",")
    );
    // Tarih/relative_time_description Türkçe gelsin
    url.searchParams.set("language", "tr");
    // Metinleri orijinal dilde tut (çeviri istemiyorsak). Yalnızca relative_time Türkçeleşir.
    url.searchParams.set("reviews_no_translations", "true");
    url.searchParams.set("key", API_KEY);

    const res = await fetch(url.toString(), { cache: "no-store" });
    const data = await res.json();

    if (data.status !== "OK") {
      console.error("Google API Error:", data);
      return NextResponse.json({ error: "GOOGLE_ERROR", details: data }, { status: 502 });
    }

    const reviews = (data.result?.reviews || [])
      .map((rv: any) => ({
        author: rv.author_name,
        profile_photo_url: rv.profile_photo_url,
        rating: rv.rating,
        text: rv.text,
        time: rv.relative_time_description,
      }));

    return NextResponse.json({ reviews, source: "google" });
  } catch (e: any) {
    console.error("Server Error:", e);
    return NextResponse.json({ error: "SERVER_ERROR", details: e?.message }, { status: 500 });
  }
}

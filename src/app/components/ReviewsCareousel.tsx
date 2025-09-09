"use client";

// ============================================================================
// ReviewsCarousel.tsx — Google yorumları için merkez odaklı, drag + butonlu carousel
// - GET /api/reviews?limit=6
// - Scroll-snap + pointer drag + sol/sağ buton
// - Hafif cam (glass) efekti, premium tipografi
// - Kenarlarda yumuşak fade
// - Autoplay + Infinite Loop
// ============================================================================
import React, { useEffect, useRef, useState } from "react";

// Küçük yıldız komponenti
function Stars({ rating = 5 }: { rating?: number }) {
  const r = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <span className="rc-stars" aria-label={`Puan ${r}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            fill={i < r ? "#F5B301" : "rgba(0,0,0,.16)"}
          />
        </svg>
      ))}
      <style jsx>{`
        .rc-stars { display:inline-flex; gap:4px; align-items:center; }
      `}</style>
    </span>
  );
}

export type ReviewItem = {
  author: string;
  profile_photo_url?: string;
  rating: number;
  text: string;
  time?: string;
};

export function ReviewsCarousel({
  title = "Ne Dediler?",
  limit = 6,
  autoPlay = true,
  interval = 4000, // 4 sn
}: {
  title?: string;
  limit?: number;
  autoPlay?: boolean;
  interval?: number;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const pos = useRef<{ x: number; s: number }>({ x: 0, s: 0 });

  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ---- FETCH ----
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/reviews?limit=${limit}`, { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "REVIEWS_ERROR");
        if (alive) setReviews(Array.isArray(data.reviews) ? data.reviews : []);
      } catch (e: any) {
        if (alive) setError(e?.message || "REVIEWS_ERROR");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [limit]);

  // ---- SCROLL (loop mantığı) ----
  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".rc-card");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });

    // Küçük gecikmeyle baş/son kontrolü
    setTimeout(() => {
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (dir === 1 && el.scrollLeft >= maxScroll - 5) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      }
      if (dir === -1 && el.scrollLeft <= 5) {
        el.scrollTo({ left: maxScroll, behavior: "smooth" });
      }
    }, 400);
  };

  // ---- DRAG ----
  const onDown = (e: React.PointerEvent) => {
    const el = trackRef.current; if (!el) return;
    setDragging(true); el.setPointerCapture(e.pointerId);
    pos.current = { x: e.clientX, s: el.scrollLeft };
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging) return; const el = trackRef.current; if (!el) return;
    const dx = e.clientX - pos.current.x; el.scrollLeft = pos.current.s - dx;
  };
  const onUp = (e: React.PointerEvent) => {
    const el = trackRef.current; if (!el) return;
    setDragging(false); el.releasePointerCapture(e.pointerId);
  };

  // ---- AUTOPLAY ----
  useEffect(() => {
    if (!autoPlay || !reviews.length) return;
    const timer = setInterval(() => {
      if (!dragging) scrollByCards(1);
    }, interval);
    return () => clearInterval(timer);
  }, [reviews, autoPlay, interval, dragging]);

  return (
    <section className="reviews">
      <div className="container">
        <div className="head">
          <button className="nav" onClick={() => scrollByCards(-1)} aria-label="Önceki">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <h2 className="title">{title}</h2>
          <button className="nav" onClick={() => scrollByCards(1)} aria-label="Sonraki">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {loading && <p className="state">Yorumlar yükleniyor…</p>}
        {!loading && error && <p className="state error">Yorumlar getirilemedi: {error}</p>}

        {!loading && !error && reviews.length > 0 && (
          <div className="viewport">
            <div
              ref={trackRef}
              className={`track${dragging ? " grabbing" : ""}`}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerLeave={onUp}
            >
              {reviews.map((rv, i) => (
                <article key={i} className="rc-card">
                  <div className="quote" aria-hidden="true">
                    <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 11h3v3H7v3H4v-3c0-1.66 1.34-3 3-3zm10 0h3v3h-3v3h-3v-3c0-1.66 1.34-3 3-3z" fill="currentColor"/></svg>
                  </div>
                  <header className="top">
                    <img
                      src={rv.profile_photo_url || "https://i.pravatar.cc/120?img=13"}
                      alt={rv.author} width={56} height={56} loading="lazy" decoding="async" />
                    <div className="meta">
                      <strong className="author">{rv.author}</strong>
                      <span className="time">{rv.time || ""}</span>
                      <Stars rating={rv.rating ?? 5} />
                    </div>
                  </header>
                  <p className="text">{rv.text}</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .reviews { padding: clamp(32px, 6vw, 72px) 0; background:
   
          linear-gradient(180deg, #f2f1e2ff, #e9eef3ff);
        }
        .reviews .container { width:min(1200px,92vw); margin:0 auto; }
        .reviews .head { display:grid; grid-template-columns:42px 1fr 42px; align-items:center; gap:14px; margin-bottom:18px; }
        .reviews .title { text-align:center; margin:0; font-family:Poppins,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; font-weight:800; letter-spacing:.2px; font-size:clamp(22px,4.2vw,34px); line-height:1.15; }
        .reviews .nav { width:42px; height:42px; border-radius:999px; border:1px solid rgba(0,0,0,.1); background:#fff; display:grid; place-items:center; transition:transform .2s ease, box-shadow .2s ease, border-color .2s ease; }
        .reviews .nav:hover { transform:translateY(-2px); border-color:rgba(0,0,0,.18); box-shadow:0 10px 24px rgba(0,0,0,.12); }
        .reviews .state { text-align:center; opacity:.85; margin-top:8px; font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; }
        .reviews .state.error { color:#c00; }

        .reviews .viewport { position:relative; }
        .reviews .track {
          --gap:20px; --cardW: clamp(260px, 28vw, 380px);
          display:grid; grid-auto-flow:column; grid-auto-columns:var(--cardW);
          gap:var(--gap);
          padding:8px clamp(16px,6vw,80px) 12px;
          overflow-x:auto; overscroll-behavior-x:contain; scroll-snap-type:x mandatory;
          -webkit-overflow-scrolling:touch; user-select:none; cursor:grab;
        }
        .reviews .track.grabbing { cursor:grabbing; }
        .reviews .track::-webkit-scrollbar{ display:none; }

        .reviews .rc-card {
          position:relative; scroll-snap-align:center;
          background:rgba(255,255,255,.75); backdrop-filter: blur(10px);
          border:1px solid rgba(0,0,0,.06); border-radius:18px;
          padding:18px 16px 16px; min-height:170px;
        
          transition: transform .3s cubic-bezier(.22,.61,.36,1), box-shadow .3s ease, border-color .3s ease;
        }
        .reviews .rc-card:is(:hover, :focus-within){
          transform: translateY(-4px) scale(1.01);
          box-shadow:0 16px 30px rgba(0,0,0,.11);
          border-color:rgba(0,0,0,.12);
        }
        .reviews .quote{ position:absolute; left:10px; top:8px; color:#111; opacity:.08; }
        .reviews .top{ display:flex; gap:12px; align-items:center; margin-bottom:8px; }
        .reviews .top img{ border-radius:50%; object-fit:cover; border:1px solid rgba(0,0,0,.08); width:56px; height:56px; }
        .reviews .author{ font-family:Poppins,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; font-weight:600; line-height:1.2; }
        .reviews .time{ display:block; margin-top:2px; font-size:12px; opacity:.7; font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; }
        .reviews .text{ font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; color:#2b2b2b; line-height:1.7; letter-spacing:.1px; margin-top:6px; display:-webkit-box; -webkit-line-clamp:6; -webkit-box-orient:vertical; overflow:hidden; }

        /* === Kenarlarda yumuşak fade (mask + overlay fallback) === */
        @supports (mask-image: linear-gradient(to right, black, transparent)) {
          .reviews .track {
            mask-image: linear-gradient(
              to right,
              transparent 0,
              #000 40px,
              #000 calc(100% - 40px),
              transparent 100%
            );
            -webkit-mask-image: linear-gradient(
              to right,
              transparent 0,
              #000 40px,
              #000 calc(100% - 40px),
              transparent 100%
            );
          }
        }
        .reviews .viewport::before,
        .reviews .viewport::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 48px;
          pointer-events: none;
          z-index: 5;
        }
        
      `}</style>
    </section>
  );
}

// ============================================================================
// InstagramGrid.tsx — 3x2 (lg) / 2xN (sm) sıkı grid, hover overlay
// - Kendi içinde fetch yapar: GET /api/instagram?limit=6 (kullanıcının verdiği gibi)
// - Eğer veri gelmezse IG_FALLBACK kullanır
// ============================================================================
export type IgPost = { id: string; image: string; permalink: string; caption?: string; timestamp?: string; media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM' };

export function InstagramGrid({ heading = "Instagram’da Mazanne Mobilya", limit = 6 }: { heading?: string; limit?: number }) {
  const [posts, setPosts] = useState<IgPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // FALLBACK görseller (kullanıcının paylaştıkları)
  const IG_FALLBACK: IgPost[] = [
    { id: "f1", image: "/instagram3.jpg", permalink: "#", caption: "Mazanne – özel tasarım", media_type: 'IMAGE' },
    { id: "f2", image: "/instagram2.jpg", permalink: "#", caption: "Zamansız detaylar" , media_type: 'IMAGE'},
    { id: "f3", image: "/instagram7.png", permalink: "#", caption: "Dayanıklılık ve konfor", media_type: 'IMAGE' },
    { id: "f4", image: "/instagram5.jpg", permalink: "#", caption: "Sıcak dokular", media_type: 'IMAGE' },
    { id: "f5", image: "/instagram6.jpg", permalink: "#", caption: "Oturma odası ilhamı", media_type: 'IMAGE' },
    { id: "f6", image: "/instagram1.jpg", permalink: "#", caption: "Yemek alanı önerisi", media_type: 'IMAGE' },
  ];

  // ---- FETCH (kullanıcının verdiği endpointlerle) ----
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/instagram?limit=${limit}`, { next: { revalidate: 60 } as any });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "INSTAGRAM_ERROR");
        if (alive) setPosts(Array.isArray(data.posts) ? data.posts : []);
      } catch (e: any) {
        if (alive) setError(e?.message || "INSTAGRAM_ERROR");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [limit]);

  const list = !loading && !error && posts.length > 0 ? posts : IG_FALLBACK;

  return (
    <section className="ig">
      <div className="container">
        <div className="ig-head">
          <h2 className="ig-title">{heading}</h2>
          <a className="ig-cta" href="https://instagram.com/mazanne.mobilya" target="_blank" rel="noopener noreferrer" aria-label="Instagram'a git">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" fill="none" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" fill="none" />
              <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
            </svg>
            <span>Profili Gör</span>
          </a>
        </div>

        {loading && <p className="ig-state">Instagram gönderileri yükleniyor…</p>}
        {!loading && error && <p className="ig-state error">Gönderiler getirilemedi: {error}</p>}

        {!loading && list.length > 0 && (
          <div className="grid">
            {list.slice(0, 6).map((p) => (
              <a key={p.id} href={p.permalink} target="_blank" rel="noopener noreferrer" className="card" aria-label="Instagram gönderisi">
                <img src={p.image} alt={p.caption || "Instagram post"} loading="lazy" decoding="async" />
                <span className="overlay">
                 {p.media_type === "VIDEO" && (
  <span className="chip">
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7z" fill="currentColor"/>
    </svg>
    <em>İzle</em>
  </span>
)}

                  {p.caption && <span className="caption">{p.caption}</span>}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        .ig { padding: clamp(32px, 6vw, 72px) 0; background:
          radial-gradient(900px 500px at 90% 0%, rgba(0,0,0,.03), transparent 60%),
          linear-gradient(180deg, #ffffff, #fbfbfb);
        }
        .ig .container { width:min(1200px,92vw); margin:0 auto; }
        .ig-head { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:16px; flex-wrap:wrap; }
        .ig-title { margin:0; font-family:Poppins,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; font-weight:700; letter-spacing:.2px; font-size:clamp(20px,3.8vw,28px); }
        .ig-cta { display:inline-flex; align-items:center; gap:8px; padding:10px 14px; border-radius:999px; border:1px solid rgba(0,0,0,.1); background:#fff; box-shadow:0 6px 16px rgba(0,0,0,.06); font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; font-weight:600; color:#111; text-decoration:none; transition:transform .2s ease, box-shadow .2s ease, border-color .2s ease; }
        .ig-cta:hover { transform:translateY(-2px); border-color:rgba(0,0,0,.18); box-shadow:0 10px 24px rgba(0,0,0,.12); }
        .ig-state { text-align:center; opacity:.85; margin-top:8px; font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; }
        .ig-state.error { color:#c00; }
        .ig .grid { display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:12px; }
        @media (max-width:900px){ .ig .grid{ grid-template-columns:repeat(3, minmax(0,1fr)); gap:10px; } }
        @media (max-width:740px){ .ig .grid{ grid-template-columns:repeat(2, minmax(0,1fr)); gap:8px; } }
          .ig .card:hover{ transform:translateY(-3px); box-shadow:0 16px 36px rgba(0,0,0,0.12); border-color:rgba(0,0,0,0.12); }
       .ig .card {
  position: relative;
  display: block;
  aspect-ratio: 4/5;   /* Instagram post oranı */
  border-radius: 1px;
  overflow: hidden;
  background: #f4f4f4;
  border: 1px solid rgba(0,0,0,.06);
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
}


.ig .card img {
  width: 100%;
  height: 100%;
  object-fit: cover;  /* Kartı tamamen doldurur */
}


.ig .card:hover img {
  transform: scale(1.02); /* Hover efekti çok hafif olsun */
}

        .ig .overlay{ position:absolute; inset:0; display:flex; flex-direction:column; justify-content:flex-end; gap:6px; padding:12px; background:linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,.55)); color:#fff; opacity:0; transition:opacity .25s ease; }
        .ig .card:hover .overlay{ opacity:1; }
        .ig .caption{ font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; font-size:13px; line-height:1.45; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .ig .chip{ position:absolute; top:8px; right:8px; display:inline-flex; align-items:center; gap:6px; padding:6px 10px; font-size:12px; border-radius:999px; background:rgba(0,0,0,.35); backdrop-filter:blur(4px); border:1px solid rgba(255,255,255,.18); }
        .ig .chip em{ font-style:normal; letter-spacing:.2px; font-weight:600; }
      `}</style>
    </section>
  );
}

// ============================================================================
// KULLANIM
// import { ReviewsCarousel, InstagramGrid } from "./ReviewsCarousel"; // veya dosyayı ikiye bölersen ayrı ayrı import et
// <ReviewsCarousel title="Ne Dediler?" limit={6} />
// <InstagramGrid heading="Instagram’da Mazanne Mobilya" limit={6} />
// ============================================================================

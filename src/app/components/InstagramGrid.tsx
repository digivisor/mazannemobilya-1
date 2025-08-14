
import { View, Text } from 'react-native'
import React,{useState,useEffect} from 'react'
import 


export type IgPost = { id: string; image: string; permalink: string; caption?: string; timestamp?: string };

export function InstagramGrid({ heading = "Instagram’da Mazanne Mobilya", limit = 6 }: { heading?: string; limit?: number }) {
  const [posts, setPosts] = useState<IgPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // FALLBACK görseller (kullanıcının paylaştıkları)
  const IG_FALLBACK: IgPost[] = [
    { id: "f1", image: "/instagram3.jpg", permalink: "#", caption: "Mazanne – özel tasarım" },
    { id: "f2", image: "/instagram2.jpg", permalink: "#", caption: "Zamansız detaylar" },
    { id: "f3", image: "/instagram7.png", permalink: "#", caption: "Dayanıklılık ve konfor" },
    { id: "f4", image: "/instagram5.jpg", permalink: "#", caption: "Sıcak dokular" },
    { id: "f5", image: "/instagram6.jpg", permalink: "#", caption: "Oturma odası ilhamı" },
    { id: "f6", image: "/instagram1.jpg", permalink: "#", caption: "Yemek alanı önerisi" },
  ];

  // ---- FETCH (kullanıcının verdiği endpointlerle) ----
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        // next: { revalidate: 60 } bilgisini da ekliyoruz
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
          <a className="ig-cta" href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram'a git">
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
                  <span className="chip">
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
                    <em>İzle</em>
                  </span>
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
        .ig .card { position:relative; display:block; aspect-ratio:1/1; border-radius:16px; overflow:hidden; background:#f4f4f4; border:1px solid rgba(0,0,0,.06); transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
        .ig .card:hover{ transform:translateY(-3px); box-shadow:0 16px 36px rgba(0,0,0,.12); border-color:rgba(0,0,0,.12); }
        .ig .card img{ width:100%; height:100%; object-fit:cover; display:block; transition: transform .35s ease; }
        .ig .card:hover img{ transform:scale(1.04); }
        .ig .overlay{ position:absolute; inset:0; display:flex; flex-direction:column; justify-content:flex-end; gap:6px; padding:12px; background:linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,.55)); color:#fff; opacity:0; transition:opacity .25s ease; }
        .ig .card:hover .overlay{ opacity:1; }
        .ig .caption{ font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif; font-size:13px; line-height:1.45; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .ig .chip{ position:absolute; top:8px; right:8px; display:inline-flex; align-items:center; gap:6px; padding:6px 10px; font-size:12px; border-radius:999px; background:rgba(0,0,0,.35); backdrop-filter:blur(4px); border:1px solid rgba(255,255,255,.18); }
        .ig .chip em{ font-style:normal; letter-spacing:.2px; font-weight:600; }
      `}</style>
    </section>
  );
}

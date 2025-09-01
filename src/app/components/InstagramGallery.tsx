import React, { useEffect, useState } from "react";

type IgPost = {
  id: string;
  image: string;
  permalink: string;
  caption?: string;
  media_type?: string;
  timestamp?: string;
};


export default function InstagramGallery({ tag = "evdekorasyonu", limit = 9 }) {
  const [posts, setPosts] = useState<IgPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`/api/instagram?tag=${tag}&limit=${limit}`);
        const data = await res.json();
console.log("API DATA", data);

        if (res.ok && data.posts) {
          if (alive) setPosts(data.posts);
        }
      } catch (err) {
        console.error("IG fetch error", err);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [tag, limit]);

  if (loading) return <p>Yükleniyor...</p>;
  if (!posts.length) return <p>Henüz gönderi bulunamadı.</p>;

  return (
    <section className="ig-gallery container">
      <h3 className="sec-title">Instagram’da #{tag}</h3>
      <div className="grid">
        {posts.map((p) => (
          <a key={p.id} href={p.permalink} target="_blank" rel="noopener noreferrer">
            <img src={p.image} alt={p.caption || "Instagram post"} />
          </a>
        ))}
      </div>

      <style jsx>{`
        .ig-gallery { margin: 40px auto; }
        .ig-gallery .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 12px;
        }
        .ig-gallery img {
          width: 100%;
          aspect-ratio: 4/5;
          object-fit: cover;
          border-radius: 12px;
        }
      `}</style>
    </section>
  );
}

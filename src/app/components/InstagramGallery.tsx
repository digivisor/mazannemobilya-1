import { Instagram } from "lucide-react";
import React, { useEffect, useState } from "react";

type IgPost = {
  id: string;
  image: string;
  permalink: string;
  caption?: string;
  media_type?: string;
  timestamp?: string;
};

export default function InstagramGallery({
  tag,
  limit,
}: {
  tag: string;
  limit: number;
}) {
  const [posts, setPosts] = useState<IgPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`/api/instagram?tag=${tag}&limit=${limit}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (res.ok && data.posts) {
          if (alive) setPosts(data.posts);
        }
      } catch (err) {
        console.error("IG fetch error", err);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [tag, limit]);

  if (loading) return <p>Yükleniyor...</p>;
  if (!posts.length) return <p
  style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '20px' }}
  >Henüz gönderi bulunamadı.</p>;

  const displayPosts = posts.slice(0, 4);

  return (
    <section className="ig-gallery container">
      <h3 className="sec-title"
      style={{ textAlign: 'center', marginBottom: '20px' ,fontWeight: 'bold'}}
      >Instagram’da #{tag}</h3>
      <div className="grid">
        {displayPosts.map((p) => (
          <a
            key={p.id}
            href={p.permalink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={p.image} alt={p.caption || "Instagram post"} />
          </a>
        ))}

        {/* 5. Kart - Devamını Gör */}
{/* 5. kart - Devamını Gör */}
{posts.length > 4 && (
  <a
    className="see-more"
    href="https://instagram.com/mazanne.mobilya"
    target="_blank"
    rel="noopener noreferrer"
  >
    {/* Logoyu ortalanmış şekilde */}
    <div className="logo-wrap">
      <img
        src="/mazanneinstalogo.jpg"
        alt="Mazanne logo"
        className="main-logo"
        style={{ width: '150px', height: '150px', borderRadius: '50%' }}
        />
    </div>

    {/* Instagram kullanıcı adı */}
    <div className="insta-user">
      <Instagram/>
      <span>@mazanne.mobilya</span>
    </div>

    {/* Devamını Gör CTA */}
    <div className="cta">
      <span>Devamını Gör</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </div>
  </a>
)}
      </div>

      <style jsx>{`
        .ig-gallery {
          margin: 40px auto;
        }
        .ig-gallery .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 10px;
        }
        .ig-gallery img {
          width: 100%;
          aspect-ratio: 4/5;
          object-fit: cover;
          border-radius: 12px;
        }

        /* Devamını Gör kartı */
            .see-more {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            aspect-ratio: 4/5;
            border-radius: 12px;
            gap: 12px;
            padding: 16px;
            text-decoration: none;
            color: #fff;
            background: linear-gradient(
                45deg,
                #f58529,
                #dd2a7b,
               
                #515bd4
            );
            transition: all 0.25s ease;
            }

            .see-more:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
            }

           

            .insta-user {
            display: flex;
            align-items: center;
            gap: 6px;
            font-weight: 600;
            font-size: 14px;
            color: #fff;
            }

            .insta-user svg {
            width: 16px;
            height: 16px;
            color: #fff;
            }

            .cta {
            margin-top: auto;
            display: flex;
            align-items: center;
            gap: 6px;
            font-weight: 600;
            color: #fff;
            font-size: 15px;
            }
      `}</style>
    </section>
  );
}

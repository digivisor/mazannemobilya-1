"use client";

import React, { useEffect } from "react";
import { DM_Sans } from "next/font/google";
import { ChevronDown, ShieldCheck, Ruler, Layers, Expand } from "lucide-react";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import InstagramGallery from "@/app/components/InstagramGallery";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm",
  display: "swap",
});
const fontBody = DM_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-body",
  display: "swap",
});
const fontHeading = DM_Sans({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-heading",
  display: "swap",
});

export default function Page() {
  // YAVAŞ BAŞLIK + HERO + STAGGER
  useEffect(() => {
    const els: HTMLElement[] = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".fade_bottom, .scroll-text-animation, .project-card.fade_bottom, .cat-split, .feature-card, .faq-split, .sec-title, .cat-hero-img"
      )
    );

    els.forEach((el, i) => {
      el.dataset._idx = String(i);
      if (el.classList.contains("slow-reveal") && el.matches(".cat-hero-img")) {
        el.style.opacity = "0";
        el.style.filter = "blur(10px)";
      } else {
        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
      }
    });

    const reveal = (el: HTMLElement) => {
      const delay = Number(el.dataset._idx || "0") * 60;
      const SLOW_TITLE_MS = 1100;
      const SLOW_HERO_MS = 1400;
      const NORMAL_MS = 600;

      const isHeroSlow = el.classList.contains("slow-reveal") && el.matches(".cat-hero-img");
      const isTitleSlow = el.classList.contains("slow-reveal") && !isHeroSlow;
      const dur = isHeroSlow ? SLOW_HERO_MS : isTitleSlow ? SLOW_TITLE_MS : NORMAL_MS;
      const easing = "cubic-bezier(.22,.61,.36,1)";

      if (isHeroSlow) {
        el.style.transition = `filter ${dur}ms ${easing}, opacity ${dur}ms ${easing}`;
        el.style.transitionDelay = `${delay}ms`;
        el.style.filter = "blur(0)";
        el.style.opacity = "1";
      } else {
        el.style.transition = `transform ${dur}ms ${easing}, opacity ${dur}ms ${easing}`;
        el.style.transitionDelay = `${delay}ms`;
        el.style.transform = "translate(0,0)";
        el.style.opacity = "1";
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          reveal(e.target as HTMLElement);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => io.observe(el));

    const t = setTimeout(() => {
      els.forEach((el) => {
        if (getComputedStyle(el).opacity === "0") reveal(el);
      });
    }, 1000);

    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, []);

  // 3D TILT: feature kartları, görseller ve HERO
  useEffect(() => {
    const tilt = (el: HTMLElement, strength = 6) => {
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        const rx = (y - 0.5) * strength;
        const ry = (x - 0.5) * -strength;
        el.style.setProperty("--rx", `${rx}deg`);
        el.style.setProperty("--ry", `${ry}deg`);
      };
      const onEnter = () => el.style.setProperty("--tz", "-10px");
      const onLeave = () => {
        el.style.setProperty("--rx", `0deg`);
        el.style.setProperty("--ry", `0deg`);
        el.style.setProperty("--tz", "0px");
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    };

    const cards = Array.from(document.querySelectorAll<HTMLElement>(".feature-card"));
    const medias = Array.from(document.querySelectorAll<HTMLElement>(".split-media"));
    const heros = Array.from(document.querySelectorAll<HTMLElement>(".hero-tilt"));
    const cleanups = [
      ...cards.map((c) => tilt(c, 7)),
      ...medias.map((m) => tilt(m, 4)),
      ...heros.map((h) => tilt(h, 5)),
    ];

    return () => cleanups.forEach((fn) => fn && fn());
  }, []);

  return (
    <div className={`fixed-navbar ${dmSans.variable} ${fontBody.variable} ${fontHeading.variable}`}>
      <Header />

      {/* ================== BREADCRUMB ================== */}
      <section className="wpo-page-title">
        <div className="container">
          <div className="row">
            <div className="col col-xs-12">
              <div className="wpo-breadcumb-wrap">
                <ol>
                  <li>Kategoriler / Tamamlayıcı Mobilyalar / Masa</li>
                </ol>
                <h2 className="fade_bottom slow-reveal">Masa</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================== HERO ================== */}
      <section className="cat-hero">
        <div className="container">
          <div className="hero-tilt">
            <img
              className="cat-hero-img slow-reveal"
              alt="Minimal çizgilere sahip doğal ahşap masa ve sandalye kombinasyonu"
              src="https://img.vivense.com/1920x1280/images/0b9ea4b7515543efba091709b283344c.jpg"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* ================== SOL AÇIKLAMA — SAĞ GÖRSEL ================== */}
      <section className="cat-split container">
        <div className="split-grid">
          <div className="split-text" style={{ fontFamily: "Poppins" }}>
            <h3 style={{ fontFamily: "Poppins" }}>Ölçü, Yüzey, Mekanizma: Doğru Masa</h3>
            <p>
              Çalışma masası, dresuar ya da konsol... Kullanıma uygun yükseklik, çizilmeye dirençli
              yüzeyler ve gerekirse açılır/katlanır mekanizmalarla her alan için doğru masayı
              tasarlıyoruz. Aşağıda en sık tercih edilen özellikleri özetledik.
            </p>

            <ul className="bullet">
              <li>Standart yükseklik ~ <b>73–76 cm</b>, ergonomik oturum mesafesi ~ <b>26–30 cm</b></li>
              <li>Doğal kaplama / kompakt yüzey, kolay temizlenen mat dokular</li>
              <li>Açılır/katlanır mekanizma ve kablo yönetimi opsiyonları</li>
              <li>Minimalden modern tarza çoklu malzeme kombinleri</li>
            </ul>

            <a href="/iletisim" className="theme-btn split-cta">
              Showroomu ziyaret et!
            </a>
          </div>

          <div className="split-media">
            <img
              alt="Geniş yüzeyli çalışma masası, sade aksesuarlar ve depolama"
              src="https://static.ticimax.cloud/47642/uploads/urunresimleri/buyuk/kastra-jonah-masif-mese-masa-yemek-mas-1cc-bc.jpg"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* ================== ÖNE ÇIKAN 3 ÖZELLİK ================== */}
      <section className="container features">
        <h3 className="sec-title" style={{ fontFamily: "Poppins" }}>
          Öne Çıkan Özellikler
        </h3>

        <div className="feature-grid" style={{ fontFamily: "Poppins" }}>
          <article className="feature-card">
            <div className="icon-wrap">
              <Ruler />
            </div>
            <h4 style={{ fontFamily: "Poppins" }}>Doğru Ölçü</h4>
            <p>Yükseklik/derinlik ergonomisi, çalışma veya giriş alanına uygun boyutlar.</p>
          </article>

          <article className="feature-card">
            <div className="icon-wrap">
              <Layers />
            </div>
            <h4 style={{ fontFamily: "Poppins" }}>Yüzey Seçenekleri</h4>
            <p>Doğal kaplama, kompakt/laminat ve leke tutmaz mat doku alternatifleri.</p>
          </article>

          <article className="feature-card">
            <div className="icon-wrap">
              <Expand />
            </div>
            <h4 style={{ fontFamily: "Poppins" }}>Akıllı Mekanizma</h4>
            <p>Açılır/katlanır çözümler, kablo kanalı ve depolama için düzenleyici modüller.</p>
          </article>
        </div>
      </section>

      {/* ================== SOL GÖRSEL — SAĞ SSS ================== */}
      <section className="container faq-split">
        <div className="split-grid invert">
          <div className="split-media">
            <img
              alt="Dresuar üstü aydınlatma ve depolama detayları"
              src="https://static.ticimax.cloud/52852/uploads/urunresimleri/buyuk/heybeli-katlanir-ahsap-bahce-balkon-ta-abaf98.jpg"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="split-text">
            <h3 style={{ fontFamily: "Poppins" }}>Sıkça Sorulan Sorular</h3>

            <div className="faq">
              <details className="faq-item">
                <summary>
                  Çalışma masası için ideal ölçüler neler?
                  <ChevronDown className="chev" size={18} />
                </summary>
                <div className="faq-body">
                  Yükseklik <b>73–76 cm</b>, derinlik <b>60–75 cm</b> aralığı idealdir. Koltuk oturum
                  yüksekliğine göre <b>26–30 cm</b> diz boşluğu bırakmanızı öneririz.
                </div>
              </details>

              <details className="faq-item">
                <summary>
                  Yüzey bakımı nasıl olmalı?
                  <ChevronDown className="chev" size={18} />
                </summary>
                <div className="faq-body">
                  Günlük temizlikte nemli mikrofiber bez yeterlidir. Sıcak servislerde altlık,
                  doğal kaplamada düzenli bakım önerilir.
                </div>
              </details>

              <details className="faq-item">
                <summary>
                  Teslimat ve montaj süreciniz?
                  <ChevronDown className="chev" size={18} />
                </summary>
                <div className="faq-body">
                  Hazır ürünlerde <b>7–15 iş günü</b>, ölçüye özel üretimde <b>20–28 iş günü</b>.
                  Antalya içi profesyonel montaj sağlanır.
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>
    <InstagramGallery tag="ŞıkDetaylar" limit={5} />
      <Footer />

      {/* ===== ANİMASYON + HOVER (Hero tilt + CTA kontrast fix) ===== */}
      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }

        html, body { max-width: 100%; overflow-x: hidden; overscroll-behavior-x: none; -webkit-tap-highlight-color: transparent; }
        @supports (overflow-x: clip) { html, body { overflow-x: clip; } }

        .cat-hero { padding: 10px 0 0; }
        .cat-hero .container { max-width: 1280px; }

        .hero-tilt {
          perspective: 800px;
          --rx: 0deg; --ry: 0deg; --tz: 0px;
          transition: transform .25s ease, box-shadow .25s ease;
          transform: perspective(800px) rotateX(var(--rx)) rotateY(var(--ry)) translate3d(0,var(--tz),0);
        }
        .cat-hero-img {
          width: 100%; height: clamp(220px, 42vw, 520px); object-fit: cover;
          border-radius: 18px; box-shadow: 0 12px 36px rgba(0,0,0,.12); display: block;
          animation: kenburns 18s ease-in-out infinite alternate;
          transform-origin: center center;
          transition: transform .25s ease, box-shadow .25s ease, filter .25s ease, opacity .25s ease;
        }
        .hero-tilt:hover .cat-hero-img { transform: scale(1.02); box-shadow: 0 18px 44px rgba(0,0,0,.14); }
        @keyframes kenburns { from { transform: scale(1); } to { transform: scale(1.05); } }

        .split-grid {
          display: grid; grid-template-columns: 1.1fr 0.9fr; gap: clamp(18px, 3vw, 32px);
          align-items: center; margin: 48px auto; max-width: 1200px;
        }
        .split-grid.invert { grid-template-columns: 0.9fr 1.1fr; }
        @media (max-width: 991px){ .split-grid, .split-grid.invert { grid-template-columns: 1fr; } }

        .split-text h3 { font-size: clamp(22px, 2.6vw, 34px); margin: 0 0 12px; letter-spacing: .2px; }
        .split-text p { margin: 0 0 14px; color: #2b2b2b; }
        .bullet { margin: 10px 0 18px; padding-left: 18px; }
        .bullet li { margin: 6px 0; }

           .split-cta {
          display: inline-block;
          margin-top: 4px;
          border: 1px solid #111;
          border-radius: 999px;
          padding: 12px 20px;
          color: #111 !important;       /* yazı beyazlaşmasın diye zorunlu */
          background: transparent !important;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.25s ease, transform 0.25s ease, background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
        }
        .split-cta:hover,
        .split-cta:focus-visible {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
          background: #111 !important;   /* koyu arka plan */
          color: #fff !important;        /* beyaz metin */
          border-color: #111 !important;
        }
        .split-cta::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255, 255, 255, 0.35) 50%,
            transparent 100%
          );
          transform: translateX(-120%);
          transition: transform 0.6s ease;
        }
        .split-cta:hover::after,
        .split-cta:focus-visible::after {
          transform: translateX(120%);
        }


        .split-media{
          perspective: 800px; --rx:0deg; --ry:0deg; --tz:0px;
          transition: transform .25s ease, box-shadow .25s ease;
          transform: perspective(800px) rotateX(var(--rx)) rotateY(var(--ry)) translate3d(0,var(--tz),0);
        }
        .split-media img{
          width:100%; height: clamp(240px, 36vw, 460px); object-fit:cover; border-radius:16px;
          box-shadow:0 10px 28px rgba(0,0,0,.12); display:block;
        }

        .features{ margin-top:6px; margin-bottom:18px; }
        .sec-title{ font-size:clamp(20px,2.4vw,28px); margin:10px auto 18px; max-width:1200px; }
        .feature-grid{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:18px; max-width:1200px; margin:0 auto; }
        @media (max-width:991px){ .feature-grid{ grid-template-columns:1fr; } }

        .feature-card{
          position:relative; background:#fff; border:1px solid #eee; border-radius:16px; padding:20px;
          box-shadow:0 8px 20px rgba(0,0,0,.06);
          transition: box-shadow .25s ease, transform .25s ease, border-color .25s ease, background .25s ease;
          transform-style: preserve-3d; perspective:800px;
          --rx:0deg; --ry:0deg; --tz:0px;
          transform: perspective(800px) rotateX(var(--rx)) rotateY(var(--ry)) translate3d(0,var(--tz),0);
          overflow:hidden;
        }
        .feature-card::after{
          content:""; position:absolute; inset:-1px;
          background: radial-gradient(1200px 150px at var(--shine-x,-10%) -20%, rgba(255,255,255,.35), transparent 60%);
          opacity:0; pointer-events:none; transition: opacity .25s ease;
        }
        .feature-card:hover::after{ opacity:1; animation: shine-sweep .9s ease; }
        @keyframes shine-sweep{ from{ --shine-x:-10%; } to{ --shine-x:110%; } }

        .feature-card:hover{ border-color:#e7e7e7; box-shadow:0 18px 40px rgba(0,0,0,.12); --tz:-8px; background:#fff; cursor:pointer; }
        .feature-card .icon-wrap{
          width:44px; height:44px; border-radius:12px; background:#f6f6f6; display:grid; place-items:center;
          margin-bottom:10px; transition: transform .25s ease, background .25s ease, box-shadow .25s ease; box-shadow:0 1px 0 rgba(0,0,0,.04) inset;
        }
        .feature-card h4{ margin:0 0 6px; font-size:18px; }
        .feature-card p{ margin:0; color:#3a3a3a; }

        .faq .faq-item{
          border:1px solid #eee; border-radius:14px; padding:0; background:#fff; margin-bottom:10px; overflow:hidden;
          transition: box-shadow .25s ease, transform .25s ease, border-color .25s ease, background .25s ease;
        }
        .faq-item summary{
          list-style:none; cursor:pointer; padding:14px 16px; display:flex; align-items:center; justify-content:space-between; gap:12px;
          font-weight:600; position:relative; transition: background .2s ease;
        }
        .faq-item summary::-webkit-details-marker{ display:none; }
        .faq-item .chev{ transition: transform .25s ease; flex-shrink:0; }
        .faq-item:hover summary{ background:#fafafa; }
        .faq-item[open]{ border-color:#e8e8e8; transform: translateY(-2px); box-shadow:0 12px 28px rgba(0,0,0,.08); }
        .faq-item[open] .chev{ transform: rotate(180deg); }
        .faq-item .faq-body{ padding:0 16px 16px; color:#2b2b2b; line-height:1.55; animation: faq-reveal .28s ease; }
        @keyframes faq-reveal{ from{ opacity:0; transform: translateY(-6px); } to{ opacity:1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

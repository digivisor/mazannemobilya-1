"use client";

import React, { useEffect } from "react";
import { DM_Sans } from "next/font/google";
import { ChevronDown, ShieldCheck, Ruler, Monitor } from "lucide-react";
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
  // Yavaş görünme + stagger (başlık/hero daha yavaş)
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

  // 3D tilt: feature kartları + split görseller + HERO (isteğin üzerine aynı efekt)
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

    const tiltNodes = Array.from(
      document.querySelectorAll<HTMLElement>(".feature-card, .split-media, .hero-tilt")
    );
    const cleanups = tiltNodes.map((n) => tilt(n, n.classList.contains("hero-tilt") ? 5 : 7));

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
                  <li>Kategoriler / TV Ünitesi</li>
                </ol>
                <h2 className="fade_bottom slow-reveal">TV Ünitesi</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================== HERO (artık diğer görseller gibi hover/tilt efektli) ================== */}
      <section className="cat-hero">
        <div className="container">
          <div className="hero-tilt">
            <img
              className="cat-hero-img slow-reveal"
              alt="Minimal TV ünitesi ve medya konsolu"
              src="https://sizindukkan.com/cdn/shop/files/21_92416efe-d967-47de-ac19-f23e537b4f52.jpg?v=1742913622"
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
            <h3 style={{ fontFamily: "Poppins" }}>Temiz Görünüm, Akıllı Yerleşim</h3>
            <p>
              TV ünitelerimiz; kablo gizleme kanalları, cihaz havalandırma boşlukları ve
              soundbar/oyun konsolu için modüler raflarla salonda düzeni korur. Duvar askı (VESA)
              uyumluluğu ve yüksek taşıma kapasiteli bağlantı elemanlarıyla güvenli bir kurulum
              sunar.
            </p>

            <ul className="bullet">
              <li>VESA uyumlu duvar askı ve ayaklı kullanım seçenekleri</li>
              <li>Kablo kanalı, priz planı ve havalandırma ızgaraları</li>
              <li>Soundbar/oyun konsolu için geniş modül ve IR dostu kapaklar</li>
              <li>Ceviz/meşe kaplama, mat lake veya yüksek dayanımlı laminat yüzeyler</li>
            </ul>

            <a href="/iletisim" className="theme-btn split-cta">
              Showroomu ziyaret et!
            </a>
          </div>

          <div className="split-media">
            <img
              alt="Ahşap kaplamalı TV ünitesi — açık raf ve kapaklı depolama"
              src="https://www.minarmobilya.com/idea/dq/03/myassets/products/727/prime-tv-unitesi-kumtasi-1_min.jpg?revision=1754656630"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* ================== ÖNE ÇIKAN ÖZELLİKLER ================== */}
      <section className="container features">
        <h3 className="sec-title" style={{ fontFamily: "Poppins" }}>
          Öne Çıkan Özellikler
        </h3>

        <div className="feature-grid" style={{ fontFamily: "Poppins" }}>
          <article className="feature-card">
            <div className="icon-wrap">
              <Ruler />
            </div>
            <h4 style={{ fontFamily: "Poppins" }}>Doğru Ölçü & VESA</h4>
            <p>
              TV genişliğinden daha uzun ünite seçin; VESA delik aralığını ve duvar taşıma
              kapasitesini kontrol edin.
            </p>
          </article>

          <article className="feature-card">
            <div className="icon-wrap">
              <ShieldCheck />
            </div>
            <h4 style={{ fontFamily: "Poppins" }}>Kablo & Havalandırma</h4>
            <p>
              Kablo geçişi için arka kanallar, cihazlar için hava sirkülasyonu sağlayan boşluklar.
            </p>
          </article>

          <article className="feature-card">
            <div className="icon-wrap">
              <Monitor />
            </div>
            <h4 style={{ fontFamily: "Poppins" }}>Ses & Oyun Modülleri</h4>
            <p>Soundbar rafı, konsol/dijital TV kutusu için IR uyumlu kapak ve düzenli yerleşim.</p>
          </article>
        </div>
      </section>

      {/* ================== SOL GÖRSEL — SAĞ SSS ================== */}
      <section className="container faq-split">
        <div className="split-grid invert">
          <div className="split-media">
            <img
              alt="Duvara asılı TV, yüzer raflı ünite ve kablo gizleme"
              src="https://platincdn.com/3522/pictures/thumb/1000X-666X-JXCBFZLSKV513202593651_4.jpg"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="split-text">
            <h3 style={{ fontFamily: "Poppins" }}>Sıkça Sorulan Sorular</h3>

            <div className="faq">
              <details className="faq-item">
                <summary>
                  Hangi TV ölçüsüne hangi ünite?
                  <ChevronDown className="chev" size={18} />
                </summary>
                <div className="faq-body">
                  Genel kural: Ünite genişliği TV’den <b>en az 20–30 cm</b> daha fazla olsun. TV
                  yüksekliği göz hizasına yakın (oturma pozisyonunda) planlanmalıdır.
                </div>
              </details>

              <details className="faq-item">
                <summary>
                  Duvar askısı mı ayaklı kullanım mı?
                  <ChevronDown className="chev" size={18} />
                </summary>
                <div className="faq-body">
                  Duvar askısı minimal ve güvenlidir; taşıyıcı dübel ve uygun VESA seçimi gerekir.
                  Ayaklı kurulum taşınması kolaydır, kiracı çözümü için idealdir.
                </div>
              </details>

              <details className="faq-item">
                <summary>
                  Kablo gizleme ve priz yerini nasıl planlamalıyım?
                  <ChevronDown className="chev" size={18} />
                </summary>
                <div className="faq-body">
                  TV, konsol, soundbar, modem vb. için yeterli priz planlayın. Arka panoda{" "}
                  <b>kablo kanalı</b> ve cihaz arkasında <b>havalandırma boşluğu</b> bırakın; IR
                  sinyali için delikli panel/şeffaf kapak tercih edebilirsiniz.
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>
      <InstagramGallery tag="tvünitesi" limit={9} />

      <Footer />

      {/* ===== ANİMASYON + HOVER (HERO da tilt’li) ===== */}
      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }

        html,
        body {
          max-width: 100%;
          overflow-x: hidden;
          overscroll-behavior-x: none;
          -webkit-tap-highlight-color: transparent;
        }
        @supports (overflow-x: clip) {
          html,
          body {
            overflow-x: clip;
          }
        }

        /* ---------- HERO ---------- */
        .cat-hero {
          padding: 10px 0 0;
        }
        .cat-hero .container {
          max-width: 1280px;
        }

        /* HERO'ya tilt için kapsayıcı */
        .hero-tilt {
          perspective: 800px;
          --rx: 0deg;
          --ry: 0deg;
          --tz: 0px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          transform: perspective(800px) rotateX(var(--rx)) rotateY(var(--ry))
            translate3d(0, var(--tz), 0);
        }

        .cat-hero-img {
          width: 100%;
          height: clamp(220px, 42vw, 520px);
          object-fit: cover;
          border-radius: 18px;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
          display: block;
          animation: kenburns 18s ease-in-out infinite alternate;
          transform-origin: center center;
          transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease, opacity 0.25s ease;
        }
        .hero-tilt:hover .cat-hero-img {
          transform: scale(1.02);
          box-shadow: 0 18px 44px rgba(0, 0, 0, 0.14);
        }
        @keyframes kenburns {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.05);
          }
        }

        /* ---------- SPLIT ---------- */
        .split-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: clamp(18px, 3vw, 32px);
          align-items: center;
          margin: 48px auto;
          max-width: 1200px;
        }
        .split-grid.invert {
          grid-template-columns: 0.9fr 1.1fr;
        }
        @media (max-width: 991px) {
          .split-grid,
          .split-grid.invert {
            grid-template-columns: 1fr;
          }
        }
        .split-text h3 {
          font-size: clamp(22px, 2.6vw, 34px);
          margin: 0 0 12px;
          letter-spacing: 0.2px;
        }
        .split-text p {
          margin: 0 0 14px;
          color: #2b2b2b;
        }
        .bullet {
          margin: 10px 0 18px;
          padding-left: 18px;
        }
        .bullet li {
          margin: 6px 0;
        }
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


        .split-media {
          perspective: 800px;
          --rx: 0deg;
          --ry: 0deg;
          --tz: 0px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          transform: perspective(800px) rotateX(var(--rx)) rotateY(var(--ry))
            translate3d(0, var(--tz), 0);
        }
        .split-media img {
          width: 100%;
          height: clamp(240px, 36vw, 460px);
          object-fit: cover;
          border-radius: 16px;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12);
          display: block;
        }

        /* ---------- FEATURES: 3D tilt + shine ---------- */
        .features {
          margin-top: 6px;
          margin-bottom: 18px;
        }
        .sec-title {
          font-size: clamp(20px, 2.4vw, 28px);
          margin: 10px auto 18px;
          max-width: 1200px;
        }
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          max-width: 1200px;
          margin: 0 auto;
        }
        @media (max-width: 991px) {
          .feature-grid {
            grid-template-columns: 1fr;
          }
        }
        .feature-card {
          position: relative;
          background: #fff;
          border: 1px solid #eee;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
          transition: box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease,
            background 0.25s ease;
          transform-style: preserve-3d;
          perspective: 800px;
          --rx: 0deg;
          --ry: 0deg;
          --tz: 0px;
          transform: perspective(800px) rotateX(var(--rx)) rotateY(var(--ry))
            translate3d(0, var(--tz), 0);
          overflow: hidden;
        }
        .feature-card::after {
          content: "";
          position: absolute;
          inset: -1px;
          background: radial-gradient(
            1200px 150px at var(--shine-x, -10%) -20%,
            rgba(255, 255, 255, 0.35),
            transparent 60%
          );
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s ease;
        }
        .feature-card:hover::after {
          opacity: 1;
          animation: shine-sweep 0.9s ease;
        }
        @keyframes shine-sweep {
          from {
            --shine-x: -10%;
          }
          to {
            --shine-x: 110%;
          }
        }
        .feature-card:hover {
          border-color: #e7e7e7;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.12);
          --tz: -8px;
          background: #fff;
          cursor: pointer;
        }
        .feature-card .icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #f6f6f6;
          display: grid;
          place-items: center;
          margin-bottom: 10px;
          transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04) inset;
        }
        .feature-card:hover .icon-wrap {
          transform: translateY(-2px) scale(1.06);
          animation: icon-pop 0.9s cubic-bezier(.22,.61,.36,1);
        }
        @keyframes icon-pop {
          0% {
            transform: translateY(0) scale(1);
          }
          35% {
            transform: translateY(-3px) scale(1.1);
          }
          100% {
            transform: translateY(-2px) scale(1.06);
          }
        }
        .feature-card h4 {
          margin: 0 0 6px;
          font-size: 18px;
        }
        .feature-card p {
          margin: 0;
          color: #3a3a3a;
        }

        /* ---------- FAQ ---------- */
        .faq .faq-item {
          border: 1px solid #eee;
          border-radius: 14px;
          padding: 0;
          background: #fff;
          margin-bottom: 10px;
          overflow: hidden;
          transition: box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease,
            background 0.25s ease;
        }
        .faq-item summary {
          list-style: none;
          cursor: pointer;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          font-weight: 600;
          position: relative;
          transition: background 0.2s ease;
        }
        .faq-item summary::-webkit-details-marker {
          display: none;
        }
        .faq-item .chev {
          transition: transform 0.25s ease;
          flex-shrink: 0;
        }
        .faq-item:hover summary {
          background: #fafafa;
        }
        .faq-item[open] {
          border-color: #e8e8e8;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
        }
        .faq-item[open] .chev {
          transform: rotate(180deg);
        }
        .faq-item .faq-body {
          padding: 0 16px 16px;
          color: #2b2b2b;
          line-height: 1.55;
          animation: faq-reveal 0.28s ease;
        }
        @keyframes faq-reveal {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

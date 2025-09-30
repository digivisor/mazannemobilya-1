"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DM_Sans } from "next/font/google";
import { Search, Facebook, Twitter, Linkedin, Instagram, X, ChevronDown } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);
const [showVideo, setShowVideo] = useState(false);

  // Video modal state
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  // FADE IN/OUT on scroll
  useEffect(() => {
    const prepare = (el: HTMLElement) => {
      if (el.dataset._prepared === "1") return;
      const type = el.dataset.animation;
      el.style.opacity = "0";
      el.style.willChange = "transform, opacity";
      switch (type) {
        case "fade_from_top":
          el.style.transform = "translate(0, -180px)";
          break;
        case "fade_from_left":
          el.style.transform = "translate(-180px, 0)";
          break;
        case "fade_from_right":
          el.style.transform = "translate(180px, 0)";
          break;
        default:
          el.style.transform = "translate(0, 180px)";
      }
      el.dataset._prepared = "1";
    };

    const animated = Array.from(
      document.querySelectorAll<HTMLElement>(".scroll-text-animation")
    );
    animated.forEach(prepare);

    const fades = Array.from(
      document.querySelectorAll<HTMLElement>(".fade_bottom")
    );
    fades.forEach((el) => {
      if (el.dataset._prepared === "1") return;
      el.style.opacity = "0";
      el.style.transform = "translate(0, 40px)";
      el.style.willChange = "transform, opacity";
      el.dataset._prepared = "1";
    });

    const all = [...animated, ...fades];

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => {
          const el = ent.target as HTMLElement;
          const repeat = el.dataset.repeat === "true";
          if (ent.isIntersecting) {
            el.style.transition =
              "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s cubic-bezier(.22,.61,.36,1)";
            el.style.transform = "translate(0, 0)";
            el.style.opacity = "1";
            if (!repeat) io.unobserve(el);
          } else if (repeat) {
            const type = el.dataset.animation;
            el.style.opacity = "0";
            switch (type) {
              case "fade_from_top":
                el.style.transform = "translate(0, -180px)";
                break;
              case "fade_from_left":
                el.style.transform = "translate(-180px, 0)";
                break;
              case "fade_from_right":
                el.style.transform = "translate(180px, 0)";
                break;
              default:
                el.style.transform = "translate(0, 180px)";
            }
          }
        });
      },
      { threshold: 0.18 }
    );

    all.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // FUNFACT counter: 0 -> target
  useEffect(() => {
    const box = document.querySelector(".about-funfact");
    if (!box) return;
    const innerNumber = box.querySelector<HTMLElement>("h3 span span");
    if (!innerNumber) return;

    const rawTarget =
      innerNumber.getAttribute("data-count") ?? innerNumber.textContent ?? "0";
    const target = Math.max(0, parseInt(rawTarget, 10) || 0);

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        let start = 0;
        const dur = 1200;
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          const val = Math.round(start + (target - start) * p);
          innerNumber.textContent = String(val);
          if (p < 1) requestAnimationFrame(tick);
          else io.disconnect();
        };
        innerNumber.textContent = "0";
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    io.observe(box);
    return () => io.disconnect();
  }, []);

  // ESC kapatma (mobil menü + video modal)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setVideoOpen(false);
        setVideoSrc(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /** SSS data (TR) */
  const faq = [
    {
      q: "Teslim süresi nedir?",
      a: "Stok ürünlerde 21 gün, özel üretimlerde proje kapsamına göre ortalama 45 iş günü içinde teslim ediyoruz.",
    },
    {
      q: "Özel ölçü yapıyor musunuz?",
      a: "Evet. Mekân ölçülerine uygun, modüler veya tamamen özel üretim çözümler sunuyoruz.",
    },
    {
      q: "Montaj hizmetiniz var mı?",
      a: "Antalya içi profesyonel montaj ekibimizle kurulum yapıyoruz. Diğer iller için opsiyon sunuyoruz.",
    },
    {
      q: "Garanti süresi ne kadar?",
      a: "Ürünlerimiz üretim ve işçilik hatalarına karşı 2 yıl garantilidir.",
    },
    {
      q: "Ödeme seçenekleri nelerdir?",
      a: "Kredi kartı, havale/EFT ve sözleşmeli taksit opsiyonları mevcut.",
    },
  ];

  return (
    <div className={`fixed-navbar ${dmSans.variable} ${fontBody.variable} ${fontHeading.variable}`}>
      <Header/>

      {/* PAGE TITLE */}
      <section className="wpo-page-title">
        <div className="container">
          <div className="row">
            <div className="col col-xs-12">
              <div className="wpo-breadcumb-wrap">
                <ol>
                  <li>Hakkımızda</li>
                </ol>
                <h2 className="fade_bottom">Zamansız Tasarımlar, Dayanıklı Mobilyalar</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCROLL MARKERLARI */}
      <div>
        <span className="scroll-text-animation" data-animation="fade_from_bottom" />
        <span className="scroll-text-animation" data-animation="fade_from_top" />
        <span className="scroll-text-animation" data-animation="fade_from_left" />
        <span className="scroll-text-animation" data-animation="fade_from_right" />
        <div className="new_img-animet" style={{ overflow: "hidden" }} />
      </div>

      <section id="about" className="wpo-about-section section-padding pb-0">
        <div className="about-wrap">
          <div className="content">
            <h2 className="scroll-text-animation" data-animation="fade_from_right" style={{textAlign: "left"}}>
              Mazanne Hakkında
            </h2>
            <p className="fade_bottom">
              Mazanne; estetik ile fonksiyonu buluşturan, kullanıcı odaklı iç mekân tasarımları üretir.
              Yaşam alanlarında akış, ergonomi ve dayanıklılığı önceler; malzeme seçiminden uygulamaya
              kadar şeffaf ve sürdürülebilir bir süreç yürütür. Her projeyi mekânın ruhuna ve
              kullanıcıların alışkanlıklarına göre şekillendirir, uzun yıllar keyifle kullanılacak
              çözümler geliştirir.
            </p>

            <div className="about-btn ">
              <a className="theme-btn" href="/hakkimizda" aria-label="Hakkımızda">
                <span className="rolling-text">
                  <div className="block">
                    <span className="letter">H</span><span className="letter">a</span><span className="letter">k</span><span className="letter">k</span><span className="letter">ı</span><span className="letter">m</span><span className="letter">ı</span><span className="letter">z</span><span className="letter">d</span><span className="letter">a</span>
                  </div>
                  <div className="block">
                    <span className="letter">H</span><span className="letter">a</span><span className="letter">k</span><span className="letter">k</span><span className="letter">ı</span><span className="letter">m</span><span className="letter">ı</span><span className="letter">z</span><span className="letter">d</span><span className="letter">a</span>
                  </div>
                </span>
              </a>

              {/* Video modalı açan buton */}
              <div className="video-wrap">
                <div className="video-holder">
                  <button
                    className="video-btn"
                    aria-label="Tanıtım Videosu"
                     onClick={() => setShowVideo(true)}
                  >
                    <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
                      <circle cx="35" cy="35" r="35" fill="white"></circle>
                      <path
                        d="M48.5 32.9019C50.5 34.0566 50.5 36.9434 48.5 38.0981L31.25 48.0574C29.25 49.2121 26.75 47.7687 26.75 45.4593L26.75 25.5407C26.75 23.2313 29.25 21.7879 31.25 22.9426L48.5 32.9019Z"
                        fill="black"
                      />
                    </svg>
                  </button>
                </div>
                <span>Tanıtım Videosu</span>
              </div>
            </div>

            {/* FUNFACT */}
            {/* <div className="about-funfact fade_bottom">
              <h3>
                <span><span data-count="10">0</span></span>
                <span className="icon">+</span>
              </h3>
              <h4>
                Yıllık <br />
                Deneyim
              </h4>
            </div> */}
          </div>
        </div>

        <div className="image">
          <div className="image-1 poort-in-right">
            <img
              alt="Stüdyo ve atölye detayları"
              srcSet="/drone.jpg 1x"
                src="/drone.jpg"
              width={711}
              height={1037}
              decoding="async"
              loading="lazy"
              style={{ color: "transparent" }}
            />
          </div>
          {/* <div className="image-2 poort-in-right">
            <img
              alt="Malzeme ve doku paleti"
              srcSet="https://bliize-next.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F2.8c675d9e.jpg&w=1920&q=75"
              src="https://bliize-next.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F2.8c675d9e.jpg&w=1920&q=75"
              width={620}
              height={700}
              decoding="async"
              loading="lazy"
              style={{ color: "transparent" }}
            />
          </div> */}
        </div>
      </section>

      

      {/* PROJECTS (Kategoriler) */}
      <section className="wpo-project-section section-padding">
        <div className="container-fluid">
          <div className="title">
            <h2 className="fade_bottom">Kategoriler</h2>
          </div>

          <div className="project-wrap">
            <div className="project-card fade_bottom">
              <a href="/kategoriler/oturma-grubu">
              <img
                alt="Oturma Odası"
                srcSet="/oturma-grubu.png"
                width={740}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <img
                alt="Oturma Odası"
                srcSet="/oturma-grubu.png"
                width={740}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <div className="content">
                <h2><a href="/kategoriler/oturma-grubu">Oturma Odası</a></h2>
                <span>Konfor ve akış için yerleşim, kumaş & renk önerileri.</span>
              </div>
              </a>
            </div>

            <div className="project-card fade_bottom">
              <a href="/kategoriler/yemek-odasi">
              <img
                alt="Yemek Odası"
                srcSet="/yemek3.jpg"
                width={940}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <img
                alt="Yemek Odası"
                srcSet="/yemek3.jpg"
                width={940}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <div className="content">
                <h2><a href="/kategoriler/yemek-odasi">Yemek Odası</a></h2>
                <span>Masa ölçüleri, sandalye ergonomisi ve aydınlatma.</span>
              </div>
              </a>
            </div>

            <div className="project-card fade_bottom">
              <a href="/kategoriler/yatak-odasi">
              <img
                alt="Yatak Odası"
                srcSet="/yatak2.jpg"
              />
              <img
                alt="Yatak Odası"
                srcSet="/yatak2.jpg"
              />
              <div className="content">
                <h2><a href="/kategoriler/yatak-odasi">Yatak Odası</a></h2>
                <span>Başlık & baza, tekstil ve saklama çözümleri.</span>
              </div>
              </a>
            </div>

            <div className="project-card fade_bottom">
              <a href="/kategoriler/genc-cocuk-odasi">
              <img
                alt="Çocuk & Genç Odası"
                srcSet="/genc3.jpg"
                width={740}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <img
                alt="Çocuk & Genç Odası"
                srcSet="/genc3.jpg"
                width={740}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <div className="content">
                <h2><a href="/kategoriler/genc-cocuk-odasi">Çocuk &amp; Genç Odası</a></h2>
                <span>Renkli, güvenli ve ergonomik seçenekler.</span>
              </div>
              </a>
            </div>
            
          </div>

          <div className="project-allBtn fade_bottom">
            <a className="theme-btn" href="/kategoriler">
              <span>Tüm Kategoriler</span>
              <img
                alt=""
                src="https://bliize-next.vercel.app/_next/static/media/right-arrow-2.2d0462f9.svg"
                width={40}
                height={40}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
            </a>
          </div>
        </div>
      </section>

      {/* ==== MİSYON & VİZYON ==== */}
      <section className="wpo-mission-section section-padding">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <div className="mission-copy">
                <h2
                  className="scroll-text-animation"
                  data-animation="fade_from_left"
                >
                  Misyon &amp; Vizyon
                </h2>
                <p className="fade_bottom">
                  Amacımız; estetik ve fonksiyonu bir arada sunan, zamana dayanıklı ve sürdürülebilir iç mimari çözümler üretmek. Vizyonumuz; yaşam alanlarını sadece daha güzel değil, daha anlamlı ve kullanışlı kılmak.
                </p>

                <ul className="feature-list">
                  <li className="fade_bottom">Kullanıcı odaklı tasarım</li>
                  <li className="fade_bottom">Sürdürülebilir malzeme seçimi</li>
                  <li className="fade_bottom">Şeffaf süreç ve iletişim</li>
                  <li className="fade_bottom">Kaliteden ödün vermeyen uygulama</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-6">
              <div
                className="mission-media scroll-text-animation"
                data-animation="fade_from_right"
              >
                <img
                  alt="Malzeme ve ışık çalışması"
                  src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop"
                  width={960}
                  height={640}
                  decoding="async"
                  loading="lazy"
                  style={{ width: "100%", height: "auto", borderRadius: 16 }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==== SÜRECİMİZ ==== */}
      <section className="wpo-process-section section-padding">
        <div className="container">
          <div className="title">
            <h2 className="fade_bottom">Sürecimiz</h2>
          </div>

          <div className="process-wrap">
            <div className="step-card fade_bottom">
              <div className="step-badge">1</div>
              <h3>İlk Adım</h3>
              <p>İhtiyaç ve beklentileri birlikte analiz ediyor, mekânı ve alışkanlıkları tanıyoruz.</p>
            </div>

            <div className="step-card fade_bottom">
              <div className="step-badge">2</div>
              <h3>Tasarım</h3>
              <p>Renk, doku ve malzeme seçimleriyle birlikte plan yerleşimi ve konsept oluşturuyoruz.</p>
            </div>

            <div className="step-card fade_bottom">
              <div className="step-badge">3</div>
              <h3>Uygulama</h3>
              <p>Onaylanan projeyi, uzman ekiplerle ve şeffaf takvimle hayata geçiriyoruz.</p>
            </div>

            <div className="step-card fade_bottom">
              <div className="step-badge">4</div>
              <h3>Teslim &amp; Destek</h3>
              <p>Son kontrolleri yapıp teslim ediyor, kullanım sürecinde de yanınızda oluyoruz.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==== SSS — SAĞDA, SOLDA GÖRSEL (kategori sayfaları gibi) ==== */}
      <section className="container faq-split section-padding">
        <div className="split-grid invert">
          {/* Sol: Görsel */}
          <div className="split-media">
            <img
              alt="Müşteri görüşmesi ve örnek çalışmalar"
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1600&auto=format&fit=crop"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Sağ: SSS */}
          <div className="split-text">
            <h2 className="fade_bottom">Sıkça Sorulan Sorular</h2>

            <div className="faq">
              {faq.map((item, i) => (
                <details className="faq-item" key={i}>
                  <summary>
                    {item.q}
                    <ChevronDown className="chev" size={18} />
                  </summary>
                  <div className="faq-body">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
{showVideo && (
  <div
    className="video-modal-backdrop"
    onClick={() => setShowVideo(false)}
  >
    <div
      className="video-modal"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Kapatma butonu */}
      <button
        className="video-close-btn"
        onClick={() => setShowVideo(false)}
        aria-label="Kapat"
      >
        ×
      </button>

      <video
        src="/mazanne.mp4"
        autoPlay
        playsInline
        controlsList="nodownload noplaybackrate nofullscreen"
        disablePictureInPicture
      />
    </div>
  </div>
)}
      <Footer/>

      {/* === TEK (merged) GLOBAL STYLE + SPLIT/FAQ === */}
      <style jsx global>{`
  /* === Base font (DM Sans) === */
  .fixed-navbar,
  .fixed-navbar * {
    font-family: var(--font-dm), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* === Topbar social hit area === */
  .topbar .social-media a {
    display:inline-flex; align-items:center; justify-content:center;
    width:32px; height:32px; border-radius:8px;
    transition:transform .2s ease, background .2s ease;
  }
  .topbar .social-media a:hover { transform:translateY(-2px); background:rgba(255,255,255,.1); }

  /* === Header search icons alignment === */
  .header-right .search-toggle-btn svg,
  .header-right .header-search-form button svg { display:block; }

  /* === Section spacing === */
  .section-padding { padding:56px 0; }
  @media (min-width: 992px){ .section-padding { padding:68px 0; } }
  .title { margin-bottom:18px; }

  /* === Mission & Vision typography === */
  .wpo-mission-section .mission-copy h2{
    font-size:clamp(36px, 3.3vw, 58px);
    margin-bottom:16px; line-height:1.08; letter-spacing:.2px; font-weight:800;
  }
  .wpo-mission-section .mission-copy p,
  .wpo-mission-section .feature-list li{
    font-size:clamp(16px, 1.25vw, 20px); line-height:1.65;
  }
  .wpo-mission-section .mission-copy p{ margin-bottom:16px; opacity:.92; }
  .wpo-mission-section .feature-list{
    display:grid; gap:8px; padding-left:18px; margin:0; list-style:none;
  }
  .wpo-mission-section .feature-list li{ position:relative; padding-left:26px; }
  .wpo-mission-section .feature-list li:before{
    content:"•"; position:absolute; left:0; top:0; line-height:1; font-size:22px;
  }

  /* === Process cards === */
  .wpo-process-section .process-wrap{
    display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); gap:16px;
  }
  @media (max-width: 991px){ .wpo-process-section .process-wrap{ grid-template-columns:repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 575px){ .wpo-process-section .process-wrap{ grid-template-columns:1fr; } }
  .wpo-process-section .step-card{
    background:#fff; border-radius:16px; padding:20px 16px; box-shadow:0 10px 28px rgba(0,0,0,.05);
  }
  .wpo-process-section .step-card .step-badge{
    width:36px; height:36px; border-radius:10px; display:inline-flex; align-items:center; justify-content:center;
    font-weight:700; background:#111; color:#fff; margin-bottom:8px;
  }
  .wpo-process-section .step-card h3{ margin:4px 0 6px; font-size:18px; }
  .wpo-process-section .step-card p{ opacity:.88; margin:0; }



  /* === Project cards minor mobile overflow fix === */
  @media (max-width: 767.98px){
    .wpo-project-section{ overflow-x:hidden; }
    .wpo-project-section .project-card{ overflow:hidden; }
    .wpo-project-section .project-card img{ display:block; width:100%; height:auto; }
  }

  /* === Prevent accidental horizontal scroll on mobile === */
  html, body{
    max-width:100%; overflow-x:hidden; overscroll-behavior-x:none;
    -webkit-tap-highlight-color: transparent;
  }
  @supports (overflow-x: clip){ html, body{ overflow-x:clip; } }

  /* ====== SPLIT + FAQ (kategori detaylarındaki düzen) ====== */
  .faq-split .split-grid{
    display:grid; grid-template-columns: 0.9fr 1.1fr;
    gap: clamp(18px, 3vw, 32px); align-items:center; max-width:1200px; margin:0 auto;
  }
  .faq-split .split-grid.invert{ grid-template-columns: 1.1fr 0.9fr; }
  @media (max-width: 991px){
    .faq-split .split-grid, .faq-split .split-grid.invert{ grid-template-columns:1fr; }
  }
  .faq-split .split-text h2{ font-size: clamp(24px, 2.8vw, 36px); margin:0 0 12px; }
  .faq-split .split-media img{
    width:100%; height: clamp(260px, 38vw, 500px);
    object-fit: cover; border-radius: 16px; box-shadow: 0 10px 28px rgba(0,0,0,.12); display:block;
  }

  /* --- FAQ styles (details/summary) --- */
  .faq .faq-item{
    border:1px solid #eee; border-radius:14px; padding:0; background:#fff; margin-bottom:10px; overflow:hidden;
    transition: box-shadow .25s ease, transform .25s ease, border-color .25s ease, background .25s ease;
  }
  .faq .faq-item summary{
    list-style:none; cursor:pointer; padding:14px 16px;
    display:flex; align-items:center; justify-content:space-between; gap:12px; font-weight:700;
  }
  .faq .faq-item summary::-webkit-details-marker { display:none; }
  .faq .faq-item .chev{ transition: transform .25s ease; flex-shrink:0; }
  .faq .faq-item[open]{ border-color:#e8e8e8; transform: translateY(-2px); box-shadow:0 12px 28px rgba(0,0,0,.08); }
  .faq .faq-item[open] .chev{ transform: rotate(180deg); }
  .faq .faq-body{ padding:0 16px 16px; color:#2b2b2b; line-height:1.6; }

  /* === Footer === */
  .wpo-site-footer,
  .wpo-site-footer *{ -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; }
  .wpo-site-footer{ background:#0b0b0b; color:#fff; }
  .wpo-upper-footer{ padding:48px 0 20px; }
  .wpo-lower-footer{ border-top:1px solid rgba(255,255,255,.08); padding:14px 0; }
  .wpo-lower-footer .right{
    display:flex; gap:18px; justify-content:flex-end; flex-wrap:wrap; margin:0; padding:0;
  }
  .wpo-lower-footer .right li{ list-style:none; }
  .wpo-site-footer .widget-title h3,
  .wpo-site-footer .right a{
    font-family:var(--font-heading), system-ui, Segoe UI, Roboto, Arial, sans-serif !important;
    font-weight:700; letter-spacing:.2px;
  }
  .wpo-site-footer p,
  .wpo-site-footer li,
  .wpo-lower-footer .copyright,
  .wpo-site-footer .newsletter-widget input,
  .wpo-site-footer .newsletter-widget button{
    font-family:var(--font-body), system-ui, Segoe UI, Roboto, Arial, sans-serif !important; font-weight:400;
  }
  .wpo-site-footer .social-widget .soc{
    width:36px; height:36px; border-radius:10px; display:inline-flex; align-items:center; justify-content:center;
    color:#fff; border:1px solid rgba(255,255,255,.15); margin-right:10px; transition:all .2s ease;
  }
  .wpo-site-footer .social-widget .soc:hover{
    transform:translateY(-2px); background:rgba(255,255,255,.08); border-color:rgba(255,255,255,.28);
  }
    .video-modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.75);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
      }
      .video-modal {
        position: relative;
        width: 100%;
        max-width: 500px;
        aspect-ratio: 9/16;
        background: black;
        border-radius: 12px;
        overflow: hidden;
      }
      .video-modal video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 12px;
        transform: rotate(270deg) scale(0.56);
        transform-origin: center center;
      }
      .video-close-btn {
        position: absolute;
        top: 12px;
        right: 12px;
        background: rgba(0, 0, 0, 0.6);
        border: none;
        color: white;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
        border-radius: 6px;
        width: 40px;
        height: 40px;
        line-height: 1;
        z-index: 30000; /* video’nun da üstünde */
      }
      .video-close-btn:hover {
        background: rgba(0, 0, 0, 0.85);
      }

      /* Timeline ve süreyi gizle */
      video::-webkit-media-controls-timeline,
      video::-webkit-media-controls-current-time-display,
      video::-webkit-media-controls-time-remaining-display {
        display: none !important;
      }
      `}</style>
    </div>
  );
}

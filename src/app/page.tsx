"use client";

import React, { useRef, useEffect, useState } from "react";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";
import Footer from "./components/Footer";
import { ReviewsCarousel ,InstagramGrid} from "./components/ReviewsCareousel";
import InstagramGallery from "./components/InstagramGallery";


const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const fontHeading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["600", "700", "800"],
});

export default function Page() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const wrapRef = useRef<HTMLElement | null>(null);
  const dragStartX = useRef<number | null>(null);
const [showVideo, setShowVideo] = useState(false);

  // --- MOBILE HEADER STATE (drawer) ---
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);
  const [mobileComplementOpen, setMobileComplementOpen] = useState(false); // Tamamlayıcı alt menü

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setMobileCatsOpen(false);
        setMobileComplementOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ====== "Ne Dediler?" Carousel state ======
  const reviewTrackRef = useRef<HTMLDivElement | null>(null);
  const [centerIdx, setCenterIdx] = useState(0);
  const [rcDragging, setRcDragging] = useState(false);
  const rcStartX = useRef(0);
  const rcScrollStart = useRef(0);

  function renderStars(rating = 5) {
    const r = Math.round(rating);
    return Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" style={{ marginRight: 2 }}>
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          fill={i < r ? "#F5B301" : "none"}
          stroke="#F5B301"
        />
      </svg>
    ));
  }

  const rcPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setRcDragging(true);
    rcStartX.current = e.clientX;
    rcScrollStart.current = reviewTrackRef.current?.scrollLeft || 0;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };
  const rcPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!rcDragging || !reviewTrackRef.current) return;
    const dx = e.clientX - rcStartX.current;
    reviewTrackRef.current.scrollLeft = rcScrollStart.current - dx;
  };
  const rcPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setRcDragging(false);
    try {
      (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    } catch {}
    snapToCenter();
  };

  const getClosestCenterIndex = () => {
    const el = reviewTrackRef.current;
    if (!el) return 0;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(".rc-card"));
    if (!cards.length) return 0;

    const viewportCenter = el.getBoundingClientRect().width / 2;
    const elLeft = el.getBoundingClientRect().left;

    let bestIdx = 0;
    let bestDist = Number.POSITIVE_INFINITY;

    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left - elLeft + rect.width / 2;
      const dist = Math.abs(cardCenter - viewportCenter);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    });
    return bestIdx;
  };

  const scrollToCard = (idx: number) => {
    const el = reviewTrackRef.current;
    if (!el) return;
    const card = el.querySelectorAll<HTMLElement>(".rc-card")[idx];
    if (!card) return;

    const elBox = el.getBoundingClientRect();
    const cBox = card.getBoundingClientRect();
    const offset = (cBox.left - elBox.left) + cBox.width / 2 - el.clientWidth / 2;
    el.scrollBy({ left: offset, behavior: "smooth" });
    setCenterIdx(idx);
  };

  const snapToCenter = () => {
    const idx = getClosestCenterIndex();
    scrollToCard(idx);
  };

  const scrollReviews = (dir: -1 | 1) => {
    const idx = getClosestCenterIndex();
    const next = Math.max(0, Math.min(idx + dir, (reviews?.length || 1) - 1));
    scrollToCard(next);
  };

  useEffect(() => {
    const t = setTimeout(() => snapToCenter(), 50);
    return () => clearTimeout(t);
  }, []);

  // tipler
  type Review = {
    author: string;
    profile_photo_url?: string;
    rating: number;
    text: string;
    time?: string;
  };

  type IgPost = {
    id: string;
    image: string;
    permalink: string;
    caption: string;
    timestamp?: string;
  };

  // state
  const [reviews, setReviews] = useState<Review[]>([]);
  const [igPosts, setIgPosts] = useState<IgPost[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadingIg, setLoadingIg] = useState(true);
  const [errReviews, setErrReviews] = useState<string | null>(null);
  const [errIg, setErrIg] = useState<string | null>(null);

  // Google Reviews fetch
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingReviews(true);
        const res = await fetch("/api/reviews?limit=6", { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "REVIEWS_ERROR");
        if (alive) setReviews(Array.isArray(data.reviews) ? data.reviews : []);
      } catch (e: any) {
        if (alive) setErrReviews(e?.message || "REVIEWS_ERROR");
      } finally {
        if (alive) setLoadingReviews(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  // Instagram fetch (+ fallback)
  const IG_FALLBACK: IgPost[] = [
    { id: "f1", image: "/instagram3.jpg", permalink: "#", caption: "Mazanne – özel tasarım" },
    { id: "f2", image: "/instagram2.jpg", permalink: "#", caption: "Zamansız detaylar" },
    { id: "f3", image: "/instagram7.png", permalink: "#", caption: "Dayanıklılık ve konfor" },
    { id: "f4", image: "/instagram5.jpg", permalink: "#", caption: "Sıcak dokular" },
    { id: "f5", image: "/instagram6.jpg", permalink: "#", caption: "Oturma odası önerileri" },
    { id: "f6", image: "/instagram1.jpg", permalink: "#", caption: "Yemek alanı ilhamı" },
  ];

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingIg(true);
        const res = await fetch("/api/instagram?limit=6", { next: { revalidate: 60 } as any });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "INSTAGRAM_ERROR");
        if (alive) setIgPosts(Array.isArray(data.posts) ? data.posts : []);
      } catch (e: any) {
        if (alive) setErrIg(e?.message || "INSTAGRAM_ERROR");
      } finally {
        if (alive) setLoadingIg(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  // SLIDER
  const slides = [
    {
      bg: "/banner3.jpg",
      title: (
        <>
          Her Çizgide Tasarım,{" "}
          {/* <span>
            <img
              alt=""
              src="https://bliize-next.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-text.6ee42267.jpg&w=640&q=75"
              width="319"
              height="120"
              decoding="async"
              loading="lazy"
              style={{ color: "transparent", marginBottom: "25px" }}
            />
          </span>{" "} */}
          Her Parçada Dayanıklılık
        </>
      ),
    },
    {
      bg: "/banner2.jpg",
      title: (
        <>
          Evinize Özel Tasarım,{" "}
          {/* <span>
            <img
              alt=""
              src="https://bliize-next.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero-text.6ee42267.jpg&w=640&q=75"
              width="319"
              height="120"
              decoding="async"
              loading="lazy"
              style={{ color: "transparent", marginBottom: "25px" }}
            />
          </span>{" "} */}
          Yıllara Meydan Okuyan Konfor
        </>
      ),
    },
  ];

  // preload
  useEffect(() => {
    slides.forEach((s) => { const i = new Image(); i.src = s.bg; });
  }, []);

  const getW = () => (wrapRef.current as HTMLElement | null)?.clientWidth ?? window.innerWidth;

  useEffect(() => {
    if (isDragging) return;
    const t = setInterval(() => { goNext(); }, 5000);
    return () => clearInterval(t);
  }, [isDragging, activeIndex]);

  const goNext = () => { setLeavingIndex(activeIndex); setActiveIndex((p) => (p + 1) % slides.length); };
  const goPrev = () => { setLeavingIndex(activeIndex); setActiveIndex((p) => (p - 1 + slides.length) % slides.length); };

  // drag
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
  };
  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (dragStartX.current === null) return;
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setDragX(clientX - dragStartX.current);
  };
  const handleTouchEnd = () => {
    if (dragStartX.current === null) { setIsDragging(false); setDragX(0); return; }
    if (dragX < -80) goNext();
    else if (dragX > 80) goPrev();
    setIsDragging(false); setDragX(0); dragStartX.current = null;
  };

  // arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "ArrowLeft") goPrev(); if (e.key === "ArrowRight") goNext(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex]);

  // ===== SCROLL ANIMASYONLARI =====
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".scroll-text-animation"));
    els.forEach((el) => {
      if (el.dataset._prepared) return;
      const type = el.dataset.animation;
      el.style.opacity = "0";
      el.style.willChange = "transform, opacity";
      switch (type) {
        case "fade_from_bottom": el.style.transform = "translate(0, 180px)"; break;
        case "fade_from_top": el.style.transform = "translate(0, -180px)"; break;
        case "fade_from_left": el.style.transform = "translate(-180px, 0)"; break;
        case "fade_from_right": el.style.transform = "translate(180px, 0)"; break;
        default: el.style.transform = "translate(0, 40px)";
      }
      el.dataset._prepared = "1";
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((ent) => {
        const el = ent.target as HTMLElement;
        if (ent.isIntersecting) {
          el.style.transition = "transform .8s cubic-bezier(.22,.61,.36,1), opacity .8s cubic-bezier(.22,.61,.36,1)";
          el.style.transform = "translate(0, 0)";
          el.style.opacity = "1";
          io.unobserve(el);
        }
      });
    }, { threshold: 0.18 });

    els.forEach((el) => io.observe(el));

    const fades = Array.from(document.querySelectorAll<HTMLElement>(".fade_bottom"));
    fades.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translate(0, 40px)";
      el.style.willChange = "transform, opacity";
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  // ===== FUNFACT SAYAC =====
  useEffect(() => {
    const box = document.querySelector(".about-funfact");
    if (!box) return;
    const innerNumber = box.querySelector<HTMLElement>("h3 span span");
    if (!innerNumber) return;

    const rawTarget = innerNumber.getAttribute("data-count") ?? innerNumber.textContent ?? "0";
    const target = Math.max(0, parseInt(rawTarget, 10) || 0);

    const io = new IntersectionObserver((entries) => {
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
    }, { threshold: 0.4 });

    io.observe(box);
    return () => io.disconnect();
  }, []);

  return (
    <div>
      {/* HEADER */}
      <div className="fixed-navbar active">
        <header id="header">
          <div className="wpo-site-header wpo-header-style">
            <nav className="navigation navbar navbar-expand-lg navbar-light">
              <div className="container-fluid">
                <div className="row align-items-center g-0">
                  {/* Mobile Menu */}
                  <div className="col-lg-3 col-md-3 col-3 d-lg-none dl-block">
                    <div className="mobail-menu">
                      <div>
                        {/* Drawer */}
                        <div className={`mobileMenu ${mobileOpen ? "open" : ""}`}>
                          <div className="menu-head">
                            <img src="/mazanneyazi3.png" alt="Mazanne" height={26} />
                            {/* <button
                              className="menu-close"
                              onClick={() => {
                                setMobileOpen(false);
                                setMobileCatsOpen(false);
                                setMobileComplementOpen(false);
                              }}
                              aria-label="Kapat"
                            >
                              ×
                            </button> */}
                          </div>
                          <nav className="mobile-nav">
                            <ul>
                              <li><a href="/">Anasayfa</a></li>
                              <li><a href="/hakkimizda">Hakkımızda</a></li>

                              {/* Kategoriler + Tamamlayıcı alt menü */}
                              <li className={`has-children ${mobileCatsOpen ? "open" : ""}`}>
                                <button
                                  type="button"
                                  className="expand"
                                  aria-expanded={mobileCatsOpen}
                                  onClick={() => setMobileCatsOpen((v) => !v)}
                                >
                                  Kategoriler
                                </button>

                                <ul className="sub-menu" style={{ maxHeight: mobileCatsOpen ? 600 : 0 }}>
                                  <li><a href="/kategoriler/oturma-grubu">Oturma Grubu</a></li>
                                  <li><a href="/kategoriler/yemek-odasi">Yemek Odası</a></li>
                                  <li><a href="/kategoriler/yatak-odasi">Yatak Odası</a></li>
                                  <li><a href="/kategoriler/genc-cocuk-odasi">Çocuk & Genç Odası</a></li>
                                  <li><a href="/kategoriler/tv-unitesi">Tv Ünitesi</a></li>
                                  <li><a href="/kategoriler/bahce-mobilyalari">Bahçe Mobilyaları</a></li>

                                  {/* Tamamlayıcı Mobilyalar (nested) */}
                                  <li className={`has-children ${mobileComplementOpen ? "open" : ""}`}>
                                    <button
                                      type="button"
                                      className="expand"
                                      aria-expanded={mobileComplementOpen}
                                      onClick={() => setMobileComplementOpen((v) => !v)}
                                    >
                                      Tamamlayıcı Mobilyalar
                                    </button>
                                    <ul className="sub-menu" style={{ maxHeight: mobileComplementOpen ? 200 : 0 }}>
                                      <li><a href="/kategoriler/tamamlayici-mobilyalar/sehpa">Sehpa</a></li>
                                      <li><a href="/kategoriler/tamamlayici-mobilyalar/masa">Mutfak Masası</a></li>
                                    </ul>
                                  </li>
                                </ul>
                              </li>

                              <li><a href="/iletisim">İletişim</a></li>
                            </ul>
                          </nav>
                        </div>

                        {/* Backdrop */}
                        {mobileOpen && (
                          <div
                            className="mobileMenu-backdrop"
                            onClick={() => {
                              setMobileOpen(false);
                              setMobileCatsOpen(false);
                              setMobileComplementOpen(false);
                            }}
                          />
                        )}

                        <div className="showmenu mobail-menu">
                          <button type="button" className="navbar-toggler open-btn" onClick={() => setMobileOpen(true)}>
                            <span className="icon-bar first-angle"></span>
                            <span className="icon-bar middle-angle"></span>
                            <span className="icon-bar last-angle"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Logo */}
                  <div className="col-lg-5 col-md-6 col-6">
                    <div className="navbar-header">
                      <a className="navbar-brand" href="/">
                        <img alt="Mazanne" src="/mazanneyazi2.png" decoding="async" loading="lazy" />
                      </a>
                    </div>
                  </div>

                  {/* Desktop Menu */}
                  <div className="col-lg-5 col-md-1 col-1">
                    <div id="navbar" className="collapse navbar-collapse navigation-holder">
                      <button className="menu-close"><i className="ti-close"></i></button>

                      <ul className="nav navbar-nav mb-2 mb-lg-0">
                        <li><a href="/">Anasayfa</a></li>
                        <li className="menu-item-has-children"><a href="/hakkimizda">Hakkımızda</a></li>

                        {/* Kategoriler (2. seviye alt menü ile) */}
                        <li className="menu-item-has-children">
                          <a href="/kategoriler">Kategoriler</a>
                          <ul className="sub-menu">
                            <li><a href="/kategoriler/oturma-grubu">Oturma Grubu</a></li>
                            <li><a href="/kategoriler/yemek-odasi">Yemek Odası</a></li>
                            <li><a href="/kategoriler/yatak-odasi">Yatak Odası</a></li>
                            <li><a href="/kategoriler/genc-cocuk-odasi">Çocuk & Genç Odası</a></li>
                            <li><a href="/kategoriler/tv-unitesi">Tv Ünitesi</a></li>
                            <li><a href="/kategoriler/bahce-mobilyalari">Bahçe Mobilyaları</a></li>

                            {/* Tamamlayıcı Mobilyalar başlıksız link (sadece alt açılır) */}
                            <li className="menu-item-has-children">
                              <a
                                href="#"
                                className="nolink"
                                onClick={(e) => e.preventDefault()}
                                aria-haspopup="true"
                                aria-expanded={false}
                              >
                                Tamamlayıcı Mobilyalar
                              </a>
                              <ul className="sub-menu">
                                <li><a href="/kategoriler/tamamlayici-mobilyalar/sehpa">Sehpa</a></li>
                                <li><a href="/kategoriler/tamamlayici-mobilyalar/masa">Mutfak Masası</a></li>
                              </ul>
                            </li>
                          </ul>
                        </li>

                      
                      </ul>
                    </div>
                  </div>

                  {/* Search + CTA */}
                  <div className="col-lg-2 col-md-2 col-2">
                    <div className="header-right">
                      <div className="header-search-form-wrapper">
                        {/* <div className="cart-search-contact">
                          <button className="search-toggle-btn" aria-label="Ara">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                              <line x1="16.65" y1="16.65" x2="22" y2="22" stroke="currentColor" strokeWidth="2" />
                            </svg>
                          </button>
                           <div className="header-search-form ">
                            <form>
                              <div>
                                <input type="text" className="form-control" placeholder="Burada ara..." />
                                <button type="submit" aria-label="Ara">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                                    <line x1="16.65" y1="16.65" x2="22" y2="22" stroke="currentColor" strokeWidth="2" />
                                  </svg>
                                </button>
                              </div>
                            </form>
                          </div> 
                        </div> */}
                      </div>

                      <div className="close-form">
                        <a className="theme-btn" style={{ width: 170, display: "inline-block", fontFamily: "Poppins, sans-serif" }} href="/iletisim">
                          İletişime Geç
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* --- Poppins font override + NAV & Drawer CSS + Sub-submenu caret + SLIDER Mobile Fix --- */}
          <style jsx global>{`
            .navigation .navigation-holder .nav.navbar-nav > li > a,
            .navigation .navigation-holder .nav.navbar-nav .sub-menu a,
            .mobail-menu .mobile-nav .expand,
            .mobail-menu .mobile-nav a {
              font-family: "Poppins", sans-serif !important;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }

            /* Desktop submenu positioning + caret fixes for 2nd level */
            #navbar .sub-menu > li > a,
            #navbar .sub-menu > li > a:visited { color:#111 !important; }
            #navbar .sub-menu .menu-item-has-children > a::before,
            #navbar .sub-menu .menu-item-has-children > a::after { content: none !important; }
            #navbar .menu-item-has-children { position: relative; }
            #navbar .menu-item-has-children > .sub-menu { z-index: 20; }
            #navbar .menu-item-has-children > .sub-menu > .menu-item-has-children > a{
              position: relative; padding-right: 22px; display:block;
            }
            #navbar .menu-item-has-children > .sub-menu > .menu-item-has-children > a::after{
              content:"";
              position:absolute; right:8px; top:50%;
              width:8px; height:8px;
              border-right:2px solid currentColor; border-bottom:2px solid currentColor;
              transform: translateY(-50%) rotate(-45deg);
              opacity:.85; pointer-events:none;
              transition: transform .2s ease, opacity .2s ease;
            }
            #navbar .menu-item-has-children .menu-item-has-children { position: relative; }
            #navbar .menu-item-has-children .menu-item-has-children > .sub-menu{
              position:absolute; top:0; left:100%;
              min-width:220px; visibility:hidden; opacity:0; transform:translateY(6px);
              transition: opacity .2s ease, transform .2s ease, visibility .2s;
            }
            #navbar .menu-item-has-children .menu-item-has-children:hover > .sub-menu{
              visibility:visible; opacity:1; transform:translateY(0);
            }
            #navbar .sub-menu .nolink{ cursor: default; }

            /* Mobile drawer */
            .mobail-menu .mobileMenu {
              position: fixed; inset: 0 auto 0 0; width: 82vw; max-width: 420px; height: 100vh; background: #fff;
              z-index: 10001; transform: translateX(-100%); transition: transform 0.3s ease; overflow-y: auto;
              box-shadow: 0 10px 40px rgba(0,0,0,.18);
            }
            .mobail-menu .mobileMenu.open { transform: translateX(0); }
            .mobileMenu .menu-head {
              position: sticky; top: 0; z-index: 1; display: flex; align-items: center; justify-content: space-between; gap: 12px;
              padding: 12px 16px; background: #fff; border-bottom: 1px solid #eee;
            }
            .mobileMenu .menu-close { width: 36px; height: 36px; border: 0; border-radius: 10px; background: #f4f4f4; font-size: 22px; line-height: 1; }
            .mobileMenu-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.35); z-index: 10000; }

            .mobail-menu .mobile-nav ul { list-style: none; margin: 0; padding: 8px 0 16px; }
            .mobail-menu .mobile-nav li > a,
            .mobail-menu .mobile-nav .has-children > .expand {
              display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%;
              padding: 14px 16px; font-size: 16px; font-weight: 600; color: #111 !important; text-decoration: none !important;
              background: transparent; border: 0; border-bottom: 1px solid #f2f2f2;
            }
            .mobail-menu .mobile-nav .has-children > .expand::after{
              content:""; width:10px; height:10px; border-right:2px solid currentColor; border-bottom:2px solid currentColor;
              transform:rotate(-45deg); transition:transform .2s ease; margin-left:auto;
            }
            .mobail-menu .mobile-nav .has-children.open > .expand::after{ transform:rotate(45deg); }
            .mobail-menu .mobile-nav .sub-menu{
              background:#fafafa; margin:0; padding:0 0 0 8px; overflow:hidden; max-height:0; transition:max-height .28s ease, padding .28s ease;
            }
            .mobail-menu .mobile-nav .has-children.open > .sub-menu{ padding:8px 0 8px 8px; max-height:600px; }

            /* Slider mobile polish */
            @media (max-width: 575.98px) {
              .wpo-hero-slider { padding: 0; background: #000; }
              .wpo-hero-slider .swiper { overflow: hidden; }
              .wpo-hero-slider .swiper-wrapper { align-items: stretch; }
              .wpo-hero-slider .swiper-slide { display: flex; position: relative; }
              .wpo-hero-slider .slide-inner.slide-bg-image { background-size: cover; background-position: center; background-repeat: no-repeat; position: absolute; inset: 0; }
              .wpo-hero-slider .slide-inner.slide-bg-image::before {
                content:""; position:absolute; inset:0; background: linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.38));
                pointer-events:none;
              }
              .wpo-hero-slider .container { width: 100%; padding: 0 16px; height: 100%; position: relative; z-index: 2; }
              .wpo-hero-slider .slide-content { display: flex; align-items: flex-end; min-height: 100%; padding-bottom: 72px; }
              .wpo-hero-slider .slide-sub-title h2 { margin: 0; font-size: clamp(20px, 7.5vw, 34px); line-height: 1.18; color: #fff; word-break: break-word; text-wrap: balance; }
              .wpo-hero-slider .slide-sub-title h2 img { height: 18vw; max-height: 72px; width: auto; vertical-align: middle; }
              .wpo-hero-slider .swiper-pagination.swiper-pagination-fraction {
                position: absolute; left: 16px; right: auto; bottom: 16px; transform: none; padding: 4px 8px; border-radius: 999px;
                background: rgba(0,0,0,0.45); backdrop-filter: blur(4px); color: #fff; font-weight: 600; letter-spacing: 0.2px;
              }
              .wpo-hero-slider .hero-team { left: 16px; bottom: 72px; transform: scale(0.9); }
              .wpo-hero-slider .scroll-btn { right: 16px; left: auto; bottom: 12px; }
            }

            /* Prevent accidental horizontal scroll */
            html, body { max-width:100%; overflow-x:hidden; overscroll-behavior-x:none; -webkit-tap-highlight-color: transparent; }
            @supports (overflow-x: clip){ html, body{ overflow-x:clip; } }
          `}</style>
        </header>
      </div>

      {/* SLIDER */}
      <section
        ref={wrapRef}
        className="wpo-hero-slider"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={isDragging ? handleTouchMove : undefined}
        onMouseUp={handleTouchEnd}
        onMouseLeave={isDragging ? handleTouchEnd : undefined}
        style={{ position: "relative", overflow: "hidden", background: "#000" }}
      >
        <div className="swiper swiper-container swiper-initialized swiper-horizontal swiper-backface-hidden" style={{ position: "relative", height: "100%", width: "100%" }}>
          <div className="swiper-wrapper" aria-live="polite" style={{ position: "relative", width: "100%", height: "100%" }}>
            {slides.map((slide, idx) => {
              const isActive = idx === activeIndex;
              const isLeaving = idx === leavingIndex;
              const isNeighborWhileDrag =
                isDragging &&
                ((dragX < 0 && idx === (activeIndex + 1) % slides.length) ||
                 (dragX > 0 && idx === (activeIndex - 1 + slides.length) % slides.length));

              const base: React.CSSProperties = {
                position: "absolute", inset: 0, width: "100%", height: "100%",
                display: "flex", alignItems: "center", justifyContent: "center",
                willChange: "transform, opacity", pointerEvents: "none", zIndex: 1,
                opacity: 0, transform: "translateX(0)",
                transition: "opacity .6s cubic-bezier(.8,0,.17,1), transform .6s cubic-bezier(.8,0,.17,1)",
              };

              let style: React.CSSProperties = { ...base };
              let onTransitionEnd: React.TransitionEventHandler<HTMLDivElement> | undefined;

              if (isActive) {
                style.opacity = 1; style.zIndex = 3; style.pointerEvents = "auto";
                style.transform = isDragging ? `translateX(${dragX}px)` : "translateX(0)";
                if (isDragging) style.transition = "none";
              } else if (isLeaving) {
                style.opacity = 1; style.zIndex = 2;
                const dir = activeIndex === ((leavingIndex! + 1) % slides.length) ? -1 : 1;
                style.transform = `translateX(${dir * -getW()}px)`;
                onTransitionEnd = () => { setLeavingIndex((prev) => (prev === idx ? null : prev)); };
              } else if (isNeighborWhileDrag) {
                style.opacity = 1; style.zIndex = 2; style.transition = "none";
                const w = getW(); style.transform = dragX < 0 ? `translateX(${w + dragX}px)` : `translateX(${-w + dragX}px)`;
              }

              return (
                <div key={idx} className={"swiper-slide" + (isActive ? " swiper-slide-active" : "")} style={style} onTransitionEnd={onTransitionEnd} role="group" aria-label={`${idx + 1} / ${slides.length}`}>
                  <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${slide.bg})`, backgroundSize: "cover", backgroundPosition: "center", position: "absolute", inset: 0 }}>
                    <div className="container">
                      <div className="slide-content">
                        <div className="slide-sub-title"><h2>{slide.title}</h2></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="swiper-pagination swiper-pagination-fraction swiper-pagination-horizontal">
            <span className="swiper-pagination-current">{activeIndex + 1}</span> / <span className="swiper-pagination-total">{slides.length}</span>
          </div>
          <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
        </div>

        {/* Team avatars & scroll button */}
        {/* <div className="hero-team">
          <ul>
            <li><img alt="hero-team" src="https://bliize-next.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F1.3a84b508.jpg&w=640&q=75" width="78" height="78" decoding="async" loading="lazy" /></li>
            <li><img alt="hero-team" src="https://bliize-next.vercel.app/images/slider/slide-2.jpg" width="78" height="83" decoding="async" loading="lazy" /></li>
            <li><img alt="hero-team" src="https://bliize-next.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F2.69b9ca3e.jpg&w=256&q=75" width="78" height="78" decoding="async" loading="lazy" /></li>
            <li><img alt="hero-team" src="https://bliize-next.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F4.5aac26dc.jpg&w=256&q=75" width="78" height="78" decoding="async" loading="lazy" /></li>
            <li>
              <a href="/hakkimizda">
                <svg width="32" height="8" viewBox="0 0 32 8" fill="none">
                  <rect width="8" height="8" rx="4" fill="white"></rect>
                  <rect x="12" width="8" height="8" rx="4" fill="white"></rect>
                  <rect x="24" width="8" height="8" rx="4" fill="white"></rect>
                </svg>
              </a>
            </li>
          </ul>
          <span style={{ fontFamily: "'Poppins', sans-serif" }}>Ekibimiz</span>
        </div> */}

        <a href="#about" className="scroll-btn">
          <span style={{ fontFamily: "'Poppins', sans-serif" }}>Aşağı Kaydır</span>
          <div className="scroll-befor">
            <img alt="" src="https://bliize-next.vercel.app/_next/static/media/down-arrow.5204c3e0.svg" width="16" height="133" decoding="async" loading="lazy" />
          </div>
        </a>
      </section>

      {/* SCROLL MARKERLARI */}
      <div>
        <span className="scroll-text-animation" data-animation="fade_from_bottom"></span>
        <span className="scroll-text-animation" data-animation="fade_from_top"></span>
        <span className="scroll-text-animation" data-animation="fade_from_left"></span>
        <span className="scroll-text-animation" data-animation="fade_from_right"></span>
        <div className="new_img-animet" style={{ overflow: "hidden" }}></div>
      </div>

      {/* ABOUT */}
      <section id="about" className="wpo-about-section section-padding pb-0">
        <div className="about-wrap">
          <div className="content">
            <h2 className="scroll-text-animation" data-animation="fade_from_right">Mazanne Hakkında</h2>
            <p className="fade_bottom" style={{ fontFamily: "'Poppins', sans-serif", fontSize: 15 }}>
              Mazanne Mobilya’da her parça; zamansız çizgiler, sağlam malzemeler ve özenli işçilikle hayat bulur. Yaşam
              alanlarını yalnızca güzelleştiren değil, yıllarca konfor sunan mobilyalar tasarlıyoruz. Ölçünüze ve tarzınıza
              göre kişiselleştirme, kumaş/renk/kaplama alternatifleri ve proje desteğiyle süreci sizinle birlikte yönetiriz.
              Üretimin her aşamasında dayanıklılık ve sürdürülebilirliğe odaklanır, montaj ve sonrası için de yanınızda oluruz.
              Mazanne, evinizdeki her odada uyum, işlev ve estetiği bir araya getirir
            </p>

            <div className="about-btn ">
              <a className="theme-btn" href="/hakkimizda">
                <span className="rolling-text">
                  <div className="block" style={{ fontFamily: "'Poppins', sans-serif", fontSize: 18 }}>
                    <span className="letter">H</span><span className="letter">a</span><span className="letter">k</span><span className="letter">k</span><span className="letter">ı</span><span className="letter">m</span><span className="letter">ı</span><span className="letter">z</span><span className="letter">d</span><span className="letter">a</span>
                  </div>
                  <div className="block" style={{ fontFamily: "'Poppins', sans-serif", fontSize: 18 }}>
                    <span className="letter">H</span><span className="letter">a</span><span className="letter">k</span><span className="letter">k</span><span className="letter">ı</span><span className="letter">m</span><span className="letter">ı</span><span className="letter">z</span><span className="letter">d</span><span className="letter">a</span>
                  </div>
                </span>
              </a>

              <div className="video-wrap">
                <div className="video-holder">
                  <button 
                  onClick={() => setShowVideo(true)}
                  className="video-btn">
                    <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
                      <circle cx="35" cy="35" r="35" fill="white"></circle>
                      <path d="M48.5 32.9019C50.5 34.0566 50.5 36.9434 48.5 38.0981L31.25 48.0574C29.25 49.2121 26.75 47.7687 26.75 45.4593L26.75 25.5407C26.75 23.2313 29.25 21.7879 31.25 22.9426L48.5 32.9019Z" fill="black"></path>
                    </svg>
                  </button>
                </div>
                <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 18 }}>Tanıtım Videosu</span>
              </div>
            </div>

            <div className="about-funfact fade_bottom" style={{ marginTop: 200 }}>
              <h3><span><span>10</span></span><span className="icon">+</span></h3>
              <h4>Yıllık<br /> Deneyim</h4>
            </div>
          </div>

          <div className="image">
            <div className="image-1 poort-in-right">
              <img
                alt=""
                srcSet="https://bliize-next.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F1.d42d9936.jpg&w=750&q=75 1x, https://bliize-next.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F1.d42d9936.jpg&w=1920&q=75 2x"
                src="https://bliize-next.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F1.d42d9936.jpg&w=1920&q=75"
                width="711" height="1037" decoding="async" loading="lazy" style={{ color: "transparent" }}
              />
            </div>

            <div className="image-2 poort-in-right">
              <img
                alt=""
                srcSet="https://bliize-next.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F2.8c675d9e.jpg&w=640&q=75 1x, https://bliize-next.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F2.8c675d9e.jpg&w=1920&q=75 2x"
                src="https://bliize-next.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F2.8c675d9e.jpg&w=1920&q=75"
                width="620" height="700" decoding="async" loading="lazy" style={{ color: "transparent" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS (Kategoriler kartları) */}
      <section className="wpo-project-section section-padding">
        <div className="container-fulid">
          <div className="title"><h2 className="fade_bottom">Kategoriler</h2></div>

          <div className="project-wrap">
            <div className="project-card fade_bottom">
              <a href="/kategoriler/oturma-grubu">
              <img alt="project-1" src="/oturma2.jpg" width={740} height={560} decoding="async" loading="lazy" style={{ color: "transparent" }} />
              <img alt="project-1" src="/oturma2.jpg" width={740} height={560} decoding="async" loading="lazy" style={{ color: "transparent" }} />
              <div className="content">
                <h2><a href="/kategoriler/oturma-grubu">Oturma Grubu</a></h2>
                <span>Konfor ve akış için yerleşim, kumaş & renk önerileri.</span>
              </div>
              </a>
            </div>

            <div className="project-card fade_bottom">
              <a href="/kategoriler/yemek-odasi">
              <img alt="project-2" src="/yemek3.jpg" width={940} height={560} decoding="async" loading="lazy" style={{ color: "transparent" }} />
              <img alt="project-2" src="/yemek3.jpg" width={940} height={560} decoding="async" loading="lazy" style={{ color: "transparent" }} />
              <div className="content">
                <h2><a href="/kategoriler/yemek-odasi">Yemek Odası</a></h2>
                <span>Masa ölçüleri, sandalye ergonomisi ve aydınlatma.</span>
              </div>
              </a>
            </div>

            <div className="project-card fade_bottom">
              <a href="/kategoriler/yatak-odasi">
              <img alt="project-3" src="/yatak2.jpg" width={940} height={560} decoding="async" loading="lazy" style={{ color: "transparent" }} />
              <img alt="project-3" src="/yatak2.jpg" width={940} height={560} decoding="async" loading="lazy" style={{ color: "transparent" }} />
              <div className="content">
                <h2><a href="/kategoriler/yatak-odasi">Yatak Odası</a></h2>
                <span>Başlık & baza, tekstil ve saklama çözümleri.</span>
              </div>
              </a>
            </div>

            <div className="project-card fade_bottom">
              <a href="/kategoriler/genc-cocuk-odasi">
              <img alt="project-4" src="/genc3.jpg" width={740} height={560} decoding="async" loading="lazy" style={{ color: "transparent" }} />
              <img alt="project-4" src="/genc3.jpg" width={740} height={560} decoding="async" loading="lazy" style={{ color: "transparent" }} />
              <div className="content">
                <h2><a href="/kategoriler/genc-cocuk-odasi">Çocuk & Genç Odası</a></h2>
                <span>Renkli, güvenli ve ergonomik seçenekler.</span>
              </div>
              </a>
            </div>
            
          </div>

          <div className="project-allBtn fade_bottom">
            <a className="theme-btn" href="/kategoriler">
              <span>Tüm Kategoriler</span>
              <img alt="" src="https://bliize-next.vercel.app/_next/static/media/right-arrow-2.2d0462f9.svg" width={40} height={40} decoding="async" loading="lazy" style={{ color: "transparent" }} />
            </a>
          </div>
        </div>

        <style jsx global>{`
          .wpo-project-section .project-wrap .content h2,
          .wpo-project-section .project-wrap .content h2 a,
          .wpo-project-section .project-wrap .content span {
            font-family: 'Poppins', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif !important;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        `}</style>
      </section>

      {/* SERVICES */}
      <section className="wpo-service-section">
        <div className="container-fluid p-0">
          <div className="service-top">
            <div className="image">
              <img alt="service-bg" src="/banner4.jpg" width={1720} height={736} decoding="async" loading="lazy" style={{ color: "transparent" }} />
            </div>
            <div className="content">
              <h2 className="fade_bottom">İz Bırakan Mekânlar, Planla Başlar</h2>
              <p className="fade_bottom service-lead">Keşiften montaja tüm süreci planlar; ölçüye uygun tasarım, doğru malzeme ve özenli işçilikle uzun ömürlü konfor sunarız.</p>
            </div>
          </div>

          <div className="service-wrap">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-12 fade_bottom">
                <div className="service-card">
                  <div className="icon">
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="4" y="3" width="12" height="18" rx="1" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M20 21H3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M7 7h2M11 7h2M7 11h2M11 11h2M7 15h2M11 15h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M16 9h3v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h2><a>Özel Üretim &amp; Ölçüye Uygun</a></h2>
                  <p>Alanınıza tam uyan ölçüler, modül ekleme/çıkarma, kumaş–kaplama–renk alternatifleri.</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-12 fade_bottom">
                <div className="service-card">
                  <div className="icon">
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M21 17v-2a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M7 17v3M17 17v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <rect x="5" y="11" width="14" height="6" rx="2" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M7 11V9a5 5 0 0 1 10 0v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h2><a>Mobilya &amp; Dekorasyon</a></h2>
                  <p>Koltuk, masa, TV ünitesi ve aksesuarları bir arada; dayanıklı malzeme, kolay bakım ve bütünlüklü stil.</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-12 fade_bottom">
                <div className="service-card">
                  <div className="icon">
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M3 16v-3a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <rect x="3" y="14" width="18" height="4" rx="2" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M6 20v-2M18 20v-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M6 14v-2a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h2><a>İç Mekân Tasarımı</a></h2>
                  <p>Fonksiyonel yerleşim, renk/tekstil paleti ve aydınlatma planı; bütçenize uygun stil önerileri.</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-12 fade_bottom">
                <div className="service-card">
                  <div className="icon">
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="3" y="7" width="18" height="4" rx="1" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M6 11V9M9 11V9M12 11V9M15 11V9M18 11V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h2><a>Tasarım &amp; Planlama</a></h2>
                  <p>Keşif ve ölçülendirme, üretim–teslim planı, montaj koordinasyonu ve garanti takibi.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tipografi override */}
        <style jsx global>{`
          .wpo-service-section .title h2,
          .wpo-service-section .service-top .content h2,
          .wpo-service-section .service-card h2,
          .wpo-service-section .service-card h2 a {
            font-family: 'Poppins', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif !important;
            font-weight: 600; letter-spacing: 0.2px; line-height: 1.2;
          }
          .wpo-service-section .service-top .content .service-lead {
            margin-top: 20px; font-size: clamp(14px, 1.1vw, 16px); line-height: 1.7; opacity: 0.7; color: white;
          }
          .wpo-service-section .service-top .content p,
          .wpo-service-section .service-card p {
            font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif !important;
            font-weight: 400; line-height: 1.7; letter-spacing: 0.1px;
            color: var(--text-600, #4b4b4b); margin-top: 10px;
          }
          .wpo-service-section .service-card h2 a:hover { text-decoration: none; opacity: 0.85; }
          .wpo-service-section .service-card .icon { color: var(--heading, #111); }
          @media (max-width: 576px) {
            .wpo-service-section .service-top .content h2 { line-height: 1.25; }
            .wpo-service-section .service-card h2 { line-height: 1.25; }
          }
        `}</style>
      </section>

<ReviewsCarousel title="Ne Dediler?" limit={6} />

  <InstagramGallery tag="MazanneMobilya" limit={9} />


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
        controls
        controlsList="nodownload noplaybackrate nofullscreen"
        disablePictureInPicture
      />
    </div>

    <style jsx>{`
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
)}




      {/* FOOTER */}
      <Footer/>
    </div>
  );
}

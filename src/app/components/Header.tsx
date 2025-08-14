"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DM_Sans } from "next/font/google";
import { Search, Facebook, Twitter, Linkedin, Instagram, X } from "lucide-react";

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

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);
  const [mobileComplementOpen, setMobileComplementOpen] = useState(false);

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

  return (
    <header id="header" className={`${dmSans.variable} ${fontBody.variable} ${fontHeading.variable}`}>
      {/* TOPBAR */}
      <div className="topbar topbar-s2">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-8 col-12">
              <ul className="contact-info">
                <li>
                  <a href="tel:+869968236">
                    Numara:<span> +869 968 236</span>
                  </a>
                </li>
                <li>
                  <span>Email: </span>
                  <span>bliize@gmail.com</span>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-4 col-12">
              <div className="contact-into">
                <ul className="social-media">
                  <li><a href="/" aria-label="Facebook"><Facebook size={18} strokeWidth={2} /></a></li>
                  <li><a href="/" aria-label="Twitter / X"><Twitter size={18} strokeWidth={2} /></a></li>
                  <li><a href="/" aria-label="LinkedIn"><Linkedin size={18} strokeWidth={2} /></a></li>
                  <li><a href="/" aria-label="Instagram"><Instagram size={18} strokeWidth={2} /></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <div className="wpo-site-header wpo-header-style-s11">
        <nav className="navigation navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <div className="row align-items-center g-0">
              {/* Mobile: hamburger */}
              <div className="col-lg-3 col-md-3 col-3 d-lg-none dl-block">
                <div className="mobail-menu">
                  <div>
                    {/* SLIDE-OUT MENU */}
                    <div className={`mobileMenu ${mobileOpen ? "open" : ""}`}>
                      {/* Drawer Header */}
                      <div className="menu-head">
                        <img src="/mazanneyazi3.png" alt="Mazanne" height={28} />
                      </div>

                      {/* NAV */}
                      <nav className="mobile-nav">
                        <ul>
                          <li><a href="/">Anasayfa</a></li>
                          <li className="current-menu-item"><a href="/hakkimizda">Hakkımızda</a></li>

                          {/* Açılır Kategoriler */}
                          <li className={`has-children ${mobileCatsOpen ? "open" : ""}`}>
                            <button
                              type="button"
                              className="expand"
                              aria-expanded={mobileCatsOpen}
                              onClick={() => setMobileCatsOpen(v => !v)}
                            >
                              Kategoriler
                            </button>

                            <ul className="sub-menu" style={{ maxHeight: mobileCatsOpen ? 480 : 0 }}>
                              <li><a href="/kategoriler/oturma-grubu">Oturma Grubu</a></li>
                              <li><a href="/kategoriler/yemek-odasi">Yemek Odası</a></li>
                              <li><a href="/kategoriler/yatak-odasi">Yatak Odası</a></li>
                              <li><a href="/kategoriler/genc-cocuk-odasi">Genç/Çocuk Odası</a></li>
                              <li><a href="/kategoriler/tv-unitesi">TV Ünitesi</a></li>
                              <li><a href="/kategoriler/bahce-mobilyalari">Bahçe Mobilyaları</a></li>

                              {/* Tamamlayıcı Mobilyalar (nested) */}
                              <li className={`has-children ${mobileComplementOpen ? "open" : ""}`}>
                                <button
                                  type="button"
                                  className="expand"
                                  aria-expanded={mobileComplementOpen}
                                  onClick={() => setMobileComplementOpen(v => !v)}
                                >
                                  Tamamlayıcı Mobilyalar
                                </button>
                                <ul className="sub-menu" style={{ maxHeight: mobileComplementOpen ? 160 : 0 }}>
                                  <li><a href="/kategoriler/tamamlayici-mobilyalar/sehpa">Sehpa</a></li>
                                  <li><a href="/kategoriler/tamamlayici-mobilyalar/masa">Masa</a></li>
                                </ul>
                              </li>
                            </ul>
                          </li>

                          <li><a href="/iletisim">İletişim</a></li>
                        </ul>
                      </nav>
                    </div>

                    {/* overlay */}
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
                      <button
                        type="button"
                        className="navbar-toggler open-btn"
                        aria-expanded={mobileOpen}
                        onClick={() => {
                          setMobileOpen(true);
                          setMobileCatsOpen(false);
                          setMobileComplementOpen(false);
                        }}
                      >
                        <span className="icon-bar first-angle" />
                        <span className="icon-bar middle-angle" />
                        <span className="icon-bar last-angle" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logo */}
              <div className="col-lg-2 col-md-4 col-6">
                <div className="navbar-header">
                  <a className="navbar-brand" href="/">
                    <img
                      alt="Mazanne"
                      srcSet="/mazanneyazi3.png 1x, /mazanneyazi3.png 2x"
                      src="/mazanneyazi3.png"
                      width={130}
                      height={65}
                      decoding="async"
                      loading="lazy"
                      style={{ color: "transparent" }}
                    />
                  </a>
                </div>
              </div>

              {/* Desktop Menu */}
              <div className="col-lg-7 col-md-1 col-1">
                <div id="navbar" className="collapse navbar-collapse navigation-holder">
                  <button className="menu-close" onClick={() => setMobileOpen(false)} aria-label="Kapat">
                    <X size={18} />
                  </button>

                  <ul className="nav navbar-nav mb-2 mb-lg-0">
                    <li><a href="/">Anasayfa</a></li>
                    <li className="current-menu-item current_page_item"><a href="/hakkimizda">Hakkımızda</a></li>

                    {/* Kategoriler */}
                    <li className="menu-item-has-children">
                      <a href="/kategoriler">Kategoriler</a>
                      <ul className="sub-menu">
                        <li><a href="/kategoriler/oturma-grubu">Oturma Grubu</a></li>
                        <li><a href="/kategoriler/yemek-odasi">Yemek Odası</a></li>
                        <li><a href="/kategoriler/yatak-odasi">Yatak Odası</a></li>
                        <li><a href="/kategoriler/genc-cocuk-odasi">Genç/Çocuk Odası</a></li>
                        <li><a href="/kategoriler/tv-unitesi">TV Ünitesi</a></li>
                        <li><a href="/kategoriler/bahce-mobilyalari">Bahçe Mobilyaları</a></li>

                        {/* 2. Seviye — Bağlantısız başlık (sadece alt menü açar) */}
                        <li className="menu-item-has-children">
                          <a
                            href="#"
                            className="nolink"
                            onClick={(e) => e.preventDefault()}
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Tamamlayıcı Mobilyalar
                          </a>
                          <ul className="sub-menu">
                            <li><a href="/kategoriler/tamamlayici-mobilyalar/sehpa">Sehpa</a></li>
                            <li><a href="/kategoriler/tamamlayici-mobilyalar/masa">Masa</a></li>
                          </ul>
                        </li>
                      </ul>
                    </li>

                    <li><a href="/iletisim">İletişim</a></li>
                  </ul>
                </div>
              </div>

              {/* Search + CTA */}
              <div className="col-lg-3 col-md-4 col-2">
                <div className="header-right">
                  <div className="header-search-form-wrapper">
                    <div className="cart-search-contact">
                      <button className="search-toggle-btn" aria-label="Ara">
                        <Search size={18} strokeWidth={2} />
                      </button>

                      <div className="header-search-form ">
                        <form>
                          <div>
                            <input type="text" className="form-control" placeholder="Burada ara..." />
                            <button type="submit" aria-label="Ara"><Search size={16} strokeWidth={2} /></button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="close-form">
                    <a className="theme-btn" href="/iletisim">İletişime Geç</a>
                  </div>
                </div>
              </div>
            </div>
            {/* row */}
          </div>
          {/* container-fluid */}
        </nav>
      </div>

      {/* === HEADER & MOBILE MENU CSS === */}
      <style jsx global>{`
        /* DM Sans */
        .fixed-navbar,
        .fixed-navbar * {
          font-family: var(--font-dm), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif !important;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Topbar social */
        .topbar .social-media a {
          display:inline-flex; align-items:center; justify-content:center;
          width:32px; height:32px; border-radius:8px;
          transition:transform .2s ease, background .2s ease;
        }
        .topbar .social-media a:hover { transform:translateY(-2px); background:rgba(255,255,255,.1); }

        /* Search icons alignment */
        .header-right .search-toggle-btn svg,
        .header-right .header-search-form button svg { display:block; }

        /* Mobile drawer */
        .mobail-menu .mobileMenu{
          position:fixed; inset:0 auto 0 0; width:82vw; max-width:420px; height:100vh; background:#fff;
          z-index:10001; transform:translateX(-100%); transition:transform .3s ease; overflow-y:auto;
          box-shadow:0 10px 40px rgba(0,0,0,.18);
        }
        .mobail-menu .mobileMenu.open{ transform:translateX(0); }
        .mobileMenu .menu-head{ position:sticky; top:0; z-index:1; display:flex; align-items:center; gap:12px;
          padding:12px 16px; background:#fff; border-bottom:1px solid #eee; }

        .mobail-menu .mobileMenu .mobile-nav{ background:#fff; }
        .mobail-menu .mobileMenu .mobile-nav ul{ list-style:none; margin:0; padding:8px 0 16px; }
        .mobail-menu .mobileMenu .mobile-nav li{ margin:0; }

        .mobail-menu .mobileMenu .mobile-nav li > a,
        .mobail-menu .mobileMenu .mobile-nav .has-children > .expand{
          display:flex; align-items:center; justify-content:space-between; gap:10px;
          width:100%; padding:14px 16px;
          font-size:16px; line-height:1.5; font-weight:600;
          color:#111 !important; text-decoration:none !important;
          background:transparent; border:0; -webkit-appearance:none; appearance:none;
          border-bottom:1px solid #f2f2f2;
        }
        .mobail-menu .mobileMenu .mobile-nav .has-children > .expand::after{
          content:""; width:10px; height:10px; border-right:2px solid currentColor; border-bottom:2px solid currentColor;
          transform:rotate(-45deg); transition:transform .2s ease; margin-left:auto;
        }
        .mobail-menu .mobileMenu .mobile-nav .has-children.open > .expand::after{ transform:rotate(45deg); }
        .mobail-menu .mobileMenu .mobile-nav .sub-menu{
          background:#fafafa; margin:0; padding:0 0 0 8px;
          overflow:hidden; max-height:0; transition:max-height .28s ease, padding .28s ease;
        }
        .mobail-menu .mobileMenu .mobile-nav .has-children.open > .sub-menu{ padding:8px 0 8px 8px; max-height:360px; }
        .mobail-menu .mobileMenu .mobile-nav .sub-menu a{ display:block; padding:10px 16px; font-size:15px; font-weight:500; color:#111 !important; }

        .mobileMenu-backdrop{ position:fixed; inset:0; background:rgba(0,0,0,.35); z-index:10000; backdrop-filter:blur(1px); }

        /* -------- DESKTOP SUBMENU FIXES -------- */

        /* 1) Renk farkını kaldır: tüm sub-menu linkleri siyah */
        #navbar .sub-menu > li > a,
        #navbar .sub-menu > li > a:visited { color:#111 !important; }

        /* 2) Temanın bozuk font ikonunu kapat (kare kutucuğu gizle) */
        #navbar .sub-menu .menu-item-has-children > a::before,
        #navbar .sub-menu .menu-item-has-children > a::after {
          content: none !important; /* reset */
        }

        /* 3) Bizim temiz caret okunu ekle (yalnızca 2. seviye başlığa) */
        #navbar .menu-item-has-children > .sub-menu > .menu-item-has-children > a{
          position: relative; padding-right: 22px; display:block;
        }
        #navbar .menu-item-has-children > .sub-menu > .menu-item-has-children > a::after{
          content:"" !important;
          position:absolute; right:8px; top:50%;
          width:8px; height:8px;
          border-right:2px solid currentColor; border-bottom:2px solid currentColor;
          transform: translateY(-50%) rotate(-45deg);
          opacity:.85; pointer-events:none;
          transition: transform .2s ease, opacity .2s ease;
        }
        #navbar .menu-item-has-children > .sub-menu > .menu-item-has-children:hover > a::after{
          transform: translateY(-50%) rotate(-45deg) translateX(2px);
          opacity:1;
        }

        /* 4) 2. seviye sub-menu konumu */
        #navbar .menu-item-has-children .menu-item-has-children { position: relative; }
        #navbar .menu-item-has-children .menu-item-has-children > .sub-menu{
          position:absolute; top:0; left:100%;
          min-width:220px; visibility:hidden; opacity:0; transform:translateY(6px);
          transition: opacity .2s ease, transform .2s ease, visibility .2s;
        }
        #navbar .menu-item-has-children .menu-item-has-children:hover > .sub-menu{
          visibility:visible; opacity:1; transform:translateY(0);
        }

        /* 5) Bağlantısız başlık görünümü (Tamamlayıcı Mobilyalar) */
        #navbar .sub-menu .nolink{
          cursor: default; /* tıklanmaz */
        }

        /* Small mobile hover polish */
        @media (hover:hover){
          .mobail-menu .mobileMenu .mobile-nav li > a:hover,
          .mobail-menu .mobileMenu .mobile-nav .has-children > .expand:hover{ background:#f7f7f7; }
        }

        /* Prevent accidental horizontal scroll */
        html, body{
          max-width:100%; overflow-x:hidden; overscroll-behavior-x:none;
          -webkit-tap-highlight-color: transparent;
        }
        @supports (overflow-x: clip){ html, body{ overflow-x:clip; } }
      `}</style>
    </header>
  );
}

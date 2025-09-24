"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DM_Sans } from "next/font/google";
import { Search, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Header from "../components/Header"
import Footer from "../components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm",
  display: "swap",
});
const fontBody = DM_Sans({ subsets: ["latin"], weight: ["400"], variable: "--font-body", display: "swap" });
const fontHeading = DM_Sans({ subsets: ["latin"], weight: ["700"], variable: "--font-heading", display: "swap" });

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);

 useEffect(() => {
  const els: HTMLElement[] = Array.from(
    document.querySelectorAll<HTMLElement>(".fade_bottom, .scroll-text-animation, .project-card.fade_bottom")
  );

els.forEach((el) => {
  const r = el.getBoundingClientRect();
  if (r.top < window.innerHeight * 0.9 && r.bottom > 0) {
    el.style.transition = "transform .6s ease, opacity .6s ease";
    el.style.opacity = "1";
    el.style.transform = "translate(0,0)";
  }
});

  const reveal = (el: HTMLElement) => {
    el.style.transition = "transform .6s ease, opacity .6s ease";
    el.style.opacity = "1";
    el.style.transform = "translate(0,0)";
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        reveal(e.target as HTMLElement);
        io.unobserve(e.target);
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px", // Biraz erken tetikle
    }
  );

  els.forEach((el) => io.observe(el));

  // Fallback: 1sn sonra hâlâ görünmeyen varsa göster
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

  return (
    <div className={`fixed-navbar ${dmSans.variable} ${fontBody.variable} ${fontHeading.variable}`}>
  
    <Header/>

      {/* 1) Page Title */}
      <section className="wpo-page-title">
        <div className="container">
          <div className="row">
            <div className="col col-xs-12">
              <div className="wpo-breadcumb-wrap">
                <ol><li>Kategoriler</li></ol>
                <h2 className="fade_bottom">Eviniz için en iyisi Mazanne</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2) Animasyon markerları */}
      <div>
        <span className="scroll-text-animation" data-animation="fade_from_bottom" />
        <span className="scroll-text-animation" data-animation="fade_from_top" />
        <span className="scroll-text-animation" data-animation="fade_from_left" />
        <span className="scroll-text-animation" data-animation="fade_from_right" />
        <div className="new_img-animet" style={{ overflow: "hidden" }} />
      </div>

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
                alt="project-1"
                srcSet="/oturma2.jpg"
                width={740}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <img
                alt="project-1"
                srcSet="/oturma2.jpg"
                width={740}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <div className="content">
                <h2><a href="/kategoriler/oturma-grubu">Oturma Grubu</a></h2>
                <span>Konfor ve akış için yerleşim, kumaş & renk önerileri.</span>
              </div>
              </a>
            </div>

            <div className="project-card fade_bottom">
            <a href="/kategoriler/yemek-odasi">
              <img
                alt="project-1"
                srcSet="/yemek3.jpg"
                width={940}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <img
                alt="project-1"
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
                alt="project-1"
                srcSet="yatak1.jpg"
                width={940}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <img
                alt="project-1"
                srcSet="yatak1.jpg"
                width={940}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <div className="content">
                <h2><a href="/kategoriler/yatak-odasi">Yatak Odası</a></h2>
                <span>Başlık & baza, tekstil ve saklama çözümleri.</span>
              </div>,
                        </a>
            </div>
  

            <div className="project-card fade_bottom">
                          <a href="/kategoriler/genc-cocuk-odasi">

              <img
                alt="project-1"
                srcSet="/combined_output.jpg"
                width={740}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <img
                alt="project-1"
                srcSet="/combined_output.jpg"
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

             <div className="project-card fade_bottom">
                           <a href="/kategoriler/tv-unitesi">

              <img
                alt="project-1"
                srcSet="/tv1.webp"
                width={740}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <img
                alt="project-1"
                srcSet="/tv1.webp"
                width={740}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <div className="content">
                <h2><a href="/kategoriler/tv-unitesi">TV Ünitesi</a></h2>
                <span>Renkli, güvenli ve ergonomik seçenekler.</span>
              </div>
                            </a>
            </div>
          

                   <div className="project-card fade_bottom">
              <a href="/kategoriler/bahce-mobilyalari">
              <img
                alt="project-1"
                srcSet="/bahcemobilya.jpg"
                width={740}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <img
                alt="project-1"
                srcSet="/bahcemobilya.jpg"
                width={740}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <div className="content">
                <h2><a href="/kategoriler/bahce-mobilyaları">Bahçe Mobilyaları</a></h2>
                <span>Konfor ve akış için yerleşim, kumaş & renk önerileri.</span>
              </div>
                          </a>

            </div>

             <div className="project-card fade_bottom">
                           <a href="/kategoriler/tamamlayici-mobilyalar/sehpa">

              <img
                alt="project-1"
                srcSet="/1_org_zoom.webp"
                width={740}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <img
                alt="project-1"
                srcSet="/1_org_zoom.webp"
                width={740}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <div className="content">
                <h2><a href="/kategoriler/tamamlayici-mobilyalar/sehpa">Sehpa</a></h2>
                <span>Konfor ve akış için yerleşim, kumaş & renk önerileri.</span>
              </div>
                 </a>
            </div>
         

             <div className="project-card fade_bottom">
                           <a href="/kategoriler/tamamlayici-mobilyalar/masa">

              <img
                alt="project-1"
                srcSet="yemek1.jpg"
                width={740}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <img
                alt="project-1"
                srcSet="yemek1.jpg"
                width={740}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <div className="content">
                <h2><a href="/kategoriler/tamamlayici-mobilyalar/masa"> Mutfak Masası</a></h2>
                <span>Konfor ve akış için yerleşim, kumaş & renk önerileri.</span>
              </div>
                          </a>

            </div>

          </div>
          

          
        </div>
      </section>

   <Footer/>

      {/* ===== sadece mobil çekmece CSS’in kalsın ===== */}
      <style jsx global>{`
        /* tipografi dokunuşu (kart içi) */
        .wpo-project-section .project-wrap .content h2,
        .wpo-project-section .project-wrap .content h2 a,
        .wpo-project-section .project-wrap .content span {
          font-family: 'Poppins', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif !important;
          -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
        }

        /* mobile drawer css'in */
        .mobail-menu .mobileMenu{position:fixed; inset:0 auto 0 0; width:82vw; max-width:420px; height:100vh; background:#fff; transform:translateX(-100%) !important; transition:transform .3s ease; overflow-y:auto; box-shadow:0 10px 40px rgba(0,0,0,.18); z-index:12000;}
        .mobail-menu .mobileMenu.open{transform:translateX(0) !important;}
        .mobileMenu-backdrop{position:fixed; inset:0; background:rgba(0,0,0,.35); z-index:11999; backdrop-filter:blur(1px);}
        @media (max-width: 991.98px){
          .wpo-site-header .navigation .row{position:relative; min-height:64px; display:grid !important; grid-template-columns:48px 1fr 48px; align-items:center;}
          .wpo-site-header .navigation .row > div:nth-child(1){grid-column:1; justify-self:start;}
          .wpo-site-header .navigation .row > div:nth-child(4){grid-column:3; justify-self:end;}
          .wpo-site-header .navigation .row > div:nth-child(3){display:none !important;}
          .wpo-site-header .navbar-header{position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:max-content; margin:0 !important; text-align:center; z-index:1;}
          .wpo-site-header .navbar-brand{display:inline-block; margin:0 !important;}
          .wpo-site-header .navbar-brand img{display:block; height:70px; width:auto;}
          .navbar-toggler.open-btn{border:0; background:transparent; padding:6px 8px; position:relative; z-index:2;}
          .navbar-toggler.open-btn .icon-bar{display:block; width:20px; height:2px; margin:4px 0; background:#ffffff;}
        }
        .mobail-menu .mobileMenu .mobile-nav ul{list-style:none; margin:0; padding:8px 0 16px;}
        .mobail-menu .mobileMenu .mobile-nav li > a,
        .mobail-menu .mobileMenu .mobile-nav .has-children > .expand{display:flex; align-items:center; justify-content:space-between; gap:10px; width:100%; padding:14px 16px; font-size:16px; line-height:1.5; font-weight:600; color:#111 !important; text-decoration:none !important; background:transparent; border:0; border-bottom:1px solid #f2f2f2; -webkit-appearance:none; appearance:none;}
        .mobail-menu .mobileMenu .mobile-nav .has-children > .expand::after{content:""; width:10px; height:10px; border-right:2px solid currentColor; border-bottom:2px solid currentColor; transform:rotate(-45deg); transition:transform .2s ease; margin-left:auto;}
        .mobail-menu .mobileMenu .mobile-nav .has-children.open > .expand::after{transform:rotate(45deg);}
        .mobail-menu .mobileMenu .mobile-nav .sub-menu{background:#fafafa; margin:0; padding:0 0 0 8px; overflow:hidden; max-height:0; transition:max-height .28s ease, padding .28s ease;}
        .mobail-menu .mobileMenu .mobile-nav .has-children.open .sub-menu{padding:8px 0 8px 8px; max-height:360px;}
        .mobail-menu .mobileMenu .mobile-nav .sub-menu a{display:block; padding:10px 16px; font-size:15px; font-weight:500; color:#111 !important;}

        html, body{max-width:100%; overflow-x:hidden; overscroll-behavior-x:none; -webkit-tap-highlight-color:transparent;}
        @supports (overflow-x: clip){ html, body{ overflow-x:clip; } }
      `}</style>
    </div>
  );
}

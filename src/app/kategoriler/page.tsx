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
              <img
                alt="project-1"
                srcSet="https://instagram.fayt2-2.fna.fbcdn.net/v/t39.30808-6/518380635_122103634004944818_5043005245250970465_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjEwODB4MTM1MC5zZHIuZjMwODA4LmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=instagram.fayt2-2.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QHf97mOSFXaDcT6hdPS28s79f2QXJEcjvUvO9vW9Siv8sDBcWGPOnTx1vjwS8Tfc68kcrf8_L6Y_nsU4DCyKqg_&_nc_ohc=mSpiBgaNoYMQ7kNvwH2Vw02&_nc_gid=MaDeGJGws4bU9BsWykR-cw&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzY4MTcyMzUyMjU2NTYyOTQ1OA%3D%3D.3-ccb7-5&oh=00_AfVNvkmqkLbUHV_2WFXJ0sjR2BawU7ZQ9NEmJ-TnsYHoXw&oe=689F9765&_nc_sid=22de04"
                width={740}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <img
                alt="project-1"
                srcSet="https://instagram.fayt2-2.fna.fbcdn.net/v/t39.30808-6/518380635_122103634004944818_5043005245250970465_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjEwODB4MTM1MC5zZHIuZjMwODA4LmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=instagram.fayt2-2.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QHf97mOSFXaDcT6hdPS28s79f2QXJEcjvUvO9vW9Siv8sDBcWGPOnTx1vjwS8Tfc68kcrf8_L6Y_nsU4DCyKqg_&_nc_ohc=mSpiBgaNoYMQ7kNvwH2Vw02&_nc_gid=MaDeGJGws4bU9BsWykR-cw&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzY4MTcyMzUyMjU2NTYyOTQ1OA%3D%3D.3-ccb7-5&oh=00_AfVNvkmqkLbUHV_2WFXJ0sjR2BawU7ZQ9NEmJ-TnsYHoXw&oe=689F9765&_nc_sid=22de04"
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
            </div>

            <div className="project-card fade_bottom">
              <img
                alt="project-1"
                srcSet="https://www.mobilyadiyari.com/soft-yemek-odasi-mobilya-diyari-5586-15-B.jpg"
                width={940}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <img
                alt="project-1"
                srcSet="https://www.mobilyadiyari.com/soft-yemek-odasi-mobilya-diyari-5586-15-B.jpg"
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
            </div>

            <div className="project-card fade_bottom">
              <img
                alt="project-1"
                srcSet="https://instagram.fayt2-2.fna.fbcdn.net/v/t39.30808-6/519653102_122106035516944818_1243802248604637088_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjEwODB4MTM1MC5zZHIuZjMwODA4LmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=instagram.fayt2-2.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QH_QHfX5NAqi8VrYe6pNFKr9vX-n1PeJY07hUsG1qKZHUk3zuTVwjlw-a67U90Psvuo5r9RBg61_iGtsokJweIt&_nc_ohc=JjXT1bNQGnAQ7kNvwGE4ZXX&_nc_gid=P3AD8QHcXO3JBnuFZJvK-A&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzY4MzczNjYxNDMxNzY4MDY2Ng%3D%3D.3-ccb7-5&oh=00_AfUw86qTks1TaDf7FcV7fQuqEq195MPAzFZWIBB7SK9q8g&oe=689F98EB&_nc_sid=10d13b"
                width={940}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <img
                alt="project-1"
                srcSet="https://instagram.fayt2-2.fna.fbcdn.net/v/t39.30808-6/519653102_122106035516944818_1243802248604637088_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkZFRUQuaW1hZ2VfdXJsZ2VuLjEwODB4MTM1MC5zZHIuZjMwODA4LmRlZmF1bHRfaW1hZ2UuYzIifQ&_nc_ht=instagram.fayt2-2.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QH_QHfX5NAqi8VrYe6pNFKr9vX-n1PeJY07hUsG1qKZHUk3zuTVwjlw-a67U90Psvuo5r9RBg61_iGtsokJweIt&_nc_ohc=JjXT1bNQGnAQ7kNvwGE4ZXX&_nc_gid=P3AD8QHcXO3JBnuFZJvK-A&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzY4MzczNjYxNDMxNzY4MDY2Ng%3D%3D.3-ccb7-5&oh=00_AfUw86qTks1TaDf7FcV7fQuqEq195MPAzFZWIBB7SK9q8g&oe=689F98EB&_nc_sid=10d13b"
                width={940}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <div className="content">
                <h2><a href="/kategoriler/yatak-odasi">Yatak Odası</a></h2>
                <span>Başlık & baza, tekstil ve saklama çözümleri.</span>
              </div>
            </div>

            <div className="project-card fade_bottom">
              <img
                alt="project-1"
                srcSet="https://alfemo.com.tr/mate-compact-room-genc-odasi-stu-01-genccocuk-odasi-takimi-4554-43-B.jpg"
                width={740}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <img
                alt="project-1"
                srcSet="https://alfemo.com.tr/mate-compact-room-genc-odasi-stu-01-genccocuk-odasi-takimi-4554-43-B.jpg"
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
            </div>


             <div className="project-card fade_bottom">
              <img
                alt="project-1"
                srcSet="https://www.minarmobilya.com/idea/dq/03/myassets/products/727/prime-tv-unitesi-kumtasi-1_min.jpg?revision=1754656630"
                width={740}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <img
                alt="project-1"
                srcSet="https://www.minarmobilya.com/idea/dq/03/myassets/products/727/prime-tv-unitesi-kumtasi-1_min.jpg?revision=1754656630"
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
              
            </div>
                   <div className="project-card fade_bottom">
              <img
                alt="project-1"
                srcSet="https://scontent.cdninstagram.com/v/t39.30808-6/527086412_122112897224944818_5608389323875561061_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=103&cb=30a688f7-47795e66&ig_cache_key=MzY5MTgyOTgwOTU2MzMzNDExMg%3D%3D.3-ccb1-7-cb30a688f7-47795e66&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=YXMk0x--lEoQ7kNvwFRFZVh&_nc_oc=AdmTi4bf4QPSfoYwLWb-0yTtpKoVXZ9mMl2bBsMwOfEVnjlzobRXreQUgu8lSdQx_U9xQDu18c5AyKM1pAxPZr3i&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=Hx2E-JAcD-JVjZ_KfRGjJg&oh=00_AfWb6WZUUfTD0FPkpdt6odq-oO0mh8vz-0fgmS1zXGEgYw&oe=68A36C3E"
                width={740}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <img
                alt="project-1"
                srcSet="https://scontent.cdninstagram.com/v/t39.30808-6/527086412_122112897224944818_5608389323875561061_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=103&cb=30a688f7-47795e66&ig_cache_key=MzY5MTgyOTgwOTU2MzMzNDExMg%3D%3D.3-ccb1-7-cb30a688f7-47795e66&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=YXMk0x--lEoQ7kNvwFRFZVh&_nc_oc=AdmTi4bf4QPSfoYwLWb-0yTtpKoVXZ9mMl2bBsMwOfEVnjlzobRXreQUgu8lSdQx_U9xQDu18c5AyKM1pAxPZr3i&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=Hx2E-JAcD-JVjZ_KfRGjJg&oh=00_AfWb6WZUUfTD0FPkpdt6odq-oO0mh8vz-0fgmS1zXGEgYw&oe=68A36C3E"
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
            </div>
             <div className="project-card fade_bottom">
              <img
                alt="project-1"
                srcSet="https://cdn.dsmcdn.com/ty1390/product/media/images/prod/QC/20240629/14/53637cbe-a873-3ada-817f-d6c1df2b2098/1_org_zoom.jpg"
                width={740}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <img
                alt="project-1"
                srcSet="https://cdn.dsmcdn.com/ty1390/product/media/images/prod/QC/20240629/14/53637cbe-a873-3ada-817f-d6c1df2b2098/1_org_zoom.jpg"
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
            </div>
             <div className="project-card fade_bottom">
              <img
                alt="project-1"
                srcSet="https://img.vivense.com/1920x1280/images/0b9ea4b7515543efba091709b283344c.jpg"
                width={740}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <img
                alt="project-1"
                srcSet="https://img.vivense.com/1920x1280/images/0b9ea4b7515543efba091709b283344c.jpg"
                width={740}
                height={560}
                decoding="async"
                loading="lazy"
                style={{ color: "transparent" }}
              />
              <div className="content">
                <h2><a href="/kategoriler/tamamlayici-mobilyalar/masa">Masa</a></h2>
                <span>Konfor ve akış için yerleşim, kumaş & renk önerileri.</span>
              </div>
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

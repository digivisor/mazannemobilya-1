"use client";

import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MapPin, Mail, Phone, Ruler, Tag, Wrench, MoreHorizontal, ChevronDown } from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

/* =========================
   ServiceSelect
========================= */
function ServiceSelect({
  name = "service",
  value,
  onChange,
}: {
  name?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const options = [
    { value: "olcu", label: "Ölçü", icon: Ruler },
    { value: "fiyat", label: "Fiyat", icon: Tag },
    { value: "montaj", label: "Montaj", icon: Wrench },
    { value: "diger", label: "Diğer", icon: MoreHorizontal },
  ];
  const current = options.find((o) => o.value === value) || null;

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!btnRef.current || !listRef.current) return;
      if (!btnRef.current.contains(e.target as Node) && !listRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="custom-select">
      <input type="hidden" name={name} value={current ? current.value : ""} />
      <button
        ref={btnRef}
        type="button"
        className="select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="trigger-content">
          {current ? (
            <>
              <current.icon className="ico" />
              <span>{current.label}</span>
            </>
          ) : (
            <span className="placeholder">Hizmet Seçin</span>
          )}
        </span>
        <ChevronDown className="chev" />
      </button>

      {open && (
        <ul ref={listRef} className="select-list" role="listbox">
          {options.map((opt) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              tabIndex={0}
              className={"select-item" + (value === opt.value ? " selected" : "")}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onChange(opt.value);
                  setOpen(false);
                }
              }}
            >
              <opt.icon className="ico" />
              <span>{opt.label}</span>
            </li>
          ))}
        </ul>
      )}

      <style jsx>{`
        .custom-select { position: relative; width: 100%; }
        .select-trigger{
          width:100%; height:56px; border-radius:10px; padding:0 14px;
          background:#fff; border:1px solid rgba(0,0,0,.15);
          display:flex; align-items:center; justify-content:space-between;
          transition:border-color .2s, box-shadow .2s;
        }
        .select-trigger:focus{ outline:none; border-color:#4f46e5; box-shadow:0 0 0 3px rgba(79,70,229,.15); }
        .trigger-content{ display:flex; align-items:center; gap:10px; font-weight:500; }
        .placeholder{ color:#777; font-weight:400; }
        .ico,.chev{ width:20px; height:20px; }
        .chev{ opacity:.7; }
        .select-list{
          position:absolute; z-index:30; top: calc(100% + 8px); left:0; right:0;
          background:#fff; border:1px solid rgba(0,0,0,.12); border-radius:12px;
          padding:6px; box-shadow:0 12px 28px rgba(0,0,0,.12);
          max-height:300px; overflow:auto;
        }
        .select-item{
          display:flex; align-items:center; gap:10px;
          padding:12px 10px; border-radius:8px; cursor:pointer; font-size:16px;
        }
        .select-item:hover{ background:#f4f6ff; }
        .select-item.selected{ background:#eef2ff; font-weight:600; }
      `}</style>
    </div>
  );
}

/* =========================
   Page
========================= */
export default function Page() {
  const [service, setService] = useState("diger");

  return (
    <div className={`${poppins.className} font-poppins`}>
      <Header />

      {/* Başlık */}
      <section className="wpo-page-title">
        <div className="container">
          <div className="row">
            <div className="col col-xs-12">
              <div className="wpo-breadcumb-wrap">
                <ol><li>Bize Ulaşın</li></ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Üst bilgi kartları */}
      <section className="wpo-contact-pg-section section-padding pt-0">
        <div className="container">
          <div className="cards-grid">
            <div className="card">
              <div className="office-info-item">
                <div className="office-info-icon"><div className="icon-bubble"><MapPin /></div></div>
                <div className="office-info-text">
                  <h2>Adres</h2>
                  <p>Yeşil Göl Caddesi No:7, Antalya, Türkiye</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="office-info-item">
                <div className="office-info-icon"><div className="icon-bubble"><Mail /></div></div>
                <div className="office-info-text">
                  <h2>E-posta</h2>
                  <p>ornekmail1@gmail.com</p>
                  <p>ornekmail2@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="office-info-item">
                <div className="office-info-icon"><div className="icon-bubble"><Phone /></div></div>
                <div className="office-info-text">
                  <h2>Telefon</h2>
                  <p>+90 555 123 45 67</p>
                  <p>+90 555 987 65 43</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- Yarı Görsel / Yarı Form (tam 50/50) --- */}
          <div className="half-split">
            {/* Sol: Görsel */}
            <div className="half left">
              <img src="https://scontent.cdninstagram.com/v/t51.82787-15/518541264_17846805612521329_162688526009009798_n.jpg?stp=dst-jpg_e15_tt6&_nc_cat=111&ig_cache_key=MzY3NjU0OTc3Nzk0OTc3NjEyNTE3ODQ2ODA1NjA2NTIxMzI5.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjgxMHgxNDQwLnNkci5DMyJ9&_nc_ohc=37QHwVE4mrkQ7kNvwFZFZgt&_nc_oc=AdkwDBVQEsDSpbVtLci2-98PcSeEF3HOhWGj4ED1qIF5eyCyEI3c3yIwbL0VBR8UHqahRDVzMn8ck9q5h_x3iVV_&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=l0fI0JsttuO5XIlk2MPpgA&oh=00_AfX8nMM_pqI243G72MsjMhsk7xwQ83co3Hp85vt8GdeNQg&oe=68A3D96C" alt="İletişim görseli" className="cover" />
            </div>

            {/* Sağ: Form */}
            <div className="half right">
              <div className="inner">
                <div className="wpo-contact-title">
                  <h2>Bir Sorunuz mu Var?</h2>
                  <p>Herhangi bir sorunuz veya talebiniz için bize ulaşabilirsiniz.</p>
                </div>

                <form
                  className="contact-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Form alındı. Teşekkürler!");
                  }}
                >
                  <div className="field col-6">
                    <label htmlFor="name">Adınız*</label>
                    <input id="name" name="name" required placeholder="Adınız" className="form-control" />
                  </div>

                  <div className="field col-6">
                    <label htmlFor="email">E-posta*</label>
                    <input id="email" name="email" type="email" required placeholder="E-posta Adresiniz" className="form-control" />
                  </div>

                  <div className="field col-6">
                    <label htmlFor="adress">Adres</label>
                    <input id="adress" name="adress" placeholder="Adresiniz" className="form-control" />
                  </div>

                  <div className="field col-6">
                    <label>Hizmet</label>
                    <ServiceSelect value={service} onChange={setService} name="service" />
                  </div>

                  <div className="field col-12 field--message">
                    <label htmlFor="note">Mesajınız</label>
                    <textarea
                      id="note"
                      name="note"
                      placeholder="Mesajınızı yazın..."
                      className="form-control textarea"
                    />
                  </div>

                  <div className="submit-area col-12">
                    <button type="submit" className="theme-btn">Gönder</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Styles */}
        <style jsx>{`
          :global(.font-poppins), :global(.font-poppins *) {
            font-family: var(--font-poppins), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif !important;
          }

          .cards-grid{
            --card-w: clamp(320px, 28vw, 400px);
            display:grid; gap:28px;
            grid-template-columns: repeat(3, var(--card-w));
            justify-content:center;
            margin-bottom: 36px;
          }
          @media (max-width:1199px){ .cards-grid{ grid-template-columns: repeat(2, var(--card-w)); } }
          @media (max-width:767px){
            .cards-grid{ grid-template-columns: 1fr; }
            .cards-grid .card{ max-width:560px; margin-inline:auto; }
          }
          .office-info-item{
            width:100%; height:190px;
            display:flex; gap:20px; align-items:center;
            background:#fff;
            border-radius:16px; padding:24px;
            box-shadow:0 6px 18px rgba(0,0,0,.04);
            transition:transform .25s, box-shadow .25s, border-color .25s;
          }
          .office-info-item:hover{ transform:translateY(-6px); box-shadow:0 16px 36px rgba(0,0,0,.12); border-color:rgba(0,0,0,.12); }
          .office-info-icon{ width:96px; flex:0 0 96px; display:flex; align-items:center; justify-content:center; }
          .icon-bubble{ position:relative; width:60px; height:60px; display:grid; place-items:center; border-radius:16px; background:#eef2ff; color:#1f2a56; }
          .icon-bubble::before{ content:""; position:absolute; left:50%; top:50%; width:96px; height:96px; transform:translate(-50%,-50%); border-radius:9999px; background:#efefef; opacity:.4; z-index:-1; }
          .icon-bubble :global(svg){ width:28px; height:28px; stroke-width:2; }
          .office-info-text h2{ font-size:22px; margin:0 0 6px; font-weight:700; color:#0a0d2b; }
          .office-info-text p{ margin:0; line-height:1.6; color:#333; }

          .half-split{
            width:100%;
            max-width:1200px;
            margin: 0 auto 40px;
            display:flex;
            border-radius:16px;
            overflow:hidden;
            background:#fff;
            border:1px solid rgba(0,0,0,.06);
            box-shadow:0 10px 30px rgba(0,0,0,.06);
            min-height:620px;
          }
          .half{ flex:1 1 50%; }
          .half.left{ position:relative; background:#f3f4f6; }
          .cover{
            position:absolute; inset:0; width:100%; height:100%;
            object-fit:cover; display:block;
          }
          .half.right{
            display:flex; align-items:stretch; justify-content:center; padding:32px;
          }
          .inner {
            width: 100%;
            max-width: 560px;
            display: flex;
            flex-direction: column;
            height: 100%;
          }
          .wpo-contact-title{ text-align:center; margin:0 0 16px; }
          .wpo-contact-title h2{ font-size:28px; margin:0 0 8px; }
          .wpo-contact-title p{ margin:0; color:#555; }

          /* === FORM GRID === */
          .contact-form {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            margin-top: 8px;
            flex: 1;
            min-height: 0;
          }
          .col-6, .col-12 { grid-column: span 1; }
          @media (min-width:900px){
            .contact-form {
              grid-template-columns: repeat(12, 1fr);
            }
            .col-6 { grid-column: span 6; }
            .col-12 { grid-column: span 12; }
          }
          .field { display:flex; flex-direction:column; gap:12px; min-height:0; }
          .field label{ font-size:15px; color:#374151; font-weight:600; line-height:1; }
          .form-control{
            width:100%; height:56px; border-radius:10px;
            border:1px solid rgba(0,0,0,.15); padding:0 14px; background:#fff; box-sizing:border-box;
            font-size:17px;
          }
          .custom-select .select-trigger{ height:56px; }
          .field--message, .submit-area {
            grid-column: 1 / -1;
          }
          .field--message{
            display: flex;
            flex-direction: column;
            flex: 1;
            min-height: 0;
          }
          .field--message .textarea{
            flex: 1;
            height: auto;
            min-height: 120px;
            padding:12px 14px;
            resize:vertical;
            font-size:17px;
          }
          .submit-area{
            display:flex; justify-content:center; align-items:center; margin-top:8px;
          }
          .theme-btn{ padding:14px 30px; border-radius:10px; background:#111827; color:#fff; border:0; font-size:18px; font-weight:600; }
          @media (max-width:900px){
            .half-split{ flex-direction:column; min-height:unset; }
            .half.left{ height:260px; }
            .half.right{ padding:20px 12px 18px; }
            .contact-form { gap:16px; }
            .form-control{ height:52px; font-size:16px; }
            .field--message .textarea { min-height:80px; }
          }
        `}</style>
      </section>

      {/* Harita */}
      <section className="wpo-contact-map-section">
        <h2 className="sr-only">İletişim Haritası</h2>
        <div className="wpo-contact-map">
          <div className="map-embed">
            <iframe
              title="Mazanne Mobilya Konum"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3822.7699512968898!2d30.685436918222567!3d36.91352423326255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c38fafa98a61ef%3A0xe19d3ac61f1be201!2sMazanne%20Mobilya!5e0!3m2!1str!2str!4v1755171513146!5m2!1str!2str"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <style jsx>{`
          .wpo-contact-map-section{ padding:0 0 72px; }
          .wpo-contact-map .map-embed{
            position:relative; width:100%;
            border-radius:16px; overflow:hidden;
            box-shadow:0 10px 30px rgba(0,0,0,.08);
            background:#f6f7fb;
            aspect-ratio:16/9;
          }
          @supports not (aspect-ratio:16/9){
            .wpo-contact-map .map-embed{ height:0; padding-bottom:56.25%; }
          }
          :global(.wpo-contact-map-section),
          :global(.wpo-contact-map-section *){
            filter: none !important;
            -webkit-filter: none !important;
            mix-blend-mode: normal !important;
            opacity: 1 !important;
          }
          .wpo-contact-map .map-embed iframe{
            position:absolute; inset:0; width:100%; height:100%; border:0;
          }
          .sr-only{ position:absolute; width:1px; height:1px; margin:-1px; overflow:hidden; clip:rect(0,0,1px,1px); border:0; }
        `}</style>
      </section>

      <Footer />
    </div>
  );
}
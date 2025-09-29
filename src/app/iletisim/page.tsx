"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  MapPin,
  Mail,
  Phone,
  Ruler,
  Tag,
  Wrench,
  MoreHorizontal,
  ChevronDown,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

/* =====================================================================
   Headless Select (Accessible) – inline styles + scoped CSS (no global CSS)
===================================================================== */
function ServiceSelect({
  id = "service",
  name = "service",
  value,
  onChange,
  placeholder = "Hizmet Seçin",
}: {
  id?: string;
  name?: string;
  value: string | null;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const options = useMemo(
    () => [
      { value: "olcu", label: "Ölçü", icon: Ruler },
      { value: "fiyat", label: "Fiyat", icon: Tag },
      { value: "montaj", label: "Montaj", icon: Wrench },
      { value: "diger", label: "Diğer", icon: MoreHorizontal },
    ],
    []
  );
  const activeIndex = Math.max(0, options.findIndex((o) => o.value === value));

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (
        open &&
        triggerRef.current &&
        listRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        !listRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  useEffect(() => {
    if (open && listRef.current) {
      const selected = listRef.current.querySelector<HTMLElement>(
        `[data-index="${activeIndex}"]`
      );
      selected?.focus();
    }
  }, [open, activeIndex]);

  const btnStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 48,
    width: "100%",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.15)",
    background: "#fff",
    padding: "0 12px",
    textAlign: "left",
    cursor: "pointer",
  };

  const listStyle: React.CSSProperties = {
    position: "absolute",
    zIndex: 50,
    marginTop: 8,
    maxHeight: 280,
    width: "100%",
    overflow: "auto",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.1)",
    background: "#fff",
    padding: 6,
    boxShadow: "0 12px 28px rgba(0,0,0,.12)",
  };

  const itemStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 12px",
    borderRadius: 10,
    outline: "none",
    cursor: "pointer",
    fontSize: 15,
  };

  return (
    <div style={{ position: "relative" }}>
      <input type="hidden" id={id} name={name} value={value ?? ""} />
      <button
        type="button"
        ref={triggerRef}
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-haspopup="listbox"
        style={btnStyle}
        onClick={() => setOpen((o) => !o)}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: value ? 600 : 400, color: value ? "#111" : "#777" }}>
          {value ? (
            (() => {
              const Icon = options.find((o) => o.value === value)?.icon ?? MoreHorizontal;
              const label = options.find((o) => o.value === value)?.label ?? placeholder;
              return (
                <>
                  <Icon style={{ width: 20, height: 20 }} />
                  <span>{label}</span>
                </>
              );
            })()
          ) : (
            <span>{placeholder}</span>
          )}
        </span>
        <ChevronDown style={{ width: 20, height: 20, opacity: 0.7 }} />
      </button>

      {open && (
        <ul id={`${id}-list`} ref={listRef} role="listbox" aria-labelledby={id} style={listStyle}>
          {options.map((opt, i) => {
            const selected = value === opt.value;
            return (
              <li
                key={opt.value}
                data-index={i}
                tabIndex={0}
                role="option"
                aria-selected={selected}
                style={{
                  ...itemStyle,
                  background: selected ? "#eef2ff" : undefined,
                  fontWeight: selected ? 700 : 500,
                }}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onChange(opt.value);
                    setOpen(false);
                    triggerRef.current?.focus();
                  }
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    const next = (i + 1) % options.length;
                    listRef.current?.querySelector<HTMLElement>(`[data-index="${next}"]`)?.focus();
                  }
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    const prev = (i - 1 + options.length) % options.length;
                    listRef.current?.querySelector<HTMLElement>(`[data-index="${prev}"]`)?.focus();
                  }
                  if (e.key === "Home") {
                    e.preventDefault();
                    listRef.current?.querySelector<HTMLElement>(`[data-index="0"]`)?.focus();
                  }
                  if (e.key === "End") {
                    e.preventDefault();
                    listRef.current?.querySelector<HTMLElement>(`[data-index="${options.length - 1}"]`)?.focus();
                  }
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = selected ? "#eef2ff" : "#f4f6ff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = selected ? "#eef2ff" : "transparent";
                }}
              >
                <opt.icon style={{ width: 20, height: 20 }} />
                <span>{opt.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* =====================================================================
   Contact Page – inline CSS + scoped style jsx for responsiveness only
===================================================================== */
export default function ContactPage() {
  const [service, setService] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("idle");

    const fd = new FormData(e.currentTarget);
    if (!fd.get("name") || !fd.get("email")) {
      setStatus("error");
      return;
    }

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 900)); // demo
      setStatus("success");
      formRef.current?.reset();
      setService(null);
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  const container: React.CSSProperties = { maxWidth: 1200, margin: "0 auto", padding: "0 16px" };
  const sectionPad: React.CSSProperties = { padding: "24px 0" };
  const card: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.1)",
    background: "#fff",
    padding: 20,
    boxShadow: "0 6px 16px rgba(0,0,0,.06)",
  };
  const label: React.CSSProperties = { marginBottom: 6, display: "block", fontWeight: 700, color: "#374151", fontSize: 14 };
  const input: React.CSSProperties = {
    height: 48,
    width: "100%",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.15)",
    background: "#fff",
    padding: "0 12px",
    fontSize: 15,
    outline: "none",
  };
  const textarea: React.CSSProperties = { ...input, height: "auto", minHeight: 120, padding: "10px 12px", resize: "vertical" };
  const btn: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 48,
    padding: "0 24px",
    borderRadius: 12,
    background: "#111827",
    color: "#fff",
    border: 0,
    fontWeight: 700,
    cursor: "pointer",
  };

  return (
    <div className={`${poppins.variable}`} style={{ fontFamily: "var(--font-poppins), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" }}>
      <Header />

      {/* Title */}
      <section className="wpo-page-title"><div className="container"><div className="row"><div className="col col-xs-12"><div className="wpo-breadcumb-wrap"><ol><li>İletişim</li></ol><h2 className="fade_bottom"
       style={{translate: 'none',
        
        rotate: 'none',
        scale: 'none',
         opacity: 1,
         transform: 'translate(0px, 0px)',


       }}>
        
        
        </h2></div></div></div></div></section>

      {/* Info cards */}
      <section style={sectionPad}>
        <div className="info-grid" style={container}>
          <div className="info-grid-inner">
            <InfoCard icon={MapPin} title="Adres" lines={["Yeşil Göl Caddesi No:7", "Antalya, Türkiye"]} />
            <InfoCard icon={Mail} title="E-posta" lines={["mazannemobilya@gmail.com", "info@mazannemobilya.com"]} />
            <InfoCard icon={Phone} title="Telefon" lines={["+90 501 570 01 41", "+90 537 298 59 61"]} />
          </div>
        </div>
      </section>

      {/* Split: image / form */}
      <section style={{ padding: "0 0 24px" }}>
        <div style={container}>
          <div className="split">
            {/* Left image */}
            <div className="split-left">
              <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 320, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(0,0,0,.1)", background: "#f3f4f6" }}>
                <img
                  src="/iletisim.jpeg"
                  alt="İletişim görseli"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%",  }}
                />
              </div>
            </div>

            {/* Right form */}
            <div className="split-right">
              <div style={card}>
                <div style={{ margin: "0 auto", maxWidth: 560 }}>
                  <header style={{ marginBottom: 12, textAlign: "center" }}>
                    <h2 style={{ fontSize: 26, margin: 0, fontWeight: 800, color: "#111827",fontFamily: "Poppins, sans-serif" }}>Bir Sorunuz mu Var?</h2>
                    <p style={{ margin: "6px 0 0", color: "#555" }}>Herhangi bir sorunuz veya talebiniz için bize ulaşabilirsiniz.</p>
                  </header>

                  <form ref={formRef} onSubmit={onSubmit} className="form-grid">
                    <div className="col">
                      <label htmlFor="name" style={label}>Adınız*</label>
                      <input id="name" name="name" autoComplete="name" required placeholder="Adınız" style={input} />
                    </div>

                    <div className="col">
                      <label htmlFor="email" style={label}>E‑posta*</label>
                      <input id="email" name="email" type="email" autoComplete="email" inputMode="email" required placeholder="E‑posta adresiniz" style={input} />
                    </div>

                    <div className="col">
                      <label htmlFor="address" style={label}>Adres</label>
                      <input id="address" name="address" autoComplete="street-address" placeholder="Adresiniz" style={input} />
                    </div>

                    <div className="col">
                      <label htmlFor="service" style={label}>Hizmet</label>
                      <ServiceSelect id="service" value={service} onChange={setService} />
                    </div>

                    <div className="col col-span-2">
                      <label htmlFor="note" style={label}>Mesajınız</label>
                      <textarea id="note" name="note" placeholder="Mesajınızı yazın..." style={textarea} />
                    </div>

                    <div className="col col-span-2" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {status === "success" && (
                        <p style={{ display: "flex", alignItems: "center", gap: 8, background: "#ecfdf5", color: "#065f46", borderRadius: 8, padding: "8px 12px", fontSize: 14 }}>
                          <CheckCircle2 style={{ width: 16, height: 16 }} /> Mesajınız alındı. En kısa sürede döneceğiz.
                        </p>
                      )}
                      {status === "error" && (
                        <p style={{ display: "flex", alignItems: "center", gap: 8, background: "#fef2f2", color: "#991b1b", borderRadius: 8, padding: "8px 12px", fontSize: 14 }}>
                          <AlertCircle style={{ width: 16, height: 16 }} /> Lütfen zorunlu alanları kontrol edin ve tekrar deneyin.
                        </p>
                      )}
                    </div>

                    <div className="col col-span-2" style={{ display: "flex", justifyContent: "center", paddingTop: 6 }}>
                      <button type="submit" disabled={loading} style={{ ...btn, opacity: loading ? 0.85 : 1 }}>
                        {loading ? (
                          <>
                            <Loader2 style={{ width: 16, height: 16, marginRight: 6, animation: "spin 1s linear infinite" }} />
                            Gönderiliyor
                          </>
                        ) : (
                          <>Gönder</>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

         <section className="wpo-contact-map-section" style={{ padding: 0 }}>
      <h2 className="sr-only">Contact map</h2>
      <div
        className="wpo-contact-map"
        style={{
          width: "100%",
          height: "500px",
          background: "transparent",
        }}
      >
        <iframe
          title="Mazanne Mobilya Konum"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3822.7699512968898!2d30.685436918222567!3d36.91352423326255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c38fafa98a61ef%3A0xe19d3ac61f1be201!2sMazanne%20Mobilya!5e0!3m2!1str!2str!4v1755171513146!5m2!1str!2str"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          style={{
            inset: 0,
            width: "100%",
            height: "100%",
            border: 0,
            background: "transparent",      // <-- Doğru anahtar ve değer
            filter: "none",                 // Siyahlık varsa filtrelerden de arındırır
          }}
        />
      </div>
    </section>
      <Footer />

      {/* Scoped CSS: layout + responsiveness + utilities (no global) */}
      <style jsx>{`
        :root { --font-sans: var(--font-poppins), ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Noto Sans"; }
        .sr-only{ position:absolute; width:1px; height:1px; margin:-1px; overflow:hidden; clip:rect(0,0,1px,1px); border:0; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .info-grid-inner{ display:grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap:16px; }
        @media (max-width: 1024px){ .info-grid-inner{ grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 640px){ .info-grid-inner{ grid-template-columns: 1fr; } }

        .split{ display:grid; grid-template-columns: 1fr 1fr; gap:16px; align-items: stretch; }
        @media (max-width: 1024px){ .split{ grid-template-columns: 1fr; } }
        .split-left{ min-height: 350px; }

        .form-grid{ display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
        .form-grid .col{ display:flex; flex-direction:column; }
        .form-grid .col-span-2{ grid-column: 1 / -1; }
        @media (max-width: 720px){ .form-grid{ grid-template-columns: 1fr; } }

        .map-box{ position:relative; width:100%; border-radius:16px; overflow:hidden; border:1px solid rgba(0,0,0,.1); background:#f6f7fb; }
        .map-box::before{ content:""; display:block; padding-bottom:56.25%; }
      `}</style>
    </div>
  );
}

/* =====================================================================
   Presentational InfoCard – inline
===================================================================== */
function InfoCard({
  icon: Icon,
  title,
  lines,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties } & any>;
  title: string;
  lines: string[];
}) {
  const wrapper: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.1)",
    background: "#fff",
    padding: 20,
    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
  };
  const bubbleWrap: React.CSSProperties = { position: "relative", display: "grid", placeItems: "center", width: 56, height: 56, borderRadius: 16, background: "#eef2ff", color: "#111" };

  return (
    <div style={wrapper}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={bubbleWrap}>
          <div style={{ position: "absolute", inset: -24, zIndex: -1, borderRadius: 999, background: "rgba(200,200,200,.35)", filter: "blur(16px)" }} />
          <Icon style={{ width: 24, height: 24 }} />
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#111827", fontFamily: "Poppins, sans-serif" }}>{title}</h3>

          {lines.map((l, i) => (
            <p key={i} style={{ margin: 0, color: "#444", lineHeight: 1.6 }}>{l}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
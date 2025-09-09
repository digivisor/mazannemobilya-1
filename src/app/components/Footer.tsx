"use client";

import React from "react";
import Link from "next/link";
import { DM_Sans } from "next/font/google";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

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

export default function Footer() {
  return (
    <footer className={`wpo-site-footer ${dmSans.variable} ${fontBody.variable} ${fontHeading.variable}`}>
      <div className="wpo-upper-footer">
        <div className="container-fluid">
          <div className="row">
            {/* About + Logo */}
            <div className="col col-lg-3 col-md-6 col-sm-12 col-12 scroll-text-animation" data-animation="fade_from_bottom">
              <div className="widget about-widget">
                <div className="logo widget-title">
                  <img alt="logo" src="/mazanne4.png" loading="lazy" decoding="async" />
                </div>
                <p>
                  Mazanne Mobilya; zamansız tasarım, sağlam işçilik ve uzun ömürlü
                  malzemelerle yaşam alanlarınıza değer katar. Evinizin her köşesi
                  için şık ve işlevsel çözümler üretiyoruz.
                </p>
                <div className="social-widget">
                  <ul>
                    <li>
                     
                      <a href="https://www.facebook.com/profile.php?id=61578344554695" target="_blank" aria-label="Facebook" className="soc"><Facebook size={18} strokeWidth={2} /></a>
                      {/* <a href="/" target="_blank" aria-label="Twitter" className="soc"><Twitter size={18} strokeWidth={2} /></a> */}
                      {/* <a href="/" target="_blank" aria-label="LinkedIn" className="soc"><Linkedin size={18} strokeWidth={2} /></a> */}
                      <a href="https://www.instagram.com/mazanne.mobilya" target="_blank" aria-label="Instagram" className="soc"><Instagram size={18} strokeWidth={2} /></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="col col-lg-4 col-md-4 col-sm-12 col-12 scroll-text-animation" data-animation="fade_from_bottom">
              <div className="widget link-widget">
                <div className="widget-title"><h3>İletişim</h3></div>
                <ul>
                  <li>mazannemobilya@gmail.com</li>
                  <li>+90 505 240 68 58</li>
                  <li>Yükseliş, Mehmet Akif Cd. No:88/1,</li>
                  <li>07025 Kepez/Antalya</li>
                </ul>
              </div>
            </div>

            {/* Quick Link */}
            <div className="col col-lg-3 col-md-6 col-sm-12 col-12 scroll-text-animation" data-animation="fade_from_bottom">
              <div className="widget link-widget">
                <div className="widget-title"><h3>Kısa Linkler</h3></div>
                <ul>
                  <li>
                    <a href="/hakkimizda">
                      <span className="rolling-text">
                        <div className="block"><span className="letter">H</span><span className="letter">a</span><span className="letter">k</span><span className="letter">k</span><span className="letter">ı</span><span className="letter">m</span><span className="letter">ı</span><span className="letter">z</span><span className="letter">d</span><span className="letter">a</span></div>
                        <div className="block"><span className="letter">H</span><span className="letter">a</span><span className="letter">k</span><span className="letter">k</span><span className="letter">ı</span><span className="letter">m</span><span className="letter">ı</span><span className="letter">z</span><span className="letter">d</span><span className="letter">a</span></div>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/kategoriler">
                      <span className="rolling-text">
                        <div className="block"><span className="letter">K</span><span className="letter">a</span><span className="letter">t</span><span className="letter">e</span><span className="letter">g</span><span className="letter">o</span><span className="letter">r</span><span className="letter">i</span><span className="letter">l</span><span className="letter">e</span><span className="letter">r</span></div>
                        <div className="block"><span className="letter">K</span><span className="letter">a</span><span className="letter">t</span><span className="letter">e</span><span className="letter">g</span><span className="letter">o</span><span className="letter">r</span><span className="letter">i</span><span className="letter">l</span><span className="letter">e</span><span className="letter">r</span></div>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/iletisim">
                      <span className="rolling-text">
                        <div className="block"><span className="letter">i</span><span className="letter">l</span><span className="letter">e</span><span className="letter">t</span><span className="letter">i</span><span className="letter">ş</span><span className="letter">i</span><span className="letter">m</span></div>
                        <div className="block"><span className="letter">i</span><span className="letter">l</span><span className="letter">e</span><span className="letter">t</span><span className="letter">i</span><span className="letter">ş</span><span className="letter">i</span><span className="letter">m</span></div>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Newsletter (kapalı) */}
          </div>
        </div>
      </div>

      {/* Lower footer */}
      <div className="wpo-lower-footer">
        <div className="container-fluid">
          <div className="row g-0">
            <div className="col col-lg-6 col-12">
              <p className="copyright">
                © {new Date().getFullYear()}{" "}
                <Link target="_blank" style={{ color: "gray" }} href="https://www.digivisor.com.tr">
                  Digivisor Agency tarafından 💚 ile geliştirildi.
                </Link>
              </p>
            </div>
            {/* <div className="col col-lg-6 col-12">
              <ul className="right">
                <li><a href="/privacy"><span className="rolling-text"><div className="block"><span className="letter">p</span><span className="letter">r</span><span className="letter">i</span><span className="letter">v</span><span className="letter">a</span><span className="letter">c</span><span className="letter">y</span><span className="letter">&nbsp;</span><span className="letter">&amp;</span><span className="letter">&nbsp;</span><span className="letter">P</span><span className="letter">o</span><span className="letter">l</span><span className="letter">i</span><span className="letter">c</span><span className="letter">y</span></div><div className="block"><span className="letter">p</span><span className="letter">r</span><span className="letter">i</span><span className="letter">v</span><span className="letter">a</span><span className="letter">c</span><span className="letter">y</span><span className="letter">&nbsp;</span><span className="letter">&amp;</span><span className="letter">&nbsp;</span><span className="letter">P</span><span className="letter">o</span><span className="letter">l</span><span className="letter">i</span><span className="letter">c</span><span className="letter">y</span></div></span></a></li>
                <li><a href="/terms"><span className="rolling-text"><div className="block"><span className="letter">T</span><span className="letter">e</span><span className="letter">r</span><span className="letter">m</span><span className="letter">s</span></div><div className="block"><span className="letter">T</span><span className="letter">e</span><span className="letter">r</span><span className="letter">m</span><span className="letter">s</span></div></span></a></li>
                <li><a href="/about"><span className="rolling-text"><div className="block"><span className="letter">A</span><span className="letter">b</span><span className="letter">o</span><span className="letter">u</span><span className="letter">t</span><span className="letter">&nbsp;</span><span className="letter">u</span><span className="letter">s</span></div><div className="block"><span className="letter">A</span><span className="letter">b</span><span className="letter">o</span><span className="letter">u</span><span className="letter">t</span><span className="letter">&nbsp;</span><span className="letter">u</span><span className="letter">s</span></div></span></a></li>
                <li><a href="/login"><span className="rolling-text"><div className="block"><span className="letter">L</span><span className="letter">o</span><span className="letter">g</span><span className="letter">i</span><span className="letter">n</span></div><div className="block"><span className="letter">L</span><span className="letter">o</span><span className="letter">g</span><span className="letter">i</span><span className="letter">n</span></div></span></a></li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>

      {/* === FOOTER İÇİN GEREKLİ CSS === */}
      <style jsx global>{`
        .wpo-site-footer,
        .wpo-site-footer *{
          -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;
        }
        .wpo-site-footer{ background:#0b0b0b; color:#fff; }
        .wpo-upper-footer{ padding:48px 0 20px; }
        .wpo-lower-footer{ border-top:1px padding:14px 0; }
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
      `}</style>
    </footer>
  );
}





//    {/* ==== FOOTER ==== */}
//       <footer className={`wpo-site-footer ${fontBody.variable} ${fontHeading.variable}`}>
//         <div className="wpo-upper-footer">
//           <div className="container-fluid">
//             <div className="row">
//               {/* About + Logo */}
//               <div className="col col-lg-3 col-md-6 col-sm-12 col-12 scroll-text-animation" data-animation="fade_from_bottom">
//                 <div className="widget about-widget">
//                   <div className="logo widget-title">
//                     <img alt="logo" src="/mazanne4.png" loading="lazy" decoding="async" />
//                   </div>
//                   <p>
//                     Mazanne Mobilya; zamansız tasarım, sağlam işçilik ve uzun ömürlü
//                     malzemelerle yaşam alanlarınıza değer katar. Evinizin her köşesi
//                     için şık ve işlevsel çözümler üretiyoruz.
//                   </p>
//                   <div className="social-widget">
//                     <ul>
//                       <li>
//                         <a href="/home#" aria-label="Facebook" className="soc"><Facebook size={18} strokeWidth={2} /></a>
//                         <a href="/home#" aria-label="Twitter" className="soc"><Twitter size={18} strokeWidth={2} /></a>
//                         <a href="/home#" aria-label="LinkedIn" className="soc"><Linkedin size={18} strokeWidth={2} /></a>
//                         <a href="/home#" aria-label="Instagram" className="soc"><Instagram size={18} strokeWidth={2} /></a>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>

//               {/* Contact */}
//               <div className="col col-lg-4 col-md-4 col-sm-12 col-12 scroll-text-animation" data-animation="fade_from_bottom">
//                 <div className="widget link-widget">
//                   <div className="widget-title"><h3>İletişim</h3></div>
//                   <ul>
//                     <li>mazannemobilya@gmail.com</li>
//                     <li>+905551957476</li>
//                     <li>Yükseliş, Mehmet Akif Cd. No:88/1,</li>
//                     <li>07025 Kepez/Antalya</li>
//                   </ul>
//                 </div>
//               </div>

//               {/* Quick Link */}
//               <div className="col col-lg-3 col-md-6 col-sm-12 col-12 scroll-text-animation" data-animation="fade_from_bottom">
//                 <div className="widget link-widget">
//                   <div className="widget-title"><h3>Kısa Linkler</h3></div>
//                   <ul>
//                     <li>
//                       <a href="/hakkimizda">
//                         <span className="rolling-text">
//                           <div className="block"><span className="letter">H</span><span className="letter">a</span><span className="letter">k</span><span className="letter">k</span><span className="letter">ı</span><span className="letter">m</span><span className="letter">ı</span><span className="letter">z</span><span className="letter">d</span><span className="letter">a</span></div>
//                           <div className="block"><span className="letter">H</span><span className="letter">a</span><span className="letter">k</span><span className="letter">k</span><span className="letter">ı</span><span className="letter">m</span><span className="letter">ı</span><span className="letter">z</span><span className="letter">d</span><span className="letter">a</span></div>
//                         </span>
//                       </a>
//                     </li>
//                     <li>
//                       <a href="/kategoriler">
//                         <span className="rolling-text">
//                           <div className="block"><span className="letter">K</span><span className="letter">a</span><span className="letter">t</span><span className="letter">e</span><span className="letter">g</span><span className="letter">o</span><span className="letter">r</span><span className="letter">i</span><span className="letter">l</span><span className="letter">e</span><span className="letter">r</span></div>
//                           <div className="block"><span className="letter">K</span><span className="letter">a</span><span className="letter">t</span><span className="letter">e</span><span className="letter">g</span><span className="letter">o</span><span className="letter">r</span><span className="letter">i</span><span className="letter">l</span><span className="letter">e</span><span className="letter">r</span></div>
//                         </span>
//                       </a>
//                     </li>
//                     <li>
//                       <a href="/iletisim">
//                         <span className="rolling-text">
//                           <div className="block"><span className="letter">i</span><span className="letter">l</span><span className="letter">e</span><span className="letter">t</span><span className="letter">i</span><span className="letter">ş</span><span className="letter">i</span><span className="letter">m</span></div>
//                           <div className="block"><span className="letter">i</span><span className="letter">l</span><span className="letter">e</span><span className="letter">t</span><span className="letter">i</span><span className="letter">ş</span><span className="letter">i</span><span className="letter">m</span></div>
//                         </span>
//                       </a>
//                     </li>
//                   </ul>
//                 </div>
//               </div>

//               {/* Newsletter (kapalı) */}
//             </div>
//           </div>
//         </div>

//         {/* Lower footer */}
//         <div className="wpo-lower-footer">
//           <div className="container-fluid">
//             <div className="row g-0">
//               <div className="col col-lg-6 col-12">
//                 <p className="copyright">
//                   © {new Date().getFullYear()}{" "}
//                   <Link target="_blank" style={{ color: "gray" }} href="https://www.digivisor.com.tr">
//                     Digivisor Agency tarafından 💚 ile geliştirildi.
//                   </Link>
//                 </p>
//               </div>
//               <div className="col col-lg-6 col-12">
//                 <ul className="right">
//                   <li><a href="/privacy"><span className="rolling-text"><div className="block"><span className="letter">p</span><span className="letter">r</span><span className="letter">i</span><span className="letter">v</span><span className="letter">a</span><span className="letter">c</span><span className="letter">y</span><span className="letter">&nbsp;</span><span className="letter">&amp;</span><span className="letter">&nbsp;</span><span className="letter">P</span><span className="letter">o</span><span className="letter">l</span><span className="letter">i</span><span className="letter">c</span><span className="letter">y</span></div><div className="block"><span className="letter">p</span><span className="letter">r</span><span className="letter">i</span><span className="letter">v</span><span className="letter">a</span><span className="letter">c</span><span className="letter">y</span><span className="letter">&nbsp;</span><span className="letter">&amp;</span><span className="letter">&nbsp;</span><span className="letter">P</span><span className="letter">o</span><span className="letter">l</span><span className="letter">i</span><span className="letter">c</span><span className="letter">y</span></div></span></a></li>
//                   <li><a href="/terms"><span className="rolling-text"><div className="block"><span className="letter">T</span><span className="letter">e</span><span className="letter">r</span><span className="letter">m</span><span className="letter">s</span></div><div className="block"><span className="letter">T</span><span className="letter">e</span><span className="letter">r</span><span className="letter">m</span><span className="letter">s</span></div></span></a></li>
//                   <li><a href="/about"><span className="rolling-text"><div className="block"><span className="letter">A</span><span className="letter">b</span><span className="letter">o</span><span className="letter">u</span><span className="letter">t</span><span className="letter">&nbsp;</span><span className="letter">u</span><span className="letter">s</span></div><div className="block"><span className="letter">A</span><span className="letter">b</span><span className="letter">o</span><span className="letter">u</span><span className="letter">t</span><span className="letter">&nbsp;</span><span className="letter">u</span><span className="letter">s</span></div></span></a></li>
//                   <li><a href="/login"><span className="rolling-text"><div className="block"><span className="letter">L</span><span className="letter">o</span><span className="letter">g</span><span className="letter">i</span><span className="letter">n</span></div><div className="block"><span className="letter">L</span><span className="letter">o</span><span className="letter">g</span><span className="letter">i</span><span className="letter">n</span></div></span></a></li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
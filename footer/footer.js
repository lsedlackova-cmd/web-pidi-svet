// Načte footer a sjednotí s headerem: paddingy, max-width, výška loga.
document.addEventListener("DOMContentLoaded", async () => {
  const mount = document.getElementById("footer");
  if (!mount) return;

  try {
    const res = await fetch("footer/footer.html", { cache: "no-store" });
    const html = await res.text();
    mount.innerHTML = html;
  } catch (e) {
    console.error("Nepodařilo se načíst footer:", e);
    return;
  }

  // Po vložení footeru zarovnáme parametry podle headeru
  function syncWithHeader() {
    const headerInner = document.querySelector(".header-inner");
    const footerInner = document.querySelector(".footer-inner");
    const footer = document.querySelector(".site-footer");
    const headerLogo = document.querySelector(".logo-img"); // logo v headeru

    if (!headerInner || !footerInner || !footer) return;

    const cs = getComputedStyle(headerInner);
    // paddingy a max šířka – přes proměnné, které používá footer.css
    const padLeft = cs.paddingLeft || "24px";
    const padRight = cs.paddingRight || "24px";
    const maxW = cs.maxWidth && cs.maxWidth !== "none"
      ? cs.maxWidth
      : `${headerInner.getBoundingClientRect().width}px`;

    // nastavíme proměnné na :root -> footer si je přečte
    document.documentElement.style.setProperty("--container-pad", padLeft);
    document.documentElement.style.setProperty("--container-max", maxW);

    // výška patičky = výška headeru dle breakpointu (už řeší CSS přes --h-*)
    // Jen sjednotíme výšku loga:
    if (headerLogo) {
      const h = headerLogo.getBoundingClientRect().height || 40;
      document.documentElement.style.setProperty("--footer-logo-h", `${Math.round(h)}px`);
    }
  }

  syncWithHeader();
  window.addEventListener("resize", syncWithHeader);
});


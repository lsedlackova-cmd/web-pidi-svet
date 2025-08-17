// loading-section.js

// Přehled sekcí a jejich souborů v pořadí, jak se mají zobrazit
const sections = [
  { key: "domu",                 html: "domu/domu.html",                               css: "domu/domu.css" },
  { key: "nas-pidi-svet",        html: "nas-pidi-svet/nas-pidi-svet.html",             css: "nas-pidi-svet/nas-pidi-svet.css" },
  { key: "spokojeni-pidilidi",   html: "spokojeni-pidilidi/spokojeni-pidilidi.html",   css: "spokojeni-pidilidi/spokojeni-pidilidi.css" },
  { key: "ozvete-se-nam",        html: "ozvete-se-nam/ozvete-se-nam.html",             css: "ozvete-se-nam/ozvete-se-nam.css" }, // ⬅️ nová sekce
  // ...další sekce můžeš přidat sem (galerie atd.)
];

// Aliasování hash-route (např. #/kontakt -> #/ozvete-se-nam)
const routeAliases = {
  "kontakt": "ozvete-se-nam",
};

/* -------------------- Pomocné funkce -------------------- */

// Připojit CSS jen jednou
function ensureCSS(href) {
  if (!document.querySelector(`link[href="${href}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }
}

// Normalizace cest v HTML: ../img/... nebo /img/... -> img/...
function normalizePaths(html) {
  return html
    .replaceAll('src="../img/', 'src="img/')
    .replaceAll('href="../img/', 'href="img/')
    .replaceAll('src="/img/', 'src="img/')
    .replaceAll('href="/img/', 'href="img/');
}

// Přidá cache-bust parametr k <img src="...">, aby se nevázla stará cache na mobilech
function addCacheBustToImgs(html) {
  const stamp = Date.now();
  return html.replace(/(<img\s+[^>]*src="[^"?]+)(\.[a-zA-Z0-9]+)"/g, `$1$2?v=${stamp}"`);
}

// Nastaví scroll-margin-top wrapperu podle velikosti headeru (desktop/tablet/mobil)
function applyScrollMargin(el) {
  const mqDesktop = window.matchMedia("(min-width:1025px)");
  const mqTablet  = window.matchMedia("(min-width:426px) and (max-width:1024px)");
  // mobil = jinak

  const rootStyle = getComputedStyle(document.documentElement);
  const hDesktop = rootStyle.getPropertyValue("--h-desktop")?.trim() || "72px";
  const hTablet  = rootStyle.getPropertyValue("--h-tablet")?.trim() || "64px";
  const hMobile  = rootStyle.getPropertyValue("--h-mobile")?.trim() || "56px";

  let val = hMobile;
  if (mqDesktop.matches) val = hDesktop;
  else if (mqTablet.matches) val = hTablet;

  el.style.scrollMarginTop = val;
}

// Po změně velikosti okna obnovíme scroll-margin-top na všech vložených sekcích
function refreshAllScrollMargins() {
  document.querySelectorAll(".page-section").forEach(applyScrollMargin);
}

/* -------------------- Načtení všech sekcí -------------------- */

async function loadAllSections() {
  const main = document.getElementById("main");
  if (!main) return;

  main.innerHTML = "";

  for (const section of sections) {
    try {
      const res = await fetch(section.html, { cache: "no-store" });
      const raw = await res.text();

      const html = addCacheBustToImgs(normalizePaths(raw));

      // Wrapper s id pro scroll a třídou na globální styl
      const wrapper = document.createElement("div");
      wrapper.id = section.key;
      wrapper.classList.add("page-section");
      wrapper.innerHTML = html;

      // scroll offset pro pevný header
      applyScrollMargin(wrapper);

      main.appendChild(wrapper);
      ensureCSS(section.css);

      // pokud má sekce svůj vlastní JS, připoj ho také
      const jsPath = `${section.key}/${section.key}.js`;
      fetch(jsPath, { method: "HEAD" })
        .then(res => {
          if (res.ok) {
            const script = document.createElement("script");
            script.src = jsPath;
            document.body.appendChild(script);
          }
        })
        .catch(() => {});
    } catch (e) {
      console.error("Chyba při načítání sekce:", section.key, e);
    }
  }
}

/* -------------------- Routing (hash -> scroll) -------------------- */

function handleRoute() {
  const raw = location.hash.replace(/^#\//, "") || "domu";
  const hash = routeAliases[raw] || raw; // podpora aliasů (např. kontakt -> ozvete-se-nam)
  const target = document.getElementById(hash);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* -------------------- Inicializace -------------------- */

window.addEventListener("DOMContentLoaded", async () => {
  await loadAllSections();
  handleRoute();
  // aktualizuj scroll offset při změně velikosti
  window.addEventListener("resize", refreshAllScrollMargins);
});

window.addEventListener("hashchange", handleRoute);

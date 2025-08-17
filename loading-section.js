// loading-section.js

// Přehled sekcí a jejich souborů
const routes = {
  "": {                          // výchozí route (= Domů)
    html: "domu/domu.html",
    css:  "domu/domu.css"
  },
  "domu": {
    html: "domu/domu.html",
    css:  "domu/domu.css"
  },
  "nas-pidi-svet": {
    html: "nas-pidi-svet/nas-pidi-svet.html",
    css:  "nas-pidi-svet/nas-pidi-svet.css"
  }
};

// Pomocná: připojit CSS jen jednou
function ensureCSS(href) {
  if (!document.querySelector(`link[href="${href}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }
}

// Načtení HTML sekce do <main>
async function loadSection(key) {
  const route = routes[key] ?? routes[""];
  try {
    const res = await fetch(route.html, { cache: "no-store" });
    const html = await res.text();
    const main = document.getElementById("main");
    main.innerHTML = html;
    ensureCSS(route.css);
  } catch (e) {
    console.error("Chyba při načítání sekce:", e);
  }
}

// Router – čte hash #/<sekce>
function handleRoute() {
  const hash = location.hash.replace(/^#\//, "");
  loadSection(hash);
}

// První načtení + změny hash
window.addEventListener("hashchange", handleRoute);
window.addEventListener("DOMContentLoaded", handleRoute);


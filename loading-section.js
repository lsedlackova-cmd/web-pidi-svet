// loading-section.js

// Přehled sekcí a jejich souborů v pořadí, jak se mají zobrazit
const sections = [
  {
    key: "domu",
    html: "domu/domu.html",
    css: "domu/domu.css"
  },
  {
    key: "nas-pidi-svet",
    html: "nas-pidi-svet/nas-pidi-svet.html",
    css: "nas-pidi-svet/nas-pidi-svet.css"
  }
  // později můžeš přidat další sekce: galerie, spokojení pidilidi, ...
];

// Pomocná: připojit CSS jen jednou
function ensureCSS(href) {
  if (!document.querySelector(`link[href="${href}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }
}

// Načtení všech sekcí pod sebe
async function loadAllSections() {
  const main = document.getElementById("main");
  main.innerHTML = ""; // začneme s prázdným kontejnerem

  for (const section of sections) {
    try {
      const res = await fetch(section.html, { cache: "no-store" });
      const html = await res.text();

      // zabalíme sekci do <section> s ID, aby šlo scrollovat přímo na ni
      const wrapper = document.createElement("div");
      wrapper.id = section.key;
      wrapper.classList.add("page-section");
      wrapper.innerHTML = html;

      main.appendChild(wrapper);
      ensureCSS(section.css);
    } catch (e) {
      console.error("Chyba při načítání sekce:", section.key, e);
    }
  }
}

// Scroll na správnou sekci podle hashe (#/domu, #/nas-pidi-svet)
function handleRoute() {
  const hash = location.hash.replace(/^#\//, "") || "domu";
  const target = document.getElementById(hash);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

// Inicializace
window.addEventListener("DOMContentLoaded", async () => {
  await loadAllSections();
  handleRoute();
});

window.addEventListener("hashchange", handleRoute);

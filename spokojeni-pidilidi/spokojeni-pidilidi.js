// Spokojení Pidilidi – automatické přepínání s fade-in/out

const references = [
  {
    text: "Domeček jsme umístili na polici v obýváku a působí jako malý svět plný kouzel. Každý večer se těšíme, až ho rozsvítíme, a ta atmosféra nám přináší klid a radost po celém dni. Byli jsme překvapeni i ukrytou mincí, kterou jsme našli. Takové maličkosti dělají tenhle kousek výjimečným.",
    name: "Lucie S.",
    date: "únor 2025 – Praha"
  },
  {
    text: "Děti si domeček postavily na noční stolek a pokaždé, když ho rozsvítí, mají pocit, že u nich opravdu bydlí malí Pidilidi. Objevili i malou zlatou minci uvnitř a měli z ní obrovskou radost. Teď si vymýšlejí příběhy, co tam jejich Pidilidi dělají.",
    name: "Martin K.",
    date: "leden 2025 – Brno"
  },
  {
    text: "Můj domeček stojí v pracovně a pokaždé, když se cítím unavená, stačí se na něj podívat a hned se mi vybaví klid a teplo domova. Rozsvícené okénko navozuje pocit, že tam někdo opravdu bydlí. Je to kouzelné a hrozně osobní.",
    name: "Petra L.",
    date: "prosinec 2024 – Ostrava"
  },
  {
    text: "Dali jsme domeček na poličku v kuchyni a působí jako malý rituál – když se setmí, rozsvítíme ho a máme pocit, že jsme v pohádce. Našli jsme i schovaný malý klíček a bavíme se tím, co asi otevírá. Je to skvělé, jak takový detail dokáže udělat radost celé rodině.",
    name: "Andrea V.",
    date: "únor 2025 – Plzeň"
  }
];

(() => {
  const section = document.getElementById("spokojeni-pidilidi");
  if (!section) return;

  const refBox = section.querySelector(".spp-reference");
  const quoteEl = section.querySelector(".spp-quote p");
  const metaEl  = section.querySelector(".spp-meta");
  const rating  = section.querySelector(".spp-rating");

  if (!refBox || !quoteEl || !metaEl) return;

  // pojistka – doplň domečky, kdyby v HTML nebyly
  if (rating && rating.children.length === 0) {
    rating.innerHTML = '<span aria-hidden="true">🏠🏠🏠🏠🏠</span>';
  }

  let current = 0;
  const interval = 18000; // ms
  const fadeMs = 600;

  function render(i) {
    const r = references[i];
    quoteEl.textContent = r.text;
    metaEl.textContent  = `${r.name} – ${r.date}`;
  }

  function show(i) {
    refBox.classList.add("fade");     // fade-out
    setTimeout(() => {
      render(i);                      // výměna textu
      refBox.classList.remove("fade");// fade-in
    }, fadeMs);
  }

  // první vykreslení bez fade-out
  render(current);

  // auto přepínání
  setInterval(() => {
    current = (current + 1) % references.length;
    show(current);
  }, interval);
})();


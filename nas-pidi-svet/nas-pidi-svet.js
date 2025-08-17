// Načtení HTML fragmentu do <main id="main">
export async function loadNasPidiSvet() {
  const mount = document.getElementById('main');
  if (!mount) return;
  const res = await fetch('nas-pidi-svet/nas-pidi-svet.html', { cache: 'no-store' });
  mount.innerHTML = await res.text();

  // připojit CSS, pokud ještě není
  const href = 'nas-pidi-svet/nas-pidi-svet.css';
  if (![...document.styleSheets].some(s => s.href && s.href.includes(href))) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
}

// jednoduchá „mini-router“ integrace přes hash
function handleRoute() {
  const h = location.hash;
  if (h === '#/nas-pidi-svet') {
    loadNasPidiSvet();
  }
}
// načti při přímém vstupu i při změně hash
window.addEventListener('hashchange', handleRoute);
handleRoute();

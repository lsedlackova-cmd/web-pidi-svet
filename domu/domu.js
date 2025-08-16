// Načte fragment Domů do <main id="main">
(async () => {
  const mount = document.getElementById('main');
  if (!mount) return;
  const res = await fetch('domu/domu.html', { cache: 'no-store' });
  mount.innerHTML = await res.text();
})();

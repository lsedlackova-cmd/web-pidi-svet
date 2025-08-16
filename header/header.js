// 1) Načtení HTML fragmentu headeru do #header
async function injectHeader() {
  const mount = document.getElementById('header');
  if (!mount) return;

  const res = await fetch('header/header.html', { cache: 'no-store' });
  const html = await res.text();
  mount.innerHTML = html;

  wireHeaderInteractions(mount);
}

// 2) Interakce: otevření/zavření dropdownu a submenu Galerie
function wireHeaderInteractions(root) {
  const toggle = root.querySelector('.menu-toggle');
  const menu = root.querySelector('#main-menu');
  const submenuToggle = root.querySelector('.submenu-toggle');
  const hasSubmenu = root.querySelector('.has-submenu');

  // otevření/skrývání hlavního dropdownu
  toggle?.addEventListener('click', (e) => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      // zavři submenu při každém otevření
      hasSubmenu?.classList.remove('open');
      submenuToggle?.setAttribute('aria-expanded', 'false');
    }
    e.stopPropagation();
  });

  // toggle submenu "Galerie"
  submenuToggle?.addEventListener('click', (e) => {
    hasSubmenu.classList.toggle('open');
    const expanded = hasSubmenu.classList.contains('open');
    submenuToggle.setAttribute('aria-expanded', String(expanded));
    e.stopPropagation();
  });

  // zavření při kliknutí mimo
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      hasSubmenu?.classList.remove('open');
      submenuToggle?.setAttribute('aria-expanded', 'false');
    }
  });

  // zavření ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      hasSubmenu?.classList.remove('open');
      submenuToggle?.setAttribute('aria-expanded', 'false');
    }
  });
}

injectHeader();

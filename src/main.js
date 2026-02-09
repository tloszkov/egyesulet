import i18next from 'i18next';
import Languagedetector from 'i18next-browser-languagedetector';
import './styles/main.css';

// Import translations
import ro from './locales/ro.json';
import hu from './locales/hu.json';
import en from './locales/en.json';

const app = document.getElementById('app');

async function init() {
  await i18next
    .use(Languagedetector)
    .init({
      fallbackLng: 'ro',
      debug: false,
      resources: {
        ro: { translation: ro },
        hu: { translation: hu },
        en: { translation: en }
      }
    });

  render();
}

function t(key) {
  return i18next.t(key);
}

function changeLanguage(lng) {
  i18next.changeLanguage(lng).then(() => {
    render();
  });
}

function render() {
  app.innerHTML = `
    <header>
      <div class="container nav-wrapper">
        <nav>
          <div class="logo-container">
            <img src="/logo.png" alt="Logo" style="height: 48px; width: auto;">
          </div>
          <ul class="nav-links">
            <li><a href="#home">${t('nav.home')}</a></li>
            <li><a href="#about">${t('nav.about')}</a></li>
            <li><a href="#projects">${t('nav.projects')}</a></li>
            <li><a href="#news">${t('nav.news')}</a></li>
            <li><a href="#contact">${t('nav.contact')}</a></li>
          </ul>
          <div class="lang-switcher">
            <button class="lang-btn ${i18next.language.startsWith('ro') ? 'active' : ''}" data-lang="ro">RO</button>
            <button class="lang-btn ${i18next.language.startsWith('hu') ? 'active' : ''}" data-lang="hu">HU</button>
            <button class="lang-btn ${i18next.language.startsWith('en') ? 'active' : ''}" data-lang="en">EN</button>
          </div>
          <button class="mobile-toggle" id="menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </div>
    </header>

    <main>
      <!-- Hero Section -->
      <section id="home" class="hero">
        <div class="container">
          <h1>${t('hero.title1')}<br><span style="color: var(--color-primary)">${t('hero.title2')}</span></h1>
          <p>${t('hero.description')}</p>
          <div class="cta-group">
            <a href="#join" class="btn btn-primary">${t('hero.cta_join')}</a>
            <a href="#contact" class="btn btn-secondary">${t('hero.cta_support')}</a>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section id="about">
        <div class="container">
          <div class="section-title">
            <h2>${t('about.title')}</h2>
            <div style="width: 60px; height: 4px; background: var(--color-primary); margin: 0 auto; border-radius: 2px;"></div>
          </div>
          
          <div class="grid-2" style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 4rem; align-items: start; margin-bottom: 4rem;">
            <div>
              <p style="font-size: 1.15rem; margin-bottom: 2rem; color: var(--text-main); font-weight: 500;">${t('about.description')}</p>
              
              <div style="margin-bottom: 2.5rem;">
                <h3 style="color: var(--color-primary); margin-bottom: 1rem;">${t('about.history_title')}</h3>
                <p>${t('about.history_text')}</p>
              </div>

              <div class="card" style="border-left: 4px solid var(--color-secondary); background: #fdfaff;">
                <h3 style="margin-bottom: 1rem;">${t('about.mission_title')}</h3>
                <p>${t('about.mission_text')}</p>
              </div>
            </div>
            <div style="background: url('/logo.png') center/contain no-repeat; height: 400px; border-radius: 20px; opacity: 0.1;">
            </div>
          </div>

          <!-- Pillars / Activity Areas -->
          <div style="background: white; padding: 3rem; border-radius: 24px; box-shadow: var(--shadow-sm);">
            <h3 style="text-align: center; margin-bottom: 3rem; font-size: 1.75rem;">${t('about.pillars_title')}</h3>
            <div class="grid-3">
              <div style="text-align: center; padding: 1rem;">
                <div style="width: 48px; height: 48px; background: #eff6ff; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: var(--color-primary);">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h4>${t('about.pillar_1')}</h4>
              </div>
              <div style="text-align: center; padding: 1rem;">
                <div style="width: 48px; height: 48px; background: #fef2f2; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: #ef4444;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                </div>
                <h4>${t('about.pillar_2')}</h4>
              </div>
              <div style="text-align: center; padding: 1rem;">
                <div style="width: 48px; height: 48px; background: #f0fdf4; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: #22c55e;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>
                </div>
                <h4>${t('about.pillar_3')}</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Projects Placeholder -->
      <section id="projects" style="background: #fff;">
        <div class="container">
          <div class="section-title">
            <h2>${t('nav.projects')}</h2>
          </div>
          <div class="grid-3">
            <div class="card">
              <div style="background: #f1f5f9; height: 200px; border-radius: 8px; margin-bottom: 1.5rem;"></div>
              <h3>Aktuális Projekt 1</h3>
              <p>Rövid leírás a futó projektről és annak céljairól Cristuru Secuiesc környékén.</p>
            </div>
            <div class="card">
              <div style="background: #f1f5f9; height: 200px; border-radius: 8px; margin-bottom: 1.5rem;"></div>
              <h3>Aktuális Projekt 2</h3>
              <p>Hamarosan kezdődő közösségi program bemutatása.</p>
            </div>
            <div class="card">
              <div style="background: #f1f5f9; height: 200px; border-radius: 8px; margin-bottom: 1.5rem;"></div>
              <h3>Eredményeink</h3>
              <p>Összefoglaló a már lezárt, sikeres kezdeményezéseinkről.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- News / Facebook Placeholder -->
      <section id="news">
        <div class="container">
           <div class="section-title">
            <h2>${t('nav.news')}</h2>
            <p>Friss hírek közvetlenül a Facebook oldalunkról</p>
          </div>
          <div id="fb-feed" style="background: white; padding: 4rem; text-align: center; border-radius: 20px; border: 1px dashed #cbd5e1;">
            <p>Facebook API integráció folyamatban...</p>
          </div>
        </div>
      </section>
    </main>

    <footer style="background: #1e293b; color: white; padding: 4rem 0;">
      <div class="container">
        <div class="grid-3">
          <div>
            <h3>O Șansă Pentru Comunitate</h3>
            <p style="color: #94a3b8; margin-top: 1rem;">Egyesület Cristuru Secuiesc (Székelykeresztúr)</p>
          </div>
          <div>
            <h4>Linkek</h4>
            <ul style="list-style: none; margin-top: 1rem; color: #94a3b8;">
              <li style="margin-bottom: 0.5rem;"><a href="#about" style="color: inherit; text-decoration: none;">Rólunk</a></li>
              <li style="margin-bottom: 0.5rem;"><a href="#projects" style="color: inherit; text-decoration: none;">Projektek</a></li>
              <li style="margin-bottom: 0.5rem;"><a href="#privacy" style="color: inherit; text-decoration: none;">Adatvédelem</a></li>
            </ul>
          </div>
          <div>
            <h4>${t('nav.contact')}</h4>
            <p style="color: #94a3b8; margin-top: 1rem;">${t('contact.address')}</p>
            <p style="color: #94a3b8; margin-top: 0.5rem;">Email: <a href="mailto:${t('contact.email')}" style="color: inherit; text-decoration: none;">${t('contact.email')}</a></p>
            <p style="color: #94a3b8; margin-top: 0.5rem; font-size: 0.9rem;">${t('contact.president')}<br><a href="mailto:${t('contact.president_email')}" style="color: inherit; text-decoration: none;">${t('contact.president_email')}</a></p>
          </div>
        </div>
        <div style="margin-top: 4rem; padding-top: 2rem; border-top: 1px solid #334155; text-align: center; color: #64748b; font-size: 0.9rem;">
          &copy; 2024 Asociația O Șansă Pentru Comunitate. All rights reserved.
        </div>
      </div>
    </footer>
  `;

  // Add event listeners for language switching
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      changeLanguage(e.target.dataset.lang);
    });
  });

  // Mobile menu toggle logic
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Close menu when link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // Sticky header logic
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.padding = '0.5rem 0';
      header.style.boxShadow = 'var(--shadow-md)';
    } else {
      header.style.padding = '1rem 0';
      header.style.boxShadow = 'none';
    }
  });
}

init();

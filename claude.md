# Claude Code - Projekt Irányelvek
## Egy Esély a Közösségért Egyesület Weboldala

### 📋 Projekt Áttekintés
- **Keretrendszer**: Astro
- **Típus**: Nonprofit szervezeti weboldal
- **Nyelvek**: Angol (EN), Magyar (HU), Román (RO)
- **Deploy**: Cloudflare Pages (ospc.ro domain)
- **Git**: GitHub main branch

---

## 🔴 TOP PRIORITÁSOK (Sorrendben)

### 1. Facebook Feed Javítása
- **Probléma**: Behold.so csak Instagramot támogat
- **Megoldás**: Átváltás Curator.io vagy Juicer.io-ra
- **Hely**: NewsSection.astro komponens
- **Célom**: Valódi Facebook posztok automatikus megjelenítése

### 2. 1% / 2% Adófelajánlás Doboz
- **Mik**: Figyelemfelkeltő UI blokk a főoldalon
- **Tartalom**: Letölthető nyilatkozat (vagy online kitöltési segédlet)
- **Célom**: Tax donation awareness és konverzió

### 3. Támogatási Adatok
- **Mik**: Bankszámlaszám, SWIFT kód, adományozási célok
- **Hely**: SupportSection.astro (Form 230 mellé)
- **Célom**: Teljes támogatási infrastruktúra

### 4. Éves Beszámolók / Átláthatóság
- **Mik**: "Letöltések" vagy "Átláthatóság" fül PDF-ekkel
- **Tartalom**: Közhasznúsági jelentések
- **Célom**: Bizalomépítés

### 5. Partnerek Logó-fal
- **Mik**: Támogatók, önkormányzatok, cégek logóinak megjelenítése
- **Stílus**: Grid layout, responsive
- **Célom**: Partneri kapcsolatok hangsúlyozása

### 6. Egyéb Közösség Funkciók
- [ ] Facebook Messenger chat (opcionális)
- [ ] Önkéntes toborzás forma
- [ ] GDPR Privacy Policy oldal + Cookie banner

---

## 🏗️ Astro Best Practices (Projekt Szabályok)

### Komponensek (src/components/)
- ✅ Kis, újrahasználható komponensek
- ✅ Props típusozása (típus-biztonsági célokból)
- ✅ Nem duplikáljunk kódot, layout-ot használjunk
- ✅ Exportáljuk TypeScript-ként (interface Props {...})

### Stílusok (src/styles/)
- ✅ Központi CSS main.css-ben
- ✅ Szín-paletta és tema-konzisztencia
- ✅ Mobile-first responsive design
- ✅ Glassmorphism (üveghatás) premium elemekhez

### i18n (src/i18n/)
- ✅ Fordítások JSON-ban (en.json, hu.json, ro.json)
- ✅ utils.ts segítségével beillesztjük az oldalakon
- ✅ URL-ben a `lang` paraméter: `/en/`, `/hu/`, `/ro/`
- ✅ Fallingback: hu → ro (ha nem létezik fordítás)

### Oldalak (src/pages/)
- ✅ Minden oldal egy .astro fájl
- ✅ Layout.astro használata (header, footer, meta tagek)
- ✅ Sem duplikáció, sem hardcoded szövegek
- ✅ Nyelvváltás: en/, hu/, ro/ mapák

### Performance & SEO
- ✅ Lazy loading képekhez: `loading="lazy"`
- ✅ Meta tagek: title, description, og:image, og:url
- ✅ Képek optimalizálása (JPEG, WebP, SVG)
- ✅ Google Search Console + Analytics konfig

### Kód Stílus
- ✅ Nincsen strict kódolási stílus → Use your best judgment
- ✅ Olvashatatlanság: kerüljük
- ✅ Komponensek: kebab-case (AboutSection.astro)
- ✅ CSS: BEM-hez hasonló megnevezés vagy Tailwind

---

## 📂 Projekt Mappa Szerkezet

```
/src
  ├── components/          # Újrahasználható Astro komponensek
  │   ├── AboutSection.astro
  │   ├── Footer.astro
  │   ├── Header.astro
  │   ├── HomeContent.astro
  │   ├── NewsSection.astro
  │   ├── ProjectsSection.astro
  │   └── SupportSection.astro
  ├── pages/              # Oldal fájlok (automatikus routing)
  │   ├── index.astro
  │   ├── en/, hu/, ro/   # Nyelvváltások
  │   ├── contact.astro
  │   ├── despre-noi.astro
  │   ├── proiecte.astro
  │   ├── stiri.astro
  │   └── sustine-ne.astro
  ├── i18n/               # Többnyelvű fordítások
  │   ├── en.json
  │   ├── hu.json
  │   ├── ro.json
  │   └── utils.ts
  ├── layouts/            # Layout sablonok
  │   └── Layout.astro
  ├── content/            # Tartalom config (Astro Content Collections)
  │   ├── config.ts
  │   └── projects/
  └── styles/             # CSS
      └── main.css
/public                   # Statikus assets (képek, PDF-ek)
.env                      # Titkos kulcsok (GIT-ben NINCS!)
astro.config.mjs          # Astro konfiguráció
```

---

## 🔧 Munkafolyamat Irányelvek

### Commits
- ✅ Git commits: Leszármaztatott munka után
- ✅ Commit üzenetek: Angolul vagy Magyarúl, világos
- ✅ Formátum: `Type: Description` (pl. "Fix: Facebook feed component")

### Branch-ezés
- ✅ Main branch: Production-ready kód
- ✅ Feature branch: Új funkciók (ha nagyobb feladat)
- ✅ PR review: Szükség előtt

### Testing
- ✅ Build teszt: `npm run build`
- ✅ Dev preview: `npm run dev`
- ✅ Mobil teszt: Responsive (Chrome DevTools)

### Deployment
- ✅ Cloudflare Pages auto-deploy a push után
- ✅ Produkció: main branch csak jó kód
- ✅ Domain: ospc.ro irányít a Cloudflare-re

---

## ❓ Gyakori Kérdések

**Q: Milyen CSS-t használunk?**
A: Nincsen strict megkötés. Main.css + inline styles OK.

**Q: Tailwind hozzáadva?**
A: Jelenleg nem. Ha hozzá akarod adni, szóljél!

**Q: Képek hol maradjanak?**
A: `/public` mappa, vagy `/src/assets` (majd importálás)

**Q: Hogyan adok hozzá új oldalt?**
A: Új .astro fájl `/src/pages/`-ben → Astro automatikus routing

**Q: Hogyan adok hozzá új fordítást?**
A: Szöveg a JSON-ba (en.json, hu.json, ro.json) → utils.ts-sel beillesztés

---

## 📝 Utolsó Frissítés
- **Dátum**: 2026-03-10
- **Készítette**: Claude Code
- **Verzió**: v1.0

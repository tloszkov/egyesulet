# Feladatlista / Teendők (TODO) - OSPC Weboldal

Ez a lista összefoglalja a weboldal fejlesztésének aktuális állását és a hátralévő technikai/tartalmi lépéseket.

## 🟢 Elkészült (Done)
- [x] **Alap struktúra**: Vite + Vanilla JS + Modern CSS (Inter font, Glassmorphism).
- [x] **Többnyelvűség (i18n)**: HU, RO, EN nyelvváltó működik.
- [x] **Logó integráció**: Hivatalos logó a helyén, "O Șansă" szöveg eltávolítva a fejlécből.
- [x] **Rólunk szekció**: Kibővítve a hivatalos okiratok alapján (történet, alapítók, pillérek).
- [x] **Elérhetőségek**: `office@ospc.ro` és elnöki e-mail (`kzsolt@ospc.ro`) a láblécben.
- [x] **Deployment**: GitHub repo összekötve a Cloudflare Pages-szel (automatikus build).

## 🟡 Folyamatban / Szükséges (In Progress)
- [ ] **Domain aktiválás**: `ospc.ro` átirányítása az új Pages projektre (a régi projektből való törlés után).
- [ ] **Facebook API Integráció**:
    - [ ] Facebook Developer App létrehozása.
    - [ ] Access Token generálása (posztok olvasásához).
    - [ ] Cloudflare Worker írása a biztonságos API híváshoz.
- [ ] **Tartalomkezelés (Markdown)**:
    - [ ] `content/` mappa struktúra kialakítása.
    - [ ] Dinamikus betöltő írása a projektekhez és hírekhez.

## 🔴 Teendők a USER részéről (User Input Needed)
- [ ] **Projektek adatai**: 1-2 mondatos leírás és képek a futó/lezárt projektekről.
- [ ] **Képek**: Valódi fotók az egyesület életéből a helyőrzők helyére (pl. `about` szekció).
- [ ] **GDPR / Adatvédelem**: Hivatalos adatkezelési tájékoztató szövegének feltöltése.

## 🚀 Jövőbeli tervek (Roadmap)
- [ ] **Adományozási modul**: Interaktív 1% / Banki adatok szekció.
- [ ] **Eseménynaptár**: Közelgő programok listázása.
- [ ] **Önkéntes jelentkezés**: Beépített űrlap az érdeklődőknek.

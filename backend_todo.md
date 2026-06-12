# OSPC Backend – Fejlesztési Lista

**Stack**: Go (Gin vagy Chi router) · SQLite (egyszerű) vagy PostgreSQL · Ubuntu szerver · SSL (Let's Encrypt)  
**Base URL**: pl. `api.ospc.ro` vagy `ospc.ro/api`

---

## 1. Projekt struktúra

```
/backend
  ├── main.go
  ├── config/
  │   └── config.go          # env vars betöltése
  ├── db/
  │   ├── db.go              # kapcsolat, migráció
  │   └── schema.sql         # tábladefiníciók
  ├── handlers/
  │   ├── posts.go           # Facebook poszt API
  │   ├── payments.go        # PayU fizetés
  │   └── contact.go         # Kapcsolatfelvétel (opcionális)
  ├── scheduler/
  │   └── scheduler.go       # Heti FB fetch cron job
  ├── facebook/
  │   └── client.go          # Graph API kliens
  └── payu/
      └── client.go          # PayU API kliens + signature
```

---

## 2. Modulok

### 2.1 Facebook Posts Fetcher (heti cron)

**Cél**: Hetente egyszer lekéri az OSPC Facebook oldal legfrissebb posztjait a Graph API-val, és eltárolja az adatbázisban. A weboldal ebből olvassa — nem az SDK-tól függ.

**Szükséges:**
- [ ] Facebook App létrehozása: developers.facebook.com
- [ ] `Page Access Token` megszerzése az OSPC oldalhoz
- [ ] Long-lived token generálása (60 nap → rendszer felhasználóval végtelen)
- [ ] `PAGE_ID` és `FB_PAGE_TOKEN` env varba

**Graph API hívás:**
```
GET https://graph.facebook.com/v21.0/{PAGE_ID}/posts
  ?fields=id,message,story,full_picture,permalink_url,created_time,
          likes.summary(true),comments.summary(true)
  &limit=10
  &access_token={FB_PAGE_TOKEN}
```

**Cron ütemezés:** Minden vasárnap éjjel 2:00 → `0 2 * * 0`

**Frontend API endpoint:**
```
GET /api/posts          → visszaadja a tárolt posztokat JSON-ban
GET /api/posts?limit=5  → főoldalon csak 5 db
```

---

### 2.2 PayU Fizetési Integráció

**Cél**: A frontend donation formja a Go backendet hívja, amely PayU-val kommunikál és visszaad egy fizetési URL-t, ahova a böngésző átirányít.

**Szükséges:**
- [ ] PayU merchant fiók regisztrálása: payu.ro
- [ ] `MERCHANT_ID` és `SECRET_KEY` megszerzése
- [ ] `PAYU_API_URL` env varba (sandbox: sandbox.payu.ro, éles: secure.payu.ro)

**Folyamat:**
```
Frontend → POST /api/payments/init (összeg, email, név)
         → Go generál HMAC-MD5 signature-t
         → POST PayU /api/v2_1/orders
         → PayU visszaad redirectUri-t
         → Backend visszaküldi a frontendnek
         → Böngésző átirányít → PayU fizetési oldal
         → Fizetés után PayU hív: POST /api/payments/webhook
         → Backend frissíti a payment státuszt
```

**Endpoints:**
```
POST /api/payments/init      → fizetés indítása, visszaad redirectUri-t
POST /api/payments/webhook   → PayU visszahívás (státusz frissítés)
GET  /api/payments/{id}      → fizetés státusz lekérdezése
```

---

### 2.3 Kapcsolatfelvétel (opcionális)

```
POST /api/contact   → name, email, message → email küldés + DB mentés
```

---

## 3. Adatséma

```sql
-- Facebook posztok cache
CREATE TABLE fb_posts (
    id            TEXT PRIMARY KEY,   -- Facebook post ID (pl. "123456_789")
    message       TEXT,               -- poszt szövege
    story         TEXT,               -- automatikus szöveg (pl. "X shared a photo")
    full_picture  TEXT,               -- kép URL (FB CDN)
    permalink_url TEXT,               -- poszt közvetlen linkje
    likes_count   INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    posted_at     TIMESTAMP,          -- mikor jelent meg FB-on
    fetched_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fizetések
CREATE TABLE payments (
    id              TEXT PRIMARY KEY,   -- PayU order ID
    amount          REAL NOT NULL,
    currency        TEXT DEFAULT 'RON',
    status          TEXT DEFAULT 'PENDING',
                    -- PENDING | COMPLETED | FAILED | REFUNDED | CANCELED
    donor_email     TEXT,
    donor_first_name TEXT,
    donor_last_name  TEXT,
    recurring       INTEGER DEFAULT 0, -- 0=egyszeri, 1=ismétlődő
    payu_reference  TEXT,              -- PayU belső referencia
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kapcsolatfelvétel (opcionális)
CREATE TABLE contact_submissions (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT,
    email      TEXT,
    message    TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. Környezeti változók (.env)

```env
# Szerver
PORT=8080
ALLOWED_ORIGINS=https://ospc.ro,https://www.ospc.ro

# Adatbázis
DB_PATH=./ospc.db          # SQLite esetén
# DATABASE_URL=postgres://...  # PostgreSQL esetén

# Facebook
FB_PAGE_TOKEN=EAAxxxxxx...
FB_PAGE_ID=ospcom

# PayU
PAYU_MERCHANT_ID=OSPC_RO
PAYU_SECRET_KEY=xxxxxxxxxxxx
PAYU_API_URL=https://secure.payu.ro   # sandbox: https://sandbox.payu.ro
PAYU_RETURN_URL=https://ospc.ro/thank-you
PAYU_CANCEL_URL=https://ospc.ro/cancel

# Email (opcionális)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=kzsolt82@gmail.com
SMTP_PASS=xxxx
```

---

## 5. Frontend módosítások (ha backend kész)

- [ ] `NewsSection.astro` — FB SDK eltávolítása, `GET /api/posts` hívása
- [ ] `SupportSection.astro` — donation form `POST /api/payments/init`-et hívjon, ne `payu.ro`-ra irányítson
- [ ] Sikeres fizetés után `/thank-you` oldal létrehozása

---

## 6. Deployment (Ubuntu szerver)

- [ ] Go binary build: `GOOS=linux go build -o ospc-backend`
- [ ] systemd service fájl a folyamatos futáshoz
- [ ] Nginx reverse proxy: `api.ospc.ro` → `localhost:8080`
- [ ] SSL: `certbot --nginx -d api.ospc.ro`
- [ ] CORS: csak `ospc.ro` és `www.ospc.ro` engedélyezett

---

## 7. Prioritási sorrend

1. **Facebook fetcher** — legnagyobb látható hatás, azonnal javítja a hírek szekciót
2. **PayU integráció** — fizetési infrastruktúra
3. **Contact form backend** — email küldés
4. **Thank-you oldal** — fizetés utáni visszairányítás

---

*Utolsó frissítés: 2026-06-12*

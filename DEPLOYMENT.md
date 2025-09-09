# Deployment Guide - Salón TAMA

## Príprava na deployment

### 1. Supabase konfigurácia

V súbore `supabase/config.toml` zmeňte:

```toml
[auth]
enabled = true
site_url = "https://yourusername.github.io/yourrepo"
additional_redirect_urls = ["https://lovable.dev", "http://localhost:3000", "https://yourdomain.com"]
```

**Nahraďte:**
- `yourusername` - vaše GitHub používateľské meno
- `yourrepo` - názov vášho repository
- `yourdomain.com` - vašu vlastnú doménu (ak ju máte)

### 2. Supabase Dashboard nastavenia

Idite do Supabase Dashboard:
1. **Authentication > URL Configuration**
   - Site URL: `https://yourusername.github.io/yourrepo`
   - Redirect URLs: pridajte všetky URL kde bude aplikácia bežať

### 3. GitHub Pages deployment

1. Push kód na GitHub
2. Idite do Settings > Pages
3. Vyberte source branch (main/master)
4. Aplikácia bude dostupná na `https://yourusername.github.io/yourrepo`

### 4. Admin prístup

- Admin sekcia je dostupná cez `/admin` odkaz v navigácii
- Ak nie ste prihlásený, presmeruje vás na `/auth`
- Vytvorte si admin účet cez Supabase Dashboard alebo kontaktujte vývojára

### 5. Environment variables

Pre deployment na iných platformách (Vercel, Netlify):
```bash
VITE_SUPABASE_URL=https://hywvxiezdxhvfwqzlcdj.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Riešenie problémov

### "Requested path is invalid" chyba
- Skontrolujte Site URL v Supabase Authentication settings
- Musí presne zodpovedať vašej domain

### Admin sekcia nefunguje
- Skontrolujte či ste pridali správne redirect URLs
- Overte že máte vytvorený admin účet v Supabase

## Kontakt
Pre technické problémy kontaktujte vývojára aplikácie.
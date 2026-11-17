# RAGNAROK: THE NEW WORLD — MASTER SPEC
# All workers MUST follow this spec for consistency.

## STEAM URL
https://store.steampowered.com/app/4212480/Ragnarok_The_New_World/

## ASSET PATHS (all relative to index.html in root)
```
Asset/Gamplay 1.jpg   — Guild PvP battle (1920×1080) → HERO BACKGROUND, GALLERY
Asset/Gamplay 2.jpg   — Raid boss combat (1920×1080) → FEATURES (Combat), GALLERY
Asset/Gamplay 3.jpg   — Halloween event (1920×1080)  → WORLD/EVENTS, GALLERY
Asset/Gamplay 4.jpg   — Wedding social scene (1920×1080) → FEATURES (Social), GALLERY
Asset/Gamplay 5.jpg   — World exploration triptych (1920×1080) → ABOUT, GALLERY
Asset/Gamplay 6.jpg   — Festival plaza (1920×1080)   → FEATURES (Life), GALLERY
Asset/Gamplay 7.jpg   — Sunset coastal world (1920×1080) → WORLD STRIP, CTA BG
Asset/Gamplay 8.webp  — Prontera city hub (1920×1080) → FEATURES (World), GALLERY
Asset/Gamplay 9.webp  — Wardrobe/customization (1920×1080) → FEATURES (Custom), GALLERY
Asset/Gamplay 10.webp — Party group shot (1920×1080) → CLASSES, GALLERY
Asset/Gamplay 11.webp — Cinematic key art (1920×1080) → ABOUT, HERO OVERLAY
Asset/Gamplay 12.jpg  — OFFICIAL LOGO (447×447) → NAV, HERO, FOOTER
Asset/Hero Section.webp — Key art banner → HERO FOREGROUND ART
Asset/Ragnarok Vid 1.56.mp4 — Gameplay trailer → HERO VIDEO BG
Asset/Ragnarok- Vid 2.32.mp4 — Full trailer → VIDEO SECTION
```

## CLASS SECTION ASSIGNMENTS (use gameplay screenshots contextually)
```
Swordsman → Asset/Gamplay 2.jpg (combat/knight imagery)
Mage      → Asset/Gamplay 3.jpg (magical effects)
Archer    → Asset/Gamplay 10.webp (diverse character party)
Acolyte   → Asset/Gamplay 4.jpg (social/support scene)
Merchant  → Asset/Gamplay 8.webp (Prontera marketplace)
```

## PC REQUIREMENTS (from Steam — verify before final)
```
MINIMUM:
OS: Windows 7/8/10 (64-bit)
CPU: Intel Core i5-4460 / AMD FX-6300
RAM: 8 GB
GPU: NVIDIA GeForce GTX 1050 / AMD Radeon RX 570
DirectX: Version 11
Storage: 15 GB available space

RECOMMENDED:
OS: Windows 10 (64-bit)
CPU: Intel Core i7-6700K / AMD Ryzen 5 2600
RAM: 16 GB
GPU: NVIDIA GeForce GTX 1660 / AMD Radeon RX 5500 XT
DirectX: Version 11
Storage: 15 GB available space
```

## CSS CUSTOM PROPERTIES (use these names EXACTLY)
```css
--c-midnight:     #142B40
--c-deep-navy:    #101D2B
--c-fantasy-blue: #315B75
--c-gold:         #D9B66F
--c-gold-hover:   #C9A45F
--c-gold-dim:     rgba(217,182,111,0.15)
--c-gold-border:  rgba(217,182,111,0.22)
--c-ivory:        #E9E3D3
--c-muted:        #8FA8BC
--c-forest:       #26382E
--c-overlay:      rgba(16,29,43,0.75)
--c-overlay-deep: rgba(16,29,43,0.90)
--c-border:       rgba(217,182,111,0.18)
--c-border-mid:   rgba(49,91,117,0.35)

--ff-serif:   'Cinzel', Georgia, serif
--ff-sans:    'Inter', system-ui, sans-serif

Spacing (8pt grid):
--sp-1:4px --sp-2:8px --sp-3:12px --sp-4:16px --sp-5:24px
--sp-6:32px --sp-7:48px --sp-8:64px --sp-9:96px --sp-10:128px

--container-max: 1480px
--container-wide: 100%
--nav-height: 76px
--ease-out: cubic-bezier(0.25,0.46,0.45,0.94)
--ease-inout: cubic-bezier(0.4,0,0.2,1)
--dur-fast: 180ms
--dur-mid: 350ms
--dur-slow: 650ms
```

## HTML CLASS NAMES (BEM — use EXACTLY)
```
.nav .nav__inner .nav__logo .nav__logo-img .nav__links .nav__link .nav__lang .nav__lang-btn .nav__lang-dropdown .nav__lang-option .nav__cta
.hero .hero__video .hero__overlay .hero__content .hero__logo .hero__eyebrow .hero__title .hero__description .hero__ctas .hero__art .hero__scroll
.about .about__inner .about__visual .about__content .about__tag .about__stats .about__stat
.features .features__header .features__grid .feature-card .feature-card__img .feature-card__tag .feature-card__title .feature-card__text
.classes .classes__header .classes__grid .class-card .class-card__bg .class-card__content .class-card__name .class-card__role .class-card__desc
.world .world__inner .world__visual .world__content .world__quote
.gallery .gallery__header .gallery__grid .gallery__item .gallery__item-img .gallery__item-caption
.lightbox .lightbox__overlay .lightbox__img .lightbox__caption .lightbox__close .lightbox__prev .lightbox__next
.requirements .requirements__header .requirements__cols .req-col .req-col__title .req-row .req-row__label .req-row__value
.cta-final .cta-final__bg .cta-final__overlay .cta-final__content
.footer .footer__inner .footer__brand .footer__nav .footer__lang .footer__legal .footer__disclosure
.section-eyebrow .section-title .section-lead
.btn .btn--primary .btn--ghost .btn--large
.reveal .reveal--visible .reveal--delay-1 .reveal--delay-2 .reveal--delay-3
.lang-selector (wrapper)
```

## DATA-I18N KEY SYSTEM
Elements use: data-i18n="key" for textContent
              data-i18n-html="key" for innerHTML  
              data-i18n-label="key" for aria-label
              data-i18n-title="key" for title attribute
              data-i18n-alt="key" for img alt

## ALL I18N KEYS (translation objects MUST have all these)
```javascript
{
  // Navigation
  "nav.home": "Home",
  "nav.about": "About",
  "nav.features": "Features",
  "nav.classes": "Classes",
  "nav.world": "World",
  "nav.gallery": "Gallery",
  "nav.cta": "Play on Steam",
  "nav.lang.label": "Select language",

  // Hero
  "hero.eyebrow": "Free to Play · PC MMORPG · Now on Steam",
  "hero.title": "A New World\nCalls to You",
  "hero.description": "...",
  "hero.cta.primary": "Play Free on Steam",
  "hero.cta.secondary": "Explore the World",

  // About
  "about.eyebrow": "The Legend Reborn",
  "about.title": "An Epic Reimagined\nFor the PC Age",
  "about.description": "...",
  "about.stat.players": "15M+ Players",
  "about.stat.classes": "100+ Job Classes",
  "about.stat.free": "Free to Play",

  // Features
  "features.eyebrow": "What Awaits You",
  "features.title": "Every Path is Yours",
  "feature.world.title": "Open World",
  "feature.world.desc": "...",
  "feature.combat.title": "Epic Combat",
  "feature.combat.desc": "...",
  "feature.classes.title": "Legendary Classes",
  "feature.classes.desc": "...",
  "feature.social.title": "Social & Life",
  "feature.social.desc": "...",
  "feature.events.title": "Seasonal Events",
  "feature.events.desc": "...",
  "feature.custom.title": "Deep Customization",
  "feature.custom.desc": "...",

  // Classes
  "classes.eyebrow": "Choose Your Path",
  "classes.title": "Legendary Job Classes",
  "class.swordsman.name": "Swordsman",
  "class.swordsman.role": "Warrior",
  "class.swordsman.desc": "...",
  "class.mage.name": "Mage",
  "class.mage.role": "Spellcaster",
  "class.mage.desc": "...",
  "class.archer.name": "Archer",
  "class.archer.role": "Ranger",
  "class.archer.desc": "...",
  "class.acolyte.name": "Acolyte",
  "class.acolyte.role": "Support",
  "class.acolyte.desc": "...",
  "class.merchant.name": "Merchant",
  "class.merchant.role": "Craftsman",
  "class.merchant.desc": "...",

  // World
  "world.eyebrow": "The World of Midgard",
  "world.title": "A World Beyond Imagination",
  "world.description": "...",

  // Gallery
  "gallery.eyebrow": "Gallery",
  "gallery.title": "See the World",
  "gallery.close": "Close",
  "gallery.prev": "Previous",
  "gallery.next": "Next",

  // Requirements
  "req.eyebrow": "PC Requirements",
  "req.title": "Built for PC Gaming",
  "req.min.title": "Minimum",
  "req.rec.title": "Recommended",
  "req.os": "Operating System",
  "req.cpu": "Processor",
  "req.ram": "Memory",
  "req.gpu": "Graphics",
  "req.dx": "DirectX",
  "req.storage": "Storage",
  "req.note": "* Specifications sourced from the official Steam store page.",

  // CTA Final
  "cta.eyebrow": "Begin Your Journey",
  "cta.headline": "Your Adventure\nBegins in Midgard",
  "cta.description": "...",
  "cta.button": "Play Free on Steam",
  "cta.note": "Free to Play · Available on PC via Steam",

  // Footer
  "footer.legal.label": "Navigation",
  "footer.copyright": "© 2026 Ragnarok: The New World Fan Page",
  "footer.disclosure": "This is an independent affiliate fan page and is not officially affiliated with or endorsed by Gravity Co., Ltd. All game content, artwork, trademarks and logos are the property of Gravity Co., Ltd. and their respective partners.",

  // Language names (always in native script)
  "lang.en": "English",
  "lang.id": "Bahasa Indonesia",
  "lang.th": "ภาษาไทย",
  "lang.zh": "简体中文",
  "lang.fr": "Français",

  // Accessibility
  "a11y.nav": "Main navigation",
  "a11y.close.lightbox": "Close image viewer",
  "a11y.prev.image": "Previous image",
  "a11y.next.image": "Next image",
  "a11y.open.steam": "Open Ragnarok: The New World on Steam (opens in new tab)",

  // Gallery captions (for alt text and lightbox captions)
  "gallery.cap.1": "Guild Occupation — PvP Castle Battle",
  "gallery.cap.2": "Raid Boss Combat — Dungeon Encounter",
  "gallery.cap.3": "Seasonal Events — Halloween Festival",
  "gallery.cap.4": "Social Life — In-Game Wedding System",
  "gallery.cap.5": "Open World Exploration — Discover Midgard",
  "gallery.cap.6": "Life System — Festival Grounds",
  "gallery.cap.7": "Coastal World — Sailing at Sunset",
  "gallery.cap.8": "Prontera City Hub — Player Marketplace",
  "gallery.cap.9": "Character Wardrobe — Deep Customization",
  "gallery.cap.10": "Adventure — Form Your Party",
  "gallery.cap.11": "Cinematic Key Art — Heroes of Midgard"
}
```

## JS API CONTRACTS

### language.js exports: window.I18n
```javascript
window.I18n = {
  currentLang: 'en',
  supported: ['en', 'id', 'th', 'zh-CN', 'fr'],
  t(key) { return translations[key] || key; },
  setLang(code, persist=true) { ... },
  detectLang() { ... },
  applyTranslations() { ... }
}
```

### gallery.js — Lightbox
```javascript
window.Gallery = {
  init(gridSelector, lightboxId) { ... },
  open(index) { ... },
  close() { ... },
  prev() { ... },
  next() { ... }
}
```

### analytics.js — Tracking
```javascript
window.Analytics = {
  config: { gaId: 'G-XXXXXXXXXX', campaignSource: 'organic' },
  track(event, params) { ... },
  steamClick(location) { ... },
  langSelect(code) { ... },
  sectionView(sectionId) { ... }
}
```

### main.js — Orchestration
```javascript
// Initializes: Nav scroll, smooth scroll, scroll reveal (IntersectionObserver),
// language system, gallery, analytics, back-to-top, parallax strip
// Loads i18n files dynamically via <script> tags
```

## LANGUAGE FILE FORMAT
Each file at js/i18n/XX.js sets:
```javascript
window.RNW_TRANSLATIONS = window.RNW_TRANSLATIONS || {};
window.RNW_TRANSLATIONS['en'] = { /* all keys */ };
```

## FONTS (Google Fonts CDN)
```html
Cinzel: wght@400;700
Inter: wght@300;400;500
Noto Sans Thai: for th locale
Noto Sans SC: for zh-CN locale
```

## SECTION ORDER IN HTML
01 nav
02 #hero
03 #about
04 #features
05 #classes
06 #world
07 #gallery
08 #requirements
09 #cta-final (download)
10 footer
+ .lightbox (after footer, before scripts)
+ #back-to-top button

## GOOGLE FONTS PRECONNECT
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@300;400;500&family=Noto+Sans+Thai:wght@300;400&family=Noto+Sans+SC:wght@300;400&display=swap" rel="stylesheet">
```

## SCRIPT LOADING ORDER (bottom of body)
```html
<script src="js/i18n/en.js"></script>
<script src="js/i18n/id.js"></script>
<script src="js/i18n/th.js"></script>
<script src="js/i18n/zh-CN.js"></script>
<script src="js/i18n/fr.js"></script>
<script src="js/analytics.js"></script>
<script src="js/gallery.js"></script>
<script src="js/language.js"></script>
<script src="js/main.js"></script>
```

/* ════════════════════════════════════════════════════════════════════
   RAGNAROK: THE NEW WORLD — JAVASCRIPT: MAIN CONTROLLER
   Single-Screen 5-Section Switcher (In-Place Stage Transitions)
   Wheel, Keys, Nav, Side Dots, Heros Stage, Gameplay Showcase & Audio
════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var HEROES_DATA = [
    {
      id: 'swordsman',
      name: 'Swordsman',
      roleKey: 'class.swordsman.role',
      nameKey: 'class.swordsman.name',
      descKey: 'class.swordsman.desc',
      charImg: 'Asset/Swordman Character.webp',
      iconActive: 'Asset/Swordman Icon Actif.webp',
      iconInactive: 'Asset/Swordman Icon Inactif.webp',
      stats: { atk: 85, def: 95, rng: 30, mob: 60 },
      skills: ['Magnum Break', 'Bash', 'Iron Defense', 'Endure']
    },
    {
      id: 'mage',
      name: 'Mage',
      roleKey: 'class.mage.role',
      nameKey: 'class.mage.name',
      descKey: 'class.mage.desc',
      charImg: 'Asset/Mage Character.webp',
      iconActive: 'Asset/Mage Icone Actif.webp',
      iconInactive: 'Asset/Mage Icone Inactif.webp',
      stats: { atk: 98, def: 35, rng: 90, mob: 50 },
      skills: ['Fire Pillar', 'Storm Gust', 'Lord of Vermilion', 'Safety Wall']
    },
    {
      id: 'archer',
      name: 'Archer',
      roleKey: 'class.archer.role',
      nameKey: 'class.archer.name',
      descKey: 'class.archer.desc',
      charImg: 'Asset/Archi Character.webp',
      iconActive: 'Asset/Archi Icone Actif.webp',
      iconInactive: 'Asset/Archi Icone Inactif.webp',
      stats: { atk: 90, def: 40, rng: 100, mob: 80 },
      skills: ['Double Strafe', 'Arrow Shower', 'Ankle Snare', 'True Sight']
    },
    {
      id: 'thief',
      name: 'Thief',
      roleKey: 'class.thief.role',
      nameKey: 'class.thief.name',
      descKey: 'class.thief.desc',
      charImg: 'Asset/Theif Character.webp',
      iconActive: 'Asset/Theif Icone Actif.webp',
      iconInactive: 'Asset/Theif Icone Inactif.webp',
      stats: { atk: 92, def: 45, rng: 25, mob: 100 },
      skills: ['Sonic Blow', 'Cloaking', 'Envenom', 'Grimtooth']
    },
    {
      id: 'acolyte',
      name: 'Acolyte',
      roleKey: 'class.acolyte.role',
      nameKey: 'class.acolyte.name',
      descKey: 'class.acolyte.desc',
      charImg: 'Asset/Acolyte Character.webp',
      iconActive: 'Asset/Acolyte Icone Actif.webp',
      iconInactive: 'Asset/Acolyte Icone Inactif.webp',
      stats: { atk: 40, def: 70, rng: 70, mob: 55 },
      skills: ['Sanctuary', 'Blessing', 'Kyrie Eleison', 'Resurrection']
    },
    {
      id: 'merchant',
      name: 'Merchant',
      roleKey: 'class.merchant.role',
      nameKey: 'class.merchant.name',
      descKey: 'class.merchant.desc',
      charImg: 'Asset/Merchant Character.webp',
      iconActive: 'Asset/Merchant Icone Actif.webp',
      iconInactive: 'Asset/Merchant  Icone Inactif.webp', // Note two spaces in asset filename
      stats: { atk: 88, def: 80, rng: 30, mob: 55 },
      skills: ['Mammonite', 'Cart Revolution', 'Crazy Uproar', 'Vending']
    },
    {
      id: 'gunslinger',
      name: 'Gunslinger',
      roleKey: 'class.gunslinger.role',
      nameKey: 'class.gunslinger.name',
      descKey: 'class.gunslinger.desc',
      charImg: 'Asset/Gunslinger Character.webp',
      iconActive: 'Asset/Gunslinger Icone Actif.webp',
      iconInactive: 'Asset/Gunslinger Icone Inactif.webp',
      stats: { atk: 95, def: 50, rng: 85, mob: 85 },
      skills: ['Desperado', 'Trigger Happy', 'Rapid Shower', 'Gatling Fever']
    },
    {
      id: 'druid',
      name: 'Druid',
      roleKey: 'class.druid.role',
      nameKey: 'class.druid.name',
      descKey: 'class.druid.desc',
      charImg: 'Asset/Druid Character.webp',
      iconActive: 'Asset/Druid Icone Actif.webp',
      iconInactive: 'Asset/Druid Icone Inactif.webp',
      stats: { atk: 80, def: 85, rng: 55, mob: 75 },
      skills: ['Primal Roar', 'Yggdrasil Roots', 'Beast Aspect', 'Regrowth']
    }
  ];

  var App = {
    sectionViews: [],
    currentSectionIndex: 0,
    isThrottled: false,
    scrollCooldown: 650,

    currentHeroIndex: 0,
    currentGameplaySrc: 'Asset/Gamplay 2.jpg',

    init: function () {
      this.cacheDOM();
      this.initSectionSwitcher();
      this.initHerosShowcase();
      this.initGameplayShowcase();
      this.initAudioPlayer();
      this.initTrailerModal();
      this.initSteamTracking();
    },

    cacheDOM: function () {
      this.sectionViews = Array.prototype.slice.call(document.querySelectorAll('.section-view'));
    },

    // ──────────────────────────────────────────
    // 1. IN-PLACE 5-SECTION SWITCHER
    // ──────────────────────────────────────────
    initSectionSwitcher: function () {
      var self = this;

      // Wheel Navigation with smooth debouncing
      window.addEventListener('wheel', function (e) {
        if (document.querySelector('.lightbox--open') || document.querySelector('.trailer-modal--open')) return;

        if (self.isThrottled) {
          e.preventDefault();
          return;
        }

        var delta = e.deltaY;
        if (Math.abs(delta) < 25) return;

        if (delta > 0 && self.currentSectionIndex < self.sectionViews.length - 1) {
          e.preventDefault();
          self.goToSection(self.currentSectionIndex + 1);
        } else if (delta < 0 && self.currentSectionIndex > 0) {
          e.preventDefault();
          self.goToSection(self.currentSectionIndex - 1);
        }
      }, { passive: false });

      // Keyboard Arrow & Page Navigation
      window.addEventListener('keydown', function (e) {
        if (document.querySelector('.lightbox--open') || document.querySelector('.trailer-modal--open')) return;

        if (['ArrowDown', 'PageDown'].indexOf(e.key) !== -1) {
          if (self.currentSectionIndex < self.sectionViews.length - 1) {
            e.preventDefault();
            self.goToSection(self.currentSectionIndex + 1);
          }
        } else if (['ArrowUp', 'PageUp'].indexOf(e.key) !== -1) {
          if (self.currentSectionIndex > 0) {
            e.preventDefault();
            self.goToSection(self.currentSectionIndex - 1);
          }
        } else if (e.key === 'Home') {
          e.preventDefault();
          self.goToSection(0);
        } else if (e.key === 'End') {
          e.preventDefault();
          self.goToSection(self.sectionViews.length - 1);
        }
      });

      // Target buttons (Top Navigation, Side Dots, More Info, Brand Logo)
      document.addEventListener('click', function (e) {
        var trigger = e.target.closest('[data-section-target]');
        if (!trigger) return;

        e.preventDefault();
        var targetIndex = parseInt(trigger.getAttribute('data-section-target'), 10);
        if (!isNaN(targetIndex)) {
          self.goToSection(targetIndex);
        }
      });
    },

    goToSection: function (index) {
      if (index < 0 || index >= this.sectionViews.length) return;
      if (index === this.currentSectionIndex && this.sectionViews[index].classList.contains('section-view--active')) return;

      var self = this;
      this.isThrottled = true;

      // Update Section View Containers
      this.sectionViews.forEach(function (view, idx) {
        if (idx === index) {
          view.classList.add('section-view--active');
        } else {
          view.classList.remove('section-view--active');
        }
      });

      this.currentSectionIndex = index;
      this.updateIndicators(index);

      // Track section view in analytics
      if (window.Analytics && typeof window.Analytics.trackEvent === 'function') {
        var sectionNames = ['home', 'gameplay', 'heros', 'requirements', 'download'];
        window.Analytics.trackEvent('section_change', {
          index: index,
          name: sectionNames[index] || 'unknown'
        });
      }

      setTimeout(function () {
        self.isThrottled = false;
      }, this.scrollCooldown);
    },

    updateIndicators: function (activeIndex) {
      // Top Navigation links
      var navButtons = document.querySelectorAll('.nav__menu .nav__link');
      navButtons.forEach(function (btn, idx) {
        btn.classList.toggle('nav__link--active', idx === activeIndex);
      });

      // Side Dots
      var sideDots = document.querySelectorAll('.side-nav__dot');
      sideDots.forEach(function (dot, idx) {
        dot.classList.toggle('side-nav__dot--active', idx === activeIndex);
      });
    },

    // ──────────────────────────────────────────
    // 2. HEROS SHOWCASE CONTROLLER (8 OFFICIAL CLASSES)
    // ──────────────────────────────────────────
    initHerosShowcase: function () {
      var self = this;
      var iconColumn = document.getElementById('herosIconColumn');
      var prevBtn = document.getElementById('heroPrevBtn');
      var NextBtn = document.getElementById('heroNextBtn');

      if (iconColumn) {
        iconColumn.addEventListener('click', function (e) {
          var btn = e.target.closest('.hero-icon-btn');
          if (!btn) return;

          var index = parseInt(btn.getAttribute('data-hero-index'), 10);
          if (!isNaN(index)) {
            self.selectHero(index);
          }
        });
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', function () {
          var prevIndex = (self.currentHeroIndex - 1 + HEROES_DATA.length) % HEROES_DATA.length;
          self.selectHero(prevIndex);
        });
      }

      if (NextBtn) {
        NextBtn.addEventListener('click', function () {
          var nextIndex = (self.currentHeroIndex + 1) % HEROES_DATA.length;
          self.selectHero(nextIndex);
        });
      }

      // Re-render hero textual descriptions when language changes
      window.addEventListener('rnw:languageChanged', function () {
        self.renderHeroText(self.currentHeroIndex);
      });

      // Initial hero rendering
      this.selectHero(0);
    },

    selectHero: function (index) {
      if (index < 0 || index >= HEROES_DATA.length) return;
      this.currentHeroIndex = index;
      var hero = HEROES_DATA[index];

      // Update Icon Buttons (Toggle Active vs Inactive Icon Assets)
      var iconButtons = document.querySelectorAll('.hero-icon-btn');
      iconButtons.forEach(function (btn, idx) {
        var heroItem = HEROES_DATA[idx];
        var isActive = idx === index;
        btn.classList.toggle('hero-icon-btn--active', isActive);

        var img = btn.querySelector('.hero-icon-btn__img');
        if (img && heroItem) {
          img.src = isActive ? heroItem.iconActive : heroItem.iconInactive;
        }
      });

      // Update Character Center Cutout Art with smooth breathing animation reset
      var charImg = document.getElementById('heroCharArt');
      if (charImg) {
        charImg.style.opacity = '0';
        charImg.style.transform = 'translateY(12px) scale(0.96)';
        setTimeout(function () {
          charImg.src = hero.charImg;
          charImg.alt = hero.name + ' Hero Character';
          charImg.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          charImg.style.opacity = '1';
          charImg.style.transform = 'translateY(0) scale(1)';
        }, 150);
      }

      // Render Text Content (Role, Name, Desc)
      this.renderHeroText(index);

      // Animate Combat Attribute Bars
      var statAtk = document.getElementById('statAtk');
      var statDef = document.getElementById('statDef');
      var statRng = document.getElementById('statRng');
      var statMob = document.getElementById('statMob');

      if (statAtk) statAtk.style.width = hero.stats.atk + '%';
      if (statDef) statDef.style.width = hero.stats.def + '%';
      if (statRng) statRng.style.width = hero.stats.rng + '%';
      if (statMob) statMob.style.width = hero.stats.mob + '%';

      // Render Skill Pills
      var skillsContainer = document.getElementById('heroSkillsList');
      if (skillsContainer) {
        skillsContainer.innerHTML = '';
        hero.skills.forEach(function (skillName) {
          var pill = document.createElement('span');
          pill.className = 'hero-skill-pill';
          pill.textContent = skillName;
          skillsContainer.appendChild(pill);
        });
      }
    },

    renderHeroText: function (index) {
      var hero = HEROES_DATA[index];
      if (!hero) return;

      var roleEl = document.getElementById('heroCharRole');
      var nameEl = document.getElementById('heroCharName');
      var descEl = document.getElementById('heroCharDesc');

      var roleText = (window.I18n ? window.I18n.t(hero.roleKey) : '') || hero.roleKey;
      var nameText = (window.I18n ? window.I18n.t(hero.nameKey) : '') || hero.name;
      var descText = (window.I18n ? window.I18n.t(hero.descKey) : '') || hero.descKey;

      if (roleEl) roleEl.textContent = roleText;
      if (nameEl) nameEl.textContent = nameText;
      if (descEl) descEl.textContent = descText;
    },

    // ──────────────────────────────────────────
    // 3. GAMEPLAY SHOWCASE CONTROLLER
    // ──────────────────────────────────────────
    initGameplayShowcase: function () {
      var self = this;
      var categoryList = document.getElementById('gameplayCategoryList');
      var expandBtn = document.getElementById('gameplayExpandBtn');
      var viewerImg = document.getElementById('gameplayViewerImg');
      var viewerTitle = document.getElementById('gameplayViewerTitle');
      var viewerDesc = document.getElementById('gameplayViewerDesc');

      if (categoryList) {
        categoryList.addEventListener('click', function (e) {
          var btn = e.target.closest('.gameplay-cat-btn');
          if (!btn) return;

          // Toggle active class
          var allBtns = categoryList.querySelectorAll('.gameplay-cat-btn');
          allBtns.forEach(function (b) { b.classList.remove('gameplay-cat-btn--active'); });
          btn.classList.add('gameplay-cat-btn--active');

          var imgSrc = btn.getAttribute('data-img');
          var title = btn.getAttribute('data-title');
          var desc = btn.getAttribute('data-desc');

          self.currentGameplaySrc = imgSrc;

          if (viewerImg) {
            viewerImg.style.opacity = '0.3';
            viewerImg.src = imgSrc;
            viewerImg.onload = function () {
              viewerImg.style.opacity = '1';
            };
          }

          if (viewerTitle) viewerTitle.textContent = title;
          if (viewerDesc) viewerDesc.textContent = desc;
        });
      }

      // Expand to Fullscreen Lightbox
      if (expandBtn) {
        expandBtn.addEventListener('click', function () {
          if (window.Gallery && typeof window.Gallery.openBySrc === 'function') {
            window.Gallery.openBySrc(self.currentGameplaySrc);
          }
        });
      }

      if (viewerImg) {
        viewerImg.addEventListener('click', function () {
          if (window.Gallery && typeof window.Gallery.openBySrc === 'function') {
            window.Gallery.openBySrc(self.currentGameplaySrc);
          }
        });
      }
    },

    // ──────────────────────────────────────────
    // 4. BACKGROUND THEME MUSIC PLAYER
    // ──────────────────────────────────────────
    initAudioPlayer: function () {
      var audio = document.getElementById('bgAudio');
      var btn = document.getElementById('audioToggleBtn');
      if (!audio || !btn) return;

      var iconUnmuted = btn.querySelector('.icon-unmuted');
      var iconMuted = btn.querySelector('.icon-muted');

      function updateIcon(isPlaying) {
        if (isPlaying) {
          if (iconUnmuted) iconUnmuted.style.display = 'block';
          if (iconMuted) iconMuted.style.display = 'none';
          btn.setAttribute('title', 'Pause Sound');
        } else {
          if (iconUnmuted) iconUnmuted.style.display = 'none';
          if (iconMuted) iconMuted.style.display = 'block';
          btn.setAttribute('title', 'Play Sound');
        }
      }

      btn.addEventListener('click', function () {
        if (audio.paused) {
          audio.volume = 0.5;
          audio.play().then(function () {
            updateIcon(true);
          }).catch(function () {});
        } else {
          audio.pause();
          updateIcon(false);
        }
      });
    },

    // ──────────────────────────────────────────
    // 5. OFFICIAL TRAILER VIDEO MODAL
    // ──────────────────────────────────────────
    initTrailerModal: function () {
      var playBtn = document.getElementById('heroPlayBtn');
      var modal = document.getElementById('trailerModal');
      var bgAudio = document.getElementById('bgAudio');
      if (!modal) return;

      var closeBtn = modal.querySelector('.trailer-modal__close');
      var backdrop = modal.querySelector('.trailer-modal__backdrop');
      var video = modal.querySelector('.trailer-modal__video');
      var wasAudioPlaying = false;

      function openModal() {
        modal.classList.add('trailer-modal--open');
        modal.setAttribute('aria-hidden', 'false');

        // Pause background music during trailer
        if (bgAudio && !bgAudio.paused) {
          wasAudioPlaying = true;
          bgAudio.pause();
        } else {
          wasAudioPlaying = false;
        }

        if (video) {
          video.currentTime = 0;
          video.volume = 0.85;
          video.play().catch(function () {});
        }

        if (window.Analytics && typeof window.Analytics.trackEvent === 'function') {
          window.Analytics.trackEvent('trailer_modal_opened', { source: 'hero_center_play' });
        }
      }

      function closeModal() {
        modal.classList.remove('trailer-modal--open');
        modal.setAttribute('aria-hidden', 'true');

        if (video) {
          video.pause();
        }

        // Resume background audio if it was playing before
        if (bgAudio && wasAudioPlaying) {
          bgAudio.play().catch(function () {});
        }
      }

      if (playBtn) playBtn.addEventListener('click', openModal);
      if (closeBtn) closeBtn.addEventListener('click', closeModal);
      if (backdrop) backdrop.addEventListener('click', closeModal);

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('trailer-modal--open')) {
          closeModal();
        }
      });
    },

    // ──────────────────────────────────────────
    // 6. STEAM CONVERSION TRACKING
    // ──────────────────────────────────────────
    initSteamTracking: function () {
      var steamButtons = document.querySelectorAll('[data-steam-cta]');
      steamButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var ctaName = this.getAttribute('data-steam-cta') || 'unknown';
          if (window.Analytics && typeof window.Analytics.trackSteamClick === 'function') {
            window.Analytics.trackSteamClick(ctaName);
          }
        });
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      App.init();
    });
  } else {
    App.init();
  }
})();

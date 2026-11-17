/* ════════════════════════════════════════════════════════════════════
   RAGNAROK: THE NEW WORLD — JAVASCRIPT: DESKTOP GALLERY & LIGHTBOX
   Modal View, Keyboard Navigation (Esc, Left, Right), Accessible Dialog
════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var DEFAULT_ITEMS = [
    { src: 'Asset/Gamplay 1.jpg', captionKey: 'gallery.cap.1', fallbackCaption: 'Guild Occupation — Castle Courtyard PvP Siege' },
    { src: 'Asset/Gamplay 2.jpg', captionKey: 'gallery.cap.2', fallbackCaption: 'Raid Boss Encounter — Dark Sanctuary Confrontation' },
    { src: 'Asset/Gamplay 3.jpg', captionKey: 'gallery.cap.3', fallbackCaption: 'Spooky Carnival — Seasonal Festival Event' },
    { src: 'Asset/Gamplay 4.jpg', captionKey: 'gallery.cap.4', fallbackCaption: 'Royal Wedding — Garden Celebration of Bonds' },
    { src: 'Asset/Gamplay 5.jpg', captionKey: 'gallery.cap.5', fallbackCaption: 'Boundless Horizons — Climbing, Swimming & Soaring' },
    { src: 'Asset/Gamplay 6.jpg', captionKey: 'gallery.cap.6', fallbackCaption: 'Prontera Festival — Fairground Attractions & Games' },
    { src: 'Asset/Gamplay 7.jpg', captionKey: 'gallery.cap.7', fallbackCaption: 'Coastal Port at Twilight — Sunset Over the Bay' },
    { src: 'Asset/Gamplay 8.webp', captionKey: 'gallery.cap.8', fallbackCaption: 'Central Prontera — Bustling Player Marketplace' },
    { src: 'Asset/Gamplay 9.webp', captionKey: 'feature.custom.title', fallbackCaption: 'Wardrobe & Character Customization' },
    { src: 'Asset/Gamplay 10.webp', captionKey: 'world.eyebrow', fallbackCaption: 'Midgard Adventurers Exploration' },
    { src: 'Asset/Gamplay 11.webp', captionKey: 'about.title', fallbackCaption: 'Heroes Assembled — The Reborn Legend' },
    { src: 'Asset/Gamplay 12.jpg', captionKey: 'world.quote', fallbackCaption: 'Midgard Majestic Landscapes' },
    { src: 'Asset/Gamplay 13.jpg', captionKey: 'features.title', fallbackCaption: 'Tactical Team Battles & Dungeons' },
    { src: 'Asset/Gamplay 14.jpg', captionKey: 'gallery.cap.9', fallbackCaption: 'Key Art Panorama — New Friends, New Bonds, New World' }
  ];

  var Gallery = {
    items: [],
    currentIndex: 0,
    isOpen: false,

    // DOM references
    modal: null,
    backdrop: null,
    img: null,
    caption: null,
    counter: null,
    btnClose: null,
    btnPrev: null,
    btnNext: null,

    init: function () {
      this.cacheDOM();
      this.collectItems();
      this.bindEvents();
    },

    cacheDOM: function () {
      this.modal = document.getElementById('lightboxModal');
      if (!this.modal) return;

      this.backdrop = this.modal.querySelector('.lightbox__backdrop');
      this.img = this.modal.querySelector('.lightbox__img');
      this.caption = this.modal.querySelector('.lightbox__caption');
      this.counter = this.modal.querySelector('.lightbox__counter');
      this.btnClose = this.modal.querySelector('.lightbox__btn--close');
      this.btnPrev = this.modal.querySelector('.lightbox__btn--prev');
      this.btnNext = this.modal.querySelector('.lightbox__btn--next');
    },

    collectItems: function () {
      var self = this;
      var galleryElements = document.querySelectorAll('.gallery__item');

      if (galleryElements.length > 0) {
        this.items = [];
        galleryElements.forEach(function (el, index) {
          var imgEl = el.querySelector('.gallery__item-img');
          var captionEl = el.querySelector('.gallery__item-caption');
          var src = imgEl ? (imgEl.getAttribute('data-full') || imgEl.getAttribute('src')) : '';
          var captionKey = captionEl ? captionEl.getAttribute('data-i18n') : '';
          var captionText = captionEl ? captionEl.textContent : '';

          self.items.push({
            src: src,
            captionKey: captionKey,
            fallbackCaption: captionText,
            element: el
          });

          el.setAttribute('tabindex', '0');
          el.setAttribute('role', 'button');
          el.setAttribute('aria-haspopup', 'dialog');

          el.addEventListener('click', function () {
            self.open(index);
          });
        });
      } else {
        // Fall back to complete gameplay collection
        this.items = DEFAULT_ITEMS.slice();
      }
    },

    openBySrc: function (src) {
      if (!src) return;
      var normalizedSrc = src.replace(/\\/g, '/');
      var foundIndex = -1;
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].src === normalizedSrc || this.items[i].src.indexOf(normalizedSrc) !== -1 || normalizedSrc.indexOf(this.items[i].src) !== -1) {
          foundIndex = i;
          break;
        }
      }
      this.open(foundIndex !== -1 ? foundIndex : 0);
    },

    open: function (index) {
      if (!this.modal || !this.items.length) return;

      this.currentIndex = ((index % this.items.length) + this.items.length) % this.items.length;
      this.isOpen = true;

      this.updateContent();

      this.modal.classList.add('lightbox--open');
      this.modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      if (this.btnClose) {
        this.btnClose.focus();
      }

      if (window.Analytics && typeof window.Analytics.trackGalleryOpen === 'function') {
        window.Analytics.trackGalleryOpen(this.currentIndex + 1, this.getCurrentCaption());
      }
    },

    close: function () {
      if (!this.isOpen) return;

      this.isOpen = false;
      this.modal.classList.remove('lightbox--open');
      this.modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    },

    prev: function () {
      if (!this.isOpen || !this.items.length) return;
      this.open(this.currentIndex - 1);
    },

    next: function () {
      if (!this.isOpen || !this.items.length) return;
      this.open(this.currentIndex + 1);
    },

    getCurrentCaption: function () {
      var item = this.items[this.currentIndex];
      if (!item) return '';

      if (item.captionKey && window.I18n) {
        return window.I18n.t(item.captionKey);
      }
      return item.fallbackCaption;
    },

    updateContent: function () {
      var item = this.items[this.currentIndex];
      if (!item) return;

      var self = this;
      var captionText = this.getCurrentCaption();

      if (this.img) {
        this.img.style.opacity = '0.3';
        this.img.src = item.src;
        this.img.alt = captionText;

        this.img.onload = function () {
          self.img.style.opacity = '1';
        };
      }

      if (this.caption) {
        this.caption.textContent = captionText;
      }

      if (this.counter) {
        this.counter.textContent = (this.currentIndex + 1) + ' / ' + this.items.length;
      }
    },

    bindEvents: function () {
      var self = this;

      if (this.btnClose) {
        this.btnClose.addEventListener('click', function () {
          self.close();
        });
      }

      if (this.backdrop) {
        this.backdrop.addEventListener('click', function () {
          self.close();
        });
      }

      if (this.btnPrev) {
        this.btnPrev.addEventListener('click', function (e) {
          e.stopPropagation();
          self.prev();
        });
      }

      if (this.btnNext) {
        this.btnNext.addEventListener('click', function (e) {
          e.stopPropagation();
          self.next();
        });
      }

      // Keyboard handler
      document.addEventListener('keydown', function (e) {
        if (!self.isOpen) return;

        if (e.key === 'Escape') {
          e.preventDefault();
          self.close();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          self.prev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          self.next();
        }
      });

      // Update caption if language changes while lightbox is open
      window.addEventListener('rnw:languageChanged', function () {
        if (self.isOpen) {
          self.updateContent();
        }
      });
    }
  };

  window.Gallery = Gallery;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      Gallery.init();
    });
  } else {
    Gallery.init();
  }
})();

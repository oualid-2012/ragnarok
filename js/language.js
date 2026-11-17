/* ════════════════════════════════════════════════════════════════════
   RAGNAROK: THE NEW WORLD — JAVASCRIPT: LANGUAGE SYSTEM
   Automatic Detection, LocalStorage Persistence, Native Language Names
   No Emojis, No Flags, No External APIs
════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var STORAGE_KEY = 'rnw_preferred_lang';
  var SUPPORTED_LANGS = ['en', 'id', 'th', 'zh-CN', 'fr'];
  var DEFAULT_LANG = 'en';

  var NATIVE_NAMES = {
    'en': 'English',
    'id': 'Bahasa Indonesia',
    'th': 'ภาษาไทย',
    'zh-CN': '简体中文',
    'fr': 'Français'
  };

  var I18n = {
    currentLang: DEFAULT_LANG,

    init: function () {
      var saved = this.getSavedLang();
      var langToUse = saved || this.detectBrowserLang();

      if (SUPPORTED_LANGS.indexOf(langToUse) === -1) {
        langToUse = DEFAULT_LANG;
      }

      this.setLanguage(langToUse, false);
      this.bindEvents();
    },

    getSavedLang: function () {
      try {
        return localStorage.getItem(STORAGE_KEY);
      } catch (e) {
        return null;
      }
    },

    saveLang: function (lang) {
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (e) {}
    },

    detectBrowserLang: function () {
      var candidates = [];

      if (navigator.languages && navigator.languages.length) {
        for (var i = 0; i < navigator.languages.length; i++) {
          candidates.push(navigator.languages[i].toLowerCase());
        }
      }

      if (navigator.language) {
        candidates.push(navigator.language.toLowerCase());
      }

      for (var j = 0; j < candidates.length; j++) {
        var c = candidates[j];
        if (c.indexOf('th') === 0) return 'th';
        if (c.indexOf('id') === 0 || c.indexOf('in') === 0) return 'id';
        if (c.indexOf('zh') === 0) return 'zh-CN';
        if (c.indexOf('fr') === 0) return 'fr';
        if (c.indexOf('en') === 0) return 'en';
      }

      return DEFAULT_LANG;
    },

    t: function (key) {
      var dict = (window.RNW_TRANSLATIONS && window.RNW_TRANSLATIONS[this.currentLang]) || {};
      if (dict[key] !== undefined) {
        return dict[key];
      }

      // Fallback to English dictionary
      var fallbackDict = (window.RNW_TRANSLATIONS && window.RNW_TRANSLATIONS[DEFAULT_LANG]) || {};
      return fallbackDict[key] !== undefined ? fallbackDict[key] : key;
    },

    setLanguage: function (lang, isManual) {
      if (SUPPORTED_LANGS.indexOf(lang) === -1) {
        lang = DEFAULT_LANG;
      }

      this.currentLang = lang;

      if (isManual) {
        this.saveLang(lang);
        if (window.Analytics && typeof window.Analytics.trackLanguageChange === 'function') {
          window.Analytics.trackLanguageChange(lang);
        }
      }

      // Update HTML lang attribute
      document.documentElement.setAttribute('lang', lang);

      // Update document title if meta.title translation exists
      var pageTitle = this.t('meta.title');
      if (pageTitle && pageTitle !== 'meta.title') {
        document.title = pageTitle;
      }

      // Apply translations to DOM
      this.translateDOM();

      // Update active state in selectors
      this.updateSelectors();

      // Dispatch custom event for modules (like gallery captions)
      window.dispatchEvent(new CustomEvent('rnw:languageChanged', { detail: { lang: lang } }));
    },

    translateDOM: function () {
      var self = this;

      // Text content
      var textElements = document.querySelectorAll('[data-i18n]');
      textElements.forEach(function (el) {
        var key = el.getAttribute('data-i18n');
        el.textContent = self.t(key);
      });

      // HTML content (for multiline or formatted text)
      var htmlElements = document.querySelectorAll('[data-i18n-html]');
      htmlElements.forEach(function (el) {
        var key = el.getAttribute('data-i18n-html');
        el.innerHTML = self.t(key);
      });

      // Alt attributes
      var altElements = document.querySelectorAll('[data-i18n-alt]');
      altElements.forEach(function (el) {
        var key = el.getAttribute('data-i18n-alt');
        el.setAttribute('alt', self.t(key));
      });

      // Aria-label attributes
      var ariaElements = document.querySelectorAll('[data-i18n-aria]');
      ariaElements.forEach(function (el) {
        var key = el.getAttribute('data-i18n-aria');
        el.setAttribute('aria-label', self.t(key));
      });

      // Title attributes
      var titleElements = document.querySelectorAll('[data-i18n-title]');
      titleElements.forEach(function (el) {
        var key = el.getAttribute('data-i18n-title');
        el.setAttribute('title', self.t(key));
      });
    },

    updateSelectors: function () {
      var self = this;
      var labelText = NATIVE_NAMES[self.currentLang] || self.currentLang;

      // Update trigger label
      var triggerLabels = document.querySelectorAll('.lang-selector__current-name');
      triggerLabels.forEach(function (lbl) {
        lbl.textContent = labelText;
      });

      // Update options active class
      var options = document.querySelectorAll('.lang-selector__option');
      options.forEach(function (opt) {
        var optLang = opt.getAttribute('data-lang');
        var isActive = optLang === self.currentLang;
        opt.classList.toggle('lang-selector__option--active', isActive);
        opt.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    },

    bindEvents: function () {
      var self = this;

      // Dropdown toggle
      document.addEventListener('click', function (e) {
        var trigger = e.target.closest('.lang-selector__trigger');
        var allSelectors = document.querySelectorAll('.lang-selector');

        if (trigger) {
          e.preventDefault();
          var parent = trigger.closest('.lang-selector');
          var wasActive = parent.classList.contains('lang-selector--active');

          allSelectors.forEach(function (s) {
            s.classList.remove('lang-selector--active');
          });

          if (!wasActive) {
            parent.classList.add('lang-selector--active');
          }
          return;
        }

        // Option click
        var option = e.target.closest('.lang-selector__option');
        if (option) {
          e.preventDefault();
          var selectedLang = option.getAttribute('data-lang');
          if (selectedLang) {
            self.setLanguage(selectedLang, true);
          }
          allSelectors.forEach(function (s) {
            s.classList.remove('lang-selector--active');
          });
          return;
        }

        // Close when clicking outside
        allSelectors.forEach(function (s) {
          s.classList.remove('lang-selector--active');
        });
      });

      // Close on Escape key
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          var allSelectors = document.querySelectorAll('.lang-selector');
          allSelectors.forEach(function (s) {
            s.classList.remove('lang-selector--active');
          });
        }
      });
    }
  };

  window.I18n = I18n;

  // Initialize immediately if DOM is ready, or on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      I18n.init();
    });
  } else {
    I18n.init();
  }
})();

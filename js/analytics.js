/* ════════════════════════════════════════════════════════════════════
   RAGNAROK: THE NEW WORLD — JAVASCRIPT: ANALYTICS & AFFILIATE TRACKER
   PC Gaming Acquisition, Steam Outbound Tracking, Campaign Attribution
   Clean Adapter, No Sensitive Leakage, GA4 & DataLayer Ready
════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var STEAM_BASE_URL = 'https://store.steampowered.com/app/4212480/Ragnarok_The_New_World/';

  var Analytics = {
    campaign: {
      source: 'direct',
      medium: 'none',
      campaign: 'desktop_acquisition',
      content: 'landing_page',
      affiliateId: ''
    },
    debug: false,
    viewedSections: {},

    init: function () {
      this.detectQueryParams();
      this.attachSteamTracking();
      this.initSectionObserver();
      this.trackPageView();
    },

    detectQueryParams: function () {
      try {
        var params = new URLSearchParams(window.location.search);
        if (params.get('utm_source')) this.campaign.source = params.get('utm_source');
        if (params.get('utm_medium')) this.campaign.medium = params.get('utm_medium');
        if (params.get('utm_campaign')) this.campaign.campaign = params.get('utm_campaign');
        if (params.get('utm_content')) this.campaign.content = params.get('utm_content');
        if (params.get('aff_id') || params.get('affiliate_id')) {
          this.campaign.affiliateId = params.get('aff_id') || params.get('affiliate_id');
        }
        if (params.get('debug_analytics') === 'true') {
          this.debug = true;
          console.log('[RNW Analytics] Debug mode enabled. Campaign:', this.campaign);
        }
      } catch (e) {}
    },

    getSteamDestinationUrl: function (placement) {
      try {
        var url = new URL(STEAM_BASE_URL);
        if (this.campaign.source) url.searchParams.set('utm_source', this.campaign.source);
        if (this.campaign.medium) url.searchParams.set('utm_medium', this.campaign.medium);
        if (this.campaign.campaign) url.searchParams.set('utm_campaign', this.campaign.campaign);
        var contentValue = (this.campaign.content ? this.campaign.content + '_' : '') + (placement || 'cta');
        url.searchParams.set('utm_content', contentValue);
        if (this.campaign.affiliateId) {
          url.searchParams.set('aff_id', this.campaign.affiliateId);
        }
        return url.toString();
      } catch (e) {
        return STEAM_BASE_URL;
      }
    },

    attachSteamTracking: function () {
      var self = this;
      var steamLinks = document.querySelectorAll('a[data-steam-cta]');

      steamLinks.forEach(function (link) {
        var placement = link.getAttribute('data-steam-cta') || 'unspecified';
        link.href = self.getSteamDestinationUrl(placement);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');

        link.addEventListener('click', function () {
          self.trackSteamClick(placement);
        });
      });
    },

    trackEvent: function (eventName, eventParams) {
      var payload = Object.assign({
        timestamp: new Date().toISOString(),
        lang: (window.I18n && window.I18n.currentLang) || 'en',
        campaign_source: this.campaign.source,
        campaign_medium: this.campaign.medium,
        campaign_name: this.campaign.campaign
      }, eventParams || {});

      if (this.debug) {
        console.log('[RNW Analytics Event]', eventName, payload);
      }

      // Google Analytics 4 integration
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, payload);
      } else if (window.dataLayer && Array.isArray(window.dataLayer)) {
        window.dataLayer.push(Object.assign({ event: eventName }, payload));
      }
    },

    trackPageView: function () {
      this.trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href,
        screen_resolution: window.screen.width + 'x' + window.screen.height,
        viewport_size: window.innerWidth + 'x' + window.innerHeight
      });
    },

    trackSteamClick: function (placement) {
      this.trackEvent('steam_outbound_click', {
        cta_placement: placement,
        destination: STEAM_BASE_URL
      });
    },

    trackLanguageChange: function (newLang) {
      this.trackEvent('language_change', {
        selected_language: newLang
      });
    },

    trackGalleryOpen: function (itemIndex, caption) {
      this.trackEvent('gallery_interaction', {
        item_index: itemIndex,
        caption: caption
      });
    },

    initSectionObserver: function () {
      var self = this;
      if (!('IntersectionObserver' in window)) return;

      var sections = document.querySelectorAll('section[id], footer[id]');
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.id;
            if (!self.viewedSections[id]) {
              self.viewedSections[id] = true;
              self.trackEvent('section_view', {
                section_id: id
              });
            }
          }
        });
      }, {
        threshold: 0.3
      });

      sections.forEach(function (s) {
        observer.observe(s);
      });
    }
  };

  window.Analytics = Analytics;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      Analytics.init();
    });
  } else {
    Analytics.init();
  }
})();

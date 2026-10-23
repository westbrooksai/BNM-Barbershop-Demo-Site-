/* =========================================================
   BNM Barbershop: site behavior (vanilla JS, no dependencies)
   ========================================================= */
(function () {
  "use strict";

  /* Client-specific settings. Swap these when the real accounts are connected. */
  var CONFIG = {
    timeZone: "America/New_York",
    consentKey: "bnm-consent-v1",
    minFormSeconds: 3,
    reviewInterval: 7000,
    /* Google Analytics 4 measurement ID, e.g. "G-ABC123XYZ". Empty = no analytics.
       It only ever loads after the visitor allows Analytics, and never with GPC on.
       When you set it, also allow Google's analytics domains in _headers (see HANDOFF.md). */
    ga4Id: ""
  };

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  var reduced = function () { return reduceMQ.matches; };
  var root = document.documentElement;

  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea, select, [tabindex]:not([tabindex="-1"])';

  function trapTab(container, e) {
    if (e.key !== "Tab") return;
    var items = $$(FOCUSABLE, container).filter(function (el) { return el.offsetParent !== null; });
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------- Brand intro ---------- */
  function initIntro() {
    var intro = $("#intro");
    if (!intro) return;
    if (!root.classList.contains("intro-on")) { intro.remove(); return; }
    var done = false;
    function finish() {
      if (done) return;
      done = true;
      intro.classList.add("is-done");
      document.removeEventListener("keydown", finish);
      setTimeout(function () { intro.remove(); root.classList.remove("intro-on"); }, 260);
    }
    $(".intro__skip", intro).addEventListener("click", finish);
    intro.addEventListener("click", finish);
    document.addEventListener("keydown", finish);
    setTimeout(finish, 1250);
  }

  /* ---------- Header / mobile nav ---------- */
  function initNav() {
    var toggle = $(".nav-toggle");
    var nav = $("#site-nav");
    if (!toggle || !nav) return;
    var header = $(".site-header");

    function setOpen(open, returnFocus) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      if (!open && returnFocus) toggle.focus();
    }
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    header.addEventListener("keydown", function (e) {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      if (e.key === "Escape") setOpen(false, true);
      else trapTab(header, e);
    });
    window.matchMedia("(min-width: 1024px)").addEventListener("change", function (mq) {
      if (mq.matches) setOpen(false);
    });
  }

  /* ---------- Live "Open now" badge (reads the hours table) ---------- */
  function initOpenBadge() {
    var rows = $$("[data-hours] tr[data-day]");
    var badges = $$("[data-open-badge]");
    if (!rows.length || !badges.length) return;

    var DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var schedule = {};
    rows.forEach(function (tr) {
      var d = Number(tr.dataset.day);
      schedule[d] = tr.dataset.open ? { open: toMin(tr.dataset.open), close: toMin(tr.dataset.close), row: tr } : { row: tr };
    });

    function toMin(hhmm) { var p = hhmm.split(":"); return Number(p[0]) * 60 + Number(p[1]); }
    function fmt(min) {
      var h = Math.floor(min / 60), m = min % 60, suffix = h >= 12 ? "pm" : "am";
      var h12 = h % 12 || 12;
      return h12 + (m ? ":" + String(m).padStart(2, "0") : "") + suffix;
    }
    function shopNow() {
      var parts = new Intl.DateTimeFormat("en-US", {
        timeZone: CONFIG.timeZone, weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23"
      }).formatToParts(new Date());
      var get = function (t) { return parts.find(function (p) { return p.type === t; }).value; };
      return { day: DAY_SHORT.indexOf(get("weekday")), min: Number(get("hour")) * 60 + Number(get("minute")) };
    }

    function update() {
      var now = shopNow();
      var today = schedule[now.day];
      var isOpen = !!(today && today.open != null && now.min >= today.open && now.min < today.close);
      var text;
      if (isOpen) {
        text = "Open now · closes " + fmt(today.close);
      } else {
        text = "Closed";
        for (var i = 0; i < 8; i++) {
          var d = (now.day + i) % 7, s = schedule[d];
          if (!s || s.open == null) continue;
          if (i === 0 && now.min >= s.open) continue;
          text = "Closed · opens " + (i === 0 ? "today" : i === 1 ? "tomorrow" : DAY_SHORT[d]) + " " + fmt(s.open);
          break;
        }
      }
      badges.forEach(function (b) {
        b.classList.toggle("is-open", isOpen);
        $("[data-open-text]", b).textContent = text;
      });
      rows.forEach(function (tr) { tr.classList.toggle("is-today", Number(tr.dataset.day) === now.day); });
    }
    update();
    setInterval(update, 60000);
  }

  /* ---------- LED progress line ---------- */
  function initProgress() {
    var line = $(".progress-line");
    if (!line) return;
    var ticking = false;
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      line.style.setProperty("--progress", max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : "0");
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- Hero video ---------- */
  function initHeroVideo() {
    var video = $(".hero__video");
    var btn = $("[data-video-toggle]");
    if (!video || !btn) return;
    var label = $("span", btn);

    function setPaused(paused) {
      btn.setAttribute("aria-pressed", String(paused));
      label.textContent = paused ? "Play video" : "Pause video";
    }
    function start() {
      if (reduced() || video.dataset.loaded) return;
      var mobile = window.matchMedia("(max-width: 767px)").matches;
      video.src = (mobile && video.dataset.srcMobile) || video.dataset.src;
      video.dataset.loaded = "1";
      video.play().catch(function () { /* autoplay blocked or file missing: poster stays */ });
    }
    video.addEventListener("playing", function () { btn.hidden = false; setPaused(false); });
    video.addEventListener("error", function () { btn.hidden = true; });
    btn.addEventListener("click", function () {
      if (video.paused) { video.play(); setPaused(false); } else { video.pause(); setPaused(true); }
    });
    reduceMQ.addEventListener("change", function () { if (reduced()) { video.pause(); setPaused(true); } });
    /* Wait for the page itself to finish loading so the video never competes with first paint. */
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start);
  }

  /* ---------- Welcome paragraph lights up word by word ---------- */
  function initLightWords() {
    var el = $("[data-light-words]");
    if (!el || reduced()) return;

    var words = [];
    Array.prototype.slice.call(el.childNodes).forEach(function (node) {
      if (node.nodeType === 3) {
        var frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          var span = document.createElement("span");
          span.className = "w";
          span.textContent = part;
          frag.appendChild(span);
          words.push(span);
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === 1) {
        node.classList.add("w");
        words.push(node);
      }
    });
    root.classList.add("js-lit");

    var lit = -1, ticking = false;
    function update() {
      ticking = false;
      if (reduced()) { root.classList.remove("js-lit"); return; }
      var rect = el.getBoundingClientRect();
      var vh = window.innerHeight;
      var progress = (vh * 0.85 - rect.top) / (rect.height + vh * 0.3);
      var n = Math.round(Math.max(0, Math.min(1, progress)) * words.length);
      if (n === lit) return;
      lit = n;
      words.forEach(function (w, i) { w.classList.toggle("on", i < n); });
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- Style ribbon pause ---------- */
  function initRibbon() {
    var ribbon = $(".ribbon");
    var btn = $("[data-ribbon-toggle]");
    if (!ribbon || !btn) return;
    btn.addEventListener("click", function () {
      var paused = ribbon.classList.toggle("is-paused");
      btn.setAttribute("aria-pressed", String(paused));
      $("span", btn).textContent = paused ? "Play styles" : "Pause styles";
    });
  }

  /* ---------- Booking: every Book link lands on #book ---------- */
  function initBooking() {
    var note = $("[data-book-note]");
    var section = $("#book");
    document.addEventListener("click", function (e) {
      var link = e.target.closest('a[href="#book"]');
      if (!link || !note) return;
      var barber = link.dataset.barber, service = link.dataset.service;
      if (barber) {
        note.textContent = "Booking with " + barber + ": choose " + barber + " in the calendar.";
        note.hidden = false;
      } else if (service) {
        note.textContent = "Selected service: " + service;
        note.hidden = false;
      }
      if (section) setTimeout(function () { section.focus({ preventScroll: true }); }, 0);
    });

    var embed = $("[data-booking-embed]");
    if (!embed) return;
    var url = embed.dataset.embedUrl || "";
    if (!url || /PLACEHOLDER/.test(url)) return; // demo: keep the placeholder panel + new-tab link
    var iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.title = "Book an appointment with BNM Barbershop (Square Appointments)";
    iframe.loading = "lazy";
    var fallback = document.createElement("p");
    fallback.className = "hero__phone";
    fallback.innerHTML = 'Calendar not loading? <a href="' + url + '" target="_blank" rel="noopener noreferrer">Open booking in a new tab</a>.';
    embed.textContent = "";
    embed.classList.add("has-iframe");
    embed.appendChild(iframe);
    embed.after(fallback);
  }

  /* ---------- Gallery filters + lightbox ---------- */
  function initGallery() {
    var list = $("[data-gallery]");
    if (!list) return;
    var items = $$(".masonry__item", list);
    var count = $("[data-gallery-count]");
    var buttons = $$("[data-filter]");

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.dataset.filter;
        buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
        var shown = 0;
        items.forEach(function (li) {
          var match = f === "all" || li.dataset.cat === f;
          li.hidden = !match;
          if (match) shown++;
        });
        count.textContent = f === "all" ? "Showing all " + shown + " photos" : "Showing " + shown + " " + btn.textContent + " photos";
      });
    });

    var dialog = $(".lightbox");
    if (!dialog || typeof dialog.showModal !== "function") return;
    var img = $("[data-lightbox-img]", dialog);
    var cap = $("[data-lightbox-caption]", dialog);
    var counter = $("[data-lightbox-count]", dialog);
    var visible = [], index = 0, opener = null;

    function show(i) {
      index = (i + visible.length) % visible.length;
      var btn = $(".masonry__btn", visible[index]);
      var thumb = $("img", btn);
      img.src = thumb.getAttribute("src");
      img.alt = thumb.alt;
      cap.textContent = btn.dataset.caption;
      counter.textContent = (index + 1) + " / " + visible.length;
    }
    list.addEventListener("click", function (e) {
      var btn = e.target.closest(".masonry__btn");
      if (!btn) return;
      visible = items.filter(function (li) { return !li.hidden; });
      opener = btn;
      show(visible.indexOf(btn.parentElement));
      dialog.showModal();
      $("[data-lightbox-close]", dialog).focus();
    });
    $("[data-lightbox-close]", dialog).addEventListener("click", function () { dialog.close(); });
    $("[data-lightbox-prev]", dialog).addEventListener("click", function () { show(index - 1); });
    $("[data-lightbox-next]", dialog).addEventListener("click", function () { show(index + 1); });
    dialog.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); show(index - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); show(index + 1); }
    });
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog || e.target.classList.contains("lightbox__figure")) dialog.close();
    });
    dialog.addEventListener("close", function () { if (opener) opener.focus(); });
  }

  /* ---------- Before / after sliders ---------- */
  function initBeforeAfter() {
    $$(".ba__stage").forEach(function (stage) {
      var range = $(".ba__range", stage);
      function update() {
        stage.style.setProperty("--pos", range.value + "%");
        range.setAttribute("aria-valuetext", range.value + "% before, " + (100 - range.value) + "% after");
      }
      range.addEventListener("input", update);
      update();
    });
  }

  /* ---------- Reviews carousel (desktop only; a grid on phones) ---------- */
  function initReviews() {
    var wrap = $("[data-carousel]");
    if (!wrap) return;
    var slides = $$(".review", wrap);
    var status = $("[data-carousel-status]");
    var toggle = $("[data-carousel-toggle]");
    var mq = window.matchMedia("(min-width: 900px)");
    var index = 0, timer = null, userPaused = false, hovering = false;

    function show(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) { s.classList.toggle("is-active", n === index); });
      status.textContent = (index + 1) + " / " + slides.length;
    }
    function stop() { clearInterval(timer); timer = null; }
    function play() {
      stop();
      if (!mq.matches || userPaused || hovering || reduced()) {
        status.setAttribute("aria-live", "polite");
        return;
      }
      status.setAttribute("aria-live", "off");
      timer = setInterval(function () { show(index + 1); }, CONFIG.reviewInterval);
    }
    function setMode() {
      wrap.classList.toggle("is-carousel", mq.matches);
      if (mq.matches) { show(index); play(); } else { stop(); slides.forEach(function (s) { s.classList.remove("is-active"); }); }
    }

    $("[data-carousel-prev]").addEventListener("click", function () { show(index - 1); play(); });
    $("[data-carousel-next]").addEventListener("click", function () { show(index + 1); play(); });
    toggle.addEventListener("click", function () {
      userPaused = !userPaused;
      toggle.setAttribute("aria-pressed", String(userPaused));
      toggle.textContent = userPaused ? "Play" : "Pause";
      play();
    });
    if (reduced()) { userPaused = true; toggle.setAttribute("aria-pressed", "true"); toggle.textContent = "Play"; }
    var region = wrap.parentElement;
    region.addEventListener("mouseenter", function () { hovering = true; stop(); });
    region.addEventListener("mouseleave", function () { hovering = false; play(); });
    wrap.addEventListener("focusin", function () { hovering = true; stop(); });
    wrap.addEventListener("focusout", function () { hovering = false; play(); });
    mq.addEventListener("change", setMode);
    setMode();
  }

  /* ---------- Cookie consent, map and analytics gating ---------- */
  function initConsent() {
    var banner = $("[data-cookie]");
    if (!banner) return;
    var form = $("[data-cookie-form]", banner);
    var prefs = $("[data-cookie-prefs]", banner);
    var customize = $("[data-cookie-customize]", banner);
    var mapBox = $("[data-map]");
    var mapOriginal = mapBox ? mapBox.innerHTML : "";
    var opener = null;
    /* Global Privacy Control: the browser's "do not sell or share" signal forces analytics off. */
    var gpc = navigator.globalPrivacyControl === true;
    var gpcNote = $("[data-gpc-note]", banner);
    if (gpc) {
      form.elements.analytics.disabled = true;
      if (gpcNote) gpcNote.hidden = false;
    }

    function read() {
      try { return JSON.parse(localStorage.getItem(CONFIG.consentKey)); } catch (e) { return null; }
    }
    function firstPref() {
      return gpc ? form.elements.maps : form.elements.analytics;
    }
    function save(c) {
      if (gpc) c.analytics = false;
      c.ts = new Date().toISOString();
      try { localStorage.setItem(CONFIG.consentKey, JSON.stringify(c)); } catch (e) { /* storage blocked */ }
      apply(c);
    }
    function apply(c) {
      if (c && c.maps) loadMap(); else unloadMap();
      if (c && c.analytics && !gpc) loadAnalytics(); else unloadAnalytics();
    }
    function loadMap() {
      if (!mapBox || $("iframe", mapBox)) return;
      var iframe = document.createElement("iframe");
      iframe.src = mapBox.dataset.mapSrc;
      iframe.title = "Google map showing BNM Barbershop at 123 Main Street, Frederick, MD";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      mapBox.textContent = "";
      mapBox.appendChild(iframe);
    }
    function unloadMap() {
      if (mapBox && $("iframe", mapBox)) { mapBox.innerHTML = mapOriginal; bindMapButton(); }
    }
    function loadAnalytics() {
      var id = CONFIG.ga4Id;
      if (!id) return;
      window["ga-disable-" + id] = false;
      if (window.gtag) return;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", id);
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
      document.head.appendChild(s);
    }
    function unloadAnalytics() {
      var id = CONFIG.ga4Id;
      if (!id) return;
      window["ga-disable-" + id] = true;
      /* Remove GA cookies set under this host or its parent domain. */
      document.cookie.split(";").forEach(function (c) {
        var name = c.split("=")[0].trim();
        if (name.indexOf("_ga") !== 0) return;
        [location.hostname, "." + location.hostname.split(".").slice(-2).join(".")].forEach(function (d) {
          document.cookie = name + "=; Max-Age=0; path=/; domain=" + d;
        });
        document.cookie = name + "=; Max-Age=0; path=/";
      });
    }
    function bindMapButton() {
      var btn = mapBox && $("[data-load-map]", mapBox);
      if (!btn) return;
      btn.addEventListener("click", function () {
        var c = read() || { analytics: false };
        c.maps = true;
        save(c);
        hide();
      });
    }

    function onKey(e) {
      if (e.key === "Escape" && read()) { e.preventDefault(); hide(); }
      else trapTab(banner, e);
    }
    function show(fromSettings) {
      var c = read() || {};
      form.elements.analytics.checked = !!c.analytics && !gpc;
      form.elements.maps.checked = !!c.maps;
      banner.hidden = false;
      if (fromSettings) {
        opener = document.activeElement;
        setPrefs(true);
        banner.setAttribute("aria-modal", "true");
        banner.addEventListener("keydown", onKey);
        firstPref().focus();
      }
    }
    function hide() {
      banner.hidden = true;
      setPrefs(false);
      banner.removeAttribute("aria-modal");
      banner.removeEventListener("keydown", onKey);
      if (opener) { opener.focus(); opener = null; }
    }
    function setPrefs(open) {
      prefs.hidden = !open;
      customize.setAttribute("aria-expanded", String(open));
    }

    $("[data-cookie-accept]", banner).addEventListener("click", function () { save({ analytics: true, maps: true }); hide(); });
    $("[data-cookie-reject]", banner).addEventListener("click", function () { save({ analytics: false, maps: false }); hide(); });
    customize.addEventListener("click", function () {
      var open = prefs.hidden;
      setPrefs(open);
      if (open) firstPref().focus();
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      save({ analytics: form.elements.analytics.checked, maps: form.elements.maps.checked });
      hide();
    });
    $$("[data-cookie-settings]").forEach(function (b) {
      b.addEventListener("click", function () { show(true); });
    });

    bindMapButton();
    var existing = read();
    if (existing) apply(existing);
    if (location.hash === "#cookie-settings") show(true);
    else if (!existing) show(false);
    window.addEventListener("hashchange", function () {
      if (location.hash === "#cookie-settings") show(true);
    });
  }

  /* ---------- Contact form: validation, honeypot, timing check ---------- */
  function initContactForm() {
    var form = $("#contact");
    if (!form) return;
    var status = $("[data-form-status]", form);
    var started = Date.now();
    form.elements["form-started"].value = String(started);

    if (/[?&]sent=1/.test(location.search)) {
      status.textContent = "Thanks! Your message was sent. We'll get back to you within one business day.";
    }

    var rules = {
      name: function (v) { return v.trim().length >= 2 ? "" : "Please enter your name."; },
      phone: function (v) { return v.replace(/\D/g, "").length >= 10 ? "" : "Please enter a 10-digit phone number."; },
      message: function (v) { return v.trim().length >= 5 ? "" : "Please add a short message."; }
    };
    function check(field) {
      var msg = rules[field.name](field.value);
      field.setAttribute("aria-invalid", msg ? "true" : "false");
      $("#" + field.getAttribute("aria-describedby")).textContent = msg;
      return !msg;
    }
    Object.keys(rules).forEach(function (name) {
      form.elements[name].addEventListener("blur", function () { if (this.value) check(this); });
    });

    form.addEventListener("submit", function (e) {
      status.classList.remove("is-error");
      if (form.elements["bot-field"].value) { e.preventDefault(); return; }
      var firstBad = null;
      Object.keys(rules).forEach(function (name) {
        if (!check(form.elements[name]) && !firstBad) firstBad = form.elements[name];
      });
      if (firstBad) { e.preventDefault(); firstBad.focus(); return; }
      if (Date.now() - started < CONFIG.minFormSeconds * 1000) {
        e.preventDefault();
        status.classList.add("is-error");
        status.textContent = "That was quick! Please wait a moment and send again.";
      }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var els = $$(".reveal");
    if (reduced() || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  function initYear() {
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  [initIntro, initNav, initOpenBadge, initProgress, initHeroVideo, initLightWords, initRibbon,
    initBooking, initGallery, initBeforeAfter, initReviews, initConsent, initContactForm, initReveal, initYear]
    .forEach(function (fn) {
      try { fn(); } catch (err) { if (window.console) console.error(fn.name, err); }
    });
})();

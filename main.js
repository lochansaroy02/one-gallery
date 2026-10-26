// One Gallery landing page: theme, the collapsing header, segmented controls, the look picker,
// the pill navigation, copy buttons and the screenshot lightbox. No dependencies.
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // ---- theme ------------------------------------------------------------------------------
  var themeBtn = document.getElementById("theme-toggle");

  function currentTheme() {
    return root.dataset.theme || (darkQuery.matches ? "dark" : "light");
  }
  function labelThemeButton() {
    themeBtn.setAttribute("aria-label", currentTheme() === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }
  themeBtn.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("og-theme", next); } catch (e) {}
    labelThemeButton();
    requestAnimationFrame(layoutAll);
  });
  darkQuery.addEventListener("change", labelThemeButton);
  labelThemeButton();

  // ---- collapsing header (the app's big title shrinking into the bar) ---------------------
  var bar = document.getElementById("bar");
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var p = Math.max(0, Math.min(1, window.scrollY / 240));
      root.style.setProperty("--p", p.toFixed(3));
      if (p > 0.6) bar.setAttribute("data-collapsed", "");
      else bar.removeAttribute("data-collapsed");
      updatePill();
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  // ---- screenshots settle in as they reach the viewport ------------------------------------
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // ---- image swapping (cross-fade) ----------------------------------------------------------
  function swapTo(name, key) {
    var box = document.querySelector('[data-swap-target="' + name + '"]');
    if (!box) return;
    box.querySelectorAll("img").forEach(function (img) {
      if (img.dataset.key === key) {
        img.loading = "eager";
        img.classList.add("is-shown");
      } else {
        img.classList.remove("is-shown");
      }
    });
  }

  // ---- segmented controls -------------------------------------------------------------------
  var segments = Array.prototype.slice.call(document.querySelectorAll(".segmented"));

  function placeThumb(seg) {
    var thumb = seg.querySelector(".seg-thumb");
    var on = seg.querySelector('[aria-selected="true"]');
    if (!thumb || !on) return;
    thumb.style.width = on.offsetWidth + "px";
    thumb.style.transform = "translateX(" + on.offsetLeft + "px)";
  }

  function selectTab(seg, btn, focus) {
    var tabs = seg.querySelectorAll('[role="tab"]');
    tabs.forEach(function (t) {
      var on = t === btn;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      var panelId = t.getAttribute("aria-controls");
      if (panelId) {
        var panel = document.getElementById(panelId);
        if (on && panel.hidden) {
          panel.hidden = false;
          panel.classList.remove("entering");
          void panel.offsetWidth;
          panel.classList.add("entering");
        } else if (!on) {
          panel.hidden = true;
        }
      }
    });
    if (seg.dataset.swap) swapTo(seg.dataset.swap, btn.dataset.show);
    if (focus) btn.focus();
    placeThumb(seg);
  }

  segments.forEach(function (seg) {
    var thumb = document.createElement("span");
    thumb.className = "seg-thumb";
    thumb.setAttribute("aria-hidden", "true");
    seg.insertBefore(thumb, seg.firstChild);
    var tabs = Array.prototype.slice.call(seg.querySelectorAll('[role="tab"]'));
    tabs.forEach(function (t) {
      t.type = "button";
      t.tabIndex = t.getAttribute("aria-selected") === "true" ? 0 : -1;
      t.addEventListener("click", function () { selectTab(seg, t, false); });
    });
    seg.addEventListener("keydown", function (e) {
      var i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      var next = null;
      if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      else if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === "Home") next = tabs[0];
      else if (e.key === "End") next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); selectTab(seg, next, true); }
    });
  });

  // "Install on Linux" in the hero opens the Linux tab
  document.querySelectorAll("[data-install-tab]").forEach(function (a) {
    a.addEventListener("click", function () {
      var seg = document.getElementById("install-tabs");
      selectTab(seg, document.getElementById("tab-" + a.dataset.installTab), false);
    });
  });

  // ---- "Make it yours": swap the screenshot and recolour the page --------------------------
  var looks = document.querySelector(".looks");
  if (looks) {
    var options = Array.prototype.slice.call(looks.querySelectorAll('[role="radio"]'));
    var pick = function (btn, focus) {
      options.forEach(function (o) {
        var on = o === btn;
        o.setAttribute("aria-checked", on ? "true" : "false");
        o.tabIndex = on ? 0 : -1;
      });
      swapTo("looks", btn.dataset.look);
      root.style.setProperty("--accent", btn.dataset.accent);
      if (focus) btn.focus();
    };
    options.forEach(function (o) {
      o.type = "button";
      o.tabIndex = o.getAttribute("aria-checked") === "true" ? 0 : -1;
      o.addEventListener("click", function () { pick(o, false); });
    });
    looks.addEventListener("keydown", function (e) {
      var i = options.indexOf(document.activeElement);
      if (i < 0) return;
      var d = (e.key === "ArrowDown" || e.key === "ArrowRight") ? 1 : (e.key === "ArrowUp" || e.key === "ArrowLeft") ? -1 : 0;
      if (d) { e.preventDefault(); pick(options[(i + d + options.length) % options.length], true); }
    });
  }

  // ---- pill navigation: the indicator follows the section on screen ------------------------
  var pill = document.getElementById("pill");
  var pillLinks = Array.prototype.slice.call(pill.querySelectorAll("a"));
  var indicator = pill.querySelector(".pill-indicator");
  var sections = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
  var currentNav = null;

  function updatePill() {
    var line = window.innerHeight * 0.45;
    var nav = "top";
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top < line) nav = sections[i].dataset.nav;
    }
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) nav = "install";
    if (nav === currentNav) return;
    currentNav = nav;
    pillLinks.forEach(function (a) {
      if (a.dataset.target === nav) {
        a.setAttribute("aria-current", "true");
        indicator.style.transform = "translateX(" + (a.offsetLeft - 6) + "px)";
      } else {
        a.removeAttribute("aria-current");
      }
    });
  }

  function layoutAll() {
    segments.forEach(placeThumb);
    currentNav = null;
    updatePill();
  }
  window.addEventListener("resize", layoutAll);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutAll);
  layoutAll();
  onScroll();

  // ---- copy buttons -------------------------------------------------------------------------
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
      ok ? resolve() : reject();
    });
  }
  document.querySelectorAll(".copy").forEach(function (btn) {
    var label = btn.querySelector("span");
    var use = btn.querySelector("use");
    btn.addEventListener("click", function () {
      var text = btn.parentElement.querySelector("code").textContent;
      copyText(text).then(function () {
        btn.classList.add("done");
        label.textContent = "Copied";
        use.setAttribute("href", "#i-check");
        clearTimeout(btn._t);
        btn._t = setTimeout(function () {
          btn.classList.remove("done");
          label.textContent = "Copy";
          use.setAttribute("href", "#i-copy");
        }, 1800);
      }, function () {
        label.textContent = "Select and copy";
      });
    });
  });

  // ---- screenshot strip ---------------------------------------------------------------------
  var strip = document.getElementById("strip");
  document.querySelectorAll("[data-strip]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var step = strip.querySelector(".shot").offsetWidth + 18;
      strip.scrollBy({ left: step * Number(btn.dataset.strip), behavior: reduceMotion.matches ? "auto" : "smooth" });
    });
  });

  // ---- lightbox: grows out of the thumbnail, like opening a picture in the app -------------
  var lb = document.getElementById("lightbox");
  var lbImg = lb.querySelector("img");
  var lbCap = lb.querySelector("figcaption");
  var shots = Array.prototype.slice.call(document.querySelectorAll(".shot"));
  var lbIndex = -1;
  var opener = null;
  var EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

  function flipFrom(rect) {
    if (reduceMotion.matches || !rect) return;
    var to = lbImg.getBoundingClientRect();
    if (!to.width) return;
    lbImg.style.transition = "none";
    lbImg.style.transform = "translate(" + (rect.left - to.left) + "px," + (rect.top - to.top) + "px) scale(" +
      (rect.width / to.width) + "," + (rect.height / to.height) + ")";
    void lbImg.offsetWidth;
    lbImg.style.transition = "transform 480ms " + EASE;
    lbImg.style.transform = "";
  }

  function show(i, fromRect) {
    lbIndex = (i + shots.length) % shots.length;
    var s = shots[lbIndex];
    var thumb = s.querySelector("img");
    lbImg.src = "assets/shots/" + s.dataset.full + "-1920.webp";
    lbImg.alt = thumb.alt;
    lbCap.textContent = s.dataset.caption;
    var go = function () { flipFrom(fromRect); };
    if (lbImg.decode) lbImg.decode().then(go, go); else lbImg.onload = go;
  }

  function open(i) {
    opener = shots[i];
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(function () { lb.classList.add("open"); });
    show(i, shots[i].querySelector("img").getBoundingClientRect());
    lb.querySelector(".lb-close").focus();
  }

  function close() {
    var thumb = shots[lbIndex].querySelector("img");
    shots[lbIndex].scrollIntoView({ block: "nearest", inline: "nearest" });
    var rect = thumb.getBoundingClientRect();
    var to = lbImg.getBoundingClientRect();
    lb.classList.remove("open");
    var done = function () {
      lb.hidden = true;
      lbImg.style.transform = "";
      lbImg.style.transition = "";
      document.body.style.overflow = "";
      (shots[lbIndex] || opener).focus();
    };
    if (reduceMotion.matches || !to.width) { done(); return; }
    lbImg.style.transition = "transform 380ms " + EASE;
    lbImg.style.transform = "translate(" + (rect.left - to.left) + "px," + (rect.top - to.top) + "px) scale(" +
      (rect.width / to.width) + "," + (rect.height / to.height) + ")";
    setTimeout(done, 380);
  }

  shots.forEach(function (s, i) {
    s.setAttribute("aria-label", "Open screenshot: " + s.dataset.caption);
    s.addEventListener("click", function () { open(i); });
  });
  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-prev").addEventListener("click", function () { show(lbIndex - 1); });
  lb.querySelector(".lb-next").addEventListener("click", function () { show(lbIndex + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") { e.preventDefault(); close(); }
    else if (e.key === "ArrowLeft") show(lbIndex - 1);
    else if (e.key === "ArrowRight") show(lbIndex + 1);
    else if (e.key === "Tab") {  // keep focus inside the dialog
      var f = Array.prototype.slice.call(lb.querySelectorAll("button"));
      var at = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(at + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });
})();

/* CURSUS 02 — BOX MODEL
   Alleen demo-logica. Bevat geen antwoorden op de oefeningen. */
(function () {
  'use strict';

  function $(id) { return document.getElementById(id); }

  /* --- 03 · padding-schuif --- */
  var padRange = $('pad-range'), padLive = $('pad-live'), padVal = $('pad-val');
  if (padRange && padLive) {
    padRange.addEventListener('input', function () {
      padLive.style.padding = padRange.value + 'px';
      if (padVal) padVal.textContent = padRange.value;
    });
    padLive.style.padding = padRange.value + 'px';
  }

  /* --- 05 · margin-schuif --- */
  var mgRange = $('margin-range'), mgLive = $('margin-live'), mgVal = $('margin-val');
  if (mgRange && mgLive) {
    mgRange.addEventListener('input', function () {
      mgLive.style.margin = mgRange.value + 'px';
      if (mgVal) mgVal.textContent = mgRange.value;
    });
    mgLive.style.margin = mgRange.value + 'px';
  }

  /* --- 06 · centreren aan/uit --- */
  var box = $('center-box'), code = $('center-code');
  var bLinks = $('btn-links'), bMidden = $('btn-midden');
  function toonLinks() {
    if (!box) return;
    box.classList.remove('is-centered');
    if (code) code.innerHTML = 'Nu geldt: <code>margin: 0;</code> &mdash; de doos plakt links.';
    if (bLinks && bMidden) { bLinks.classList.remove('btn--g'); bMidden.classList.add('btn--g'); }
  }
  function toonMidden() {
    if (!box) return;
    box.classList.add('is-centered');
    if (code) code.innerHTML = 'Nu geldt: <code>margin: 0 auto;</code> &mdash; links en rechts evenveel, dus midden.';
    if (bLinks && bMidden) { bMidden.classList.remove('btn--g'); bLinks.classList.add('btn--g'); }
  }
  if (bLinks) bLinks.addEventListener('click', toonLinks);
  if (bMidden) bMidden.addEventListener('click', toonMidden);

  /* --- 08 · kopieerknop starter-HTML --- */
  var copyBtn = $('copy-btn'), starter = $('starter-code');
  if (copyBtn && starter) {
    copyBtn.addEventListener('click', function () {
      var tekst = starter.textContent;
      function gelukt() {
        copyBtn.textContent = 'GEKOPIEERD!';
        window.setTimeout(function () { copyBtn.textContent = 'KOPIEER HTML'; }, 1600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(tekst).then(gelukt, function () { terugval(); });
      } else { terugval(); }
      function terugval() {
        var veld = document.createElement('textarea');
        veld.value = tekst;
        document.body.appendChild(veld);
        veld.select();
        try { document.execCommand('copy'); gelukt(); } catch (e) { /* stil */ }
        document.body.removeChild(veld);
      }
    });
  }

  /* --- 08 · zelfcheck teller --- */
  var checks = document.querySelectorAll('.check__i');
  var teller = $('check-count');
  function tel() {
    if (!teller) return;
    var n = 0;
    checks.forEach(function (c) { if (c.checked) n++; });
    teller.textContent = n;
  }
  checks.forEach(function (c) { c.addEventListener('change', tel); });
  tel();

  /* --- nav: markeer actieve sectie --- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.jump a[href^="#"]'));
  if ('IntersectionObserver' in window && links.length) {
    var kaart = {};
    links.forEach(function (a) { kaart[a.getAttribute('href').slice(1)] = a; });
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.classList.remove('is-active'); });
          var a = kaart[en.target.id];
          if (a) a.classList.add('is-active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(kaart).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) obs.observe(s);
    });
  }
}());

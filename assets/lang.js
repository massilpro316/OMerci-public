// Picks FR or EN from ?lang=, a saved choice, or the browser language.
(function () {
  var root = document.documentElement;

  function pick() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'fr' || q === 'en') return q;
    try {
      var saved = localStorage.getItem('omerci-lang');
      if (saved === 'fr' || saved === 'en') return saved;
    } catch (e) {}
    return (navigator.language || 'fr').toLowerCase().indexOf('en') === 0 ? 'en' : 'fr';
  }

  function apply(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    var t = document.querySelector('title[data-' + lang + ']');
    if (t) document.title = t.getAttribute('data-' + lang);
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
  }

  apply(pick());

  document.addEventListener('DOMContentLoaded', function () {
    apply(root.getAttribute('data-lang'));
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () {
        apply(b.dataset.lang);
        try { localStorage.setItem('omerci-lang', b.dataset.lang); } catch (e) {}
      });
    });
  });
})();

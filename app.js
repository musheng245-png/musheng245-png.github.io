(function () {
  'use strict';

  var root = document.documentElement;
  var toggle = document.querySelector('.theme');
  var meta = document.querySelector('meta[name="theme-color"]');
  var media = window.matchMedia('(prefers-color-scheme: dark)');
  var COLORS = { light: '#f2f4ef', dark: '#0e1613' };

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }

    if (meta) meta.setAttribute('content', COLORS[theme]);

    if (toggle) {
      toggle.setAttribute('aria-pressed', String(theme === 'dark'));
      toggle.setAttribute('aria-label', theme === 'dark' ? '切换到浅色模式' : '切换到深色模式');
    }
  }

  if (toggle) {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try {
        localStorage.setItem('theme', next);
      } catch (e) {}
    });
  }

  // 用户没手动选过时，跟随系统切换
  var onSystemChange = function (event) {
    var saved = null;
    try {
      saved = localStorage.getItem('theme');
    } catch (e) {}
    if (!saved) applyTheme(event.matches ? 'dark' : 'light');
  };

  if (typeof media.addEventListener === 'function') {
    media.addEventListener('change', onSystemChange);
  } else if (typeof media.addListener === 'function') {
    media.addListener(onSystemChange);
  }

  // 年份
  var year = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach(function (node) {
    node.textContent = year;
  });
})();

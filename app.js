(function () {
  'use strict';

  var root = document.documentElement;
  var toggle = document.querySelector('.theme');
  var meta = document.querySelector('meta[name="theme-color"]');
  var media = window.matchMedia('(prefers-color-scheme: dark)');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
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

  function saveTheme(theme) {
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}
  }

  function commitTheme(theme) {
    applyTheme(theme);
    saveTheme(theme);
  }

  // 从按钮位置扩散，把新主题“铺”开；不支持 View Transitions 时直接切换
  function switchTheme(next, origin) {
    if (!document.startViewTransition || reduceMotion.matches) {
      commitTheme(next);
      return;
    }

    var rect = origin.getBoundingClientRect();
    // 用百分比定位，跟设备像素比和页面缩放都无关
    var x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    var y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;

    var transition;
    try {
      transition = document.startViewTransition(function () {
        commitTheme(next);
      });
    } catch (e) {
      commitTheme(next);
      return;
    }

    transition.ready
      .then(function () {
        document.documentElement.animate(
          {
            clipPath: [
              'circle(0% at ' + x + '% ' + y + '%)',
              'circle(160% at ' + x + '% ' + y + '%)'
            ]
          },
          {
            duration: 800,
            easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );
      })
      .catch(function () {});
  }

  if (toggle) {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      switchTheme(next, toggle);
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

(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Colour theme: follows the system until the visitor picks one.
  var toggle = document.querySelector('.theme');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var dark = root.dataset.theme
        ? root.dataset.theme === 'dark'
        : window.matchMedia('(prefers-color-scheme: dark)').matches;
      var next = dark ? 'light' : 'dark';
      root.dataset.theme = next;
      paintBrowserBar();
      try {
        localStorage.setItem('theme', next);
      } catch (e) {}
    });
  }

  // The browser's own bar takes the page colour, including after a manual switch.
  function paintBrowserBar() {
    if (!root.dataset.theme) return;
    var colour = getComputedStyle(root).getPropertyValue('--bg').trim();
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (meta) {
      meta.removeAttribute('media');
      meta.content = colour;
    });
  }
  paintBrowserBar();

  var canObserve = 'IntersectionObserver' in window;

  // Fade sections in as they scroll into view. Content is only hidden once this
  // script is running, and anything already on screen is shown straight away.
  var reveals = document.querySelectorAll('.reveal');
  if (reduce || !canObserve) {
    reveals.forEach(function (el) {
      el.classList.add('in');
    });
  } else {
    reveals.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
    });
    root.classList.add('reveal-ready');
    var revealer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px' }
    );
    reveals.forEach(function (el) {
      revealer.observe(el);
    });
  }

  // Demo clips play only while on screen; with reduced motion they wait for a tap.
  var clips = document.querySelectorAll('video[data-auto]');
  if (reduce || !canObserve) {
    clips.forEach(function (clip) {
      clip.controls = true;
    });
  } else {
    var player = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var started = entry.target.play();
            if (started && started.catch) {
              started.catch(function () {
                entry.target.controls = true;
              });
            }
          } else {
            entry.target.pause();
          }
        });
      },
      { threshold: 0.35 }
    );
    clips.forEach(function (clip) {
      player.observe(clip);
    });
  }
})();

/* PRELOADER */
  window.addEventListener('load', function () {
    setTimeout(function () {
      var el = document.getElementById('preloader');
      if (el) el.classList.add('hidden');
    }, 1500);
  });

  /* DARK / LIGHT MODE */
  var html = document.documentElement;
  var themeToggle = document.getElementById('themeToggle');
  var themeIcon = document.getElementById('themeIcon');

  (function () {
    var saved = localStorage.getItem('cleanx-theme') || 'light';
    html.setAttribute('data-theme', saved);
    updateIcon(saved);
  })();

  function updateIcon(theme) {
    if (!themeIcon) return;
    themeIcon.classList.toggle('fa-sun', theme === 'dark');
    themeIcon.classList.toggle('fa-moon', theme !== 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('cleanx-theme', next);
      updateIcon(next);
      themeToggle.style.transform = 'scale(0.85) rotate(20deg)';
      setTimeout(function () { themeToggle.style.transform = ''; }, 200);
    });
  }

  /* NAVBAR SCROLL SHADOW */
  var mainNav = document.getElementById('mainNav');
  window.addEventListener('scroll', function () {
    if (mainNav) mainNav.classList.toggle('scrolled', window.scrollY > 40);
    updateProgress();
  });

  /* MOBILE NAV */
  var navToggle = document.getElementById('navToggle');
  var navMobile = document.getElementById('navMobile');
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      var open = navMobile.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    navMobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navMobile.classList.remove('open');
        navToggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* PROGRESS RING SCROLL TO TOP */
  var progressTop = document.getElementById('progress-top');
  var progressRing = document.getElementById('progress-ring');

  function updateProgress() {
    var winScroll = document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - window.innerHeight;
    var pct = (winScroll / height) * 100;
    var deg = (pct / 100) * 360;
    progressRing.style.background = 'conic-gradient(var(--primary) ' + deg + 'deg, #e0e0e0 0deg)';
    progressTop.classList.toggle('active', winScroll > 200);
  }

  if (progressTop) {
    progressTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* CARD ENTRANCE ANIMATION */
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.team-card, .value-card, .team-stat-item').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity .55s ease, transform .55s ease, border-color .3s, box-shadow .3s';
    observer.observe(el);
  });
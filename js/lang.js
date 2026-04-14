// Language detection and toggle for Dante website
(function () {
  var isItalianPage = window.location.pathname.indexOf('/it/') !== -1;
  var saved = localStorage.getItem('dante-lang');

  // Auto-redirect on first visit only (no saved preference)
  if (!saved) {
    var browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (browserLang.indexOf('it') === 0 && !isItalianPage) {
      localStorage.setItem('dante-lang', 'it');
      var newPath = window.location.pathname;
      // Handle both root and subpaths
      if (newPath === '/' || newPath.endsWith('/index.html')) {
        window.location.href = 'it/index.html';
      } else {
        var filename = newPath.split('/').pop();
        window.location.href = 'it/' + filename;
      }
      return;
    }
    localStorage.setItem('dante-lang', 'en');
  }

  // If user saved Italian but is on English page, redirect
  if (saved === 'it' && !isItalianPage) {
    var path = window.location.pathname;
    var file = path.split('/').pop() || 'index.html';
    window.location.href = 'it/' + file;
    return;
  }

  // If user saved English but is on Italian page, redirect
  if (saved === 'en' && isItalianPage) {
    var path = window.location.pathname;
    var file = path.split('/').pop() || 'index.html';
    window.location.href = '../' + file;
    return;
  }
})();

/**
 * spa-redirect.js
 * What:  Brings a visitor back to the page they asked for after GitHub Pages' 404.html
 *        bounced them to the home page. Pages that only exist inside the app (such as
 *        /clubs) would otherwise show GitHub's 404 on a refresh or a shared link.
 * Used by: index.html (loaded before the app starts)
 * Talks to: 404.html (which creates the "/?/path" address this file reads)
 * Note:  kept as a separate file so a strict Content-Security-Policy (script-src 'self') allows it.
 */
(function restoreAddress(location) {
  if (location.search[1] !== '/') return;
  var restored = location.search
    .slice(1)
    .split('&')
    .map(function (part) {
      return part.replace(/~and~/g, '&');
    })
    .join('?');
  window.history.replaceState(null, null, location.pathname.slice(0, -1) + restored + location.hash);
})(window.location);

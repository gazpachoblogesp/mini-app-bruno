// GitHub Pages SPA redirect
var path = window.location.pathname;
var repo = "/mini-app-bruno";

if (path.startsWith(repo)) {
  var newPath = repo + "/?redirect=" + encodeURIComponent(path.replace(repo, ""));
  window.location.replace(newPath);
}
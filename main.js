function loadComponent(id, htmlPath, cssPath, jsPath) {
  fetch(htmlPath)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById(id).innerHTML = html;

      if (cssPath) loadCSS(cssPath);

      if (jsPath) loadScript(jsPath);
    });
}

function loadCSS(path) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = path;
  document.head.appendChild(link);
}

function loadScript(path) {
  const script = document.createElement("script");
  script.src = path;
  script.defer = true;
  document.body.appendChild(script);
}

window.addEventListener("DOMContentLoaded", () => {
  loadComponent(
    "navbar",
    "./Navbar/navbar.html",
    "./Navbar/navbar.css",
    "./Navbar/navbar.js"
  );
  loadComponent(
    "timer",
    "./countdownTimer/countdown.html",
    "./countdownTimer/countdown.css",
    "./countdownTimer/countdown.js"
  );
  loadComponent(
    "carousel",
    "./EventsPage/eventsPage.html",
    "./EventsPage/eventsPage.css",
    "./EventsPage/eventsPage.js"
  );
});

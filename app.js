// Bascule de langue EN/FR. Un seul jeu d'URLs ; préférence en localStorage.
(function () {
  var KEY = "i27-lang";
  function resolve() {
    var stored = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch (e) {}
    if (stored === "en" || stored === "fr") return stored;
    var nav = (navigator.language || "en").toLowerCase();
    return nav.indexOf("fr") === 0 ? "fr" : "en";
  }
  function apply(lang) {
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang);
    var btns = document.querySelectorAll(".lang-toggle button");
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute(
        "aria-pressed",
        btns[i].getAttribute("data-set") === lang ? "true" : "false"
      );
    }
    try {
      localStorage.setItem(KEY, lang);
    } catch (e) {}
  }
  function init() {
    apply(resolve());
    var toggle = document.querySelector(".lang-toggle");
    if (toggle) {
      toggle.addEventListener("click", function (e) {
        var b = e.target.closest("button[data-set]");
        if (b) apply(b.getAttribute("data-set"));
      });
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

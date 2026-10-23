/* Runs in <head> before first paint: flags JS support and decides whether the
   brand intro plays (first visit this session, reduced motion off). */
(function () {
  var root = document.documentElement;
  root.classList.add("js");
  try {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && !sessionStorage.getItem("bnm-intro-seen")) {
      root.classList.add("intro-on");
      sessionStorage.setItem("bnm-intro-seen", "1");
    }
  } catch (e) { /* storage blocked: skip the intro */ }
})();

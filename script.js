(function () {
  "use strict";

  var lines = [
    "> initializing secure session...",
    "[ OK ] scope verified: authorized targets only",
    "[ OK ] written permission on file",
    "[ OK ] responsible disclosure mode: ON",
    "[WARN] black hat mode: not found (404)",
    "> whoami",
    "ethical hacker | penetration tester | linux power user (6+ years)",
    "> mission: hack with permission, report with care, help fix it."
  ];

  var el = document.getElementById("boot");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Safe rendering: only textContent and createElement, never innerHTML.
  function paint(text) {
    el.textContent = "";
    text.split("\n").forEach(function (line, i, arr) {
      var tag = line.indexOf("[ OK ]") === 0 ? "ok" : line.indexOf("[WARN]") === 0 ? "warn" : null;
      if (tag) {
        var span = document.createElement("span");
        span.className = tag;
        span.textContent = line.slice(0, 6);
        el.appendChild(span);
        el.appendChild(document.createTextNode(line.slice(6)));
      } else {
        el.appendChild(document.createTextNode(line));
      }
      if (i < arr.length - 1) el.appendChild(document.createTextNode("\n"));
    });
  }

  if (el) {
    if (reduce) {
      paint(lines.join("\n"));
    } else {
      var li = 0, ci = 0, out = "";
      (function type() {
        if (li >= lines.length) return;
        var ln = lines[li];
        if (ci < ln.length) {
          out += ln.charAt(ci++);
          paint(out);
          setTimeout(type, ln.charAt(0) === "[" ? 6 : 16);
        } else {
          out += "\n";
          li++;
          ci = 0;
          paint(out);
          setTimeout(type, 160);
        }
      })();
    }
  }

  // Declassify buttons
  document.querySelectorAll(".redact").forEach(function (b) {
    b.addEventListener("click", function () {
      b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") === "true" ? "false" : "true");
    });
  });

  // Matrix rain background
  var c = document.getElementById("rain");
  if (c && !reduce) {
    var x = c.getContext("2d"), cols, drops;
    var ch = "01アイウエオカキクケコ#$%&*<>/";
    function size() {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      cols = Math.floor(c.width / 16);
      drops = [];
      for (var i = 0; i < cols; i++) drops[i] = Math.random() * c.height / 16;
    }
    size();
    window.addEventListener("resize", size);
    setInterval(function () {
      x.fillStyle = "rgba(5,10,7,.12)";
      x.fillRect(0, 0, c.width, c.height);
      x.fillStyle = "#2bff77";
      x.font = "14px monospace";
      for (var i = 0; i < cols; i++) {
        x.fillText(ch.charAt(Math.floor(Math.random() * ch.length)), i * 16, drops[i] * 16);
        if (drops[i] * 16 > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }, 60);
  }
})();

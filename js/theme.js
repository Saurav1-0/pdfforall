(() => {
  const KEY = "pdfforall_theme";
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (_) {}
  const initial = saved === "dark" || saved === "light" ? saved :
    (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  root.dataset.theme = initial;

  function mountToggle() {
    if (document.getElementById("pdfforall-theme-toggle")) return;
    const button = document.createElement("button");
    button.id = "pdfforall-theme-toggle";
    button.type = "button";
    button.setAttribute("aria-label", "Switch colour theme");
    button.setAttribute("title", "Switch light or dark mode");
    button.innerHTML = '<span aria-hidden="true" class="pfa-theme-icon"></span><span class="pfa-theme-label"></span>';
    const headerInner = document.querySelector("header .header-inner, header .container, header");
    if (headerInner) {
      button.style.marginInlineStart = "12px";
      button.style.flexShrink = "0";
      headerInner.appendChild(button);
    } else {
      button.style.position = "fixed";
      button.style.top = "14px";
      button.style.right = "14px";
      button.style.zIndex = "10000";
      document.body.appendChild(button);
    }
    function render() {
      const dark = root.dataset.theme === "dark";
      button.querySelector(".pfa-theme-icon").textContent = dark ? "☀" : "☾";
      button.querySelector(".pfa-theme-label").textContent = dark ? "Light mode" : "Dark mode";
      button.setAttribute("aria-pressed", String(dark));
    }
    button.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem(KEY, next); } catch (_) {}
      render();
    });
    render();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountToggle, { once:true });
  } else mountToggle();
})();
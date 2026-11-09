/*
 * PDFforAll analytics consent manager.
 * Add your real GA4 Measurement ID and Microsoft Clarity Project ID below.
 * Tracking scripts are not loaded until a visitor accepts optional analytics.
 */
(() => {
  const GA4_ID = "";       // Example: G-XXXXXXXXXX
  const CLARITY_ID = "";   // Your Microsoft Clarity project ID
  const STORAGE_KEY = "pdfforall_analytics_consent_v1";

  function loadAnalytics() {
    if (GA4_ID && !document.querySelector('script[data-pdfforall-ga4]')) {
      const gtagScript = document.createElement("script");
      gtagScript.async = true;
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`;
      gtagScript.dataset.pdfforallGa4 = "true";
      document.head.appendChild(gtagScript);
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", GA4_ID, { anonymize_ip: true });
      if (location.pathname.indexOf("/tools/") === 0) {
        window.gtag("event", "tool_open", {
          tool_name: location.pathname.split("/").filter(Boolean).pop() || "unknown"
        });
      }
    }
    if (CLARITY_ID && !window.__pdfforallClarityLoaded) {
      window.__pdfforallClarityLoaded = true;
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", CLARITY_ID);
    }
  }

  function recordEvent(name, params = {}) {
    if (localStorage.getItem(STORAGE_KEY) !== "accepted") return;
    if (typeof window.gtag === "function") window.gtag("event", name, params);
  }
  window.PDFforAllAnalytics = { event: recordEvent };

  document.addEventListener("click", (event) => {
    const downloadLink = event.target && event.target.closest
      ? event.target.closest("a[download]") : null;
    if (downloadLink) recordEvent("download_result", {
      tool_name: location.pathname.split("/").filter(Boolean).pop() || "homepage"
    });
  });

  function addBanner() {
    if (document.getElementById("pdfforall-cookie-banner")) return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "accepted") { loadAnalytics(); return; }
    if (saved === "rejected") return;

    const banner = document.createElement("section");
    banner.id = "pdfforall-cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie and analytics preferences");
    banner.setAttribute("aria-live", "polite");
    banner.innerHTML = `
      <div class="pfa-cookie-copy">
        <strong>Privacy choices</strong>
        <p>PDFforAll uses essential website storage and, only with your permission, optional analytics to understand site usage and improve our tools. We never send the contents of your PDFs to analytics providers. <a href="${location.pathname.includes('/tools/') ? '../privacy' : '/privacy'}">Read our Privacy Policy</a>.</p>
      </div>
      <div class="pfa-cookie-actions">
        <button type="button" data-choice="reject">Reject optional</button>
        <button type="button" data-choice="accept">Accept analytics</button>
      </div>`;
    document.body.appendChild(banner);
    banner.querySelector('[data-choice="accept"]').addEventListener("click", () => {
      localStorage.setItem(STORAGE_KEY, "accepted");
      banner.remove();
      loadAnalytics();
    });
    banner.querySelector('[data-choice="reject"]').addEventListener("click", () => {
      localStorage.setItem(STORAGE_KEY, "rejected");
      banner.remove();
    });
  }

  const style = document.createElement("style");
  style.textContent = `
    #pdfforall-cookie-banner{position:fixed;z-index:99999;left:16px;right:16px;bottom:16px;max-width:900px;margin:auto;
      display:flex;gap:18px;align-items:center;justify-content:space-between;padding:18px 20px;background:#fff;color:#172033;
      border:1px solid #cbd5e1;border-radius:14px;box-shadow:0 12px 40px rgba(15,23,42,.2);font:14px/1.5 system-ui,sans-serif}
    #pdfforall-cookie-banner .pfa-cookie-copy{flex:1;min-width:0}
    #pdfforall-cookie-banner strong{display:block;font-size:15px;margin-bottom:4px}
    #pdfforall-cookie-banner p{margin:0;color:#334155}
    #pdfforall-cookie-banner a{color:#5b21b6;text-decoration:underline}
    #pdfforall-cookie-banner .pfa-cookie-actions{display:flex;gap:8px;flex-wrap:wrap}
    #pdfforall-cookie-banner button{border:1px solid #64748b;border-radius:8px;padding:9px 12px;background:#fff;color:#172033;font-weight:650;cursor:pointer}
    #pdfforall-cookie-banner button[data-choice="accept"]{background:#5b21b6;border-color:#5b21b6;color:#fff}
    #pdfforall-cookie-banner button:focus-visible{outline:3px solid #f59e0b;outline-offset:2px}
    @media(max-width:640px){#pdfforall-cookie-banner{left:10px;right:10px;bottom:10px;display:block;padding:15px}
      #pdfforall-cookie-banner .pfa-cookie-actions{margin-top:12px}
      #pdfforall-cookie-banner button{flex:1}}
  `;
  document.head.appendChild(style);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addBanner, {once:true});
  else addBanner();
})();

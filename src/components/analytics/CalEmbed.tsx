import Script from "next/script";

const CAL_ORIGIN = "https://cal.com";
const EMBED_SRC = "https://app.cal.com/embed/embed.js";

// Queues Cal() until embed.js loads, then records a successful booking.
const calEmbed = `
(function (C, A, L) {
  var p = function (a, ar) { a.q.push(ar); };
  var d = C.document;
  C.Cal = C.Cal || function () {
    var cal = C.Cal;
    var ar = arguments;
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      d.head.appendChild(d.createElement("script")).src = A;
      cal.loaded = true;
    }
    if (ar[0] === L) {
      var api = function () { p(api, arguments); };
      var namespace = ar[1];
      api.q = api.q || [];
      if (typeof namespace === "string") {
        cal.ns[namespace] = cal.ns[namespace] || api;
        p(cal.ns[namespace], ar);
        p(cal, ["initNamespace", namespace]);
      } else p(cal, ar);
      return;
    }
    p(cal, ar);
  };
})(window, "${EMBED_SRC}", "init");
Cal("init", { origin: "${CAL_ORIGIN}" });
Cal("ui", {
  cssVarsPerTheme: {
    light: { "cal-brand": "#c25e3a" },
    dark: { "cal-brand": "#c25e3a" }
  },
  hideEventTypeDetails: false,
  layout: "month_view"
});
Cal("on", {
  action: "bookingSuccessfulV2",
  callback: function (e) {
    var data = (e && e.detail && e.detail.data) || {};
    var id = data.uid || [data.startTime, data.endTime, data.title].filter(Boolean).join("|");
    window.__sigilScheduled = window.__sigilScheduled || {};
    if (id && window.__sigilScheduled[id]) return;
    if (id) window.__sigilScheduled[id] = true;
    if (typeof fbq !== "function") return;
    fbq("track", "Schedule", {
      content_name: data.title || "Sigil Data Appraisal"
    });
  }
});
`;

export function CalEmbed() {
  return (
    <Script id="cal-embed" strategy="afterInteractive">
      {calEmbed}
    </Script>
  );
}

type Fbq = (...args: unknown[]) => void;

type CalFn = ((...args: unknown[]) => void) & {
  fingerprint?: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    Cal?: CalFn;
  }
}

export function trackMetaEvent(
  method: "track" | "trackCustom",
  event: string,
  params?: Record<string, string>,
) {
  if (typeof window.fbq !== "function") return;
  if (params) window.fbq(method, event, params);
  else window.fbq(method, event);
}

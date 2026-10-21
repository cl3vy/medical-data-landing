"use client";

import { trackMetaEvent } from "@/lib/meta-pixel";

export const APPRAISAL_BOOKING_URL =
  "https://cal.com/team/sigil-ai/sigil-data-appraisal";

const CAL_LINK = "team/sigil-ai/sigil-data-appraisal";

export function BookAppraisal({ className }: { className?: string }) {
  return (
    <a
      href={APPRAISAL_BOOKING_URL}
      className={className}
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view"}'
      onClick={(event) => {
        trackMetaEvent("trackCustom", "BookAppraisal", {
          content_name: "Sigil Data Appraisal",
        });
        const cal = window.Cal;
        if (typeof cal === "function" && cal.fingerprint) {
          event.preventDefault();
        }
      }}
    >
      Book a free appraisal
    </a>
  );
}

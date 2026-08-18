import { NAV_LINKS } from "@/lib/examples";

export function Footer() {
  return (
    <footer className="content-wrap mt-[var(--space-section)] pb-[var(--space-block)]">
      <div
        className="border-t-2 border-[var(--color-divider)] pt-[var(--space-group)] grid gap-[var(--space-group)] items-start"
        data-stack
        style={{ gridTemplateColumns: "minmax(0, 1fr) auto" }}
      >
        <p className="font-extrabold text-[22px] tracking-[-0.02em]">SIGIL</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-6">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <p className="mt-[var(--space-block)] text-[13px] leading-relaxed max-w-[70ch]">
        <strong className="font-semibold">Do not submit PHI through this website.</strong>{" "}
        Please do not send patient information, medical records, or confidential
        datasets by web form or email.
      </p>
      <p className="mt-[var(--space-item)] text-[11px] leading-relaxed text-[var(--color-neutral-700)] max-w-[78ch]">
        © 2026 Sigil. Financial figures describe representative and potential
        outcomes only; results vary with data quality, ownership rights, buyer
        demand, permitted uses, and final deal terms. Slider output is an
        illustrative estimate, not an offer.
      </p>
    </footer>
  );
}

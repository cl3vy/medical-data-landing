function OpenAIMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-8 w-8" fill="currentColor">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071.0099l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071-.0098l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  );
}

function AnthropicMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-8 w-8" fill="currentColor">
      <path d="M13.827 3.52h3.672L24 20.48h-3.744l-1.346-3.377H8.317l-1.346 3.377H3.226L10.5 3.52h3.327Zm-.586 11.226 2.4-6.014 2.4 6.014h-4.8Z" />
    </svg>
  );
}

function Micro1Mark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className="h-8 w-8" fill="currentColor">
      <circle cx="16" cy="16" r="14.5" fill="none" stroke="currentColor" strokeWidth="1.75" />
      <text
        x="16"
        y="21.5"
        textAnchor="middle"
        fontSize="13"
        fontWeight="800"
        fontFamily="inherit"
      >
        m1
      </text>
    </svg>
  );
}

const PARTNERS = [
  { name: "OpenAI", href: "https://openai.com", Mark: OpenAIMark },
  { name: "Anthropic", href: "https://www.anthropic.com", Mark: AnthropicMark },
  { name: "micro1", href: "https://micro1.ai", Mark: Micro1Mark },
] as const;

export function Partners() {
  return (
    <section aria-label="Partners" className="content-wrap pt-[clamp(40px,6vw,72px)]">
      <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[var(--color-neutral-700)]">
        We work with
      </p>
      <ul
        className="mt-[var(--space-item)] border-y-2 border-[var(--color-divider)] grid"
        data-stack
        style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
      >
        {PARTNERS.map((partner, i) => (
          <li
            key={partner.name}
            className={
              i < PARTNERS.length - 1
                ? "border-r-2 border-[var(--color-divider)]"
                : ""
            }
            data-stack-border={i < PARTNERS.length - 1 ? true : undefined}
          >
            <a
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 min-h-[88px] px-4 text-[var(--color-text)] no-underline transition-colors duration-200 hover:text-[var(--color-accent)]"
            >
              <partner.Mark />
              <span className="font-extrabold text-[clamp(1.15rem,2vw,1.45rem)] tracking-[-0.03em]">
                {partner.name}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

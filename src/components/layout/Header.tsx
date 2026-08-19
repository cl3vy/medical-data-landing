export function Header() {
  return (
    <header className="wrap flex items-center justify-between py-7">
      <a
        href="/"
        className="flex items-center gap-2.5 text-[var(--color-text)] hover:text-[var(--color-text)]"
      >
        <span
          className="size-[22px] rounded-full bg-[var(--color-accent)]"
          aria-hidden
        />
        <span className="font-serif text-[21px] font-medium tracking-[-0.01em]">
          Sigil
        </span>
      </a>
      <a href="/form" className="btn-ghost px-[22px] py-2.5 text-[14px] font-medium">
        Get your appraisal
      </a>
    </header>
  );
}

import { BookAppraisal } from "@/components/BookAppraisal";

export function Header() {
  return (
    <header className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-7">
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
      <BookAppraisal className="btn-fill px-4 py-2.5 text-[14px] font-medium" />
    </header>
  );
}

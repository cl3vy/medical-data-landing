type SvgProps = {
  className?: string;
};

export function HeroValue({ className }: SvgProps) {
  return (
    <svg
      width="440"
      height="420"
      viewBox="0 0 440 420"
      fill="none"
      className={className}
      aria-hidden
    >
      <rect x="60" y="252" width="150" height="20" rx="4" fill="#EFE6D9" />
      <rect x="52" y="276" width="166" height="20" rx="4" fill="#E7DBC9" />
      <rect x="44" y="300" width="182" height="20" rx="4" fill="#DDCEB6" />
      <rect x="36" y="324" width="198" height="20" rx="4" fill="#D2C1A4" />
      <rect
        x="80"
        y="200"
        width="130"
        height="72"
        rx="6"
        fill="#FAF7F1"
        stroke="#211E1A"
        strokeWidth="1.5"
      />
      <line x1="96" y1="220" x2="194" y2="220" stroke="#211E1A" strokeWidth="1.5" />
      <line x1="96" y1="236" x2="176" y2="236" stroke="#B7AC9C" strokeWidth="1.5" />
      <line x1="96" y1="252" x2="186" y2="252" stroke="#B7AC9C" strokeWidth="1.5" />
      <path
        d="M226 250 C 300 250, 300 160, 348 140"
        stroke="#C25E3A"
        strokeWidth="1.5"
        strokeDasharray="4 6"
      />
      <circle cx="352" cy="132" r="46" fill="#C25E3A" />
      <circle
        cx="352"
        cy="132"
        r="46"
        fill="none"
        stroke="#211E1A"
        strokeWidth="1.5"
        transform="translate(4 4)"
      />
      <text
        x="352"
        y="143"
        textAnchor="middle"
        fontFamily="var(--font-newsreader), serif"
        fontSize="34"
        fill="#FAF7F1"
      >
        $
      </text>
      <circle cx="290" cy="60" r="10" fill="none" stroke="#211E1A" strokeWidth="1.5" />
      <circle cx="404" cy="230" r="7" fill="#E7DBC9" />
      <circle cx="60" cy="140" r="5" fill="#C25E3A" />
      <line x1="252" y1="360" x2="404" y2="360" stroke="#211E1A" strokeWidth="1.5" />
      <circle cx="252" cy="360" r="4" fill="#211E1A" />
      <circle cx="404" cy="360" r="4" fill="#C25E3A" />
    </svg>
  );
}

export function Orbit({ className }: SvgProps) {
  return (
    <svg
      width="360"
      height="340"
      viewBox="0 0 360 340"
      fill="none"
      className={className}
      aria-hidden
    >
      <circle
        cx="180"
        cy="170"
        r="130"
        stroke="#57514A"
        strokeWidth="1.5"
        strokeDasharray="3 7"
      />
      <circle cx="180" cy="170" r="82" stroke="#57514A" strokeWidth="1.5" />
      <circle cx="180" cy="170" r="30" fill="#C25E3A" />
      <circle cx="180" cy="88" r="12" fill="#FAF7F1" />
      <circle cx="262" cy="170" r="12" fill="#E7DBC9" />
      <circle cx="122" cy="228" r="12" fill="#D2C1A4" />
      <circle cx="52" cy="80" r="4" fill="#57514A" />
      <circle cx="316" cy="272" r="4" fill="#57514A" />
    </svg>
  );
}

export function StepAppraise({ className }: SvgProps) {
  return (
    <svg
      width="120"
      height="90"
      viewBox="0 0 120 90"
      fill="none"
      className={className}
      aria-hidden
    >
      <circle cx="52" cy="42" r="26" stroke="#211E1A" strokeWidth="1.5" fill="#FAF7F1" />
      <line x1="71" y1="61" x2="92" y2="82" stroke="#211E1A" strokeWidth="1.5" />
      <circle cx="52" cy="42" r="9" fill="#C25E3A" />
      <circle cx="102" cy="18" r="4" fill="#D2C1A4" />
    </svg>
  );
}

export function StepClean({ className }: SvgProps) {
  return (
    <svg
      width="120"
      height="90"
      viewBox="0 0 120 90"
      fill="none"
      className={className}
      aria-hidden
    >
      <rect x="30" y="52" width="60" height="14" rx="4" fill="#D2C1A4" />
      <rect x="36" y="34" width="48" height="14" rx="4" fill="#E7DBC9" />
      <rect
        x="42"
        y="16"
        width="36"
        height="14"
        rx="4"
        fill="#FAF7F1"
        stroke="#211E1A"
        strokeWidth="1.5"
      />
      <circle cx="102" cy="66" r="5" fill="#C25E3A" />
    </svg>
  );
}

export function StepPay({ className }: SvgProps) {
  return (
    <svg
      width="120"
      height="90"
      viewBox="0 0 120 90"
      fill="none"
      className={className}
      aria-hidden
    >
      <circle cx="46" cy="52" r="22" fill="#C25E3A" />
      <text
        x="46"
        y="59"
        textAnchor="middle"
        fontFamily="var(--font-newsreader), serif"
        fontSize="20"
        fill="#FAF7F1"
      >
        $
      </text>
      <line x1="80" y1="64" x2="80" y2="24" stroke="#211E1A" strokeWidth="1.5" />
      <path d="M72 32 L80 22 L88 32" stroke="#211E1A" strokeWidth="1.5" fill="none" />
      <circle cx="104" cy="50" r="4" fill="#D2C1A4" />
    </svg>
  );
}

export function FormDoc({ className }: SvgProps) {
  return (
    <svg
      width="320"
      height="320"
      viewBox="0 0 320 320"
      fill="none"
      className={className}
      aria-hidden
    >
      <rect
        x="70"
        y="46"
        width="180"
        height="228"
        rx="10"
        fill="#FAF7F1"
        stroke="#211E1A"
        strokeWidth="1.5"
      />
      <rect
        x="78"
        y="54"
        width="180"
        height="228"
        rx="10"
        fill="none"
        stroke="#D2C1A4"
        strokeWidth="1.5"
      />
      <line x1="94" y1="86" x2="200" y2="86" stroke="#211E1A" strokeWidth="1.5" />
      <rect x="94" y="106" width="132" height="16" rx="4" fill="#F2ECE1" />
      <rect x="94" y="132" width="132" height="16" rx="4" fill="#F2ECE1" />
      <rect x="94" y="158" width="100" height="16" rx="4" fill="#F2ECE1" />
      <rect x="94" y="196" width="84" height="26" rx="13" fill="#C25E3A" />
      <circle cx="238" cy="240" r="20" fill="#C25E3A" />
      <path d="M230 240 L236 246 L248 232" stroke="#FAF7F1" strokeWidth="2.5" fill="none" />
      <circle cx="48" cy="90" r="5" fill="#D2C1A4" />
      <circle cx="276" cy="60" r="4" fill="#C25E3A" />
    </svg>
  );
}

export function ScatterGrid({ className }: SvgProps) {
  return (
    <svg
      width="380"
      height="340"
      viewBox="0 0 380 340"
      fill="none"
      className={className}
      aria-hidden
    >
      <rect
        x="24"
        y="40"
        width="34"
        height="24"
        rx="4"
        fill="#D2C1A4"
        transform="rotate(-12 41 52)"
      />
      <rect
        x="76"
        y="90"
        width="34"
        height="24"
        rx="4"
        fill="#E7DBC9"
        transform="rotate(8 93 102)"
      />
      <rect
        x="30"
        y="140"
        width="34"
        height="24"
        rx="4"
        fill="#C25E3A"
        transform="rotate(-6 47 152)"
      />
      <rect
        x="88"
        y="188"
        width="34"
        height="24"
        rx="4"
        fill="#D2C1A4"
        transform="rotate(14 105 200)"
      />
      <rect
        x="36"
        y="236"
        width="34"
        height="24"
        rx="4"
        fill="#E7DBC9"
        transform="rotate(-10 53 248)"
      />
      <path d="M150 168 L 218 168" stroke="#211E1A" strokeWidth="1.5" />
      <path d="M210 160 L220 168 L210 176" stroke="#211E1A" strokeWidth="1.5" fill="none" />
      <rect
        x="242"
        y="92"
        width="112"
        height="152"
        rx="10"
        fill="#FAF7F1"
        stroke="#211E1A"
        strokeWidth="1.5"
      />
      <rect
        x="256"
        y="108"
        width="36"
        height="26"
        rx="4"
        fill="#F2ECE1"
        stroke="#D2C1A4"
        strokeWidth="1"
      />
      <rect
        x="304"
        y="108"
        width="36"
        height="26"
        rx="4"
        fill="#F2ECE1"
        stroke="#D2C1A4"
        strokeWidth="1"
      />
      <rect
        x="256"
        y="144"
        width="36"
        height="26"
        rx="4"
        fill="#F2ECE1"
        stroke="#D2C1A4"
        strokeWidth="1"
      />
      <rect x="304" y="144" width="36" height="26" rx="4" fill="#C25E3A" />
      <rect
        x="256"
        y="180"
        width="36"
        height="26"
        rx="4"
        fill="#F2ECE1"
        stroke="#D2C1A4"
        strokeWidth="1"
      />
      <rect
        x="304"
        y="180"
        width="36"
        height="26"
        rx="4"
        fill="#F2ECE1"
        stroke="#D2C1A4"
        strokeWidth="1"
      />
      <circle cx="298" cy="64" r="5" fill="#C25E3A" />
      <circle cx="366" cy="270" r="4" fill="#D2C1A4" />
    </svg>
  );
}

export function Growth({ className }: SvgProps) {
  return (
    <svg
      width="360"
      height="340"
      viewBox="0 0 360 340"
      fill="none"
      className={className}
      aria-hidden
    >
      <line x1="50" y1="280" x2="320" y2="280" stroke="#211E1A" strokeWidth="1.5" />
      <rect x="72" y="216" width="44" height="64" rx="4" fill="#E7DBC9" />
      <rect x="138" y="176" width="44" height="104" rx="4" fill="#D2C1A4" />
      <rect x="204" y="128" width="44" height="152" rx="4" fill="#C25E3A" />
      <circle cx="226" cy="96" r="18" fill="#FAF7F1" stroke="#211E1A" strokeWidth="1.5" />
      <text
        x="226"
        y="103"
        textAnchor="middle"
        fontFamily="var(--font-newsreader), serif"
        fontSize="17"
        fill="#211E1A"
      >
        $
      </text>
      <path
        d="M262 120 C 292 96, 300 72, 306 48"
        stroke="#211E1A"
        strokeWidth="1.5"
        strokeDasharray="3 6"
        fill="none"
      />
      <circle cx="308" cy="42" r="6" fill="#C25E3A" />
      <circle cx="56" cy="120" r="4" fill="#D2C1A4" />
    </svg>
  );
}

export function Sunburst({ className }: SvgProps) {
  return (
    <svg
      width="140"
      height="90"
      viewBox="0 0 140 90"
      fill="none"
      className={className}
      aria-hidden
    >
      <circle cx="70" cy="86" r="40" fill="#C25E3A" />
      <line x1="70" y1="8" x2="70" y2="30" stroke="#B7AC9C" strokeWidth="1.5" />
      <line x1="26" y1="26" x2="40" y2="42" stroke="#B7AC9C" strokeWidth="1.5" />
      <line x1="114" y1="26" x2="100" y2="42" stroke="#B7AC9C" strokeWidth="1.5" />
      <line x1="6" y1="66" x2="26" y2="70" stroke="#B7AC9C" strokeWidth="1.5" />
      <line x1="134" y1="66" x2="114" y2="70" stroke="#B7AC9C" strokeWidth="1.5" />
    </svg>
  );
}

"use client";

type RangeSliderProps = {
  id: string;
  label: string;
  valueLabel: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
};

export function RangeSlider({
  id,
  label,
  valueLabel,
  min,
  max,
  step,
  value,
  onChange,
}: RangeSliderProps) {
  return (
    <div>
      <div className="flex justify-between items-baseline gap-3">
        <label
          htmlFor={id}
          className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--color-neutral-700)]"
        >
          {label}
        </label>
        <span className="font-extrabold text-[17px] tracking-tight">{valueLabel}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-[var(--space-group)]"
      />
    </div>
  );
}

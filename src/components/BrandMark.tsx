export default function BrandMark({ initial }: { initial: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-8 w-8 text-ink"
      role="img"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="30" height="30" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <text
        x="16"
        y="17"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="var(--font-mono), ui-monospace, monospace"
        fontSize="16"
        fontWeight="600"
        fill="currentColor"
      >
        {initial}
      </text>
    </svg>
  );
}

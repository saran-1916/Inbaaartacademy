interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  inverted?: boolean
  className?: string
}

const sizes = {
  sm: 28,
  md: 40,
  lg: 56,
  xl: 72,
}

export default function Logo({ size = 'md', inverted = false, className = '' }: LogoProps) {
  const px = sizes[size]
  const color = inverted ? 'var(--color-brand-light)' : 'var(--color-brand-dark)'
  const textSize = Math.max(8, Math.round(px * 0.275))

  return (
    <div
      className={`inline-flex flex-col items-center gap-1 ${className}`}
      style={{ fontFamily: '"DM Sans", sans-serif' }}
    >
      {/* Square border + IA monogram */}
      <svg
        width={px}
        height={px}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Inbaa Academy monogram"
      >
        {/* Thin square border */}
        <rect
          x="1"
          y="1"
          width="58"
          height="58"
          stroke={color}
          strokeWidth="1"
          fill="none"
        />

        {/*
          IA monogram:
          The "A" provides the outer diagonal strokes.
          The "I" shares the A's central vertical and crossbar.
          Together they form a single interlocked luxury monogram.
        */}

        {/* A — left diagonal */}
        <line x1="10" y1="48" x2="30" y2="13" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        {/* A — right diagonal */}
        <line x1="50" y1="48" x2="30" y2="13" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        {/* A — crossbar (shared with I crossbar) */}
        <line x1="18" y1="34" x2="42" y2="34" stroke={color} strokeWidth="1.5" strokeLinecap="round" />

        {/* I — center vertical (shares A's apex at top) */}
        <line x1="30" y1="13" x2="30" y2="48" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        {/* I — top serif */}
        <line x1="24" y1="13" x2="36" y2="13" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        {/* I — bottom serif */}
        <line x1="24" y1="48" x2="36" y2="48" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      {/* Wordmark */}
      <span
        style={{
          color,
          fontSize: `${textSize}px`,
          letterSpacing: '0.25em',
          fontWeight: 400,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          lineHeight: 1,
        }}
      >
        INBAA ACADEMY
      </span>
    </div>
  )
}

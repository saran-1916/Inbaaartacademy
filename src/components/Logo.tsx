interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  inverted?: boolean
  className?: string
}

const heights: Record<NonNullable<LogoProps['size']>, number> = {
  sm: 56,
  md: 80,
  lg: 110,
  xl: 150,
}

export default function Logo({ size = 'md', inverted = false, className = '' }: LogoProps) {
  const h = heights[size]

  return (
    <img
      src="/images/Logo.png"
      alt="Inbaa Arts Academy"
      height={h}
      className={className}
      style={{
        height: h,
        width: 'auto',
        display: 'block',
        filter: inverted ? 'brightness(0) invert(1)' : undefined,
        objectFit: 'contain',
      }}
    />
  )
}

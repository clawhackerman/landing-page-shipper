'use client'

interface IconProps {
  d: string
  size?: number
  className?: string
  label?: string
}

export default function Icon({ d, size = 24, className = '', label }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={!label}
      aria-label={label}
      role={label ? 'img' : undefined}
    >
      <path d={d} />
    </svg>
  )
}

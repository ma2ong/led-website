'use client'

type HeadingProps = {
  title: string
  subtitle?: string
  className?: string
}

export function Heading({ title, subtitle, className = '' }: HeadingProps) {
  return (
    <div className={`text-center ${className}`}>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}
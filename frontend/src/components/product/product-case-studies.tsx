'use client'

import Link from 'next/link'
import { CaseStudy } from '@/types/case-study'
import { OptimizedImage } from '../ui/optimized-image'

type ProductCaseStudiesProps = {
  caseStudies: CaseStudy[]
  className?: string
}

export function ProductCaseStudies({ caseStudies, className = '' }: ProductCaseStudiesProps) {
  if (!caseStudies || caseStudies.length === 0) return null

  return (
    <div className={className}>
      <h2 className="mb-6 text-2xl font-bold">相关案例</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((caseStudy) => (
          <Link
            key={caseStudy.id}
            href={`/case-studies/${caseStudy.slug}`}
            className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
          >
            {/* Case Study Image */}
            <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100">
              {caseStudy.mainImage ? (
                <OptimizedImage
                  src={caseStudy.mainImage}
                  alt={caseStudy.title}
                  width={600}
                  height={338}
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                  <span>无图片</span>
                </div>
              )}
            </div>

            {/* Case Study Info */}
            <div className="p-4">
              <h3 className="mb-1 text-lg font-medium text-gray-900 line-clamp-1 group-hover:text-primary-600">
                {caseStudy.title}
              </h3>
              {caseStudy.shortDescription && (
                <p className="mb-2 text-sm text-gray-500 line-clamp-2">
                  {caseStudy.shortDescription}
                </p>
              )}
              <div className="flex items-center justify-between text-xs text-gray-400">
                {caseStudy.industry && (
                  <span>{caseStudy.industry}</span>
                )}
                {caseStudy.location && (
                  <span>{caseStudy.location}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
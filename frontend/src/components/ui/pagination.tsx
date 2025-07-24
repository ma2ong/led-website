'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

type PaginationProps = {
  currentPage: number
  totalPages: number
  baseUrl: string
  className?: string
}

export function Pagination({ currentPage, totalPages, baseUrl, className = '' }: PaginationProps) {
  const searchParams = useSearchParams()

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    return `${baseUrl}?${params.toString()}`
  }

  if (totalPages <= 1) return null

  const pages = []
  const showPages = 5 // Number of page numbers to show

  let startPage = Math.max(1, currentPage - Math.floor(showPages / 2))
  let endPage = Math.min(totalPages, startPage + showPages - 1)

  // Adjust start page if we're near the end
  if (endPage - startPage + 1 < showPages) {
    startPage = Math.max(1, endPage - showPages + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return (
    <nav className={`flex items-center justify-center space-x-1 ${className}`} aria-label="Pagination">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          <span className="ml-1 hidden sm:inline">上一页</span>
        </Link>
      ) : (
        <span className="flex items-center justify-center rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-400 cursor-not-allowed">
          <ChevronLeftIcon className="h-4 w-4" />
          <span className="ml-1 hidden sm:inline">上一页</span>
        </span>
      )}

      {/* First page and ellipsis */}
      {startPage > 1 && (
        <>
          <Link
            href={createPageUrl(1)}
            className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            1
          </Link>
          {startPage > 2 && (
            <span className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-500">
              ...
            </span>
          )}
        </>
      )}

      {/* Page numbers */}
      {pages.map((page) => (
        page === currentPage ? (
          <span
            key={page}
            className="flex items-center justify-center rounded-md border border-primary-500 bg-primary-600 px-3 py-2 text-sm font-medium text-white"
            aria-current="page"
          >
            {page}
          </span>
        ) : (
          <Link
            key={page}
            href={createPageUrl(page)}
            className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            {page}
          </Link>
        )
      ))}

      {/* Last page and ellipsis */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-500">
              ...
            </span>
          )}
          <Link
            href={createPageUrl(totalPages)}
            className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
          aria-label="Next page"
        >
          <span className="mr-1 hidden sm:inline">下一页</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Link>
      ) : (
        <span className="flex items-center justify-center rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-400 cursor-not-allowed">
          <span className="mr-1 hidden sm:inline">下一页</span>
          <ChevronRightIcon className="h-4 w-4" />
        </span>
      )}
    </nav>
  )
}
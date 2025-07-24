import { strapi } from '@/lib/strapi'
import { CaseStudy, CASE_STUDY_INDUSTRIES } from '@/types/case-study'

// Transform Strapi case study data to our CaseStudy type
function transformCaseStudy(strapiCaseStudy: any): CaseStudy {
  const attributes = strapiCaseStudy.attributes || strapiCaseStudy
  
  return {
    id: strapiCaseStudy.id,
    title: attributes.title,
    slug: attributes.slug,
    client: attributes.client,
    location: attributes.location,
    industry: attributes.industry,
    industryInfo: CASE_STUDY_INDUSTRIES[attributes.industry],
    
    // Content
    challenge: attributes.challenge,
    solution: attributes.solution,
    results: attributes.results,
    summary: attributes.summary,
    
    // Project details
    projectDate: attributes.projectDate,
    projectValue: attributes.projectValue,
    formattedProjectValue: attributes.formattedProjectValue,
    formattedProjectDate: attributes.formattedProjectDate,
    
    // Media
    mainImage: attributes.mainImage?.data ? {
      id: attributes.mainImage.data.id,
      url: attributes.mainImage.data.attributes.url,
      alternativeText: attributes.mainImage.data.attributes.alternativeText,
      width: attributes.mainImage.data.attributes.width,
      height: attributes.mainImage.data.attributes.height,
    } : undefined,
    images: attributes.images?.data?.map((img: any) => ({
      id: img.id,
      url: img.attributes.url,
      alternativeText: img.attributes.alternativeText,
      width: img.attributes.width,
      height: img.attributes.height,
    })) || [],
    videos: attributes.videos?.data?.map((video: any) => ({
      id: video.id,
      url: video.attributes.url,
      alternativeText: video.attributes.alternativeText,
      mime: video.attributes.mime,
    })) || [],
    
    // Business fields
    isActive: attributes.isActive !== false,
    isFeatured: attributes.isFeatured || false,
    sortOrder: attributes.sortOrder || 0,
    
    // SEO
    seoTitle: attributes.seoTitle,
    seoDescription: attributes.seoDescription,
    seoKeywords: attributes.seoKeywords,
    
    // Relations
    products: attributes.products?.data?.map((product: any) => ({
      id: product.id,
      name: product.attributes.name,
      slug: product.attributes.slug,
      category: product.attributes.category,
      modelNumber: product.attributes.modelNumber,
      pixelPitch: product.attributes.pixelPitch,
      mainImage: product.attributes.mainImage?.data ? {
        id: product.attributes.mainImage.data.id,
        url: product.attributes.mainImage.data.attributes.url,
        alternativeText: product.attributes.mainImage.data.attributes.alternativeText,
        width: product.attributes.mainImage.data.attributes.width,
        height: product.attributes.mainImage.data.attributes.height,
      } : undefined,
      isActive: product.attributes.isActive,
      isFeatured: product.attributes.isFeatured,
    })) || [],
    
    // Computed fields
    readingTime: attributes.readingTime,
    productCount: attributes.productCount,
    imageCount: attributes.imageCount,
    videoCount: attributes.videoCount,
    
    // Timestamps
    createdAt: attributes.createdAt,
    updatedAt: attributes.updatedAt,
    publishedAt: attributes.publishedAt,
  }
}

export async function getCaseStudies(options: {
  locale?: string
  page?: number
  pageSize?: number
  sort?: string
  filter?: string
  industry?: string
  filters?: {
    industry?: string
    region?: string
    product?: string
    search?: string
    exclude?: number
  }
} = {}): Promise<{ data: CaseStudy[], meta?: any }> {
  const { locale = 'zh', page = 1, pageSize = 12, sort = 'newest', filter, industry, filters } = options

  try {
    // Build sort parameter
    let sortParam = 'createdAt:desc'
    switch (sort) {
      case 'date-new':
        sortParam = 'projectDate:desc'
        break
      case 'date-old':
        sortParam = 'projectDate:asc'
        break
      case 'value-high':
        sortParam = 'projectValue:desc'
        break
      case 'value-low':
        sortParam = 'projectValue:asc'
        break
      case 'newest':
      default:
        sortParam = 'createdAt:desc'
        break
    }

    // Build filters
    const filters: any = {
      isActive: true
    }

    if (industry) {
      filters['industry[$eq]'] = industry
    }

    // Handle filters object
    if (filters) {
      if (filters.industry) {
        filters['industry[$eq]'] = filters.industry
      }
      if (filters.region) {
        filters['region[$eq]'] = filters.region
      }
      if (filters.search) {
        filters['$or'] = [
          { title: { $containsi: filters.search } },
          { client: { $containsi: filters.search } },
          { location: { $containsi: filters.search } }
        ]
      }
      if (filters.exclude) {
        filters['id[$ne]'] = filters.exclude
      }
    }

    // Add additional filters
    if (filter) {
      const filterArray = filter.split(',')
      filterArray.forEach(f => {
        switch (f) {
          case 'featured':
            filters['isFeatured[$eq]'] = true
            break
          case 'has-value':
            filters['projectValue[$gt]'] = 0
            break
          case 'recent':
            // Case studies from the last year
            const oneYearAgo = new Date()
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
            filters['projectDate[$gte]'] = oneYearAgo.toISOString()
            break
        }
      })
    }

    const response = await strapi.get('/case-studies', {
      params: {
        filters,
        locale,
        populate: {
          mainImage: true,
          images: true,
          videos: true,
          products: {
            populate: {
              mainImage: true
            }
          }
        },
        sort: sortParam,
        pagination: {
          page,
          pageSize: 12
        }
      }
    })

    return {
      data: response.data.map(transformCaseStudy),
      meta: response.meta
    }
  } catch (error) {
    console.error('Error fetching case studies:', error)
    return { data: [] }
  }
}

export async function getCaseStudy(slug: string, options: { locale?: string } = {}): Promise<{ data: CaseStudy | null }> {
  const { locale = 'zh' } = options
  const caseStudy = await getCaseStudyBySlug(slug, locale)
  return { data: caseStudy }
}

export async function getCaseStudyBySlug(slug: string, locale: string = 'zh'): Promise<CaseStudy | null> {
  try {
    const response = await strapi.get(`/case-studies/slug/${slug}`, {
      params: {
        locale,
        populate: {
          mainImage: true,
          images: true,
          videos: true,
          products: {
            populate: {
              mainImage: true
            }
          }
        }
      }
    })

    if (response.data) {
      return transformCaseStudy(response.data)
    }

    return null
  } catch (error) {
    console.error('Error fetching case study by slug:', error)
    return null
  }
}

export async function getFeaturedCaseStudies(locale: string = 'zh'): Promise<{ data: CaseStudy[] }> {
  try {
    const response = await strapi.get('/case-studies/featured', {
      params: {
        locale,
        populate: {
          mainImage: true,
          products: {
            populate: {
              mainImage: true
            }
          }
        }
      }
    })

    return {
      data: response.data.map(transformCaseStudy)
    }
  } catch (error) {
    console.error('Error fetching featured case studies:', error)
    return { data: [] }
  }
}

export async function getCaseStudiesByIndustry(
  industry: string, 
  locale: string = 'zh'
): Promise<{ data: CaseStudy[] }> {
  try {
    const response = await strapi.get(`/case-studies/industry/${industry}`, {
      params: {
        locale,
        populate: {
          mainImage: true,
          products: {
            populate: {
              mainImage: true
            }
          }
        }
      }
    })

    return {
      data: response.data.map(transformCaseStudy)
    }
  } catch (error) {
    console.error('Error fetching case studies by industry:', error)
    return { data: [] }
  }
}

export async function getRelatedCaseStudies(
  caseStudyId: number, 
  locale: string = 'zh'
): Promise<{ data: CaseStudy[] }> {
  try {
    const response = await strapi.get(`/case-studies/${caseStudyId}/related`, {
      params: {
        locale,
        populate: {
          mainImage: true,
          products: {
            populate: {
              mainImage: true
            }
          }
        }
      }
    })

    return {
      data: response.data.map(transformCaseStudy)
    }
  } catch (error) {
    console.error('Error fetching related case studies:', error)
    return { data: [] }
  }
}

export async function getCaseStudiesByProduct(
  productId: number, 
  locale: string = 'zh'
): Promise<{ data: CaseStudy[] }> {
  try {
    const response = await strapi.get(`/case-studies/product/${productId}`, {
      params: {
        locale,
        populate: {
          mainImage: true,
          products: {
            populate: {
              mainImage: true
            }
          }
        }
      }
    })

    return {
      data: response.data.map(transformCaseStudy)
    }
  } catch (error) {
    console.error('Error fetching case studies by product:', error)
    return { data: [] }
  }
}

export async function searchCaseStudies(
  query: string, 
  locale: string = 'zh'
): Promise<{ data: CaseStudy[] }> {
  try {
    const response = await strapi.get('/case-studies/search', {
      params: {
        q: query,
        locale,
        populate: {
          mainImage: true,
          products: {
            populate: {
              mainImage: true
            }
          }
        }
      }
    })

    return {
      data: response.data.map(transformCaseStudy)
    }
  } catch (error) {
    console.error('Error searching case studies:', error)
    return { data: [] }
  }
}

export async function getCaseStudyStats(): Promise<{
  total: number
  byIndustry: Record<string, number>
  featured: number
  active: number
} | null> {
  try {
    const response = await strapi.get('/case-studies/stats')
    return response.data
  } catch (error) {
    console.error('Error fetching case study stats:', error)
    return null
  }
}

export async function getIndustryStats(): Promise<Record<string, number> | null> {
  try {
    const response = await strapi.get('/case-studies/industry-stats')
    return response.data
  } catch (error) {
    console.error('Error fetching industry stats:', error)
    return null
  }
}
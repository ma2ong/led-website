import { strapi } from '@/lib/strapi'
import { Product, PRODUCT_CATEGORIES } from '@/types/product'

// Transform Strapi product data to our Product type
function transformProduct(strapiProduct: any): Product {
  const attributes = strapiProduct.attributes || strapiProduct
  
  return {
    id: strapiProduct.id,
    name: attributes.name,
    slug: attributes.slug,
    shortDescription: attributes.shortDescription,
    description: attributes.description,
    category: attributes.category,
    categoryInfo: PRODUCT_CATEGORIES.find(c => c.key === attributes.category),
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
    price: attributes.price,
    discountPrice: attributes.discountPrice,
    formattedPrice: attributes.price ? `¥${attributes.price.toLocaleString()}` : undefined,
    isFeatured: attributes.isFeatured || false,
    inStock: attributes.inStock !== false,
    modelNumber: attributes.modelNumber,
    pixelPitch: attributes.pixelPitch,
    brightness: attributes.brightness,
    resolution: attributes.resolution,
    viewingAngle: attributes.viewingAngle,
    ipRating: attributes.ipRating,
    refreshRate: attributes.refreshRate,
    warranty: attributes.warranty,
    specifications: attributes.specifications || [],
    features: attributes.features || [],
    applications: attributes.applications || [],
    case_studies: attributes.case_studies?.data?.map((cs: any) => ({
      id: cs.id,
      title: cs.attributes.title,
      slug: cs.attributes.slug,
      shortDescription: cs.attributes.shortDescription,
      industry: cs.attributes.industry,
      location: cs.attributes.location,
      mainImage: cs.attributes.mainImage?.data ? {
        id: cs.attributes.mainImage.data.id,
        url: cs.attributes.mainImage.data.attributes.url,
        alternativeText: cs.attributes.mainImage.data.attributes.alternativeText,
        width: cs.attributes.mainImage.data.attributes.width,
        height: cs.attributes.mainImage.data.attributes.height,
      } : undefined,
    })) || [],
    createdAt: attributes.createdAt,
    updatedAt: attributes.updatedAt,
  }
}

export async function getProducts(options: {
  locale?: string
  page?: number
  sort?: string
  filter?: string
  category?: string
} = {}): Promise<{ data: Product[], meta?: any }> {
  const { locale = 'zh', page = 1, sort = 'newest', filter, category } = options

  try {
    // Build sort parameter
    let sortParam = 'createdAt:desc'
    switch (sort) {
      case 'price-low':
        sortParam = 'price:asc'
        break
      case 'price-high':
        sortParam = 'price:desc'
        break
      case 'name-asc':
        sortParam = 'name:asc'
        break
      case 'name-desc':
        sortParam = 'name:desc'
        break
      case 'newest':
      default:
        sortParam = 'createdAt:desc'
        break
    }

    // Build filters
    const filters: any = {}

    if (category) {
      filters['category[$eq]'] = category
    }

    // Add additional filters
    if (filter) {
      const filterArray = filter.split(',')
      filterArray.forEach(f => {
        switch (f) {
          case 'featured':
            filters['isFeatured[$eq]'] = true
            break
          case 'in-stock':
            filters['inStock[$eq]'] = true
            break
          case 'new-arrival':
            // Products created in the last 30 days
            const thirtyDaysAgo = new Date()
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
            filters['createdAt[$gte]'] = thirtyDaysAgo.toISOString()
            break
          case 'has-discount':
            filters['discountPrice[$ne]'] = null
            break
        }
      })
    }

    const response = await strapi.get('/products', {
      params: {
        filters,
        locale,
        populate: {
          mainImage: true,
          images: true
        },
        sort: sortParam,
        pagination: {
          page,
          pageSize: 12
        }
      }
    })

    return {
      data: response.data.map(transformProduct),
      meta: response.meta
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return { data: [] }
  }
}

export async function getProductBySlug(slug: string, locale: string = 'zh'): Promise<Product | null> {
  try {
    const response = await strapi.get(`/products`, {
      params: {
        'filters[slug][$eq]': slug,
        locale,
        populate: {
          mainImage: true,
          images: true,
          specifications: true,
          features: true,
          applications: true,
          case_studies: {
            populate: ['mainImage']
          }
        }
      }
    })

    if (response.data && response.data.length > 0) {
      return transformProduct(response.data[0])
    }

    return null
  } catch (error) {
    console.error('Error fetching product by slug:', error)
    return null
  }
}

export async function getFeaturedProducts(locale: string = 'zh'): Promise<{ data: Product[] }> {
  try {
    const response = await strapi.get('/products', {
      params: {
        'filters[isFeatured][$eq]': true,
        locale,
        populate: {
          mainImage: true,
          images: true
        },
        sort: 'createdAt:desc',
        pagination: {
          limit: 6
        }
      }
    })

    return {
      data: response.data.map(transformProduct)
    }
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return { data: [] }
  }
}

export async function getRelatedProducts(productId: number, locale: string = 'zh'): Promise<{ data: Product[] }> {
  try {
    // First get the current product to find its category
    const currentProduct = await strapi.get(`/products/${productId}`, {
      params: {
        locale,
        populate: ['category']
      }
    })

    if (!currentProduct.data) {
      return { data: [] }
    }

    // Get products from the same category, excluding the current product
    const response = await strapi.get('/products', {
      params: {
        'filters[category][$eq]': currentProduct.data.attributes.category,
        'filters[id][$ne]': productId,
        locale,
        populate: {
          mainImage: true,
          images: true
        },
        sort: 'createdAt:desc',
        pagination: {
          limit: 4
        }
      }
    })

    return {
      data: response.data.map(transformProduct)
    }
  } catch (error) {
    console.error('Error fetching related products:', error)
    return { data: [] }
  }
}

// Get single product by slug
export async function getProduct(slug: string, options: {
  locale?: string
  populate?: string[]
} = {}): Promise<{ data: Product | null }> {
  const { locale = 'zh' } = options
  
  try {
    const product = await getProductBySlug(slug, locale)
    return { data: product }
  } catch (error) {
    console.error('Error fetching product:', error)
    return { data: null }
  }
}

// Get product categories
export async function getProductCategories(options: {
  locale?: string
} = {}): Promise<{ data: any[] }> {
  // Return static categories for now - in real implementation, this would come from Strapi
  return {
    data: PRODUCT_CATEGORIES.map(cat => ({
      id: cat.key,
      name: cat.name,
      slug: cat.key,
      description: cat.description
    }))
  }
}

export async function getProductsByCategory(
  category: string, 
  options: {
    locale?: string
    page?: number
    sort?: string
    filter?: string
  } = {}
): Promise<{ data: Product[], meta?: any }> {
  const { locale = 'zh', page = 1, sort = 'newest', filter } = options

  try {
    // Build sort parameter
    let sortParam = 'createdAt:desc'
    switch (sort) {
      case 'price-low':
        sortParam = 'price:asc'
        break
      case 'price-high':
        sortParam = 'price:desc'
        break
      case 'name-asc':
        sortParam = 'name:asc'
        break
      case 'name-desc':
        sortParam = 'name:desc'
        break
      case 'newest':
      default:
        sortParam = 'createdAt:desc'
        break
    }

    // Build filters
    const filters: any = {
      'category[$eq]': category
    }

    // Add additional filters
    if (filter) {
      const filterArray = filter.split(',')
      filterArray.forEach(f => {
        switch (f) {
          case 'featured':
            filters['isFeatured[$eq]'] = true
            break
          case 'in-stock':
            filters['inStock[$eq]'] = true
            break
          case 'new-arrival':
            // Products created in the last 30 days
            const thirtyDaysAgo = new Date()
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
            filters['createdAt[$gte]'] = thirtyDaysAgo.toISOString()
            break
          case 'has-discount':
            filters['discountPrice[$ne]'] = null
            break
        }
      })
    }

    const response = await strapi.get('/products', {
      params: {
        filters,
        locale,
        populate: {
          mainImage: true,
          images: true
        },
        sort: sortParam,
        pagination: {
          page,
          pageSize: 12
        }
      }
    })

    return {
      data: response.data.map(transformProduct),
      meta: response.meta
    }
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return { data: [] }
  }
}
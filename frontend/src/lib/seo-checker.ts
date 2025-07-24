// SEO检查工具
export interface SEOCheckResult {
  score: number // 0-100分
  issues: SEOIssue[]
  recommendations: string[]
  passed: SEOCheck[]
  failed: SEOCheck[]
}

export interface SEOIssue {
  type: 'error' | 'warning' | 'info'
  category: 'title' | 'description' | 'keywords' | 'images' | 'links' | 'structure' | 'performance'
  message: string
  element?: string
  fix?: string
}

export interface SEOCheck {
  name: string
  description: string
  weight: number // 权重
  passed: boolean
  value?: string | number
}

// SEO检查配置
const SEO_CHECKS = {
  title: {
    minLength: 10,
    maxLength: 60,
    weight: 15
  },
  description: {
    minLength: 50,
    maxLength: 160,
    weight: 15
  },
  keywords: {
    minCount: 3,
    maxCount: 10,
    weight: 10
  },
  headings: {
    h1Count: 1,
    weight: 10
  },
  images: {
    altTextRequired: true,
    weight: 10
  },
  links: {
    internalLinksMin: 3,
    weight: 5
  },
  structure: {
    weight: 15
  },
  performance: {
    weight: 20
  }
}

// 检查页面SEO
export function checkPageSEO(pageData: {
  title?: string
  description?: string
  keywords?: string
  content?: string
  images?: Array<{ src: string; alt?: string }>
  links?: Array<{ href: string; text: string; internal: boolean }>
  headings?: Array<{ level: number; text: string }>
  url?: string
  locale?: string
}): SEOCheckResult {
  const issues: SEOIssue[] = []
  const passed: SEOCheck[] = []
  const failed: SEOCheck[] = []
  const recommendations: string[] = []

  // 检查标题
  const titleCheck = checkTitle(pageData.title)
  if (titleCheck.passed) {
    passed.push(titleCheck)
  } else {
    failed.push(titleCheck)
    issues.push({
      type: 'error',
      category: 'title',
      message: titleCheck.description,
      fix: getTitleFix(pageData.title)
    })
  }

  // 检查描述
  const descriptionCheck = checkDescription(pageData.description)
  if (descriptionCheck.passed) {
    passed.push(descriptionCheck)
  } else {
    failed.push(descriptionCheck)
    issues.push({
      type: 'error',
      category: 'description',
      message: descriptionCheck.description,
      fix: getDescriptionFix(pageData.description)
    })
  }

  // 检查关键词
  const keywordsCheck = checkKeywords(pageData.keywords)
  if (keywordsCheck.passed) {
    passed.push(keywordsCheck)
  } else {
    failed.push(keywordsCheck)
    issues.push({
      type: 'warning',
      category: 'keywords',
      message: keywordsCheck.description,
      fix: 'Add relevant keywords separated by commas'
    })
  }

  // 检查标题结构
  const headingsCheck = checkHeadings(pageData.headings)
  if (headingsCheck.passed) {
    passed.push(headingsCheck)
  } else {
    failed.push(headingsCheck)
    issues.push({
      type: 'warning',
      category: 'structure',
      message: headingsCheck.description,
      fix: 'Ensure there is exactly one H1 tag per page'
    })
  }

  // 检查图片
  const imagesCheck = checkImages(pageData.images)
  if (imagesCheck.passed) {
    passed.push(imagesCheck)
  } else {
    failed.push(imagesCheck)
    issues.push({
      type: 'warning',
      category: 'images',
      message: imagesCheck.description,
      fix: 'Add alt text to all images for better accessibility and SEO'
    })
  }

  // 检查链接
  const linksCheck = checkLinks(pageData.links)
  if (linksCheck.passed) {
    passed.push(linksCheck)
  } else {
    failed.push(linksCheck)
    issues.push({
      type: 'info',
      category: 'links',
      message: linksCheck.description,
      fix: 'Add more internal links to improve site navigation'
    })
  }

  // 生成建议
  recommendations.push(...generateRecommendations(pageData, issues))

  // 计算分数
  const totalWeight = Object.values(SEO_CHECKS).reduce((sum, check) => sum + check.weight, 0)
  const passedWeight = passed.reduce((sum, check) => sum + check.weight, 0)
  const score = Math.round((passedWeight / totalWeight) * 100)

  return {
    score,
    issues,
    recommendations,
    passed,
    failed
  }
}

// 检查标题
function checkTitle(title?: string): SEOCheck {
  const check: SEOCheck = {
    name: 'Page Title',
    description: 'Page has an appropriate title',
    weight: SEO_CHECKS.title.weight,
    passed: false,
    value: title?.length || 0
  }

  if (!title) {
    check.description = 'Page is missing a title'
    return check
  }

  if (title.length < SEO_CHECKS.title.minLength) {
    check.description = `Title is too short (${title.length} chars, minimum ${SEO_CHECKS.title.minLength})`
    return check
  }

  if (title.length > SEO_CHECKS.title.maxLength) {
    check.description = `Title is too long (${title.length} chars, maximum ${SEO_CHECKS.title.maxLength})`
    return check
  }

  check.passed = true
  check.description = `Title length is optimal (${title.length} chars)`
  return check
}

// 检查描述
function checkDescription(description?: string): SEOCheck {
  const check: SEOCheck = {
    name: 'Meta Description',
    description: 'Page has an appropriate meta description',
    weight: SEO_CHECKS.description.weight,
    passed: false,
    value: description?.length || 0
  }

  if (!description) {
    check.description = 'Page is missing a meta description'
    return check
  }

  if (description.length < SEO_CHECKS.description.minLength) {
    check.description = `Description is too short (${description.length} chars, minimum ${SEO_CHECKS.description.minLength})`
    return check
  }

  if (description.length > SEO_CHECKS.description.maxLength) {
    check.description = `Description is too long (${description.length} chars, maximum ${SEO_CHECKS.description.maxLength})`
    return check
  }

  check.passed = true
  check.description = `Description length is optimal (${description.length} chars)`
  return check
}

// 检查关键词
function checkKeywords(keywords?: string): SEOCheck {
  const check: SEOCheck = {
    name: 'Meta Keywords',
    description: 'Page has relevant keywords',
    weight: SEO_CHECKS.keywords.weight,
    passed: false
  }

  if (!keywords) {
    check.description = 'Page is missing meta keywords'
    return check
  }

  const keywordArray = keywords.split(',').map(k => k.trim()).filter(k => k.length > 0)
  check.value = keywordArray.length

  if (keywordArray.length < SEO_CHECKS.keywords.minCount) {
    check.description = `Too few keywords (${keywordArray.length}, minimum ${SEO_CHECKS.keywords.minCount})`
    return check
  }

  if (keywordArray.length > SEO_CHECKS.keywords.maxCount) {
    check.description = `Too many keywords (${keywordArray.length}, maximum ${SEO_CHECKS.keywords.maxCount})`
    return check
  }

  check.passed = true
  check.description = `Keywords count is appropriate (${keywordArray.length})`
  return check
}

// 检查标题结构
function checkHeadings(headings?: Array<{ level: number; text: string }>): SEOCheck {
  const check: SEOCheck = {
    name: 'Heading Structure',
    description: 'Page has proper heading structure',
    weight: SEO_CHECKS.headings.weight,
    passed: false
  }

  if (!headings || headings.length === 0) {
    check.description = 'Page has no headings'
    return check
  }

  const h1Count = headings.filter(h => h.level === 1).length
  check.value = h1Count

  if (h1Count === 0) {
    check.description = 'Page is missing an H1 tag'
    return check
  }

  if (h1Count > 1) {
    check.description = `Page has multiple H1 tags (${h1Count}), should have exactly 1`
    return check
  }

  check.passed = true
  check.description = 'Page has proper H1 structure'
  return check
}

// 检查图片
function checkImages(images?: Array<{ src: string; alt?: string }>): SEOCheck {
  const check: SEOCheck = {
    name: 'Image Alt Text',
    description: 'All images have alt text',
    weight: SEO_CHECKS.images.weight,
    passed: false
  }

  if (!images || images.length === 0) {
    check.passed = true
    check.description = 'No images to check'
    return check
  }

  const imagesWithoutAlt = images.filter(img => !img.alt || img.alt.trim().length === 0)
  check.value = `${images.length - imagesWithoutAlt.length}/${images.length}`

  if (imagesWithoutAlt.length > 0) {
    check.description = `${imagesWithoutAlt.length} out of ${images.length} images are missing alt text`
    return check
  }

  check.passed = true
  check.description = `All ${images.length} images have alt text`
  return check
}

// 检查链接
function checkLinks(links?: Array<{ href: string; text: string; internal: boolean }>): SEOCheck {
  const check: SEOCheck = {
    name: 'Internal Links',
    description: 'Page has sufficient internal links',
    weight: SEO_CHECKS.links.weight,
    passed: false
  }

  if (!links || links.length === 0) {
    check.description = 'Page has no links'
    return check
  }

  const internalLinks = links.filter(link => link.internal)
  check.value = internalLinks.length

  if (internalLinks.length < SEO_CHECKS.links.internalLinksMin) {
    check.description = `Too few internal links (${internalLinks.length}, minimum ${SEO_CHECKS.links.internalLinksMin})`
    return check
  }

  check.passed = true
  check.description = `Good number of internal links (${internalLinks.length})`
  return check
}

// 生成修复建议
function getTitleFix(title?: string): string {
  if (!title) return 'Add a descriptive title between 10-60 characters'
  if (title.length < SEO_CHECKS.title.minLength) return 'Make the title longer and more descriptive'
  if (title.length > SEO_CHECKS.title.maxLength) return 'Shorten the title to under 60 characters'
  return 'Title looks good'
}

function getDescriptionFix(description?: string): string {
  if (!description) return 'Add a meta description between 50-160 characters'
  if (description.length < SEO_CHECKS.description.minLength) return 'Make the description longer and more detailed'
  if (description.length > SEO_CHECKS.description.maxLength) return 'Shorten the description to under 160 characters'
  return 'Description looks good'
}

// 生成建议
function generateRecommendations(
  pageData: any,
  issues: SEOIssue[]
): string[] {
  const recommendations: string[] = []

  // 基于问题生成建议
  const errorCount = issues.filter(i => i.type === 'error').length
  const warningCount = issues.filter(i => i.type === 'warning').length

  if (errorCount > 0) {
    recommendations.push(`Fix ${errorCount} critical SEO error${errorCount > 1 ? 's' : ''} first`)
  }

  if (warningCount > 0) {
    recommendations.push(`Address ${warningCount} SEO warning${warningCount > 1 ? 's' : ''} to improve ranking`)
  }

  // 具体建议
  if (!pageData.title || pageData.title.length < 30) {
    recommendations.push('Create a more descriptive and keyword-rich title')
  }

  if (!pageData.description || pageData.description.length < 100) {
    recommendations.push('Write a compelling meta description that includes your target keywords')
  }

  if (!pageData.keywords) {
    recommendations.push('Research and add relevant keywords for your target audience')
  }

  if (!pageData.images || pageData.images.length === 0) {
    recommendations.push('Add relevant images to make your content more engaging')
  }

  if (!pageData.headings || pageData.headings.filter(h => h.level === 2).length === 0) {
    recommendations.push('Use H2 tags to structure your content and improve readability')
  }

  return recommendations
}

// 生成SEO报告
export function generateSEOReport(checkResult: SEOCheckResult): string {
  const { score, issues, recommendations, passed, failed } = checkResult

  let report = `SEO Score: ${score}/100\n\n`

  if (passed.length > 0) {
    report += `✅ Passed Checks (${passed.length}):\n`
    passed.forEach(check => {
      report += `  • ${check.name}: ${check.description}\n`
    })
    report += '\n'
  }

  if (failed.length > 0) {
    report += `❌ Failed Checks (${failed.length}):\n`
    failed.forEach(check => {
      report += `  • ${check.name}: ${check.description}\n`
    })
    report += '\n'
  }

  if (issues.length > 0) {
    report += `🔍 Issues Found (${issues.length}):\n`
    issues.forEach(issue => {
      const icon = issue.type === 'error' ? '🚨' : issue.type === 'warning' ? '⚠️' : 'ℹ️'
      report += `  ${icon} ${issue.message}\n`
      if (issue.fix) {
        report += `     Fix: ${issue.fix}\n`
      }
    })
    report += '\n'
  }

  if (recommendations.length > 0) {
    report += `💡 Recommendations (${recommendations.length}):\n`
    recommendations.forEach((rec, index) => {
      report += `  ${index + 1}. ${rec}\n`
    })
  }

  return report
}
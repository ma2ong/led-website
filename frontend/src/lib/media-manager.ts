/**
 * Media Manager - Advanced media handling utilities
 */

import { MediaFile } from './media'

export interface UploadProgress {
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'completed' | 'error'
  error?: string
  result?: MediaFile
}

export interface UploadOptions {
  folder?: string
  ref?: string
  refId?: string
  field?: string
  onProgress?: (progress: UploadProgress[]) => void
  maxConcurrent?: number
}

export interface SingleUploadOptions {
  folder?: string
  ref?: string
  refId?: string
  field?: string
  onProgress?: (progress: number) => void
}

export class MediaManager {
  private baseUrl: string
  private apiToken?: string

  constructor(baseUrl?: string, apiToken?: string) {
    this.baseUrl = baseUrl || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
    this.apiToken = apiToken || process.env.STRAPI_API_TOKEN
  }

  /**
   * Upload multiple files with progress tracking
   */
  async uploadMultiple(files: File[], options: UploadOptions = {}): Promise<MediaFile[]> {
    const { maxConcurrent = 3, onProgress } = options
    const uploadQueue: UploadProgress[] = files.map(file => ({
      file,
      progress: 0,
      status: 'pending'
    }))

    const results: MediaFile[] = []
    const activeUploads: Promise<void>[] = []

    const processUpload = async (uploadItem: UploadProgress): Promise<void> => {
      try {
        uploadItem.status = 'uploading'
        onProgress?.(uploadQueue)

        const result = await this.uploadSingle(uploadItem.file, {
          ...options,
          onProgress: (progress: number) => {
            uploadItem.progress = progress
            onProgress?.(uploadQueue)
          }
        })

        uploadItem.status = 'completed'
        uploadItem.progress = 100
        uploadItem.result = result
        results.push(result)
      } catch (error) {
        uploadItem.status = 'error'
        uploadItem.error = error instanceof Error ? error.message : 'Upload failed'
      } finally {
        onProgress?.(uploadQueue)
      }
    }

    // Process uploads with concurrency limit
    for (const uploadItem of uploadQueue) {
      if (activeUploads.length >= maxConcurrent) {
        await Promise.race(activeUploads)
      }

      const uploadPromise = processUpload(uploadItem)
      activeUploads.push(uploadPromise)

      uploadPromise.finally(() => {
        const index = activeUploads.indexOf(uploadPromise)
        if (index > -1) {
          activeUploads.splice(index, 1)
        }
      })
    }

    // Wait for all uploads to complete
    await Promise.all(activeUploads)

    return results
  }

  /**
   * Upload a single file
   */
  async uploadSingle(
    file: File, 
    options: SingleUploadOptions = {}
  ): Promise<MediaFile> {
    const formData = new FormData()
    formData.append('files', file)

    if (options.folder) formData.append('folder', options.folder)
    if (options.ref) formData.append('ref', options.ref)
    if (options.refId) formData.append('refId', options.refId)
    if (options.field) formData.append('field', options.field)

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100)
          options.onProgress?.(progress)
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const result = JSON.parse(xhr.responseText)
            if (result && result.length > 0) {
              resolve(result[0])
            } else {
              reject(new Error('No file returned from upload'))
            }
          } catch {
            reject(new Error('Invalid response format'))
          }
        } else {
          reject(new Error(`Upload failed: ${xhr.statusText}`))
        }
      })

      xhr.addEventListener('error', () => {
        reject(new Error('Network error during upload'))
      })

      xhr.open('POST', `${this.baseUrl}/api/upload`)
      
      if (this.apiToken) {
        xhr.setRequestHeader('Authorization', `Bearer ${this.apiToken}`)
      }

      xhr.send(formData)
    })
  }

  /**
   * Delete a media file
   */
  async deleteFile(fileId: number): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/upload/files/${fileId}`, {
        method: 'DELETE',
        headers: {
          ...(this.apiToken && { Authorization: `Bearer ${this.apiToken}` }),
        },
      })

      return response.ok
    } catch (error) {
      console.error('Delete error:', error)
      return false
    }
  }

  /**
   * Get media file by ID
   */
  async getFile(fileId: number): Promise<MediaFile | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/upload/files/${fileId}`, {
        headers: {
          ...(this.apiToken && { Authorization: `Bearer ${this.apiToken}` }),
        },
      })

      if (response.ok) {
        return await response.json()
      }

      return null
    } catch (err) {
      console.error('Get file error:', err)
      return null
    }
  }

  /**
   * Search media files
   */
  async searchFiles(query: string, filters: {
    mime?: string
    folder?: string
    limit?: number
  } = {}): Promise<MediaFile[]> {
    try {
      const params = new URLSearchParams()
      if (query) params.append('_q', query)
      if (filters.mime) params.append('mime_contains', filters.mime)
      if (filters.folder) params.append('folder', filters.folder)
      if (filters.limit) params.append('_limit', filters.limit.toString())

      const response = await fetch(`${this.baseUrl}/api/upload/files?${params}`, {
        headers: {
          ...(this.apiToken && { Authorization: `Bearer ${this.apiToken}` }),
        },
      })

      if (response.ok) {
        return await response.json()
      }

      return []
    } catch (error) {
      console.error('Search files error:', error)
      return []
    }
  }

  /**
   * Get optimized URL for a media file
   */
  async getOptimizedUrl(fileId: number, options: {
    width?: number
    height?: number
    quality?: number
    format?: string
  } = {}): Promise<string | null> {
    try {
      const params = new URLSearchParams()
      if (options.width) params.append('width', options.width.toString())
      if (options.height) params.append('height', options.height.toString())
      if (options.quality) params.append('quality', options.quality.toString())
      if (options.format) params.append('format', options.format)

      const response = await fetch(`${this.baseUrl}/api/media/${fileId}/optimized?${params}`, {
        headers: {
          ...(this.apiToken && { Authorization: `Bearer ${this.apiToken}` }),
        },
      })

      if (response.ok) {
        const result = await response.json()
        return result.data?.url || null
      }

      return null
    } catch (error) {
      console.error('Get optimized URL error:', error)
      return null
    }
  }

  /**
   * Get responsive URLs for a media file
   */
  async getResponsiveUrls(fileId: number, breakpoints?: string): Promise<{
    responsive: Record<string, string>
    original: string
  } | null> {
    try {
      const params = new URLSearchParams()
      if (breakpoints) params.append('breakpoints', breakpoints)

      const response = await fetch(`${this.baseUrl}/api/media/${fileId}/responsive?${params}`, {
        headers: {
          ...(this.apiToken && { Authorization: `Bearer ${this.apiToken}` }),
        },
      })

      if (response.ok) {
        const result = await response.json()
        return result.data || null
      }

      return null
    } catch (error) {
      console.error('Get responsive URLs error:', error)
      return null
    }
  }

  /**
   * Get media library statistics
   */
  async getStats(): Promise<{
    totalFiles: number
    totalSize: number
    byType: Record<string, number>
    byProvider: Record<string, number>
    recentUploads: MediaFile[]
  } | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/media/stats`, {
        headers: {
          ...(this.apiToken && { Authorization: `Bearer ${this.apiToken}` }),
        },
      })

      if (response.ok) {
        const result = await response.json()
        return result.data || null
      }

      return null
    } catch (error) {
      console.error('Get stats error:', error)
      return null
    }
  }

  /**
   * Validate file before upload
   */
  validateFile(file: File, options: {
    maxSize?: number
    allowedTypes?: string[]
    maxDimensions?: { width: number; height: number }
  } = {}): Promise<{ valid: boolean; error?: string; dimensions?: { width: number; height: number } }> {
    return new Promise((resolve) => {
      const { maxSize = 50 * 1024 * 1024, allowedTypes, maxDimensions } = options

      // Check file size
      if (file.size > maxSize) {
        resolve({
          valid: false,
          error: `File size (${Math.round(file.size / 1024 / 1024)}MB) exceeds maximum allowed size (${Math.round(maxSize / 1024 / 1024)}MB)`
        })
        return
      }

      // Check file type
      if (allowedTypes && !allowedTypes.includes(file.type)) {
        resolve({
          valid: false,
          error: `File type "${file.type}" is not allowed. Allowed types: ${allowedTypes.join(', ')}`
        })
        return
      }

      // Check image dimensions if it's an image
      if (file.type.startsWith('image/') && maxDimensions) {
        const img = new Image()
        const url = URL.createObjectURL(file)

        img.onload = () => {
          URL.revokeObjectURL(url)
          
          if (img.width > maxDimensions.width || img.height > maxDimensions.height) {
            resolve({
              valid: false,
              error: `Image dimensions (${img.width}x${img.height}) exceed maximum allowed dimensions (${maxDimensions.width}x${maxDimensions.height})`,
              dimensions: { width: img.width, height: img.height }
            })
          } else {
            resolve({
              valid: true,
              dimensions: { width: img.width, height: img.height }
            })
          }
        }

        img.onerror = () => {
          URL.revokeObjectURL(url)
          resolve({
            valid: false,
            error: 'Invalid image file'
          })
        }

        img.src = url
      } else {
        resolve({ valid: true })
      }
    })
  }
}

// Export a default instance
export const mediaManager = new MediaManager()

// Export utility functions
export const validateFiles = async (
  files: File[], 
  options: Parameters<MediaManager['validateFile']>[1] = {}
): Promise<{ valid: File[]; invalid: Array<{ file: File; error: string }> }> => {
  const valid: File[] = []
  const invalid: Array<{ file: File; error: string }> = []

  for (const file of files) {
    const validation = await mediaManager.validateFile(file, options)
    if (validation.valid) {
      valid.push(file)
    } else {
      invalid.push({ file, error: validation.error || 'Validation failed' })
    }
  }

  return { valid, invalid }
}
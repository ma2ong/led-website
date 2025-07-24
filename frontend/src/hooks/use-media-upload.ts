'use client'

import { useState, useCallback } from 'react'

interface UploadedFile {
  id: number
  name: string
  url: string
  mime: string
  size: number
  width?: number
  height?: number
}

interface UseMediaUploadReturn {
  uploading: boolean
  error: string | null
  uploadFile: (file: File) => Promise<UploadedFile | null>
  deleteFile: (fileId: number) => Promise<boolean>
  clearError: () => void
}

export function useMediaUpload(): UseMediaUploadReturn {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadFile = useCallback(async (file: File): Promise<UploadedFile | null> => {
    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('files', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }

      const result = await response.json()
      
      // Strapi returns an array of uploaded files
      if (result && result.length > 0) {
        return result[0] as UploadedFile
      }

      throw new Error('No file returned from upload')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed'
      setError(errorMessage)
      return null
    } finally {
      setUploading(false)
    }
  }, [])

  const deleteFile = useCallback(async (fileId: number): Promise<boolean> => {
    setError(null)

    try {
      const response = await fetch(`/api/upload?id=${fileId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Delete failed')
      }

      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Delete failed'
      setError(errorMessage)
      return false
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    uploading,
    error,
    uploadFile,
    deleteFile,
    clearError,
  }
}
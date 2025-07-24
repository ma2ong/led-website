'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { PhotoIcon, XMarkIcon, DocumentIcon } from '@heroicons/react/24/outline'
import { useMediaUpload } from '@/hooks/use-media-upload'
import { cn } from '@/lib/utils'

interface UploadedFile {
  id: number
  name: string
  url: string
  mime: string
  size: number
  width?: number
  height?: number
}

interface MediaUploadProps {
  onUpload?: (files: UploadedFile[]) => void
  onDelete?: (fileId: number) => void
  accept?: string[]
  maxFiles?: number
  maxSize?: number
  className?: string
  multiple?: boolean
}

export default function MediaUpload({
  onUpload,
  onDelete,
  accept = ['image/*', 'application/pdf'],
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024, // 10MB
  className,
  multiple = true,
}: MediaUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const { uploading, error, uploadFile, deleteFile, clearError } = useMediaUpload()

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    clearError()
    
    const newFiles: UploadedFile[] = []
    
    for (const file of acceptedFiles) {
      const uploadedFile = await uploadFile(file)
      if (uploadedFile) {
        newFiles.push(uploadedFile)
      }
    }
    
    if (newFiles.length > 0) {
      const updatedFiles = [...uploadedFiles, ...newFiles]
      setUploadedFiles(updatedFiles)
      onUpload?.(updatedFiles)
    }
  }, [uploadFile, uploadedFiles, onUpload, clearError])

  const handleDelete = async (fileId: number) => {
    const success = await deleteFile(fileId)
    if (success) {
      const updatedFiles = uploadedFiles.filter(file => file.id !== fileId)
      setUploadedFiles(updatedFiles)
      onDelete?.(fileId)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxFiles: multiple ? maxFiles : 1,
    maxSize,
    multiple,
  })

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const isImage = (mime: string) => mime.startsWith('image/')

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
          isDragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-gray-400',
          uploading && 'pointer-events-none opacity-50'
        )}
      >
        <input {...getInputProps()} />
        
        <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
        
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-900">
            {isDragActive ? '拖放文件到这里' : '点击上传或拖放文件'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            支持 {accept.join(', ')} 格式，最大 {formatFileSize(maxSize)}
          </p>
        </div>
        
        {uploading && (
          <div className="mt-4">
            <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-primary-500">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              上传中...
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">上传失败</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900">已上传文件</h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="relative group rounded-lg border border-gray-200 p-3 hover:border-gray-300"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {isImage(file.mime) ? (
                      <div className="relative h-10 w-10 rounded overflow-hidden">
                        <Image
                          src={file.url}
                          alt={file.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                    ) : (
                      <DocumentIcon className="h-10 w-10 text-gray-400" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                    {file.width && file.height && (
                      <p className="text-xs text-gray-500">
                        {file.width} × {file.height}
                      </p>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleDelete(file.id)}
                    className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
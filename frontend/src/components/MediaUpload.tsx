'use client';
import { useState, useRef, useCallback } from 'react';
import { compressImage, formatFileSize, SUPPORTED_IMAGE_FORMATS } from '@/lib/media';

interface MediaUploadProps {
  onUpload: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  maxFiles?: number;
  compress?: boolean;
  className?: string;
}

export default function MediaUpload({
  onUpload,
  accept = 'image/*',
  multiple = false,
  maxSize = 5 * 1024 * 1024, // 5MB
  maxFiles = 5,
  compress = true,
  className = '',
}: MediaUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // 检查文件类型
    if (accept === 'image/*' && !SUPPORTED_IMAGE_FORMATS.includes(file.type as any)) {
      return `不支持的文件格式: ${file.type}`;
    }

    // 检查文件大小
    if (file.size > maxSize) {
      return `文件过大: ${formatFileSize(file.size)}，最大允许 ${formatFileSize(maxSize)}`;
    }

    return null;
  };

  const processFiles = useCallback(async (files: FileList) => {
    setError(null);
    setUploading(true);

    try {
      const fileArray = Array.from(files);
      
      // 检查文件数量
      if (fileArray.length > maxFiles) {
        throw new Error(`最多只能上传 ${maxFiles} 个文件`);
      }

      // 验证每个文件
      for (const file of fileArray) {
        const error = validateFile(file);
        if (error) {
          throw new Error(error);
        }
      }

      // 压缩图片（如果启用）
      const processedFiles: File[] = [];
      for (const file of fileArray) {
        if (compress && file.type.startsWith('image/')) {
          try {
            const compressedBlob = await compressImage(file);
            const compressedFile = new File([compressedBlob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            processedFiles.push(compressedFile);
          } catch {
            // 如果压缩失败，使用原文件
            processedFiles.push(file);
          }
        } else {
          processedFiles.push(file);
        }
      }

      setUploadedFiles(prev => [...prev, ...processedFiles]);
      onUpload(processedFiles);
    } catch (err) {
      setError(err instanceof Error ? err.message : '上传失败');
    } finally {
      setUploading(false);
    }
  }, [maxFiles, maxSize, compress, onUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFiles(files);
    }
  }, [processFiles]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
  }, [processFiles]);

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setUploadedFiles([]);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 上传区域 */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
          ${isDragging 
            ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-orange-400'
          }
          ${uploading ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
        />

        {uploading ? (
          <div className="space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-400">处理中...</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-4xl text-gray-400">📁</div>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              拖拽文件到这里或点击选择
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              支持 {accept}，最大 {formatFileSize(maxSize)}
              {multiple && `，最多 ${maxFiles} 个文件`}
            </p>
          </div>
        )}
      </div>

      {/* 错误信息 */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-red-500 mr-2">⚠️</span>
            <span className="text-red-700 dark:text-red-400">{error}</span>
          </div>
        </div>
      )}

      {/* 已上传文件列表 */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-700 dark:text-gray-300">
              已选择文件 ({uploadedFiles.length})
            </h4>
            <button
              onClick={clearAll}
              className="text-sm text-red-600 hover:text-red-800 dark:text-red-400"
            >
              清空全部
            </button>
          </div>
          
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-lg p-3"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">
                    {file.type.startsWith('image/') ? '🖼️' : '📄'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300 truncate max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// 简化的图片上传组件
export function ImageUpload({ onUpload, className }: { onUpload: (files: File[]) => void; className?: string }) {
  return (
    <MediaUpload
      onUpload={onUpload}
      accept="image/*"
      multiple={true}
      maxSize={10 * 1024 * 1024} // 10MB
      maxFiles={10}
      compress={true}
      className={className}
    />
  );
}

// 单文件上传组件
export function SingleImageUpload({ onUpload, className }: { onUpload: (file: File) => void; className?: string }) {
  return (
    <MediaUpload
      onUpload={(files) => files[0] && onUpload(files[0])}
      accept="image/*"
      multiple={false}
      maxSize={5 * 1024 * 1024} // 5MB
      maxFiles={1}
      compress={true}
      className={className}
    />
  );
}